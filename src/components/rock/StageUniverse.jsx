import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';

/**
 * StageUniverse — fixed 3D backdrop for the whole site.
 *
 * The camera flies down a long concert tunnel as the page scrolls:
 *   - twinkling stage dust plus soft out-of-focus bokeh for depth,
 *   - sweeping volumetric spotlights hanging over the stage,
 *   - a red stage-floor grid rushing underneath,
 *   - a spinning vinyl record ringed by an equalizer that pumps on the beat,
 *   - glowing sound-wave rings to fly through,
 *   - 3D electric guitars and tumbling guitar picks.
 * Everything breathes on a 112 BPM pulse. Desktop gets a bloom glow pass.
 * Rendering pauses when the tab is hidden; reduced-motion visitors get a still frame.
 */

const RED = new THREE.Color('#E8141C');
const AMBER = new THREE.Color('#FFB547');
const WARM = new THREE.Color('#FFE9D6');
const BG = '#070404';
const TUNNEL_START = 24;
const TUNNEL_END = -175;
const TRAVEL = 165;
const BPM = 112;

/* ------------------------------------------------------------------ */
/*  Dust & bokeh (custom shader: soft round points that twinkle)      */
/* ------------------------------------------------------------------ */

const dustVertex = /* glsl */ `
  attribute float aPhase;
  attribute float aSize;
  attribute vec3 aColor;
  uniform float uTime;
  uniform float uPixelRatio;
  uniform float uBeat;
  varying vec3 vColor;
  varying float vAlpha;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    float twinkle = 0.65 + 0.35 * sin(uTime * (1.2 + aPhase) + aPhase * 6.2831);
    float depth = -mv.z;
    vAlpha = twinkle * smoothstep(120.0, 18.0, depth) * smoothstep(0.5, 3.0, depth);
    vColor = aColor * (1.0 + uBeat * 0.35);
    gl_PointSize = aSize * uPixelRatio * (220.0 / depth) * (0.85 + 0.15 * twinkle);
    gl_Position = projectionMatrix * mv;
  }
`;

const dustFragment = /* glsl */ `
  uniform float uSoftness;
  varying vec3 vColor;
  varying float vAlpha;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float a = smoothstep(0.5, 0.5 * uSoftness, d);
    if (a < 0.01) discard;
    gl_FragColor = vec4(vColor, a * vAlpha);
  }
`;

const buildPoints = ({ count, minR, maxR, size, softness, palette, brightness = 1 }) => {
  const pos = new Float32Array(count * 3);
  const col = new Float32Array(count * 3);
  const phase = new Float32Array(count);
  const sizes = new Float32Array(count);
  const c = new THREE.Color();
  for (let i = 0; i < count; i += 1) {
    const z = THREE.MathUtils.lerp(TUNNEL_START, TUNNEL_END, Math.random());
    const radius = minR + Math.pow(Math.random(), 0.75) * (maxR - minR);
    const angle = Math.random() * Math.PI * 2 + z * 0.045;
    pos[i * 3] = Math.cos(angle) * radius;
    pos[i * 3 + 1] = Math.sin(angle) * radius * 0.72;
    pos[i * 3 + 2] = z;
    c.copy(palette(Math.random())).multiplyScalar(brightness * (0.45 + Math.random() * 0.55));
    col.set([c.r, c.g, c.b], i * 3);
    phase[i] = Math.random();
    sizes[i] = size * (0.5 + Math.random());
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  geo.setAttribute('aColor', new THREE.BufferAttribute(col, 3));
  geo.setAttribute('aPhase', new THREE.BufferAttribute(phase, 1));
  geo.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));
  const mat = new THREE.ShaderMaterial({
    vertexShader: dustVertex,
    fragmentShader: dustFragment,
    uniforms: {
      uTime: { value: 0 },
      uBeat: { value: 0 },
      uPixelRatio: { value: 1 },
      uSoftness: { value: softness }
    },
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending
  });
  return new THREE.Points(geo, mat);
};

const dustPalette = (r) => (r < 0.22 ? RED : r < 0.42 ? AMBER : WARM);
const bokehPalette = (r) => (r < 0.55 ? RED : r < 0.8 ? AMBER : WARM);

/* ------------------------------------------------------------------ */
/*  Volumetric spotlights                                             */
/* ------------------------------------------------------------------ */

const beamVertex = /* glsl */ `
  varying float vY;
  varying vec3 vNormalV;
  varying vec3 vViewDir;
  void main() {
    vY = uv.y;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vNormalV = normalize(normalMatrix * normal);
    vViewDir = normalize(-mv.xyz);
    gl_Position = projectionMatrix * mv;
  }
`;

const beamFragment = /* glsl */ `
  uniform vec3 uColor;
  uniform float uIntensity;
  varying float vY;
  varying vec3 vNormalV;
  varying vec3 vViewDir;
  void main() {
    // brightest at the lamp (top), fading toward the floor; soft edges
    float along = pow(vY, 1.6);
    float edge = pow(abs(dot(vNormalV, vViewDir)), 1.4);
    float a = along * edge * uIntensity;
    gl_FragColor = vec4(uColor, a);
  }
`;

const buildSpotlights = () => {
  const group = new THREE.Group();
  const geo = new THREE.ConeGeometry(5.5, 30, 48, 1, true);
  geo.translate(0, -15, 0); // pivot at the lamp
  const lamps = [];
  const specs = [
    { x: -11, color: WARM, base: -0.35 },
    { x: -4, color: RED, base: -0.12 },
    { x: 4, color: AMBER, base: 0.12 },
    { x: 11, color: RED, base: 0.35 }
  ];
  specs.forEach((s, i) => {
    const mat = new THREE.ShaderMaterial({
      vertexShader: beamVertex,
      fragmentShader: beamFragment,
      uniforms: { uColor: { value: s.color.clone() }, uIntensity: { value: 0.22 } },
      transparent: true,
      depthWrite: false,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending
    });
    const cone = new THREE.Mesh(geo, mat);
    const pivot = new THREE.Group();
    pivot.position.set(s.x, 13, 0);
    pivot.add(cone);

    // the lamp head itself, a hot glowing disc
    const head = new THREE.Mesh(
      new THREE.CircleGeometry(0.55, 24),
      new THREE.MeshBasicMaterial({ color: s.color.clone().multiplyScalar(2.2), transparent: true, opacity: 0.9 })
    );
    head.rotation.x = Math.PI / 2;
    head.position.y = -0.05;
    pivot.add(head);

    pivot.userData = { base: s.base, seed: i * 1.7 };
    lamps.push(pivot);
    group.add(pivot);
  });

  // lighting truss bar
  const truss = new THREE.Mesh(
    new THREE.BoxGeometry(30, 0.25, 0.25),
    new THREE.MeshStandardMaterial({ color: '#2a2224', metalness: 0.8, roughness: 0.4 })
  );
  truss.position.y = 13.2;
  group.add(truss);

  return { group, lamps };
};

/* ------------------------------------------------------------------ */
/*  Stage floor grid                                                  */
/* ------------------------------------------------------------------ */

const buildFloor = () => {
  const pts = [];
  const width = 60;
  for (let x = -width / 2; x <= width / 2; x += 3) {
    pts.push(x, 0, TUNNEL_START, x, 0, TUNNEL_END);
  }
  for (let z = TUNNEL_START; z >= TUNNEL_END; z -= 3) {
    pts.push(-width / 2, 0, z, width / 2, 0, z);
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3));
  const mat = new THREE.LineBasicMaterial({ color: '#E8141C', transparent: true, opacity: 0.22, fog: true });
  const floor = new THREE.LineSegments(geo, mat);
  floor.position.y = -7.5;
  return floor;
};

/* ------------------------------------------------------------------ */
/*  Vinyl + equalizer ring                                            */
/* ------------------------------------------------------------------ */

const buildVinyl = (barCount) => {
  const spinner = new THREE.Group();
  const disc = new THREE.Group();

  disc.add(
    new THREE.Mesh(
      new THREE.CircleGeometry(4.2, 96),
      new THREE.MeshStandardMaterial({ color: '#161012', metalness: 0.75, roughness: 0.3, side: THREE.DoubleSide })
    )
  );

  const grooveMat = new THREE.LineBasicMaterial({ color: '#5a4b4e', transparent: true, opacity: 0.6 });
  for (let r = 1.55; r < 4.1; r += 0.09) {
    const ptsArr = [];
    for (let a = 0; a <= 72; a += 1) {
      const t = (a / 72) * Math.PI * 2;
      ptsArr.push(new THREE.Vector3(Math.cos(t) * r, Math.sin(t) * r, 0.002));
    }
    disc.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(ptsArr), grooveMat));
  }

  const sheen = new THREE.Mesh(
    new THREE.RingGeometry(1.5, 4.15, 64, 1, 0, Math.PI / 4),
    new THREE.MeshBasicMaterial({ color: '#ffffff', transparent: true, opacity: 0.09, side: THREE.DoubleSide, depthWrite: false })
  );
  sheen.position.z = 0.004;
  spinner.add(sheen); // stays still while the disc spins under it

  const label = new THREE.Mesh(
    new THREE.CircleGeometry(1.35, 64),
    new THREE.MeshStandardMaterial({ color: '#E8141C', emissive: '#7a0a0e', emissiveIntensity: 0.8, roughness: 0.6, side: THREE.DoubleSide })
  );
  label.position.z = 0.006;
  disc.add(label);

  // little star logo on the label
  const star = new THREE.Shape();
  for (let i = 0; i < 10; i += 1) {
    const r = i % 2 ? 0.22 : 0.5;
    const a = (i / 10) * Math.PI * 2 + Math.PI / 2;
    if (i === 0) star.moveTo(Math.cos(a) * r, Math.sin(a) * r);
    else star.lineTo(Math.cos(a) * r, Math.sin(a) * r);
  }
  const starMesh = new THREE.Mesh(new THREE.ShapeGeometry(star), new THREE.MeshBasicMaterial({ color: '#0b0809', side: THREE.DoubleSide }));
  starMesh.position.z = 0.008;
  disc.add(starMesh);

  spinner.add(disc);

  // Equalizer ring: instanced bars standing around the record
  const barGeo = new THREE.BoxGeometry(0.16, 1, 0.16);
  barGeo.translate(0, 0.5, 0);
  const barMat = new THREE.MeshBasicMaterial({ color: '#ffffff', vertexColors: false });
  const bars = new THREE.InstancedMesh(barGeo, barMat, barCount);
  const colorTmp = new THREE.Color();
  for (let i = 0; i < barCount; i += 1) {
    colorTmp.copy(RED).lerp(AMBER, (Math.sin((i / barCount) * Math.PI * 4) + 1) / 2 * 0.6).multiplyScalar(0.7);
    bars.setColorAt(i, colorTmp);
  }
  bars.instanceColor.needsUpdate = true;
  spinner.add(bars);

  return { spinner, disc, bars };
};

/* ------------------------------------------------------------------ */
/*  Rings, guitars, picks                                             */
/* ------------------------------------------------------------------ */

const buildRings = () => {
  const zs = [-22, -48, -76, -104, -132, -158];
  return zs.map((z, i) => {
    const group = new THREE.Group();
    const color = i % 2 ? '#FFB547' : '#E8141C';
    const main = new THREE.Mesh(
      new THREE.TorusGeometry(7 + (i % 3) * 2.5, 0.05, 8, 180),
      new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.8, blending: THREE.AdditiveBlending, depthWrite: false })
    );
    const echo = new THREE.Mesh(
      new THREE.TorusGeometry(7.6 + (i % 3) * 2.5, 0.02, 6, 180),
      new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.35, blending: THREE.AdditiveBlending, depthWrite: false })
    );
    group.add(main, echo);
    group.position.set(Math.sin(i * 1.7) * 3, Math.cos(i * 1.3) * 1.5, z);
    group.userData = { main, echo };
    return group;
  });
};

const buildGuitar = (bodyColor) => {
  const g = new THREE.Group();

  // offset double-cutaway body
  const s = new THREE.Shape();
  s.moveTo(0, -3.2);
  s.bezierCurveTo(2.4, -3.2, 2.9, -1.6, 2.2, -0.4);
  s.bezierCurveTo(1.7, 0.4, 2.4, 1.2, 2.0, 2.4);
  s.bezierCurveTo(1.8, 3.0, 1.2, 2.9, 1.05, 2.1);
  s.bezierCurveTo(0.95, 1.5, 0.5, 1.3, 0.4, 1.6);
  s.lineTo(-0.4, 1.6);
  s.bezierCurveTo(-0.6, 1.3, -1.0, 1.8, -1.2, 2.6);
  s.bezierCurveTo(-1.4, 3.3, -2.2, 3.1, -2.2, 2.2);
  s.bezierCurveTo(-2.2, 1.0, -1.6, 0.3, -2.1, -0.5);
  s.bezierCurveTo(-2.8, -1.6, -2.4, -3.2, 0, -3.2);
  const bodyGeo = new THREE.ExtrudeGeometry(s, { depth: 0.45, bevelEnabled: true, bevelSize: 0.08, bevelThickness: 0.08, bevelSegments: 3 });
  bodyGeo.translate(0, 0, -0.22);
  const body = new THREE.Mesh(
    bodyGeo,
    new THREE.MeshStandardMaterial({ color: bodyColor, metalness: 0.45, roughness: 0.25, emissive: bodyColor, emissiveIntensity: 0.08 })
  );
  g.add(body);

  // pickguard
  const pg = new THREE.Mesh(
    new THREE.ShapeGeometry(s, 24),
    new THREE.MeshStandardMaterial({ color: '#f2ece4', roughness: 0.5, side: THREE.DoubleSide })
  );
  pg.scale.set(0.62, 0.62, 1);
  pg.position.set(-0.25, -0.2, 0.32);
  g.add(pg);

  const dark = new THREE.MeshStandardMaterial({ color: '#2b1d17', roughness: 0.55, metalness: 0.1 });
  const neck = new THREE.Mesh(new THREE.BoxGeometry(0.62, 6.4, 0.28), dark);
  neck.position.set(0, 4.6, 0.12);
  g.add(neck);

  const head = new THREE.Mesh(new THREE.BoxGeometry(0.95, 1.6, 0.22), dark);
  head.position.set(0.12, 8.45, 0.1);
  head.rotation.z = -0.12;
  g.add(head);

  // frets
  const fretMat = new THREE.MeshStandardMaterial({ color: '#c9c2b8', metalness: 0.9, roughness: 0.25 });
  for (let i = 0; i < 14; i += 1) {
    const fret = new THREE.Mesh(new THREE.BoxGeometry(0.64, 0.035, 0.05), fretMat);
    fret.position.set(0, 7.5 - i * Math.pow(0.94, i) * 0.55, 0.28);
    g.add(fret);
  }

  // pickups + bridge
  const chrome = new THREE.MeshStandardMaterial({ color: '#d8d8d8', metalness: 1, roughness: 0.2 });
  [-1.7, -0.6, 0.4].forEach((y) => {
    const pu = new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.22, 0.08), new THREE.MeshStandardMaterial({ color: '#111', roughness: 0.6 }));
    pu.position.set(0, y, 0.36);
    g.add(pu);
  });
  const bridge = new THREE.Mesh(new THREE.BoxGeometry(0.85, 0.3, 0.1), chrome);
  bridge.position.set(0, -2.4, 0.36);
  g.add(bridge);

  // knobs
  [[1.1, -1.9], [1.35, -2.5], [0.9, -2.8]].forEach(([x, y]) => {
    const k = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, 0.14, 16), chrome);
    k.rotation.x = Math.PI / 2;
    k.position.set(x, y, 0.36);
    g.add(k);
  });

  // strings (glow a little under bloom)
  const strings = [];
  for (let i = 0; i < 6; i += 1) {
    const x = -0.2 + i * 0.08;
    strings.push(x, -2.4, 0.42, x * 0.7, 8.0, 0.3);
  }
  const sGeo = new THREE.BufferGeometry();
  sGeo.setAttribute('position', new THREE.Float32BufferAttribute(strings, 3));
  g.add(new THREE.LineSegments(sGeo, new THREE.LineBasicMaterial({ color: '#fff3e0', transparent: true, opacity: 0.85 })));

  g.scale.setScalar(0.85);
  return g;
};

const buildPicks = (count) => {
  const shape = new THREE.Shape();
  shape.moveTo(0, -1);
  shape.bezierCurveTo(0.45, -0.55, 0.95, 0.1, 0.9, 0.55);
  shape.bezierCurveTo(0.85, 0.95, 0.4, 1.05, 0, 1.05);
  shape.bezierCurveTo(-0.4, 1.05, -0.85, 0.95, -0.9, 0.55);
  shape.bezierCurveTo(-0.95, 0.1, -0.45, -0.55, 0, -1);
  const geo = new THREE.ExtrudeGeometry(shape, { depth: 0.12, bevelEnabled: true, bevelSize: 0.04, bevelThickness: 0.04, bevelSegments: 2 });
  geo.center();
  const redMat = new THREE.MeshStandardMaterial({ color: '#E8141C', metalness: 0.55, roughness: 0.28, emissive: '#3a0306', emissiveIntensity: 0.6 });
  const pearlMat = new THREE.MeshStandardMaterial({ color: '#efe6dc', metalness: 0.3, roughness: 0.35 });

  const picks = [];
  for (let i = 0; i < count; i += 1) {
    const mesh = new THREE.Mesh(geo, i % 3 === 0 ? pearlMat : redMat);
    const z = THREE.MathUtils.lerp(4, TUNNEL_END + 20, i / count) + (Math.random() - 0.5) * 8;
    const side = i % 2 ? 1 : -1;
    mesh.position.set(side * (4 + Math.random() * 7), (Math.random() - 0.5) * 8, z);
    mesh.scale.setScalar(0.35 + Math.random() * 0.45);
    mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
    mesh.userData = {
      spin: new THREE.Vector3((Math.random() - 0.5) * 0.8, (Math.random() - 0.5) * 0.8, (Math.random() - 0.5) * 0.4),
      seed: Math.random() * 10,
      baseY: mesh.position.y
    };
    picks.push(mesh);
  }
  return picks;
};

/* ------------------------------------------------------------------ */

export const StageUniverse = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return undefined;

    const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isSmall = window.innerWidth < 768;
    const useBloom = !isSmall;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: !isSmall, alpha: false, powerPreference: 'high-performance' });
    } catch (e) {
      return undefined; // no WebGL: the CSS gradient behind stays visible
    }
    const pixelRatio = Math.min(window.devicePixelRatio || 1, isSmall ? 1.25 : 1.5);
    renderer.setPixelRatio(pixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(BG, 1);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.9;
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(BG, 0.02);

    const camera = new THREE.PerspectiveCamera(62, window.innerWidth / window.innerHeight, 0.1, 230);
    camera.position.set(0, 0, 14);

    // Lights
    scene.add(new THREE.AmbientLight('#ffffff', 0.3));
    const key = new THREE.DirectionalLight('#ffd9b3', 1.6);
    key.position.set(4, 8, 10);
    scene.add(key);
    const redLight = new THREE.PointLight('#E8141C', 50, 45, 1.6);
    scene.add(redLight);
    const rimLight = new THREE.PointLight('#FFB547', 20, 35, 1.8);
    scene.add(rimLight);

    // Particles
    const dust = buildPoints({ count: isSmall ? 2200 : 4800, minR: 3, maxR: 30, size: 0.5, softness: 0.15, palette: dustPalette, brightness: 0.85 });
    const bokeh = buildPoints({ count: isSmall ? 60 : 110, minR: 8, maxR: 26, size: 4.5, softness: 0.0, palette: bokehPalette, brightness: 0.28 });
    [dust, bokeh].forEach((p) => {
      p.material.uniforms.uPixelRatio.value = pixelRatio;
      scene.add(p);
    });

    // Stage furniture
    const { group: rig, lamps } = buildSpotlights();
    scene.add(rig);
    const floor = buildFloor();
    scene.add(floor);

    const { spinner, disc, bars } = buildVinyl(isSmall ? 40 : 64);
    spinner.position.set(5.5, -1.2, 0);
    scene.add(spinner);

    const rings = buildRings();
    rings.forEach((r) => scene.add(r));

    const guitars = [
      { mesh: buildGuitar(new THREE.Color('#B3131B')), z: -38, x: -7.5, y: 0.5, tilt: 0.55 },
      { mesh: buildGuitar(new THREE.Color('#121012')), z: -92, x: 7.5, y: -0.5, tilt: -0.6 },
      { mesh: buildGuitar(new THREE.Color('#E8E0D4')), z: -146, x: -6.5, y: 0.8, tilt: 0.4 }
    ];
    guitars.forEach((gt) => {
      gt.mesh.position.set(gt.x, gt.y, gt.z);
      gt.mesh.rotation.z = gt.tilt;
      scene.add(gt.mesh);
    });

    const picks = buildPicks(isSmall ? 10 : 18);
    picks.forEach((p) => scene.add(p));

    // Post-processing glow (desktop)
    let composer = null;
    let bloom = null;
    if (useBloom) {
      composer = new EffectComposer(renderer);
      composer.setPixelRatio(pixelRatio);
      composer.setSize(window.innerWidth, window.innerHeight);
      composer.addPass(new RenderPass(scene, camera));
      bloom = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 0.5, 0.45, 0.42);
      composer.addPass(bloom);
      composer.addPass(new OutputPass());
    }

    // Scroll + pointer state
    const state = { target: 0, progress: 0, mx: 0, my: 0, tmx: 0, tmy: 0, velocity: 0 };
    let lastScroll = window.scrollY;
    const readScroll = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      state.target = Math.min(1, Math.max(0, window.scrollY / max));
      state.velocity += (window.scrollY - lastScroll) * 0.002;
      lastScroll = window.scrollY;
    };
    const onPointer = (e) => {
      state.tmx = (e.clientX / window.innerWidth) * 2 - 1;
      state.tmy = (e.clientY / window.innerHeight) * 2 - 1;
    };
    const onResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      renderer.setSize(w, h);
      if (composer) composer.setSize(w, h);
      [dust, bokeh].forEach((pts) => {
        pts.material.uniforms.uPixelRatio.value = renderer.getPixelRatio();
      });
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      readScroll();
    };

    readScroll();
    state.progress = state.target;
    window.addEventListener('scroll', readScroll, { passive: true });
    window.addEventListener('pointermove', onPointer, { passive: true });
    window.addEventListener('resize', onResize);

    // Adaptive quality: if real frames run slow (weak GPUs, big screens),
    // drop the bloom pass first, then render at a lower resolution.
    // Frames over 100ms are ignored: that's the browser throttling a
    // background window, not the scene being heavy.
    const perf = { sum: 0, frames: 0, level: 0 };
    let activeComposer = composer;
    const adaptQuality = (dt) => {
      if (perf.level >= 2 || dt > 0.1) return;
      perf.sum += dt;
      perf.frames += 1;
      if (perf.frames < 90) return;
      const avg = perf.sum / perf.frames;
      perf.sum = 0;
      perf.frames = 0;
      if (avg < 0.024) return; // ~42fps or better: keep current quality
      perf.level += 1;
      if (perf.level === 1 && activeComposer) {
        activeComposer = null;
      } else {
        renderer.setPixelRatio(Math.max(0.75, renderer.getPixelRatio() * 0.7));
        renderer.setSize(window.innerWidth, window.innerHeight);
        [dust, bokeh].forEach((pts) => {
          pts.material.uniforms.uPixelRatio.value = renderer.getPixelRatio();
        });
      }
    };

    const dummy = new THREE.Object3D();
    const barCount = bars.count;
    const clock = new THREE.Clock();
    let raf = 0;
    let running = true;

    const renderFrame = () => {
      const rawDt = clock.getDelta();
      adaptQuality(rawDt);
      const dt = Math.min(rawDt, 0.05);
      const t = clock.elapsedTime;

      state.progress += (state.target - state.progress) * Math.min(1, dt * 3.2);
      state.mx += (state.tmx - state.mx) * Math.min(1, dt * 2.5);
      state.my += (state.tmy - state.my) * Math.min(1, dt * 2.5);
      state.velocity *= 0.9;
      const p = state.progress;
      const energy = Math.min(Math.abs(state.velocity), 1);

      // 112 BPM kick: sharp attack, quick decay
      const beatPhase = (t * BPM) / 60;
      const beat = Math.pow(1 - (beatPhase % 1), 4);

      // Camera flight
      camera.position.z = 14 - p * TRAVEL;
      camera.position.x = state.mx * 1.4 + Math.sin(p * Math.PI * 2) * 1.5;
      camera.position.y = -state.my * 0.9 + Math.cos(p * Math.PI * 3) * 0.8;
      camera.rotation.z = 0;
      camera.lookAt(camera.position.x * 0.4, camera.position.y * 0.4, camera.position.z - 20);
      camera.rotateZ(Math.sin(p * Math.PI * 2) * 0.1 + state.velocity * 0.02);

      redLight.position.set(camera.position.x, camera.position.y + 2, camera.position.z - 6);
      redLight.intensity = 30 + beat * 22;
      rimLight.position.set(-camera.position.x - 6, 4, camera.position.z - 18);

      // Particles
      [dust, bokeh].forEach((pts) => {
        pts.material.uniforms.uTime.value = t;
        pts.material.uniforms.uBeat.value = beat;
      });
      dust.rotation.z = t * 0.012 + p * 1.4;
      bokeh.rotation.z = -t * 0.006 - p * 0.6;

      // Spotlight rig travels with the camera, beams sweep across the stage
      rig.position.set(0, 0, camera.position.z - 26);
      lamps.forEach((lamp, i) => {
        const sweep = Math.sin(t * 0.55 + lamp.userData.seed) * 0.35;
        lamp.rotation.z = lamp.userData.base + sweep;
        lamp.rotation.x = Math.sin(t * 0.4 + i) * 0.18 + 0.15;
        const cone = lamp.children[0];
        cone.material.uniforms.uIntensity.value = 0.11 + beat * (i % 2 ? 0.08 : 0.04) + energy * 0.08;
      });

      // Vinyl + equalizer
      disc.rotation.z -= dt * (1.4 + energy * 6);
      spinner.position.z = camera.position.z - 22;
      spinner.position.x = 10 - Math.sin(p * Math.PI) * 20;
      spinner.position.y = -1.2 + Math.sin(p * Math.PI * 2) * 1.5;
      spinner.rotation.x = -0.5 + p * 1.1;
      spinner.rotation.y = -0.55 + p * 2.2;
      for (let i = 0; i < barCount; i += 1) {
        const a = (i / barCount) * Math.PI * 2;
        const spectrum =
          0.35 +
          0.45 * Math.abs(Math.sin(i * 0.37 + t * 3.1)) * (0.6 + beat) +
          0.25 * Math.abs(Math.sin(i * 0.11 - t * 1.7)) +
          energy * 0.8;
        dummy.position.set(Math.cos(a) * 4.6, Math.sin(a) * 4.6, 0);
        dummy.rotation.set(0, 0, a - Math.PI / 2);
        dummy.scale.set(1, spectrum * 0.85, 1);
        dummy.updateMatrix();
        bars.setMatrixAt(i, dummy.matrix);
      }
      bars.instanceMatrix.needsUpdate = true;

      // Sound rings pulse on the beat and fade with distance
      rings.forEach((ring, i) => {
        const pulse = 1 + beat * 0.06 + Math.sin(t * 2.2 + i) * 0.02 + energy * 0.12;
        ring.scale.setScalar(pulse);
        ring.rotation.z = t * 0.1 * (i % 2 ? 1 : -1);
        const d = Math.abs(ring.position.z - camera.position.z);
        const vis = THREE.MathUtils.clamp(1.15 - d / 60, 0.06, 0.95);
        ring.userData.main.material.opacity = vis;
        ring.userData.echo.material.opacity = vis * (0.25 + beat * 0.5);
        ring.userData.echo.scale.setScalar(1 + beat * 0.08);
      });

      // Guitars slowly turn to show off, bobbing with the beat
      guitars.forEach((gt, i) => {
        gt.mesh.rotation.y = t * 0.35 + i * 2 + p * 3;
        gt.mesh.position.y = gt.y + Math.sin(t * 0.7 + i) * 0.5 + beat * 0.08;
      });

      picks.forEach((pick) => {
        const s = pick.userData.spin;
        pick.rotation.x += s.x * dt;
        pick.rotation.y += s.y * dt;
        pick.rotation.z += s.z * dt;
        pick.position.y = pick.userData.baseY + Math.sin(t * 0.8 + pick.userData.seed) * 0.6;
      });

      if (bloom) bloom.strength = 0.45 + beat * 0.15 + energy * 0.15;

      if (activeComposer) activeComposer.render();
      else renderer.render(scene, camera);
    };

    const loop = () => {
      if (!running) return;
      renderFrame();
      raf = requestAnimationFrame(loop);
    };

    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!reduced && !running) {
        running = true;
        clock.getDelta();
        loop();
      }
    };
    document.addEventListener('visibilitychange', onVisibility);

    let onReducedScroll = null;
    if (reduced) {
      running = false;
      renderFrame();
      onReducedScroll = () => {
        state.progress = state.target;
        renderFrame();
      };
      window.addEventListener('scroll', onReducedScroll, { passive: true });
    } else {
      loop();
    }

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', readScroll);
      window.removeEventListener('pointermove', onPointer);
      window.removeEventListener('resize', onResize);
      if (onReducedScroll) window.removeEventListener('scroll', onReducedScroll);
      document.removeEventListener('visibilitychange', onVisibility);
      scene.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
          mats.forEach((m) => {
            if (m.map) m.map.dispose();
            m.dispose();
          });
        }
      });
      if (composer) composer.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="stage-universe" aria-hidden="true" />;
};

export default StageUniverse;
