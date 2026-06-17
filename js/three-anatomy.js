const hasWebGL = () => {
  try {
    const c = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && (c.getContext('webgl') || c.getContext('experimental-webgl')));
  } catch (e) { return false; }
};

window.selectLocationFallback = (part) => {
  const i = document.getElementById('localizacao-input'), t = document.getElementById('selected-location-text');
  if (i) i.value = part;
  if (t) t.textContent = part;
};

document.addEventListener('DOMContentLoaded', () => {
  const isMobile = window.innerWidth < 768, accent = 0x22d3ee, hover = 0xffffff, selected = 0x06b6d4;
  if (!hasWebGL()) return console.warn('WebGL não suportado.');

  ['hero-fallback', 'form-fallback'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = 'none';
  });

  const createSetup = (container, camZ) => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.set(0, 0, camZ);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: !isMobile });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);
    window.addEventListener('resize', () => {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    });
    return { scene, camera, renderer };
  };

  const hero = document.getElementById('hero-canvas-container');
  if (hero) {
    const { scene, camera, renderer } = createSetup(hero, 4);
    const mesh = new THREE.Mesh(new THREE.IcosahedronGeometry(1.5, 1), new THREE.MeshBasicMaterial({ color: accent, wireframe: true, transparent: true, opacity: 0.8 }));
    scene.add(mesh);
    const anim = () => { requestAnimationFrame(anim); mesh.rotation.y += 0.005; mesh.rotation.x += 0.003; renderer.render(scene, camera); };
    anim();
  }

  const form = document.getElementById('form-canvas-container');
  if (form) {
    const { scene, camera, renderer } = createSetup(form, 5);
    const group = new THREE.Group();
    scene.add(group);

    const wireMat = (c) => new THREE.MeshBasicMaterial({ color: c, wireframe: true, transparent: true, opacity: 0.7 });
    const parts = [
      { name: 'Cabeça', geo: new THREE.SphereGeometry(0.35, 6, 6), pos: [0, 1.4, 0], interactive: false },
      { name: 'Tronco', geo: new THREE.CylinderGeometry(0.5, 0.3, 1.6, 6), pos: [0, 0.3, 0], interactive: false },
      { name: 'Ombro', geo: new THREE.SphereGeometry(0.24, 6, 6), pos: [-0.7, 0.9, 0], interactive: true },
      { name: 'Antebraço', geo: new THREE.CylinderGeometry(0.12, 0.08, 0.9, 6), pos: [-0.9, 0.1, 0], interactive: true },
      { name: 'Perna', geo: new THREE.CylinderGeometry(0.2, 0.15, 1.4, 6), pos: [-0.3, -1.1, 0], interactive: true }
    ];

    const meshes = parts.map(p => {
      const m = new THREE.Mesh(p.geo, wireMat(accent));
      m.position.set(...p.pos);
      m.userData = { name: p.name, interactive: p.interactive };
      group.add(m);
      return p.interactive ? m : null;
    }).filter(Boolean);

    const raycaster = new THREE.Raycaster(), mouse = new THREE.Vector2();
    let hovered = null, active = null;

    const getHit = (e) => {
      const r = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - r.left) / r.width) * 2 - 1;
      mouse.y = -((e.clientY - r.top) / r.height) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      const hits = raycaster.intersectObjects(meshes);
      return hits.length ? hits[0].object : null;
    };

    form.addEventListener('pointermove', (e) => {
      const hit = getHit(e);
      document.body.style.cursor = hit ? 'pointer' : 'default';
      if (hit !== hovered) {
        if (hovered && hovered !== active) hovered.material.color.setHex(accent);
        hovered = hit;
        if (hovered && hovered !== active) hovered.material.color.setHex(hover);
      }
    });

    form.addEventListener('pointerdown', (e) => {
      const hit = getHit(e);
      if (hit) {
        if (active) active.material.color.setHex(accent);
        active = hit;
        active.material.color.setHex(selected);
        window.selectLocationFallback(active.userData.name);
      }
    });

    const confirmBtn = document.getElementById('confirm-location-btn');
    if (confirmBtn) {
      confirmBtn.addEventListener('click', () => {
        const i = document.getElementById('localizacao-input');
        if (i && i.value !== 'Não especificado') {
          const nameIn = document.querySelector('input[name="nome"]');
          if (nameIn) nameIn.focus();
        } else {
          alert('Por favor, toque em uma parte do modelo 3D (Ombro, Antebraço ou Perna) para selecionar.');
        }
      });
    }

    const anim = () => { requestAnimationFrame(anim); group.rotation.y += 0.005; renderer.render(scene, camera); };
    anim();
  }
});
