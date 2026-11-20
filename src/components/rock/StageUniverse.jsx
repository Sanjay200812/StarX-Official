import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * StageUniverse — fixed 3D backdrop for the whole site.
 *
 * A long tunnel of stage dust (warm white / amber / red sparks) that the camera
 * flies through as the page scrolls, with:
 *   - a spinning vinyl record that drifts across the stage,
 *   - glowing sound-wave rings the camera passes through,
 *   - red and white guitar picks tumbling in the dark.
 * Mouse movement adds a gentle parallax. Rendering pauses when the tab is
 * hidden and becomes a single still frame for reduced-motion visitors.
 */

const RED = new THREE.Color('#E8141C');
const AMBER = new THREE.Color('#FFB547');
const WARM = new THREE.Color('#FFE9D6');
const TUNNEL_START = 24;
const TUNNEL_END = -170;

const makeDustTexture = () => {
  const size = 64;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, 'rgba(255,255,255,1)');
  g.addColorStop(0.25, 'rgba(255,255,255,0.75)');
  g.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
};

const buildDust = (count) => {
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const c = new THREE.Color();
  for (let i = 0; i < count; i += 1) {
    const z = THREE.MathUtils.lerp(TUNNEL_START, TUNNEL_END, Math.random());
    const radius = 2.5 + Math.pow(Math.random(), 0.7) * 30;
    const angle = Math.random() * Math.PI * 2 + z * 0.04; // slight spiral
    positions[i * 3] = Math.cos(angle) * radius;
    positions[i * 3 + 1] = Math.sin(angle) * radius * 0.7;
    positions[i * 3 + 2] = z;

    const r = Math.random();
    if (r < 0.22) c.copy(RED);
    else if (r < 0.42) c.copy(AMBER);
    else c.copy(WARM);
    c.multiplyScalar(0.55 + Math.random() * 0.6);
    colors[i * 3] = c.r;
    colors[i * 3 + 1] = c.g;
    colors[i * 3 + 2] = c.b;
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  const mat = new THREE.PointsMaterial({
    size: 0.22,
    map: makeDustTexture(),
    vertexColors: true,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    sizeAttenuation: true
  });
  return new THREE.Points(geo, mat);
};

const buildVinyl = () => {
  const group = new THREE.Group();

  const disc = new THREE.Mesh(
    new THREE.CircleGeometry(4.2, 96),
    new THREE.MeshStandardMaterial({ color: '#161012', metalness: 0.75, roughness: 0.3, side: THREE.DoubleSide })
  );
  group.add(disc);

  // Grooves
  const grooveMat = new THREE.LineBasicMaterial({ color: '#5a4b4e', transparent: true, opacity: 0.6 });
  for (let r = 1.55; r < 4.1; r += 0.09) {
    const pts = [];
    for (let a = 0; a <= 64; a += 1) {
      const t = (a / 64) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(t) * r, Math.sin(t) * r, 0.002));
    }
    group.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), grooveMat));
  }

  // Sheen highlight sweeping across the grooves
  const sheen = new THREE.Mesh(
    new THREE.RingGeometry(1.5, 4.15, 64, 1, 0, Math.PI / 5),
    new THREE.MeshBasicMaterial({ color: '#ffffff', transparent: true, opacity: 0.06, side: THREE.DoubleSide, depthWrite: false })
  );
  sheen.position.z = 0.004;
  group.add(sheen);

  const label = new THREE.Mesh(
    new THREE.CircleGeometry(1.35, 64),
    new THREE.MeshStandardMaterial({ color: '#E8141C', emissive: '#7a0a0e', emissiveIntensity: 0.6, roughness: 0.6, side: THREE.DoubleSide })
  );
  label.position.z = 0.006;
  group.add(label);

  const hole = new THREE.Mesh(
    new THREE.CircleGeometry(0.12, 24),
    new THREE.MeshBasicMaterial({ color: '#000000', side: THREE.DoubleSide })
  );
  hole.position.z = 0.008;
  group.add(hole);

  const spinner = new THREE.Group();
  spinner.add(group);
  return { spinner, disc: group };
};

const buildRings = () => {
  const rings = [];
  const zs = [-22, -48, -76, -104, -132, -158];
  zs.forEach((z, i) => {
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(7 + (i % 3) * 2.5, 0.035, 8, 160),
      new THREE.MeshBasicMaterial({
        color: i % 2 ? '#FFB547' : '#E8141C',
        transparent: true,
        opacity: 0.7,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      })
    );
    ring.position.set(Math.sin(i * 1.7) * 3, Math.cos(i * 1.3) * 1.5, z);
    ring.userData.base = 1;
    rings.push(ring);
  });
  return rings;
};

const buildPicks = (count) => {
  const shape = new THREE.Shape();
  // rounded guitar-pick outline
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
    const s = 0.35 + Math.random() * 0.45;
    mesh.scale.setScalar(s);
    mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
    mesh.userData.spin = new THREE.Vector3((Math.random() - 0.5) * 0.8, (Math.random() - 0.5) * 0.8, (Math.random() - 0.5) * 0.4);
    mesh.userData.floatSeed = Math.random() * 10;
    mesh.userData.baseY = mesh.position.y;
    picks.push(mesh);
  }
  return picks;
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
      return undefined; // no WebGL: the CSS gradient behind stays visible
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isSmall ? 1.25 : 1.6));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor('#070404', 1);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2('#070404', 0.022);

    const camera = new THREE.PerspectiveCamera(62, window.innerWidth / window.innerHeight, 0.1, 220);
    camera.position.set(0, 0, 14);

    scene.add(new THREE.AmbientLight('#ffffff', 0.35));
    const key = new THREE.DirectionalLight('#ffd9b3', 1.4);
    key.position.set(4, 8, 10);
    scene.add(key);
    const redLight = new THREE.PointLight('#E8141C', 40, 40, 1.6);
    scene.add(redLight);

    const dust = buildDust(isSmall ? 3200 : 7500);
    scene.add(dust);

    const { spinner, disc } = buildVinyl();
    spinner.position.set(5.5, -1.2, 0);
    spinner.rotation.set(-0.5, -0.55, 0.15);
    scene.add(spinner);

    const rings = buildRings();
    rings.forEach((r) => scene.add(r));

    const picks = buildPicks(isSmall ? 10 : 18);
    picks.forEach((p) => scene.add(p));

    // Scroll + pointer state (smoothed every frame)
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
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      readScroll();
    };

    readScroll();
    state.progress = state.target;
    window.addEventListener('scroll', readScroll, { passive: true });
    window.addEventListener('pointermove', onPointer, { passive: true });
    window.addEventListener('resize', onResize);

    const clock = new THREE.Clock();
    let raf = 0;
    let running = true;

    const renderFrame = () => {
      const dt = Math.min(clock.getDelta(), 0.05);
      const t = clock.elapsedTime;

      state.progress += (state.target - state.progress) * Math.min(1, dt * 3.2);
      state.mx += (state.tmx - state.mx) * Math.min(1, dt * 2.5);
      state.my += (state.tmy - state.my) * Math.min(1, dt * 2.5);
      state.velocity *= 0.9;
      const p = state.progress;

      // Camera flies down the tunnel, banking gently
      camera.position.z = 14 - p * 165;
      camera.position.x = state.mx * 1.4 + Math.sin(p * Math.PI * 2) * 1.5;
      camera.position.y = -state.my * 0.9 + Math.cos(p * Math.PI * 3) * 0.8;
      camera.rotation.z = Math.sin(p * Math.PI * 2) * 0.12 + state.velocity * 0.02;
      camera.lookAt(camera.position.x * 0.4, camera.position.y * 0.4, camera.position.z - 20);
      redLight.position.set(camera.position.x, camera.position.y + 2, camera.position.z - 6);

      dust.rotation.z = t * 0.012 + p * 1.4;

      // Vinyl rides along just ahead of the camera, sliding across the stage
      disc.rotation.z -= dt * (1.4 + Math.abs(state.velocity) * 6);
      spinner.position.z = camera.position.z - 14;
      spinner.position.x = 5.5 - Math.sin(p * Math.PI) * 11;
      spinner.position.y = -1.2 + Math.sin(p * Math.PI * 2) * 1.5;
      spinner.rotation.x = -0.5 + p * 1.1;
      spinner.rotation.y = -0.55 + p * 2.2;

      rings.forEach((ring, i) => {
        const pulse = 1 + Math.sin(t * 2.2 + i) * 0.04 + Math.min(Math.abs(state.velocity), 1) * 0.12;
        ring.scale.setScalar(pulse);
        ring.rotation.z = t * 0.1 * (i % 2 ? 1 : -1);
        const d = Math.abs(ring.position.z - camera.position.z);
        ring.material.opacity = THREE.MathUtils.clamp(1.1 - d / 60, 0.08, 0.85);
      });

      picks.forEach((pick) => {
        const s = pick.userData.spin;
        pick.rotation.x += s.x * dt;
        pick.rotation.y += s.y * dt;
        pick.rotation.z += s.z * dt;
        pick.position.y = pick.userData.baseY + Math.sin(t * 0.8 + pick.userData.floatSeed) * 0.6;
      });

      renderer.render(scene, camera);
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
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="stage-universe" aria-hidden="true" />;
};

export default StageUniverse;
