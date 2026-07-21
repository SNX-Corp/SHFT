/* ==========================================================================
   05 / THREE.JS DRAG VIEWER (landonorris.com "Helmet Hall of Fame" trick)
   Extruded brand bolt, studio lighting, drag-to-rotate with inertia,
   idle spin, float bob, plus scroll-linked rotation while the section
   passes through the viewport.
   ========================================================================== */
(function () {
  'use strict';

  var canvas = document.getElementById('boltCanvas');
  if (!canvas || !window.THREE) return;
  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
  } catch (e) { return; }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
  camera.position.set(0, 0, 17);

  /* bolt outline, same polygon as the inline SVG mark, centered */
  var pts = [
    [8, 50], [-22, -6], [-4, -6], [-14, -50], [22, 12], [2, 12], [16, 50]
  ];
  var shape = new THREE.Shape();
  shape.moveTo(pts[0][0] / 9, pts[0][1] / 9);
  for (var i = 1; i < pts.length; i++) shape.lineTo(pts[i][0] / 9, pts[i][1] / 9);
  shape.closePath();

  var geo = new THREE.ExtrudeGeometry(shape, {
    depth: 1.6,
    bevelEnabled: true,
    bevelThickness: 0.22,
    bevelSize: 0.18,
    bevelSegments: 3,
    curveSegments: 4
  });
  geo.center();

  var mat = new THREE.MeshStandardMaterial({
    color: 0xA6FF00,
    metalness: 0.5,
    roughness: 0.3,
    emissive: 0x142000,
    flatShading: false
  });

  var bolt = new THREE.Mesh(geo, mat);
  var group = new THREE.Group();
  group.add(bolt);

  // dark edge lines for that machined, drafted look
  var edges = new THREE.LineSegments(
    new THREE.EdgesGeometry(geo, 18),
    new THREE.LineBasicMaterial({ color: 0x0e1400, transparent: true, opacity: 0.5 })
  );
  bolt.add(edges);
  scene.add(group);

  var key = new THREE.DirectionalLight(0xffffff, 2.4);
  key.position.set(4, 6, 8);
  scene.add(key);
  var rim = new THREE.DirectionalLight(0xA6FF00, 1.6);
  rim.position.set(-6, -2, -6);
  scene.add(rim);
  scene.add(new THREE.AmbientLight(0xffffff, 0.5));

  /* ---------- drag with inertia ---------------------------------------- */
  var dragging = false;
  var lastX = 0, lastY = 0;
  var velX = 0, velY = 0;
  var rotX = -0.15, rotY = 0.5;

  canvas.addEventListener('pointerdown', function (e) {
    dragging = true;
    lastX = e.clientX; lastY = e.clientY;
    canvas.setPointerCapture(e.pointerId);
  });
  window.addEventListener('pointermove', function (e) {
    if (!dragging) return;
    velY = (e.clientX - lastX) * 0.006;
    velX = (e.clientY - lastY) * 0.004;
    lastX = e.clientX; lastY = e.clientY;
    rotY += velY; rotX += velX;
  });
  window.addEventListener('pointerup', function () { dragging = false; });

  /* ---------- sizing / visibility --------------------------------------- */
  var stage = canvas.parentElement;
  function resize() {
    var r = stage.getBoundingClientRect();
    renderer.setSize(r.width, r.height, false);
    camera.aspect = r.width / Math.max(r.height, 1);
    camera.updateProjectionMatrix();
  }
  window.addEventListener('resize', resize);
  resize();

  var visible = true;
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      visible = entries[0].isIntersecting;
    }).observe(stage);
  }

  var lastScroll = window.scrollY || 0;
  var clock = new THREE.Clock();

  function frame() {
    requestAnimationFrame(frame);
    if (!visible) return;
    var t = clock.getElapsedTime();

    // scroll-linked spin: scrolling past the section turns the part over
    var sc = window.scrollY || 0;
    rotY += (sc - lastScroll) * 0.0012;
    lastScroll = sc;

    if (!dragging) {
      velX *= 0.94; velY *= 0.94; // inertia decay
      rotY += velY + 0.003;       // idle rotation
      rotX += velX;
    }
    rotX = Math.max(-1.1, Math.min(1.1, rotX));

    group.rotation.set(rotX, rotY, 0);
    group.position.y = prefersReduced ? 0 : Math.sin(t * 1.1) * 0.35; // float bob
    renderer.render(scene, camera);
  }
  frame();
})();
