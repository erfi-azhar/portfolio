// A company ID badge hanging from a lanyard, after the one on sourabhmane.com.
// The strap is a chain of physics bodies joined by ropes; the badge falls in,
// swings and settles, and can be grabbed and thrown. The card, clip and strap
// are drawn here, in each company's colours.
import * as THREE from 'three';
import RAPIER from '@dimforge/rapier3d-compat';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

export interface BadgeSpec {
  name: string;
  role: string;
  company: string;
  dates: string;
  code: string;
  handle: string;
  /** Card and strap colour. */
  brand: string;
  /** Highlight colour for details. */
  accent: string;
  /** Logo image URL; leave out to show the initials. */
  logo?: string | null;
  /** Draw the logo straight onto the card instead of on a white tile. */
  plainLogo?: boolean;
  initials: string;
}

export interface Badge {
  /** Drop the badge in from the top again. */
  reset(): void;
  play(): void;
  pause(): void;
}

// Card size in world units, as in the reference.
const W = 1.6;
const H = 2.25;
const DEPTH = 0.02;
const RADIUS = 0.11;
// Where the strap meets the clip, above the card's centre.
const PIN = 1.45;
// The fixed end of the strap, above the top of the view.
const ANCHOR = new THREE.Vector3(0, 4, 0);
const STEP = 1 / 60;
const STRAP_WIDTH = 0.3;
const SEGMENTS = 32;

let ready: Promise<void> | null = null;
const initPhysics = () => (ready ??= RAPIER.init().then(() => undefined));

const SANS = "'Geist', system-ui, sans-serif";
const MONO = "'Geist Mono', ui-monospace, monospace";

const loadImage = (src: string) =>
  new Promise<HTMLImageElement | null>((resolve) => {
    const img = new Image();
    img.decoding = 'async';
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = src;
  });

const roundRect = (ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) => {
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, r);
};

// Mix a hex colour toward white (t > 0) or black (t < 0).
const shade = (hex: string, t: number) => {
  const c = new THREE.Color(hex);
  c.lerp(new THREE.Color(t > 0 ? '#ffffff' : '#000000'), Math.abs(t));
  return `#${c.getHexString()}`;
};

function drawIcon(ctx: CanvasRenderingContext2D, spec: BadgeSpec, logo: HTMLImageElement | null, x: number, y: number, size: number) {
  if (logo && spec.plainLogo) {
    ctx.drawImage(logo, x, y, size, size);
    return;
  }
  ctx.save();
  roundRect(ctx, x, y, size, size, size * 0.22);
  ctx.clip();
  if (logo) {
    ctx.fillStyle = '#fff';
    ctx.fillRect(x, y, size, size);
    ctx.drawImage(logo, x, y, size, size);
  } else {
    ctx.fillStyle = '#f4f4f4';
    ctx.fillRect(x, y, size, size);
    ctx.fillStyle = spec.brand;
    ctx.font = `500 ${size * 0.36}px ${MONO}`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(spec.initials, x + size / 2, y + size / 2 + size * 0.02);
  }
  ctx.restore();
}

// Shrink the font until the text fits.
function fitText(ctx: CanvasRenderingContext2D, text: string, weight: number, size: number, family: string, max: number) {
  let s = size;
  do ctx.font = `${weight} ${s}px ${family}`;
  while (ctx.measureText(text).width > max && (s -= 2) > 12);
}

function drawFront(spec: BadgeSpec, logo: HTMLImageElement | null) {
  const cw = 1024;
  const ch = Math.round((cw * H) / W);
  const canvas = document.createElement('canvas');
  canvas.width = cw;
  canvas.height = ch;
  const ctx = canvas.getContext('2d')!;
  const pad = 88;

  const bg = ctx.createLinearGradient(0, 0, cw, ch);
  bg.addColorStop(0, shade(spec.brand, 0.06));
  bg.addColorStop(1, shade(spec.brand, -0.2));
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, cw, ch);

  // Fine dot grid, fading out downward.
  ctx.fillStyle = '#fff';
  for (let y = 24; y < ch * 0.45; y += 22) {
    ctx.globalAlpha = 0.06 * (1 - y / (ch * 0.45));
    for (let x = 24; x < cw; x += 22) ctx.fillRect(x, y, 3, 3);
  }
  ctx.globalAlpha = 1;

  // Header row, under the punched slot.
  ctx.fillStyle = 'rgba(255,255,255,0.6)';
  ctx.font = `500 30px ${MONO}`;
  ctx.textBaseline = 'alphabetic';
  ctx.textAlign = 'left';
  ctx.fillText(spec.code, pad, 250);
  ctx.textAlign = 'right';
  ctx.fillText('STAFF', cw - pad, 250);

  const icon = 300;
  drawIcon(ctx, spec, logo, pad, 330, icon);

  // Name and role.
  ctx.textAlign = 'left';
  ctx.fillStyle = '#fff';
  fitText(ctx, spec.name, 600, 112, SANS, cw - pad * 2);
  ctx.fillText(spec.name, pad, 830);
  ctx.fillStyle = 'rgba(255,255,255,0.72)';
  fitText(ctx, spec.role, 400, 50, SANS, cw - pad * 2);
  ctx.fillText(spec.role, pad, 910);

  // Company and dates.
  ctx.fillStyle = 'rgba(255,255,255,0.18)';
  ctx.fillRect(pad, 1000, cw - pad * 2, 2);
  ctx.fillStyle = 'rgba(255,255,255,0.5)';
  ctx.font = `500 26px ${MONO}`;
  ctx.fillText('COMPANY', pad, 1068);
  ctx.textAlign = 'right';
  ctx.fillText('DATES', cw - pad, 1068);
  ctx.fillStyle = '#fff';
  ctx.textAlign = 'left';
  fitText(ctx, spec.company, 500, 44, SANS, (cw - pad * 2) * 0.58);
  ctx.fillText(spec.company, pad, 1126);
  ctx.textAlign = 'right';
  fitText(ctx, spec.dates, 500, 40, MONO, (cw - pad * 2) * 0.4);
  ctx.fillText(spec.dates, cw - pad, 1126);

  // Accent strip along the bottom edge with a barcode.
  const stripY = ch - 200;
  ctx.fillStyle = spec.accent;
  ctx.fillRect(0, stripY, cw, ch - stripY);
  ctx.fillStyle = 'rgba(0,0,0,0.75)';
  let seed = [...spec.company].reduce((a, c) => a + c.charCodeAt(0), 7);
  for (let x = pad; x < cw * 0.55; ) {
    seed = (seed * 9301 + 49297) % 233280;
    const w = 3 + (seed % 4) * 3;
    ctx.fillRect(x, stripY + 60, w, 80);
    x += w + 5 + (seed % 3) * 3;
  }
  ctx.font = `500 30px ${MONO}`;
  ctx.textAlign = 'right';
  ctx.textBaseline = 'middle';
  ctx.fillText(spec.handle, cw - pad, stripY + 100);
  return canvas;
}

function drawBack(spec: BadgeSpec, logo: HTMLImageElement | null) {
  const cw = 1024;
  const ch = Math.round((cw * H) / W);
  const canvas = document.createElement('canvas');
  canvas.width = cw;
  canvas.height = ch;
  const ctx = canvas.getContext('2d')!;
  const bg = ctx.createLinearGradient(cw, 0, 0, ch);
  bg.addColorStop(0, shade(spec.brand, 0.08));
  bg.addColorStop(1, shade(spec.brand, -0.3));
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, cw, ch);

  const size = 420;
  drawIcon(ctx, spec, logo, (cw - size) / 2, ch * 0.42 - size / 2, size);

  ctx.fillStyle = '#fff';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'alphabetic';
  fitText(ctx, spec.company, 600, 64, SANS, cw - 160);
  ctx.fillText(spec.company, cw / 2, ch * 0.42 + size / 2 + 120);
  ctx.fillStyle = 'rgba(255,255,255,0.55)';
  ctx.font = `500 30px ${MONO}`;
  ctx.fillText(`${spec.name.toUpperCase()}  ·  ${spec.handle}`, cw / 2, ch - 110);
  return canvas;
}

function drawStrap(spec: BadgeSpec) {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 128;
  const ctx = canvas.getContext('2d')!;
  ctx.fillStyle = spec.brand;
  ctx.fillRect(0, 0, 1024, 128);
  ctx.fillStyle = 'rgba(255,255,255,0.12)';
  ctx.fillRect(0, 10, 1024, 3);
  ctx.fillRect(0, 115, 1024, 3);
  ctx.fillStyle = 'rgba(255,255,255,0.9)';
  ctx.font = `600 52px ${SANS}`;
  ctx.textBaseline = 'middle';
  ctx.textAlign = 'center';
  const label = spec.company.toUpperCase();
  ctx.fillText(label, 256, 66);
  ctx.fillStyle = spec.accent;
  ctx.beginPath();
  ctx.arc(512, 64, 9, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = 'rgba(255,255,255,0.9)';
  ctx.fillText(label, 768, 66);
  ctx.fillStyle = spec.accent;
  ctx.beginPath();
  ctx.arc(1012, 64, 9, 0, Math.PI * 2);
  ctx.arc(12, 64, 9, 0, Math.PI * 2);
  ctx.fill();
  return canvas;
}

function cardShape() {
  const x = -W / 2;
  const y = -H / 2;
  const r = RADIUS;
  const s = new THREE.Shape();
  s.moveTo(x + r, y);
  s.lineTo(x + W - r, y);
  s.quadraticCurveTo(x + W, y, x + W, y + r);
  s.lineTo(x + W, y + H - r);
  s.quadraticCurveTo(x + W, y + H, x + W - r, y + H);
  s.lineTo(x + r, y + H);
  s.quadraticCurveTo(x, y + H, x, y + H - r);
  s.lineTo(x, y + r);
  s.quadraticCurveTo(x, y, x + r, y);
  // The punched slot the clip goes through.
  const sw = 0.34;
  const sh = 0.07;
  const sy = H / 2 - 0.15;
  const hole = new THREE.Path();
  hole.absarc(-sw / 2 + sh / 2, sy, sh / 2, Math.PI / 2, (Math.PI * 3) / 2, false);
  hole.lineTo(sw / 2 - sh / 2, sy - sh / 2);
  hole.absarc(sw / 2 - sh / 2, sy, sh / 2, -Math.PI / 2, Math.PI / 2, false);
  hole.lineTo(-sw / 2 + sh / 2, sy + sh / 2);
  s.holes.push(hole);
  return s;
}

// Map a shape's x/y to 0–1 across the card.
function normaliseUVs(geometry: THREE.BufferGeometry) {
  const pos = geometry.attributes.position;
  const uv = geometry.attributes.uv;
  for (let i = 0; i < pos.count; i++) uv.setXY(i, (pos.getX(i) + W / 2) / W, (pos.getY(i) + H / 2) / H);
  uv.needsUpdate = true;
}

function buildCard(spec: BadgeSpec, front: HTMLCanvasElement, back: HTMLCanvasElement, maxAniso: number) {
  const group = new THREE.Group();
  const shape = cardShape();
  const texture = (canvas: HTMLCanvasElement) => {
    const t = new THREE.CanvasTexture(canvas);
    t.colorSpace = THREE.SRGBColorSpace;
    t.anisotropy = maxAniso;
    return t;
  };
  const face = (canvas: HTMLCanvasElement) =>
    new THREE.MeshPhysicalMaterial({
      map: texture(canvas),
      roughness: 0.42,
      clearcoat: 0.6,
      clearcoatRoughness: 0.3,
    });

  const frontGeo = new THREE.ShapeGeometry(shape, 12);
  normaliseUVs(frontGeo);
  frontGeo.translate(0, 0, DEPTH / 2);
  const frontMesh = new THREE.Mesh(frontGeo, face(front));

  const backGeo = new THREE.ShapeGeometry(shape, 12);
  normaliseUVs(backGeo);
  backGeo.rotateY(Math.PI);
  backGeo.translate(0, 0, -DEPTH / 2);
  const backMesh = new THREE.Mesh(backGeo, face(back));

  const edgeGeo = new THREE.ExtrudeGeometry(shape, { depth: DEPTH, bevelEnabled: false, curveSegments: 12 });
  edgeGeo.translate(0, 0, -DEPTH / 2);
  const edgeMesh = new THREE.Mesh(edgeGeo, [
    new THREE.MeshBasicMaterial({ visible: false }),
    new THREE.MeshStandardMaterial({ color: shade(spec.brand, 0.35), roughness: 0.5 }),
  ]);

  // The metal clip: a clamp through the slot, a stem and a ring for the strap.
  const metal = new THREE.MeshStandardMaterial({ color: '#a9adb5', metalness: 0.9, roughness: 0.35 });
  const clampY = H / 2 - 0.12;
  const clamp = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.16, 0.05), metal);
  clamp.position.set(0, clampY, 0);
  const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.022, 0.26, 12), metal);
  stem.position.set(0, clampY + 0.18, 0);
  const ring = new THREE.Mesh(new THREE.TorusGeometry(0.075, 0.018, 12, 32), metal);
  ring.position.set(0, PIN - 0.07, 0);

  group.add(frontMesh, backMesh, edgeMesh, clamp, stem, ring);
  return { group, hit: [frontMesh, backMesh, edgeMesh, clamp] };
}

export async function mountBadge(container: HTMLElement, spec: BadgeSpec): Promise<Badge> {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const [, logo] = await Promise.all([
    initPhysics(),
    spec.logo ? loadImage(spec.logo) : Promise.resolve(null),
    document.fonts.load(`600 40px ${SANS}`).catch(() => {}),
    document.fonts.load(`500 40px ${MONO}`).catch(() => {}),
  ]);

  // ——— Renderer and scene ———
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.NeutralToneMapping;
  renderer.setClearColor(0x000000, 0);
  const canvas = renderer.domElement;
  canvas.className = 'badge-canvas';
  container.appendChild(canvas);

  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environmentIntensity = 0.3;
  pmrem.dispose();
  scene.add(new THREE.AmbientLight(0xffffff, 0.9));
  const key = new THREE.DirectionalLight(0xffffff, 1.2);
  key.position.set(2, 3, 6);
  scene.add(key);

  const camera = new THREE.PerspectiveCamera(25, 1, 0.1, 100);
  camera.position.set(0, 0, 9.5);

  // ——— Physics ———
  const world = new RAPIER.World({ x: 0, y: -40, z: 0 });
  world.timestep = STEP;
  const body = (desc: RAPIER.RigidBodyDesc) =>
    world.createRigidBody(desc.setLinearDamping(2).setAngularDamping(2).setCanSleep(true));
  const fixed = world.createRigidBody(RAPIER.RigidBodyDesc.fixed().setTranslation(ANCHOR.x, ANCHOR.y, ANCHOR.z));
  const links = [0.5, 1, 1.5].map((x) => {
    const b = body(RAPIER.RigidBodyDesc.dynamic().setTranslation(ANCHOR.x + x, ANCHOR.y, ANCHOR.z));
    world.createCollider(RAPIER.ColliderDesc.ball(0.1), b);
    return b;
  });
  const [j1, j2, j3] = links;
  const card = body(RAPIER.RigidBodyDesc.dynamic().setTranslation(ANCHOR.x + 2, ANCHOR.y, ANCHOR.z));
  world.createCollider(RAPIER.ColliderDesc.cuboid(W / 2, H / 2, 0.01), card);
  const zero = { x: 0, y: 0, z: 0 };
  world.createImpulseJoint(RAPIER.JointData.rope(1, zero, zero), fixed, j1, true);
  world.createImpulseJoint(RAPIER.JointData.rope(1, zero, zero), j1, j2, true);
  world.createImpulseJoint(RAPIER.JointData.rope(1, zero, zero), j2, j3, true);
  world.createImpulseJoint(RAPIER.JointData.spherical(zero, { x: 0, y: PIN, z: 0 }), j3, card, true);
  const all = [fixed, j1, j2, j3, card];

  // ——— Meshes ———
  const maxAniso = renderer.capabilities.getMaxAnisotropy();
  const { group: cardGroup, hit } = buildCard(spec, drawFront(spec, logo), drawBack(spec, logo), maxAniso);
  scene.add(cardGroup);

  const strapTexture = new THREE.CanvasTexture(drawStrap(spec));
  strapTexture.colorSpace = THREE.SRGBColorSpace;
  strapTexture.wrapS = THREE.RepeatWrapping;
  strapTexture.anisotropy = maxAniso;
  const strapGeo = new THREE.BufferGeometry();
  const strapPos = new Float32Array((SEGMENTS + 1) * 2 * 3);
  const strapUV = new Float32Array((SEGMENTS + 1) * 2 * 2);
  const strapIndex: number[] = [];
  for (let i = 0; i < SEGMENTS; i++) {
    const a = i * 2;
    strapIndex.push(a, a + 1, a + 2, a + 1, a + 3, a + 2);
  }
  strapGeo.setAttribute('position', new THREE.BufferAttribute(strapPos, 3));
  strapGeo.setAttribute('uv', new THREE.BufferAttribute(strapUV, 2));
  strapGeo.setIndex(strapIndex);
  const strap = new THREE.Mesh(
    strapGeo,
    new THREE.MeshStandardMaterial({ map: strapTexture, roughness: 0.75, side: THREE.DoubleSide }),
  );
  strap.frustumCulled = false;
  scene.add(strap);

  const curve = new THREE.CatmullRomCurve3([new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()]);
  curve.curveType = 'chordal';
  const lerped = [new THREE.Vector3(), new THREE.Vector3()];

  // A flat ribbon along the curve, turned to face the camera.
  const tangent = new THREE.Vector3();
  const side = new THREE.Vector3();
  const toCam = new THREE.Vector3();
  const updateStrap = () => {
    const pts = curve.getPoints(SEGMENTS);
    let length = 0;
    for (let i = 0; i <= SEGMENTS; i++) {
      const p = pts[i];
      tangent.subVectors(pts[Math.min(i + 1, SEGMENTS)], pts[Math.max(i - 1, 0)]).normalize();
      toCam.subVectors(camera.position, p).normalize();
      side.crossVectors(tangent, toCam).normalize().multiplyScalar(STRAP_WIDTH / 2);
      if (i > 0) length += p.distanceTo(pts[i - 1]);
      strapPos.set([p.x - side.x, p.y - side.y, p.z - side.z, p.x + side.x, p.y + side.y, p.z + side.z], i * 6);
      // The texture repeats every 2.4 units, starting at the clip.
      const u = length / 2.4;
      strapUV.set([u, 1, u, 0], i * 4);
    }
    strapGeo.attributes.position.needsUpdate = true;
    strapGeo.attributes.uv.needsUpdate = true;
    strapGeo.computeVertexNormals();
  };

  const syncMeshes = () => {
    const t = card.translation();
    const r = card.rotation();
    cardGroup.position.set(t.x, t.y, t.z);
    cardGroup.quaternion.set(r.x, r.y, r.z, r.w);
    curve.points[0].copy(j3.translation() as THREE.Vector3Like);
    curve.points[1].copy(lerped[1]);
    curve.points[2].copy(lerped[0]);
    curve.points[3].copy(fixed.translation() as THREE.Vector3Like);
    updateStrap();
  };

  // ——— Reset: hang the chain out to the side so it drops and swings in. ———
  const place = (b: RAPIER.RigidBody, x: number, y: number) => {
    b.setTranslation({ x, y, z: ANCHOR.z }, true);
    b.setRotation({ x: 0, y: 0, z: 0, w: 1 }, true);
    b.setLinvel(zero, true);
    b.setAngvel(zero, true);
  };
  const reset = () => {
    dragged = null;
    card.setBodyType(RAPIER.RigidBodyType.Dynamic, true);
    if (reduceMotion) {
      // Already hanging at rest.
      links.forEach((b, i) => place(b, ANCHOR.x, ANCHOR.y - (i + 1)));
      place(card, ANCHOR.x, ANCHOR.y - 3 - PIN);
    } else {
      links.forEach((b, i) => place(b, ANCHOR.x + 0.5 * (i + 1), ANCHOR.y));
      place(card, ANCHOR.x + 2, ANCHOR.y);
    }
    links.slice(0, 2).forEach((b, i) => lerped[i].copy(b.translation() as THREE.Vector3Like));
    acc = 0;
    syncMeshes();
  };

  // ——— Pointer ———
  const raycaster = new THREE.Raycaster();
  const ndc = new THREE.Vector2();
  let dragged: THREE.Vector3 | null = null;
  let hovered = false;
  const setPointer = (e: { clientX: number; clientY: number }) => {
    const r = canvas.getBoundingClientRect();
    ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
  };
  const hitCard = () => {
    raycaster.setFromCamera(ndc, camera);
    return raycaster.intersectObjects(hit, false)[0] ?? null;
  };
  const updateCursor = () => {
    canvas.style.cursor = dragged ? 'grabbing' : hovered ? 'grab' : '';
  };

  canvas.addEventListener('pointerdown', (e) => {
    if (e.button !== 0) return;
    setPointer(e);
    const h = hitCard();
    if (!h) return;
    e.preventDefault();
    canvas.setPointerCapture(e.pointerId);
    const t = card.translation();
    dragged = h.point.clone().sub(new THREE.Vector3(t.x, t.y, t.z));
    card.setBodyType(RAPIER.RigidBodyType.KinematicPositionBased, true);
    updateCursor();
    play();
  });
  canvas.addEventListener('pointermove', (e) => {
    setPointer(e);
    if (!dragged && e.pointerType === 'mouse') {
      hovered = !!hitCard();
      updateCursor();
    }
  });
  const release = () => {
    if (!dragged) return;
    dragged = null;
    card.setBodyType(RAPIER.RigidBodyType.Dynamic, true);
    updateCursor();
  };
  canvas.addEventListener('pointerup', release);
  canvas.addEventListener('pointercancel', release);
  canvas.addEventListener('lostpointercapture', release);
  // On touch screens, a swipe that starts on the badge moves the badge; any
  // other swipe scrolls the page.
  canvas.addEventListener(
    'touchstart',
    (e) => {
      const touch = e.touches[0];
      if (!touch) return;
      setPointer(touch);
      if (hitCard()) e.preventDefault();
    },
    { passive: false },
  );

  // ——— Size ———
  const resize = () => {
    const { width, height } = container.getBoundingClientRect();
    if (!width || !height) return;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    render();
  };
  new ResizeObserver(resize).observe(container);

  // ——— Loop ———
  const target = new THREE.Vector3();
  const dir = new THREE.Vector3();
  let acc = 0;
  let last = 0;
  let frame = 0;
  let running = false;

  const render = () => renderer.render(scene, camera);

  const tick = (now: number) => {
    frame = 0;
    if (!running) return;
    const delta = Math.min(0.1, last ? (now - last) / 1000 : STEP);
    last = now;

    if (dragged) {
      // Project the pointer onto the plane the card hangs in.
      target.set(ndc.x, ndc.y, 0.5).unproject(camera);
      dir.copy(target).sub(camera.position).normalize();
      target.add(dir.multiplyScalar(camera.position.length()));
      all.forEach((b) => b.wakeUp());
      card.setNextKinematicTranslation({ x: target.x - dragged.x, y: target.y - dragged.y, z: target.z - dragged.z });
    }

    acc += delta;
    let steps = 0;
    while (acc >= STEP && steps < 6) {
      // Turn the card back toward the camera as it swings.
      const ang = card.angvel();
      const rot = card.rotation();
      card.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z }, true);
      world.step();
      acc -= STEP;
      steps++;
    }
    if (steps === 6) acc = 0;

    // The strap trails a little behind its joints, which smooths out jitter.
    links.slice(0, 2).forEach((b, i) => {
      const p = b.translation() as THREE.Vector3Like;
      const v = lerped[i];
      const d = Math.max(0.1, Math.min(1, v.distanceTo(p)));
      v.lerp(p, Math.min(1, delta * (10 + d * 40)));
    });

    syncMeshes();
    render();
    frame = requestAnimationFrame(tick);
  };

  const play = () => {
    running = true;
    last = 0;
    frame ||= requestAnimationFrame(tick);
  };
  const pause = () => {
    running = false;
    if (frame) cancelAnimationFrame(frame);
    frame = 0;
    release();
  };

  reset();
  resize();
  return { reset, play, pause };
}
