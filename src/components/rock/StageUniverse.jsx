import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';
import { stageFocus } from '../../lib/stageFocus';

/**
 * StageUniverse — the StarX concert stage, in 3D, behind the whole site.
 *
 * Every instrument in the band is on the stage at once:
 *   drum kit on a riser · keyboard · rhythm pad · lead guitar · bass guitar ·
 *   two vocal mics · amp stacks · a giant vinyl backdrop with an equalizer ring.
 * A lighting truss with sweeping spotlights hangs above; sound ripples spread
 * across the stage floor; stage dust and guitar picks drift around it.
 *
 * As the page scrolls the camera orbits the stage (closer in the middle of the
 * page, rising and dipping), so the band is always in view from a new angle.
 * Inside the "Meet StarX" tour the camera instead flies from instrument to
 * instrument (pad → drums → piano → lead → bass → both vocal mics), driven by
 * the shared `stageFocus` channel, with a follow spot lighting each one.
 * The whole rig plays along to a 112 BPM beat: kick pumps the bass drum and
 * speakers, cymbals shake, the pad steps through its lights, keys get pressed.
 *
 * Desktop adds a bloom glow; quality steps down automatically on slow GPUs.
 * Rendering pauses when the tab is hidden; reduced-motion gets a still frame.
 */

const RED = new THREE.Color('#E8141C');
const AMBER = new THREE.Color('#FFB547');
const WARM = new THREE.Color('#FFE9D6');
const BG = '#070404';
const BPM = 112;

/* ------------------------------------------------------------------ */
/*  Shared materials                                                  */
/* ------------------------------------------------------------------ */

const makeMaterials = () => ({
  chrome: new THREE.MeshStandardMaterial({ color: '#d9d9d9', metalness: 1, roughness: 0.22 }),
  black: new THREE.MeshStandardMaterial({ color: '#151214', metalness: 0.2, roughness: 0.6 }),
  tolex: new THREE.MeshStandardMaterial({ color: '#0f0c0d', metalness: 0.05, roughness: 0.85 }),
  grille: new THREE.MeshStandardMaterial({ color: '#2a2426', metalness: 0.3, roughness: 0.7 }),
  shellRed: new THREE.MeshStandardMaterial({ color: '#B3131B', metalness: 0.55, roughness: 0.25, emissive: '#2a0204', emissiveIntensity: 0.6 }),
  head: new THREE.MeshStandardMaterial({ color: '#efe9e1', metalness: 0, roughness: 0.65, side: THREE.DoubleSide }),
  gold: new THREE.MeshStandardMaterial({ color: '#cfa54b', metalness: 1, roughness: 0.28 }),
  wood: new THREE.MeshStandardMaterial({ color: '#3a2618', metalness: 0.05, roughness: 0.55 }),
  stage: new THREE.MeshStandardMaterial({ color: '#100c0d', metalness: 0.4, roughness: 0.55 }),
  ledRed: new THREE.MeshBasicMaterial({ color: new THREE.Color('#ff2a2f').multiplyScalar(1.6) }),
  ledAmber: new THREE.MeshBasicMaterial({ color: new THREE.Color('#FFB547').multiplyScalar(1.3) })
});

const cyl = (rt, rb, h, seg, mat) => new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, h, seg), mat);
const box = (w, h, d, mat) => new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);

/* ------------------------------------------------------------------ */
/*  Dust (twinkling points)                                           */
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
    vAlpha = twinkle * smoothstep(90.0, 12.0, depth) * smoothstep(0.5, 3.0, depth);
    vColor = aColor * (1.0 + uBeat * 0.3);
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

const buildPoints = ({ count, minR, maxR, size, softness, palette, brightness }) => {
  const pos = new Float32Array(count * 3);
  const col = new Float32Array(count * 3);
  const phase = new Float32Array(count);
  const sizes = new Float32Array(count);
  const c = new THREE.Color();
  for (let i = 0; i < count; i += 1) {
    const r = minR + Math.pow(Math.random(), 0.8) * (maxR - minR);
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    pos[i * 3 + 1] = r * Math.cos(phi) * 0.55 + 4;
    pos[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
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
  return new THREE.Points(
    geo,
    new THREE.ShaderMaterial({
      vertexShader: dustVertex,
      fragmentShader: dustFragment,
      uniforms: { uTime: { value: 0 }, uBeat: { value: 0 }, uPixelRatio: { value: 1 }, uSoftness: { value: softness } },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    })
  );
};

const dustPalette = (r) => (r < 0.22 ? RED : r < 0.42 ? AMBER : WARM);
const bokehPalette = (r) => (r < 0.55 ? RED : r < 0.8 ? AMBER : WARM);

/* ------------------------------------------------------------------ */
/*  Stage, truss, spotlights                                          */
/* ------------------------------------------------------------------ */

const buildStage = (m) => {
  const g = new THREE.Group();
  const deck = box(22, 0.6, 12, m.stage);
  deck.position.set(0, -1.3, 0);
  g.add(deck);

  // LED edge strips (they glow under bloom)
  const front = box(22.1, 0.06, 0.06, m.ledRed);
  front.position.set(0, -1.0, 6.02);
  const front2 = box(22.1, 0.04, 0.04, m.ledAmber);
  front2.position.set(0, -1.45, 6.02);
  const left = box(0.06, 0.06, 12, m.ledRed);
  left.position.set(-11.02, -1.0, 0);
  const right = left.clone();
  right.position.x = 11.02;
  g.add(front, front2, left, right);

  // drum riser
  const riser = box(6, 0.5, 4, m.stage);
  riser.position.set(0, -0.75, -3.2);
  const riserLed = box(6.05, 0.04, 0.04, m.ledRed);
  riserLed.position.set(0, -0.52, -1.18);
  g.add(riser, riserLed);

  // floor grid
  const pts = [];
  for (let x = -40; x <= 40; x += 2.5) pts.push(x, 0, -40, x, 0, 40);
  for (let z = -40; z <= 40; z += 2.5) pts.push(-40, 0, z, 40, 0, z);
  const gridGeo = new THREE.BufferGeometry();
  gridGeo.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3));
  const grid = new THREE.LineSegments(gridGeo, new THREE.LineBasicMaterial({ color: '#E8141C', transparent: true, opacity: 0.16 }));
  grid.position.y = -1.62;
  g.add(grid);
  return g;
};

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
    float along = pow(vY, 1.5);
    float edge = pow(abs(dot(vNormalV, vViewDir)), 1.4);
    gl_FragColor = vec4(uColor, along * edge * uIntensity);
  }
`;

const buildRig = (m) => {
  const g = new THREE.Group();
  const trussMat = new THREE.MeshStandardMaterial({ color: '#3a3335', metalness: 0.85, roughness: 0.35 });
  const beam = box(27, 0.35, 0.35, trussMat);
  beam.position.set(0, 7.6, 0.5);
  const beam2 = beam.clone();
  beam2.position.y = 8.1;
  g.add(beam, beam2);
  [-13.3, 13.3].forEach((x) => {
    const pillar = box(0.35, 9.4, 0.35, trussMat);
    pillar.position.set(x, 3.1, 0.5);
    g.add(pillar);
  });

  const cone = new THREE.ConeGeometry(2.6, 10, 40, 1, true);
  cone.translate(0, -5, 0);
  const lamps = [];
  [
    { x: -9, color: WARM, aim: 0.42 },
    { x: -3.2, color: RED, aim: 0.15 },
    { x: 3.2, color: AMBER, aim: -0.15 },
    { x: 9, color: RED, aim: -0.42 }
  ].forEach((s, i) => {
    const pivot = new THREE.Group();
    pivot.position.set(s.x, 7.3, 0.6);
    const housing = cyl(0.32, 0.42, 0.7, 16, m.black);
    housing.position.y = -0.1;
    pivot.add(housing);
    const lens = new THREE.Mesh(
      new THREE.CircleGeometry(0.38, 20),
      new THREE.MeshBasicMaterial({ color: s.color.clone().multiplyScalar(2.4) })
    );
    lens.rotation.x = Math.PI / 2;
    lens.position.y = -0.46;
    pivot.add(lens);
    const beamMesh = new THREE.Mesh(
      cone,
      new THREE.ShaderMaterial({
        vertexShader: beamVertex,
        fragmentShader: beamFragment,
        uniforms: { uColor: { value: s.color.clone() }, uIntensity: { value: 0.18 } },
        transparent: true,
        depthWrite: false,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending
      })
    );
    beamMesh.position.y = -0.45;
    pivot.add(beamMesh);
    pivot.userData = { aim: s.aim, seed: i * 1.9, beam: beamMesh };
    lamps.push(pivot);
    g.add(pivot);
  });
  return { rig: g, lamps };
};

/* ------------------------------------------------------------------ */
/*  Instruments                                                       */
/* ------------------------------------------------------------------ */

const buildDrums = (m) => {
  const g = new THREE.Group();
  const anim = { kick: null, toms: [], cymbals: [] };

  const drum = (r, h, x, y, z, tiltX = 0, tiltZ = 0) => {
    const d = new THREE.Group();
    d.add(cyl(r, r, h, 32, m.shellRed));
    const top = new THREE.Mesh(new THREE.CircleGeometry(r * 0.98, 32), m.head);
    top.rotation.x = -Math.PI / 2;
    top.position.y = h / 2 + 0.002;
    d.add(top);
    const rim = new THREE.Mesh(new THREE.TorusGeometry(r, 0.022, 6, 32), m.chrome);
    rim.rotation.x = Math.PI / 2;
    rim.position.y = h / 2;
    d.add(rim);
    d.position.set(x, y, z);
    d.rotation.set(tiltX, 0, tiltZ);
    g.add(d);
    return d;
  };

  const stand = (x, z, h) => {
    const s = cyl(0.025, 0.025, h, 8, m.chrome);
    s.position.set(x, h / 2, z);
    g.add(s);
    [0, 2.1, 4.2].forEach((a) => {
      const leg = cyl(0.018, 0.018, 0.55, 6, m.chrome);
      leg.position.set(x + Math.cos(a) * 0.2, 0.15, z + Math.sin(a) * 0.2);
      leg.rotation.set(Math.sin(a) * 0.9, 0, -Math.cos(a) * 0.9);
      g.add(leg);
    });
  };

  // kick drum lying on its side, facing the audience
  const kick = new THREE.Group();
  kick.add(cyl(0.85, 0.85, 0.65, 40, m.shellRed));
  const front = new THREE.Mesh(new THREE.CircleGeometry(0.83, 40), m.black);
  front.rotation.x = -Math.PI / 2;
  front.position.y = 0.33;
  kick.add(front);
  const logoRing = new THREE.Mesh(new THREE.RingGeometry(0.42, 0.5, 40), m.ledRed);
  logoRing.rotation.x = -Math.PI / 2;
  logoRing.position.y = 0.335;
  kick.add(logoRing);
  [0.33, -0.33].forEach((y) => {
    const hoop = new THREE.Mesh(new THREE.TorusGeometry(0.85, 0.03, 6, 40), m.chrome);
    hoop.rotation.x = Math.PI / 2;
    hoop.position.y = y;
    kick.add(hoop);
  });
  kick.rotation.x = Math.PI / 2;
  kick.position.set(0, 0.85, 0.3);
  g.add(kick);
  anim.kick = kick;

  anim.toms.push(drum(0.32, 0.3, -0.38, 1.85, 0.25, 0.4, 0.12));
  anim.toms.push(drum(0.34, 0.32, 0.4, 1.85, 0.25, 0.4, -0.12));
  anim.toms.push(drum(0.4, 0.24, 1.0, 1.25, 0.75, 0.15, -0.2)); // snare
  stand(1.0, 0.75, 1.1);
  anim.toms.push(drum(0.46, 0.52, -1.15, 0.8, 0.65)); // floor tom
  [0, 2.1, 4.2].forEach((a) => {
    const leg = cyl(0.02, 0.02, 0.6, 6, m.chrome);
    leg.position.set(-1.15 + Math.cos(a) * 0.42, 0.3, 0.65 + Math.sin(a) * 0.42);
    g.add(leg);
  });

  const cymbal = (r, x, y, z, rx, rz) => {
    const c = cyl(r * 0.12, r, 0.04, 40, m.gold);
    c.position.set(x, y, z);
    c.rotation.set(rx, 0, rz);
    c.userData.base = { rx, rz };
    g.add(c);
    anim.cymbals.push(c);
    stand(x, z, y - 0.05);
    return c;
  };
  cymbal(0.55, -1.2, 2.45, -0.25, 0.32, 0.22); // crash
  cymbal(0.62, 1.45, 2.2, -0.2, 0.28, -0.25); // ride
  // hi-hat pair
  const hhTop = cymbal(0.36, 1.65, 1.62, 0.55, 0, 0);
  const hhBottom = cyl(0.36 * 0.12, 0.36, 0.04, 40, m.gold);
  hhBottom.position.set(1.65, 1.55, 0.55);
  hhBottom.rotation.x = Math.PI;
  g.add(hhBottom);
  anim.hiHat = hhTop;

  // throne
  const seat = cyl(0.32, 0.32, 0.12, 24, m.black);
  seat.position.set(0, 0.95, -1.1);
  g.add(seat);
  stand(0, -1.1, 0.9);

  return { group: g, anim };
};

const buildKeyboard = (m) => {
  const g = new THREE.Group();
  const body = box(5.2, 0.28, 1.25, m.black);
  body.position.y = 1.55;
  g.add(body);
  const panel = box(5.2, 0.1, 0.35, m.grille);
  panel.position.set(0, 1.74, -0.42);
  g.add(panel);
  const led = box(1.2, 0.03, 0.06, m.ledRed);
  led.position.set(-1.6, 1.8, -0.42);
  g.add(led);

  const whiteCount = 29;
  const keyW = 4.9 / whiteCount;
  const whiteGeo = new THREE.BoxGeometry(keyW * 0.92, 0.1, 0.75);
  const whites = new THREE.InstancedMesh(whiteGeo, new THREE.MeshStandardMaterial({ color: '#f4efe8', roughness: 0.35 }), whiteCount);
  const blackGeo = new THREE.BoxGeometry(keyW * 0.55, 0.12, 0.45);
  const blackIdx = [];
  for (let i = 0; i < whiteCount - 1; i += 1) if ([0, 1, 3, 4, 5].includes(i % 7)) blackIdx.push(i);
  const blacks = new THREE.InstancedMesh(blackGeo, new THREE.MeshStandardMaterial({ color: '#0b0a0b', roughness: 0.4 }), blackIdx.length);

  const dummy = new THREE.Object3D();
  const whiteBase = [];
  for (let i = 0; i < whiteCount; i += 1) {
    dummy.position.set(-2.45 + keyW * (i + 0.5), 1.73, 0.18);
    dummy.updateMatrix();
    whites.setMatrixAt(i, dummy.matrix);
    whiteBase.push(dummy.position.clone());
  }
  blackIdx.forEach((wi, j) => {
    dummy.position.set(-2.45 + keyW * (wi + 1), 1.8, 0.02);
    dummy.updateMatrix();
    blacks.setMatrixAt(j, dummy.matrix);
  });
  g.add(whites, blacks);

  // X stand
  [-1.6, 1.6].forEach((x) => {
    const a = box(0.08, 1.9, 0.08, m.chrome);
    a.position.set(x, 0.72, 0);
    a.rotation.x = 0.5;
    const b = a.clone();
    b.rotation.x = -0.5;
    g.add(a, b);
  });
  return { group: g, whites, whiteBase, keyCount: whiteCount };
};

const buildPad = (m) => {
  const g = new THREE.Group();
  const body = box(1.7, 0.22, 1.3, m.black);
  body.position.y = 1.45;
  g.add(body);
  const pads = [];
  for (let r = 0; r < 3; r += 1) {
    for (let c = 0; c < 3; c += 1) {
      const mat = new THREE.MeshStandardMaterial({ color: '#2a1416', emissive: '#E8141C', emissiveIntensity: 0.1, roughness: 0.5 });
      const p = box(0.44, 0.06, 0.34, mat);
      p.position.set(-0.52 + c * 0.52, 1.59, -0.38 + r * 0.4);
      g.add(p);
      pads.push(p);
    }
  }
  const pole = cyl(0.04, 0.04, 1.35, 10, m.chrome);
  pole.position.y = 0.68;
  g.add(pole);
  [0, 2.1, 4.2].forEach((a) => {
    const leg = cyl(0.025, 0.025, 0.8, 6, m.chrome);
    leg.position.set(Math.cos(a) * 0.3, 0.2, Math.sin(a) * 0.3);
    leg.rotation.set(Math.sin(a) * 1.0, 0, -Math.cos(a) * 1.0);
    g.add(leg);
  });
  return { group: g, pads };
};

const guitarShape = () => {
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
  return s;
};

const buildGuitar = (m, { color, strings = 6, neckLength = 6.4, guard = '#f2ece4' }) => {
  const g = new THREE.Group();
  const s = guitarShape();
  const bodyGeo = new THREE.ExtrudeGeometry(s, { depth: 0.45, bevelEnabled: true, bevelSize: 0.08, bevelThickness: 0.08, bevelSegments: 3 });
  bodyGeo.translate(0, 0, -0.22);
  g.add(new THREE.Mesh(bodyGeo, new THREE.MeshStandardMaterial({ color, metalness: 0.5, roughness: 0.22 })));

  const pg = new THREE.Mesh(new THREE.ShapeGeometry(s, 20), new THREE.MeshStandardMaterial({ color: guard, roughness: 0.5, side: THREE.DoubleSide }));
  pg.scale.set(0.62, 0.62, 1);
  pg.position.set(-0.25, -0.2, 0.32);
  g.add(pg);

  const neck = box(strings === 4 ? 0.7 : 0.62, neckLength, 0.28, m.wood);
  neck.position.set(0, 1.4 + neckLength / 2, 0.12);
  g.add(neck);
  const headY = 1.4 + neckLength + 0.75;
  const head = box(0.95, 1.6, 0.22, m.wood);
  head.position.set(0.12, headY, 0.1);
  head.rotation.z = -0.12;
  g.add(head);
  for (let i = 0; i < strings; i += 1) {
    const peg = cyl(0.07, 0.07, 0.25, 10, m.chrome);
    peg.rotation.z = Math.PI / 2;
    peg.position.set(0.65, headY - 0.55 + i * (1.1 / strings), 0.12);
    g.add(peg);
  }
  for (let i = 0; i < 14; i += 1) {
    const fret = box(0.64, 0.035, 0.05, m.chrome);
    fret.position.set(0, 1.4 + neckLength - 0.4 - i * (neckLength / 16), 0.28);
    g.add(fret);
  }
  [-1.7, -0.6, 0.4].slice(0, strings === 4 ? 2 : 3).forEach((y) => {
    const pu = box(0.75, 0.22, 0.08, m.black);
    pu.position.set(0, y, 0.36);
    g.add(pu);
  });
  const bridge = box(0.85, 0.3, 0.1, m.chrome);
  bridge.position.set(0, -2.4, 0.36);
  g.add(bridge);
  [[1.1, -1.9], [1.35, -2.5], [0.9, -2.8]].forEach(([x, y]) => {
    const k = cyl(0.16, 0.16, 0.14, 16, m.chrome);
    k.rotation.x = Math.PI / 2;
    k.position.set(x, y, 0.36);
    g.add(k);
  });
  const lines = [];
  for (let i = 0; i < strings; i += 1) {
    const x = -0.2 + i * (0.4 / (strings - 1));
    lines.push(x, -2.4, 0.42, x * 0.7, 1.4 + neckLength, 0.3);
  }
  const sGeo = new THREE.BufferGeometry();
  sGeo.setAttribute('position', new THREE.Float32BufferAttribute(lines, 3));
  g.add(new THREE.LineSegments(sGeo, new THREE.LineBasicMaterial({ color: '#fff3e0', transparent: true, opacity: 0.9 })));
  g.scale.setScalar(0.32);
  return g;
};

const buildMic = (m) => {
  const g = new THREE.Group();
  const pole = cyl(0.025, 0.025, 1.75, 10, m.chrome);
  pole.position.y = 0.88;
  g.add(pole);
  const base = cyl(0.32, 0.36, 0.05, 28, m.black);
  base.position.y = 0.03;
  g.add(base);
  const head = new THREE.Group();
  const handle = cyl(0.05, 0.035, 0.38, 14, m.black);
  head.add(handle);
  const ball = new THREE.Mesh(new THREE.SphereGeometry(0.1, 18, 14), m.chrome);
  ball.position.y = 0.26;
  head.add(ball);
  const grill = new THREE.Mesh(new THREE.SphereGeometry(0.104, 12, 8), new THREE.MeshBasicMaterial({ color: '#555', wireframe: true }));
  grill.position.y = 0.26;
  head.add(grill);
  head.position.set(0, 1.85, 0.08);
  head.rotation.x = 0.55;
  g.add(head);
  return { group: g, head };
};

const buildAmp = (m) => {
  const g = new THREE.Group();
  const cab = box(1.9, 1.9, 0.95, m.tolex);
  cab.position.y = 0.95;
  g.add(cab);
  const front = box(1.75, 1.75, 0.02, m.grille);
  front.position.set(0, 0.95, 0.48);
  g.add(front);
  const cones = [];
  [[-0.43, 0.52], [0.43, 0.52], [-0.43, 1.38], [0.43, 1.38]].forEach(([x, y]) => {
    const cone = new THREE.Group();
    cone.add(new THREE.Mesh(new THREE.CircleGeometry(0.36, 28), m.black));
    const ring = new THREE.Mesh(new THREE.RingGeometry(0.36, 0.41, 28), m.chrome);
    ring.position.z = 0.002;
    cone.add(ring);
    const cap = new THREE.Mesh(new THREE.CircleGeometry(0.1, 16), m.grille);
    cap.position.z = 0.004;
    cone.add(cap);
    cone.position.set(x, y, 0.5);
    g.add(cone);
    cones.push(cone);
  });
  const headBox = box(1.9, 0.55, 0.85, m.tolex);
  headBox.position.y = 2.18;
  g.add(headBox);
  const panelStrip = box(1.7, 0.22, 0.02, m.gold);
  panelStrip.position.set(0, 2.18, 0.43);
  g.add(panelStrip);
  for (let i = 0; i < 6; i += 1) {
    const k = cyl(0.045, 0.045, 0.06, 10, m.black);
    k.rotation.x = Math.PI / 2;
    k.position.set(-0.6 + i * 0.24, 2.18, 0.46);
    g.add(k);
  }
  const logo = box(0.5, 0.06, 0.02, m.ledRed);
  logo.position.set(0, 2.38, 0.43);
  g.add(logo);
  return { group: g, cones };
};

const buildVinyl = (barCount) => {
  const spinner = new THREE.Group();
  const disc = new THREE.Group();
  disc.add(
    new THREE.Mesh(
      new THREE.CircleGeometry(4.2, 96),
      new THREE.MeshStandardMaterial({ color: '#161012', metalness: 0.75, roughness: 0.3, side: THREE.DoubleSide })
    )
  );
  // all grooves in one draw call
  const grooves = [];
  for (let r = 1.55; r < 4.1; r += 0.09) {
    for (let a = 0; a < 72; a += 1) {
      const t0 = (a / 72) * Math.PI * 2;
      const t1 = ((a + 1) / 72) * Math.PI * 2;
      grooves.push(Math.cos(t0) * r, Math.sin(t0) * r, 0.002, Math.cos(t1) * r, Math.sin(t1) * r, 0.002);
    }
  }
  const gGeo = new THREE.BufferGeometry();
  gGeo.setAttribute('position', new THREE.Float32BufferAttribute(grooves, 3));
  disc.add(new THREE.LineSegments(gGeo, new THREE.LineBasicMaterial({ color: '#5a4b4e', transparent: true, opacity: 0.6 })));

  const label = new THREE.Mesh(
    new THREE.CircleGeometry(1.35, 64),
    new THREE.MeshStandardMaterial({ color: '#E8141C', emissive: '#7a0a0e', emissiveIntensity: 0.8, roughness: 0.6, side: THREE.DoubleSide })
  );
  label.position.z = 0.006;
  disc.add(label);
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

  const sheen = new THREE.Mesh(
    new THREE.RingGeometry(1.5, 4.15, 64, 1, 0, Math.PI / 4),
    new THREE.MeshBasicMaterial({ color: '#ffffff', transparent: true, opacity: 0.08, side: THREE.DoubleSide, depthWrite: false })
  );
  sheen.position.z = 0.004;
  spinner.add(sheen);

  const barGeo = new THREE.BoxGeometry(0.16, 1, 0.16);
  barGeo.translate(0, 0.5, 0);
  const bars = new THREE.InstancedMesh(barGeo, new THREE.MeshBasicMaterial({ color: '#ffffff' }), barCount);
  const ct = new THREE.Color();
  for (let i = 0; i < barCount; i += 1) {
    ct.copy(RED).lerp(AMBER, ((Math.sin((i / barCount) * Math.PI * 4) + 1) / 2) * 0.6).multiplyScalar(0.9);
    bars.setColorAt(i, ct);
  }
  bars.instanceColor.needsUpdate = true;
  spinner.add(bars);
  return { spinner, disc, bars };
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
  return Array.from({ length: count }).map((_, i) => {
    const mesh = new THREE.Mesh(geo, i % 3 === 0 ? pearlMat : redMat);
    mesh.scale.setScalar(0.3 + Math.random() * 0.3);
    mesh.userData = {
      radius: 12 + Math.random() * 6,
      angle: Math.random() * Math.PI * 2,
      speed: (0.04 + Math.random() * 0.06) * (i % 2 ? 1 : -1),
      height: -0.5 + Math.random() * 8,
      seed: Math.random() * 10,
      spin: new THREE.Vector3((Math.random() - 0.5) * 0.9, (Math.random() - 0.5) * 0.9, (Math.random() - 0.5) * 0.5)
    };
    return mesh;
  });
};

/* ------------------------------------------------------------------ */

// Tell the intro the stage has painted, so it never reveals an empty background
const announceReady = () => {
  if (window.__starxStageReady) return;
  window.__starxStageReady = true;
  window.dispatchEvent(new Event('starx:stage-ready'));
};

export const StageUniverse = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return undefined;

    const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isSmall = window.innerWidth < 768;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: !isSmall, alpha: false, powerPreference: 'high-performance' });
    } catch (e) {
      announceReady();
      return undefined; // no WebGL: the CSS gradient behind stays visible
    }
    const basePixelRatio = Math.min(window.devicePixelRatio || 1, isSmall ? 1.25 : 1.5);
    renderer.setPixelRatio(basePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(BG, 1);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.95;
    renderer.domElement.style.opacity = '0';
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(BG, 0.022);

    // soft studio reflections so chrome, cymbals and gloss paint read in the dark
    const pmrem = new THREE.PMREMGenerator(renderer);
    const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = envTex;
    scene.environmentIntensity = 0.35;

    const camera = new THREE.PerspectiveCamera(isSmall ? 62 : 50, window.innerWidth / window.innerHeight, 0.1, 140);
    const lookTarget = new THREE.Vector3(0, 1.2, 0);

    // Lights
    scene.add(new THREE.HemisphereLight('#ffe2c4', '#3a0508', 0.55));
    const key = new THREE.SpotLight('#ffd9b3', 260, 60, 0.7, 0.5, 1.6);
    key.position.set(0, 14, 16);
    key.target.position.set(0, 0, 0);
    scene.add(key, key.target);
    const backRed = new THREE.PointLight('#E8141C', 70, 30, 1.6);
    backRed.position.set(0, 4, -7);
    scene.add(backRed);
    const sideAmber = new THREE.PointLight('#FFB547', 35, 26, 1.7);
    sideAmber.position.set(-10, 3, 4);
    scene.add(sideAmber);
    const sideRed = new THREE.PointLight('#ff2a2f', 35, 26, 1.7);
    sideRed.position.set(10, 3, 4);
    scene.add(sideRed);

    const m = makeMaterials();

    // Stage + rig
    scene.add(buildStage(m));
    const { rig, lamps } = buildRig(m);
    scene.add(rig);

    // Instruments
    const drums = buildDrums(m);
    drums.group.position.set(0, -0.5, -3.3);
    scene.add(drums.group);

    const keys = buildKeyboard(m);
    keys.group.position.set(-6, -1, -1.2);
    // turned round so the player stands behind it, facing the audience
    keys.group.rotation.y = Math.PI + 0.45;
    scene.add(keys.group);

    const pad = buildPad(m);
    pad.group.position.set(6, -1, -1.2);
    pad.group.rotation.y = -0.45;
    scene.add(pad.group);

    const lead = buildGuitar(m, { color: new THREE.Color('#B3131B') });
    lead.position.set(-3.6, 1.6, 2.4);
    scene.add(lead);
    const bass = buildGuitar(m, { color: new THREE.Color('#121012'), strings: 4, neckLength: 7.6, guard: '#c9c2b8' });
    bass.position.set(3.6, 1.5, 2.4);
    scene.add(bass);

    const micL = buildMic(m);
    micL.group.position.set(-1.6, -1, 3.8);
    const micR = buildMic(m);
    micR.group.position.set(1.6, -1, 3.8);
    micL.group.scale.setScalar(1.2);
    micR.group.scale.setScalar(1.2);
    scene.add(micL.group, micR.group);

    const ampL = buildAmp(m);
    ampL.group.position.set(-9.2, -1, -3.6);
    ampL.group.rotation.y = 0.35;
    const ampR = buildAmp(m);
    ampR.group.position.set(9.2, -1, -3.6);
    ampR.group.rotation.y = -0.35;
    scene.add(ampL.group, ampR.group);

    const vinyl = buildVinyl(isSmall ? 40 : 64);
    vinyl.spinner.position.set(0, 5.2, -8.5);
    vinyl.spinner.scale.setScalar(0.95);
    scene.add(vinyl.spinner);

    // Tour camera shots, one per instrument (order = TOUR_ORDER).
    // `obj` shots are in that instrument's local space; the rest are world space.
    scene.updateMatrixWorld(true);
    const shotDefs = [
      { obj: pad.group, target: [0, 1.2, 0], cam: [2.9, 3.2, 3.6] },
      { obj: drums.group, target: [0, 1.3, 0.1], cam: [0, 4.2, 5.2] },
      { obj: keys.group, target: [0, 1.4, 0], cam: [-2.6, 4.3, 5.4] },
      { target: [-3.6, 2.5, 2.4], cam: [-2.4, 3.1, 8.2] },
      { target: [3.6, 2.7, 2.4], cam: [2.4, 3.3, 8.6] },
      { target: [-1.6, 0.7, 3.8], cam: [-0.9, 1.3, 6.9] },
      { target: [1.6, 0.7, 3.8], cam: [0.9, 1.3, 6.9] }
    ];
    const shots = shotDefs.map((d) => {
      const target = new THREE.Vector3(...d.target);
      const cam = new THREE.Vector3(...d.cam);
      if (d.obj) {
        d.obj.localToWorld(target);
        d.obj.localToWorld(cam);
      }
      return { target, cam };
    });
    const lastShot = shots.length - 1;

    // Follow spot that lands on whichever instrument the tour is on
    const followSpot = new THREE.SpotLight('#fff1e0', 0, 30, 0.32, 0.6, 1.2);
    followSpot.position.set(0, 12, 6);
    scene.add(followSpot, followSpot.target);

    // Sound ripples across the stage floor
    const ripples = Array.from({ length: 4 }).map((_, i) => {
      const r = new THREE.Mesh(
        new THREE.TorusGeometry(1, 0.03, 6, 120),
        new THREE.MeshBasicMaterial({ color: i % 2 ? '#FFB547' : '#E8141C', transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false })
      );
      r.rotation.x = Math.PI / 2;
      r.position.set(0, -0.97, 0.5);
      scene.add(r);
      return r;
    });

    // Atmosphere
    const dust = buildPoints({ count: isSmall ? 1800 : 3800, minR: 7, maxR: 48, size: 0.5, softness: 0.15, palette: dustPalette, brightness: 0.85 });
    const bokeh = buildPoints({ count: isSmall ? 50 : 90, minR: 14, maxR: 40, size: 4.5, softness: 0, palette: bokehPalette, brightness: 0.28 });
    [dust, bokeh].forEach((p) => {
      p.material.uniforms.uPixelRatio.value = basePixelRatio;
      scene.add(p);
    });

    const picks = buildPicks(isSmall ? 8 : 14);
    picks.forEach((p) => scene.add(p));

    // Bloom (desktop)
    let composer = null;
    let bloom = null;
    if (!isSmall) {
      composer = new EffectComposer(renderer);
      composer.setPixelRatio(basePixelRatio);
      composer.setSize(window.innerWidth, window.innerHeight);
      composer.addPass(new RenderPass(scene, camera));
      bloom = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 0.5, 0.45, 0.55);
      composer.addPass(bloom);
      composer.addPass(new OutputPass());
    }
    let activeComposer = composer;

    // Scroll + pointer
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
    const syncPixelRatio = () => {
      [dust, bokeh].forEach((pts) => {
        pts.material.uniforms.uPixelRatio.value = renderer.getPixelRatio();
      });
    };
    // Phones fire resize every time the address bar slides in/out. Re-allocating
    // the canvas then clears it (a black flash) and stutters, so height-only
    // changes on touch screens are left to CSS stretching.
    const coarse = window.matchMedia && window.matchMedia('(pointer: coarse)').matches;
    let lastW = window.innerWidth;
    let lastH = window.innerHeight;
    const onResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      readScroll();
      if (coarse && w === lastW && Math.abs(h - lastH) < lastH * 0.3) return;
      lastW = w;
      lastH = h;
      renderer.setSize(w, h);
      if (composer) composer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      syncPixelRatio();
      // repaint straight away so the resized (cleared) canvas is never shown
      if (shown) renderFrame();
    };
    readScroll();
    state.progress = state.target;
    window.addEventListener('scroll', readScroll, { passive: true });
    window.addEventListener('pointermove', onPointer, { passive: true });
    window.addEventListener('resize', onResize);

    // Adaptive quality (ignores throttled background frames > 100ms)
    const perf = { sum: 0, frames: 0, level: 0 };
    const adaptQuality = (dt) => {
      if (perf.level >= 2 || dt > 0.1) return;
      perf.sum += dt;
      perf.frames += 1;
      if (perf.frames < 90) return;
      const avg = perf.sum / perf.frames;
      perf.sum = 0;
      perf.frames = 0;
      if (avg < 0.024) return;
      perf.level += 1;
      if (perf.level === 1 && activeComposer) {
        activeComposer = null;
      } else {
        renderer.setPixelRatio(Math.max(0.75, renderer.getPixelRatio() * 0.7));
        renderer.setSize(window.innerWidth, window.innerHeight);
        syncPixelRatio();
      }
    };

    const dummy = new THREE.Object3D();
    const focus = { weight: stageFocus.weight, pos: stageFocus.pos };
    const tourCam = new THREE.Vector3();
    const tourTarget = new THREE.Vector3();
    const tmpVec = new THREE.Vector3();
    const tmpVec2 = new THREE.Vector3();
    const clock = new THREE.Clock();
    let raf = 0;
    let running = true;
    let shown = false;
    let lastStep = -1;

    const renderFrame = () => {
      const rawDt = clock.getDelta();
      adaptQuality(rawDt);
      const dt = Math.min(rawDt, 0.05);
      const t = clock.elapsedTime;

      state.progress += (state.target - state.progress) * Math.min(1, dt * 3);
      state.mx += (state.tmx - state.mx) * Math.min(1, dt * 2.2);
      state.my += (state.tmy - state.my) * Math.min(1, dt * 2.2);
      state.velocity *= 0.9;
      const p = state.progress;
      const energy = Math.min(Math.abs(state.velocity), 1);

      const beats = (t * BPM) / 60;
      const beat = Math.pow(1 - (beats % 1), 4);
      const offBeat = Math.pow(1 - ((beats + 0.5) % 1), 6);
      const step = Math.floor(beats * 2) % 9;

      // Camera orbits the stage with the page: wide and centred at the top,
      // swinging round and in closer as you scroll, coming back to the front at the end
      const angle = Math.sin(p * Math.PI * 2) * 1.05 + p * Math.PI * 0.35 + state.mx * 0.12;
      const radius = (isSmall ? 21 : 18) - Math.sin(p * Math.PI) * 5.5;
      const height = 3.4 + Math.sin(p * Math.PI * 2 + 0.4) * 1.8 - state.my * 0.6;
      camera.position.set(Math.sin(angle) * radius, height, Math.cos(angle) * radius);
      lookTarget.set(Math.sin(angle) * -1.2, 1.4 + Math.sin(p * Math.PI) * 0.6, 0);

      // Stage tour: fly between instrument shots and blend over the orbit
      if (reduced) {
        focus.weight = stageFocus.weight;
        focus.pos = stageFocus.pos;
      } else {
        focus.weight += (stageFocus.weight - focus.weight) * Math.min(1, dt * 3.2);
        focus.pos += (stageFocus.pos - focus.pos) * Math.min(1, dt * 3.6);
      }
      const fw = focus.weight * focus.weight * (3 - 2 * focus.weight);
      if (fw > 0.001) {
        const fp = Math.min(lastShot, Math.max(0, focus.pos));
        const i0 = Math.floor(fp);
        const i1 = Math.min(lastShot, i0 + 1);
        const f = fp - i0;
        const fe = f * f * (3 - 2 * f);
        const a = shots[i0];
        const b = shots[i1];
        tourCam.lerpVectors(a.cam, b.cam, fe);
        tourTarget.lerpVectors(a.target, b.target, fe);
        // swoop up and out between shots instead of cutting through the kit
        const arc = Math.sin(f * Math.PI);
        tmpVec.set(tourCam.x, 0, tourCam.z).normalize().multiplyScalar(arc * 2.6);
        tourCam.add(tmpVec);
        tourCam.y += arc * 1.4;
        // phones: pull back a little (narrow view); a touch of pointer parallax
        if (isSmall) tourCam.sub(tourTarget).multiplyScalar(1.3).add(tourTarget);
        tourCam.x += state.mx * 0.35;
        tourCam.y -= state.my * 0.2;
        // keep the instrument clear of the text: right of centre on desktop, high on phones
        tmpVec.subVectors(tourTarget, tourCam);
        const dist = tmpVec.length();
        tmpVec.normalize();
        if (isSmall) {
          tmpVec2.set(0, 1, 0);
          tourCam.addScaledVector(tmpVec2, -dist * 0.2);
          tourTarget.addScaledVector(tmpVec2, -dist * 0.2);
        } else {
          tmpVec2.crossVectors(tmpVec, camera.up).normalize();
          tourCam.addScaledVector(tmpVec2, -dist * 0.24);
          tourTarget.addScaledVector(tmpVec2, -dist * 0.24);
        }
        camera.position.lerp(tourCam, fw);
        lookTarget.lerp(tourTarget, fw);

        const spotOn = shots[Math.round(fp)].target;
        followSpot.target.position.lerp(spotOn, Math.min(1, dt * 4));
        followSpot.position.set(followSpot.target.position.x * 0.6, 11, followSpot.target.position.z + 5);
        followSpot.intensity = fw * 75;
      } else {
        followSpot.intensity = 0;
      }
      camera.lookAt(lookTarget);

      // Lights pulse with the kick
      backRed.intensity = 55 + beat * 50;
      sideAmber.intensity = 28 + offBeat * 20;
      sideRed.intensity = 28 + beat * 20;

      // Spotlights sweep the stage
      lamps.forEach((lamp, i) => {
        lamp.rotation.z = lamp.userData.aim + Math.sin(t * 0.6 + lamp.userData.seed) * 0.28;
        lamp.rotation.x = Math.sin(t * 0.45 + i) * 0.22 + 0.12;
        lamp.userData.beam.material.uniforms.uIntensity.value = 0.13 + (i % 2 ? beat : offBeat) * 0.08 + energy * 0.08;
      });

      // Drums: kick pumps, toms bounce, cymbals shimmer
      drums.anim.kick.scale.set(1 + beat * 0.05, 1, 1 + beat * 0.05);
      drums.anim.toms.forEach((d, i) => {
        d.position.y += ((i % 2 ? offBeat : beat) * 0.025 - (d.userData.bob || 0));
        d.userData.bob = (i % 2 ? offBeat : beat) * 0.025;
      });
      drums.anim.cymbals.forEach((c, i) => {
        const hit = i === 2 ? offBeat : beat;
        c.rotation.x = c.userData.base.rx + Math.sin(t * 22 + i) * hit * 0.12;
        c.rotation.z = c.userData.base.rz + Math.cos(t * 19 + i) * hit * 0.08;
      });

      // Keyboard: a few keys pressed at a time
      for (let i = 0; i < keys.keyCount; i += 1) {
        const b = keys.whiteBase[i];
        const press = Math.max(0, Math.sin(t * 3.1 + i * 1.7) * Math.sin(t * 1.3 + i * 0.6)) > 0.55 ? 0.05 : 0;
        dummy.position.set(b.x, b.y - press, b.z);
        dummy.rotation.set(press ? 0.06 : 0, 0, 0);
        dummy.updateMatrix();
        keys.whites.setMatrixAt(i, dummy.matrix);
      }
      keys.whites.instanceMatrix.needsUpdate = true;

      // Rhythm pad steps through its lights
      if (step !== lastStep) {
        lastStep = step;
        pad.pads.forEach((pd, i) => {
          pd.userData.glow = i === step || (step + 4) % 9 === i ? 1 : pd.userData.glow || 0;
        });
      }
      pad.pads.forEach((pd) => {
        pd.userData.glow = Math.max(0, (pd.userData.glow || 0) - dt * 2.5);
        pd.material.emissiveIntensity = 0.12 + pd.userData.glow * 2.2;
      });

      // Speakers pump
      [ampL, ampR].forEach((amp) => {
        amp.cones.forEach((cone) => {
          cone.position.z = 0.5 + beat * 0.05;
          cone.scale.setScalar(1 + beat * 0.03);
        });
      });

      // Guitars float and turn (and face the camera when the tour is on them), mics sway
      const onLead = fw * Math.max(0, 1 - Math.abs(focus.pos - 3));
      const onBass = fw * Math.max(0, 1 - Math.abs(focus.pos - 4));
      lead.rotation.set(0.05, (Math.sin(t * 0.5) * 0.6 + 0.3) * (1 - onLead) + Math.sin(t * 0.6) * 0.12 * onLead, 0.22 + Math.sin(t * 0.9) * 0.04);
      lead.position.y = 1.6 + Math.sin(t * 0.8) * 0.18;
      bass.rotation.set(0.05, (Math.sin(t * 0.45 + 2) * 0.6 - 0.3) * (1 - onBass) + Math.sin(t * 0.55) * 0.12 * onBass, -0.22 + Math.sin(t * 0.8 + 1) * 0.04);
      bass.position.y = 1.5 + Math.sin(t * 0.75 + 1.3) * 0.18;
      micL.head.rotation.z = Math.sin(t * 0.9) * 0.06;
      micR.head.rotation.z = Math.sin(t * 0.9 + 1) * 0.06;

      // Vinyl backdrop spins, its equalizer plays
      vinyl.disc.rotation.z -= dt * (1.2 + energy * 5);
      const bc = vinyl.bars.count;
      for (let i = 0; i < bc; i += 1) {
        const a = (i / bc) * Math.PI * 2;
        const spectrum =
          0.3 +
          0.45 * Math.abs(Math.sin(i * 0.37 + t * 3.1)) * (0.6 + beat) +
          0.22 * Math.abs(Math.sin(i * 0.11 - t * 1.7)) +
          energy * 0.7;
        dummy.position.set(Math.cos(a) * 4.6, Math.sin(a) * 4.6, 0);
        dummy.rotation.set(0, 0, a - Math.PI / 2);
        dummy.scale.set(1, spectrum * 0.9, 1);
        dummy.updateMatrix();
        vinyl.bars.setMatrixAt(i, dummy.matrix);
      }
      vinyl.bars.instanceMatrix.needsUpdate = true;

      // Floor ripples: a new one every two beats
      ripples.forEach((r, i) => {
        const ph = ((beats / 2 + i / ripples.length) % 1 + 1) % 1;
        r.scale.setScalar(1.5 + ph * 11);
        r.material.opacity = (1 - ph) * 0.55;
      });

      // Atmosphere
      [dust, bokeh].forEach((pts) => {
        pts.material.uniforms.uTime.value = t;
        pts.material.uniforms.uBeat.value = beat;
      });
      dust.rotation.y = t * 0.01 + p * 0.8;
      bokeh.rotation.y = -t * 0.006;
      picks.forEach((pk) => {
        const u = pk.userData;
        u.angle += u.speed * dt;
        pk.position.set(Math.cos(u.angle) * u.radius, u.height + Math.sin(t * 0.7 + u.seed) * 0.5, Math.sin(u.angle) * u.radius);
        pk.rotation.x += u.spin.x * dt;
        pk.rotation.y += u.spin.y * dt;
        pk.rotation.z += u.spin.z * dt;
      });

      if (bloom) bloom.strength = 0.45 + beat * 0.12 + energy * 0.12;

      if (activeComposer) activeComposer.render();
      else renderer.render(scene, camera);

      // Reveal the canvas only once a real frame exists: no black flash
      if (!shown) {
        shown = true;
        renderer.domElement.style.transition = 'opacity 0.7s ease';
        requestAnimationFrame(() => {
          renderer.domElement.style.opacity = '1';
          announceReady();
        });
      }
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

    // GPU reset (common on phones when switching apps): fade to the CSS
    // gradient instead of showing a black canvas, and come back when restored
    const canvasEl = renderer.domElement;
    const onContextLost = (e) => {
      e.preventDefault();
      running = false;
      cancelAnimationFrame(raf);
      canvasEl.style.opacity = '0';
    };
    const onContextRestored = () => {
      canvasEl.style.opacity = '1';
      if (!reduced && !document.hidden) {
        running = true;
        clock.getDelta();
        loop();
      } else {
        renderFrame();
      }
    };
    canvasEl.addEventListener('webglcontextlost', onContextLost);
    canvasEl.addEventListener('webglcontextrestored', onContextRestored);

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
      canvasEl.removeEventListener('webglcontextlost', onContextLost);
      canvasEl.removeEventListener('webglcontextrestored', onContextRestored);
      scene.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
          mats.forEach((mat) => mat.dispose());
        }
      });
      envTex.dispose();
      pmrem.dispose();
      if (composer) composer.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="stage-universe" aria-hidden="true" />;
};

export default StageUniverse;
