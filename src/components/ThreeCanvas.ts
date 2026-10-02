import * as THREE from 'three';

export function initHeroThreeCanvas(containerId: string): (() => void) | null {
  const container = document.getElementById(containerId);
  if (!container) return null;

  const containerEl: HTMLElement = container;

  // Check WebGL availability
  try {
    const testCanvas = document.createElement('canvas');
    const gl = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
    if (!gl) {
      createFallbackCanvas(containerEl);
      return null;
    }
  } catch {
    createFallbackCanvas(containerEl);
    return null;
  }

  // Set up Three.js Scene, Camera, Renderer
  const scene = new THREE.Scene();
  const width = containerEl.clientWidth || window.innerWidth;
  const height = containerEl.clientHeight || window.innerHeight;

  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
  camera.position.z = 85;

  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
    powerPreference: 'high-performance'
  });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);

  containerEl.innerHTML = '';
  containerEl.appendChild(renderer.domElement);

  // Group to rotate and tilt
  const neuralGroup = new THREE.Group();
  scene.add(neuralGroup);

  // --- Neural Network Nodes & Topology ---
  // Palette: Ivory (#FAF7F0), Wine (#942036), Subtle Gold (#DFB15B)
  const layers = [
    { count: 12, x: -36, radius: 14 },
    { count: 20, x: -18, radius: 22 },
    { count: 26, x: 0, radius: 26 },
    { count: 20, x: 18, radius: 22 },
    { count: 10, x: 36, radius: 12 }
  ];

  interface NodeData {
    pos: THREE.Vector3;
    origPos: THREE.Vector3;
    layerIdx: number;
    activity: number;
  }

  const nodes: NodeData[] = [];
  const nodePositions: number[] = [];
  const nodeColors: number[] = [];

  // Theme Palette: Deep Wine, Warm Champagne Gold, Pure Ivory
  const colorWine = new THREE.Color(0x942036);
  const colorGold = new THREE.Color(0xdfb15b);
  const colorIvory = new THREE.Color(0xfaf7f0);

  layers.forEach((layer, lIdx) => {
    for (let i = 0; i < layer.count; i++) {
      const angle = (i / layer.count) * Math.PI * 2;
      const r = layer.radius * (0.6 + Math.random() * 0.4);
      const y = Math.sin(angle) * r + (Math.random() - 0.5) * 4;
      const z = Math.cos(angle) * r + (Math.random() - 0.5) * 8;
      const x = layer.x + (Math.random() - 0.5) * 4;

      const pos = new THREE.Vector3(x, y, z);
      nodes.push({
        pos: pos.clone(),
        origPos: pos.clone(),
        layerIdx: lIdx,
        activity: Math.random()
      });

      nodePositions.push(x, y, z);

      // Color gradient across layers from Wine to Gold to Ivory
      const t = lIdx / (layers.length - 1);
      const nodeColor = t < 0.5
        ? new THREE.Color().lerpColors(colorWine, colorGold, t * 2)
        : new THREE.Color().lerpColors(colorGold, colorIvory, (t - 0.5) * 2);

      nodeColors.push(nodeColor.r, nodeColor.g, nodeColor.b);
    }
  });

  // Nodes Points geometry
  const nodesGeo = new THREE.BufferGeometry();
  nodesGeo.setAttribute('position', new THREE.Float32BufferAttribute(nodePositions, 3));
  nodesGeo.setAttribute('color', new THREE.Float32BufferAttribute(nodeColors, 3));

  // Circular glowing point texture (Ivory core + Wine aura + subtle Gold halo)
  const canvasTexture = createNodePointTexture();
  const nodesMat = new THREE.PointsMaterial({
    size: 2.9,
    map: canvasTexture,
    vertexColors: true,
    transparent: true,
    opacity: 0.95,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });

  const nodePoints = new THREE.Points(nodesGeo, nodesMat);
  neuralGroup.add(nodePoints);

  // --- Synaptic Connections (Lines in Wine & Gold) ---
  const linePositions: number[] = [];
  const lineColors: number[] = [];

  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const n1 = nodes[i];
      const n2 = nodes[j];
      const dist = n1.origPos.distanceTo(n2.origPos);

      // Connect if adjacent layers and within distance threshold
      const isNeighborLayer = Math.abs(n1.layerIdx - n2.layerIdx) === 1;
      const isSameLayerNear = n1.layerIdx === n2.layerIdx && dist < 12;

      if ((isNeighborLayer && dist < 24) || isSameLayerNear) {
        linePositions.push(n1.pos.x, n1.pos.y, n1.pos.z);
        linePositions.push(n2.pos.x, n2.pos.y, n2.pos.z);

        const c1 = colorWine.clone();
        const c2 = colorGold.clone();
        lineColors.push(c1.r, c1.g, c1.b);
        lineColors.push(c2.r, c2.g, c2.b);
      }
    }
  }

  const linesGeo = new THREE.BufferGeometry();
  linesGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
  linesGeo.setAttribute('color', new THREE.Float32BufferAttribute(lineColors, 3));

  const linesMat = new THREE.LineBasicMaterial({
    vertexColors: true,
    transparent: true,
    opacity: 0.32,
    blending: THREE.AdditiveBlending
  });

  const lines = new THREE.LineSegments(linesGeo, linesMat);
  neuralGroup.add(lines);

  // --- Ambient Mathematical Particles in Subtle Gold & Ivory ---
  const particleCount = 220;
  const pPos: number[] = [];
  const pCols: number[] = [];

  for (let i = 0; i < particleCount; i++) {
    const px = (Math.random() - 0.5) * 110;
    const py = (Math.random() - 0.5) * 70;
    const pz = (Math.random() - 0.5) * 50;
    pPos.push(px, py, pz);

    const c = Math.random() > 0.4 ? colorGold : colorIvory;
    pCols.push(c.r, c.g, c.b);
  }

  const particlesGeo = new THREE.BufferGeometry();
  particlesGeo.setAttribute('position', new THREE.Float32BufferAttribute(pPos, 3));
  particlesGeo.setAttribute('color', new THREE.Float32BufferAttribute(pCols, 3));

  const particlesMat = new THREE.PointsMaterial({
    size: 1.3,
    map: canvasTexture,
    vertexColors: true,
    transparent: true,
    opacity: 0.55,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });

  const particles = new THREE.Points(particlesGeo, particlesMat);
  scene.add(particles);

  // Mouse interaction state
  let targetRotationX = 0;
  let targetRotationY = 0;

  function onMouseMove(e: MouseEvent) {
    const rect = containerEl.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / (rect.width || 1)) * 2 - 1;
    const y = -(((e.clientY - rect.top) / (rect.height || 1)) * 2 - 1);
    targetRotationY = x * 0.35;
    targetRotationX = -y * 0.25;
  }

  window.addEventListener('mousemove', onMouseMove, { passive: true });

  // Handle Resize
  function onResize() {
    const newW = containerEl.clientWidth || window.innerWidth;
    const newH = containerEl.clientHeight || window.innerHeight;
    camera.aspect = newW / newH;
    camera.updateProjectionMatrix();
    renderer.setSize(newW, newH);
  }

  window.addEventListener('resize', onResize);

  // Animation Loop
  let animationFrameId: number;
  let clock = new THREE.Clock();

  function animate() {
    animationFrameId = requestAnimationFrame(animate);

    const elapsedTime = clock.getElapsedTime();

    // Smooth inertia camera tilt
    neuralGroup.rotation.y += (targetRotationY - neuralGroup.rotation.y) * 0.05;
    neuralGroup.rotation.x += (targetRotationX - neuralGroup.rotation.x) * 0.05;

    // Continuous subtle cosmic rotation
    neuralGroup.rotation.y += 0.0012;
    particles.rotation.y -= 0.0006;
    particles.rotation.x = Math.sin(elapsedTime * 0.2) * 0.05;

    // Pulse node positions and synaptic waves
    const positions = nodesGeo.attributes.position.array as Float32Array;
    nodes.forEach((node, idx) => {
      const wave = Math.sin(elapsedTime * 2 + node.origPos.x * 0.08 + node.origPos.y * 0.05);
      positions[idx * 3 + 1] = node.origPos.y + wave * 0.8;
      positions[idx * 3 + 2] = node.origPos.z + Math.cos(elapsedTime * 1.5 + idx) * 0.5;
    });
    nodesGeo.attributes.position.needsUpdate = true;

    // Slowly pulse line opacities like active neurons
    linesMat.opacity = 0.25 + Math.sin(elapsedTime * 1.8) * 0.08;

    renderer.render(scene, camera);
  }

  animate();

  // Cleanup handler
  return () => {
    cancelAnimationFrame(animationFrameId);
    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('resize', onResize);
    renderer.dispose();
    if (renderer.domElement && renderer.domElement.parentElement) {
      renderer.domElement.parentElement.removeChild(renderer.domElement);
    }
  };
}

// Generates an Ivory core + Wine aura + subtle Gold halo radial texture
function createNodePointTexture(): THREE.Texture {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    gradient.addColorStop(0, 'rgba(250, 247, 240, 1)');      // Ivory Core
    gradient.addColorStop(0.35, 'rgba(148, 32, 54, 0.9)');    // Velvet Wine
    gradient.addColorStop(0.7, 'rgba(223, 177, 91, 0.45)');   // Subtle Gold Halo
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 64, 64);
  }
  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

// 2D Canvas Fallback for devices without WebGL
function createFallbackCanvas(container: HTMLElement) {
  const canvas = document.createElement('canvas');
  canvas.className = 'three-fallback-canvas';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.opacity = '0.4';
  container.appendChild(canvas);

  function drawFallback() {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = container.clientWidth || window.innerWidth;
    canvas.height = container.clientHeight || window.innerHeight;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const nodes = 40;
    const points: { x: number; y: number }[] = [];
    for (let i = 0; i < nodes; i++) {
      points.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height
      });
    }

    ctx.strokeStyle = 'rgba(148, 32, 54, 0.3)';
    ctx.lineWidth = 1;
    for (let i = 0; i < nodes; i++) {
      for (let j = i + 1; j < nodes; j++) {
        const dx = points[i].x - points[j].x;
        const dy = points[i].y - points[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(points[i].x, points[i].y);
          ctx.lineTo(points[j].x, points[j].y);
          ctx.stroke();
        }
      }
    }

    points.forEach((p) => {
      ctx.fillStyle = '#dfb15b';
      ctx.beginPath();
      ctx.arc(p.x, p.y, 2.5, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  drawFallback();
  window.addEventListener('resize', drawFallback);
}
