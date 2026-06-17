const hasWebGL = () => {
  try {
    const c = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && (c.getContext('webgl') || c.getContext('experimental-webgl')));
  } catch (e) { return false; }
};

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('hero-canvas-container');
  if (!container || !hasWebGL()) return;
  const heroSection = document.getElementById('hero');

  const fallback = document.getElementById('hero-fallback');
  if (fallback) fallback.style.display = 'none';

  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);

  const handleError = (err) => {
    console.error("Erro no carregamento da textura (CORS/caminho):", err);
    if (fallback) fallback.style.display = 'block';
    const canvas = container.querySelector('canvas');
    if (canvas) canvas.style.display = 'none';
  };

  const loader = new THREE.TextureLoader();
  const texture = loader.load(
    'assets/pescaestrela.png',
    (tex) => {
      tex.minFilter = THREE.LinearFilter;
      tex.generateMipmaps = false;
      updateAspect();
    },
    undefined,
    handleError
  );
  const depthMap = loader.load(
    'assets/pescaestrela_depth.png',
    undefined,
    undefined,
    handleError
  );

  const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
  const uvScale = new THREE.Vector2(1, 1);

  const material = new THREE.ShaderMaterial({
    uniforms: {
      u_texture: { value: texture },
      u_depth: { value: depthMap },
      u_mouse: { value: new THREE.Vector2(0, 0) },
      u_threshold: { value: new THREE.Vector2(0.03, 0.03) },
      u_uvScale: { value: uvScale }
    },
    vertexShader: `
      varying vec2 vUv;
      uniform vec2 u_uvScale;
      void main() {
        vUv = (uv - 0.5) * u_uvScale + 0.5;
        gl_Position = vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform sampler2D u_texture;
      uniform sampler2D u_depth;
      uniform vec2 u_mouse;
      uniform vec2 u_threshold;
      varying vec2 vUv;
      void main() {
        float depth = texture2D(u_depth, vUv).r;
        vec2 displacement = u_mouse * u_threshold * (1.0 - depth);
        gl_FragColor = texture2D(u_texture, vUv + displacement);
      }
    `
  });

  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
  scene.add(mesh);

  const updateAspect = () => {
    if (!texture.image) return;
    const w = container.clientWidth;
    const h = container.clientHeight;
    renderer.setSize(w, h);
    
    const containerAspect = w / h;
    const imageAspect = texture.image.width / texture.image.height;
    
    if (containerAspect > imageAspect) {
      uvScale.set(1, imageAspect / containerAspect);
    } else {
      uvScale.set(containerAspect / imageAspect, 1);
    }
  };

  window.addEventListener('resize', updateAspect);

  if (heroSection) {
    heroSection.addEventListener('pointermove', (e) => {
      const rect = container.getBoundingClientRect();
      mouse.targetX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouse.targetY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    });

    heroSection.addEventListener('pointerleave', () => {
      mouse.targetX = 0;
      mouse.targetY = 0;
    });
  }

  window.addEventListener('deviceorientation', (e) => {
    if (e.beta !== null && e.gamma !== null) {
      const gamma = Math.max(-45, Math.min(45, e.gamma));
      const beta = Math.max(-45, Math.min(45, e.beta - 45));
      mouse.targetX = gamma / 45;
      mouse.targetY = beta / 45;
    }
  }, true);

  const animate = () => {
    requestAnimationFrame(animate);
    mouse.x += (mouse.targetX - mouse.x) * 0.08;
    mouse.y += (mouse.targetY - mouse.y) * 0.08;
    material.uniforms.u_mouse.value.set(mouse.x, -mouse.y);
    renderer.render(scene, camera);
  };
  animate();
});
