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

  // Set up Three.js Scene, Camera, Renderer with lightweight settings
  const scene = new THREE.Scene();
  const width = containerEl.clientWidth || window.innerWidth;
  const height = containerEl.clientHeight || window.innerHeight;

  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
  camera.position.z = 75;

  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
    powerPreference: 'default'
  });
  renderer.setSize(width, height);
  // Cap at 1.25 to prevent GPU strain on 2x/3x high-DPI displays
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.25));
  renderer.setClearColor(0x000000, 0);

  containerEl.innerHTML = '';
  containerEl.appendChild(renderer.domElement);

  // Group to rotate and tilt
  const neuralGroup = new THREE.Group();
  scene.add(neuralGroup);

  // --- Theme Palette: Burgundy (#7A1F35), Black (#111111), Soft Pink (#F5E7EB) ---
  const colorBurgundy = new THREE.Color(0x7A1F35);
  const colorBlack = new THREE.Color(0x111111);
  const colorPink = new THREE.Color(0xF5E7EB);

  // --- Ultra-Lightweight Neural Network Topology: 4 Layers (18 nodes total) ---
  const layers = [
    { count: 4, x: -28, radius: 10 },
    { count: 5, x: -10, radius: 15 },
    { count: 5, x: 10, radius: 15 },
    { count: 4, x: 28, radius: 10 }
  ];

  interface NodeData {
    pos: THREE.Vector3;
    layerIdx: number;
  }

  const nodes: NodeData[] = [];
  const nodePositions: number[] = [];
  const nodeColors: number[] = [];

  layers.forEach((layer, lIdx) => {
    for (let i = 0; i < layer.count; i++) {
      const angle = (i / layer.count) * Math.PI * 2;
      const r = layer.radius * (0.8 + (i % 2) * 0.2);
      const y = Math.sin(angle) * r;
      const z = Math.cos(angle) * r;
      const x = layer.x;

      const pos = new THREE.Vector3(x, y, z);
      nodes.push({ pos, layerIdx: lIdx });

      nodePositions.push(x, y, z);

      // Node colors: Burgundy on outer, Soft Pink/Black on inner
      const c = lIdx % 2 === 0 ? colorBurgundy : colorBlack;
      nodeColors.push(c.r, c.g, c.b);
    }
  });

  // Nodes geometry
  const nodesGeo = new THREE.BufferGeometry();
  nodesGeo.setAttribute('position', new THREE.Float32BufferAttribute(nodePositions, 3));
  nodesGeo.setAttribute('color', new THREE.Float32BufferAttribute(nodeColors, 3));

  const canvasTexture = createNodePointTexture();
  const nodesMat = new THREE.PointsMaterial({
    size: 3.2,
    map: canvasTexture,
    vertexColors: true,
    transparent: true,
    opacity: 0.9,
    depthWrite: false
  });

  const nodePoints = new THREE.Points(nodesGeo, nodesMat);
  neuralGroup.add(nodePoints);

  // --- Synaptic Connections: Sparse, lightweight line segments ---
  const linePositions: number[] = [];
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const n1 = nodes[i];
      const n2 = nodes[j];
      const dist = n1.pos.distanceTo(n2.pos);

      // Connect only adjacent layers within reasonable distance
      if (Math.abs(n1.layerIdx - n2.layerIdx) === 1 && dist < 25) {
        linePositions.push(n1.pos.x, n1.pos.y, n1.pos.z);
        linePositions.push(n2.pos.x, n2.pos.y, n2.pos.z);
      }
    }
  }

  const linesGeo = new THREE.BufferGeometry();
  linesGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));

  const linesMat = new THREE.LineBasicMaterial({
    color: 0x7A1F35,
    transparent: true,
    opacity: 0.25
  });

  const lines = new THREE.LineSegments(linesGeo, linesMat);
  neuralGroup.add(lines);

  // --- Ambient Mathematical Particles (drastically reduced to 30) ---
  const particleCount = 30;
  const pPos: number[] = [];
  const pCols: number[] = [];

  for (let i = 0; i < particleCount; i++) {
    const px = (Math.random() - 0.5) * 80;
    const py = (Math.random() - 0.5) * 50;
    const pz = (Math.random() - 0.5) * 35;
    pPos.push(px, py, pz);

    const c = Math.random() > 0.5 ? colorBurgundy : colorPink;
    pCols.push(c.r, c.g, c.b);
  }

  const particlesGeo = new THREE.BufferGeometry();
  particlesGeo.setAttribute('position', new THREE.Float32BufferAttribute(pPos, 3));
  particlesGeo.setAttribute('color', new THREE.Float32BufferAttribute(pCols, 3));

  const particlesMat = new THREE.PointsMaterial({
    size: 1.5,
    map: canvasTexture,
    vertexColors: true,
    transparent: true,
    opacity: 0.6,
    depthWrite: false
  });

  const particles = new THREE.Points(particlesGeo, particlesMat);
  scene.add(particles);

  // Mouse interaction state (damped)
  let targetRotationX = 0;
  let targetRotationY = 0;

  function onMouseMove(e: MouseEvent) {
    const rect = containerEl.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / (rect.width || 1)) * 2 - 1;
    const y = -(((e.clientY - rect.top) / (rect.height || 1)) * 2 - 1);
    targetRotationY = x * 0.2;
    targetRotationX = -y * 0.15;
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

  // Animation Loop with IntersectionObserver pausing (ZERO CPU/GPU when scrolled away)
  let animationFrameId: number = 0;
  let isVisible = true;
  let isRunning = false;

  function animate() {
    if (!isVisible) {
      isRunning = false;
      return;
    }
    isRunning = true;
    animationFrameId = requestAnimationFrame(animate);

    // Smooth inertia camera tilt on GPU transforms
    neuralGroup.rotation.y += (targetRotationY - neuralGroup.rotation.y) * 0.04;
    neuralGroup.rotation.x += (targetRotationX - neuralGroup.rotation.x) * 0.04;

    // Slow, subtle rotation on GPU
    neuralGroup.rotation.y += 0.0008;
    particles.rotation.y -= 0.0004;

    renderer.render(scene, camera);
  }

  // IntersectionObserver to pause rendering when hero is not on screen
  let observer: IntersectionObserver | null = null;
  if ('IntersectionObserver' in window) {
    observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        isVisible = entry.isIntersecting;
        if (isVisible && !isRunning) {
          animate();
        }
      });
    }, { threshold: 0.05 });

    observer.observe(containerEl);
  } else {
    animate();
  }

  // Initial render
  animate();

  // Cleanup handler
  return () => {
    isVisible = false;
    if (observer) {
      observer.disconnect();
    }
    cancelAnimationFrame(animationFrameId);
    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('resize', onResize);
    renderer.dispose();
    if (renderer.domElement && renderer.domElement.parentElement) {
      renderer.domElement.parentElement.removeChild(renderer.domElement);
    }
  };
}

// Generates Burgundy core + Soft Pink halo radial point texture
function createNodePointTexture(): THREE.Texture {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    gradient.addColorStop(0, 'rgba(122, 31, 53, 1)');       // Burgundy Core #7A1F35
    gradient.addColorStop(0.4, 'rgba(122, 31, 53, 0.85)');
    gradient.addColorStop(0.75, 'rgba(245, 231, 235, 0.5)'); // Soft Pink Halo #F5E7EB
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 64, 64);
  }
  return new THREE.CanvasTexture(canvas);
}

// 2D Canvas Fallback for devices without WebGL
function createFallbackCanvas(container: HTMLElement) {
  const canvas = document.createElement('canvas');
  canvas.className = 'three-fallback-canvas';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.opacity = '0.35';
  container.appendChild(canvas);

  function drawFallback() {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = container.clientWidth || window.innerWidth;
    canvas.height = container.clientHeight || window.innerHeight;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const nodeCount = 18;
    const points: { x: number; y: number }[] = [];
    for (let i = 0; i < nodeCount; i++) {
      points.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height
      });
    }

    ctx.strokeStyle = 'rgba(122, 31, 53, 0.2)';
    ctx.lineWidth = 1;
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        const dx = points[i].x - points[j].x;
        const dy = points[i].y - points[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 110) {
          ctx.beginPath();
          ctx.moveTo(points[i].x, points[i].y);
          ctx.lineTo(points[j].x, points[j].y);
          ctx.stroke();
        }
      }
    }

    points.forEach((p) => {
      ctx.fillStyle = '#7A1F35';
      ctx.beginPath();
      ctx.arc(p.x, p.y, 2.5, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  drawFallback();
  window.addEventListener('resize', drawFallback);
}
