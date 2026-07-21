/* ==========================================================================
   01 / WEBGL LIQUID TRAIL MASK (the landonorris.com signature effect)
   The pointer paints into a ping-pong framebuffer. That trail texture
   drives a gooey mask that blends two procedural "scenes": the dark
   ground and a hidden signature-green layer. Trail advects with noise
   and decays every frame, so blobs stretch, merge and melt away.
   ========================================================================== */
(function () {
  'use strict';

  var canvas = document.getElementById('fluidCanvas');
  if (!canvas || !window.THREE) return;
  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: false, alpha: false });
  } catch (e) { return; }

  var hero = canvas.parentElement;
  var dpr = Math.min(window.devicePixelRatio || 1, 2);
  renderer.setPixelRatio(dpr);

  var scene = new THREE.Scene();
  var camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  var quad = new THREE.PlaneGeometry(2, 2);

  /* ---------- procedural scene textures (brand art, no binary assets) --- */
  function drawScene(green) {
    var c = document.createElement('canvas');
    var w = 1600, h = 1000;
    c.width = w; c.height = h;
    var x = c.getContext('2d');

    x.fillStyle = green ? '#A6FF00' : '#1A1A1A';
    x.fillRect(0, 0, w, h);

    // brand dot grid, 8 to 22 percent opacity per the guide
    x.fillStyle = green ? 'rgba(26,26,26,0.20)' : 'rgba(166,255,0,0.14)';
    for (var gy = 20; gy < h; gy += 34) {
      for (var gx = 20; gx < w; gx += 34) {
        x.fillRect(gx, gy, 3, 3);
      }
    }

    // speed slashes, hard angles
    x.save();
    x.translate(w - 260, h - 300);
    x.fillStyle = green ? 'rgba(26,26,26,0.85)' : 'rgba(166,255,0,0.85)';
    for (var i = 0; i < 3; i++) {
      x.save();
      x.transform(1, 0, -0.36, 1, i * 64, 0);
      x.globalAlpha = 1 - i * 0.32;
      x.fillRect(0, 0, 26, 190);
      x.restore();
    }
    x.restore();

    // oversized watermark wordmark
    x.font = '900 300px Orbitron, "Arial Black", sans-serif';
    x.textBaseline = 'middle';
    if (green) {
      x.fillStyle = 'rgba(26,26,26,0.92)';
      x.fillText('SHFT', 60, h * 0.62);
      x.font = '700 64px "Exo 2", Arial, sans-serif';
      x.fillText('S H I F T   T H E   S T A N D A R D', 70, h * 0.82);
    } else {
      x.strokeStyle = 'rgba(255,255,255,0.10)';
      x.lineWidth = 2;
      x.strokeText('SHFT', 60, h * 0.62);
    }
    return new THREE.CanvasTexture(c);
  }

  var texDark = drawScene(false);
  var texGreen = drawScene(true);

  // Orbitron arrives async: repaint the watermark once fonts are ready
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(function () {
      texDark.dispose(); texGreen.dispose();
      texDark = drawScene(false);
      texGreen = drawScene(true);
      compMat.uniforms.uSceneA.value = texDark;
      compMat.uniforms.uSceneB.value = texGreen;
    });
  }

  /* ---------- ping-pong trail simulation ------------------------------- */
  var simW = 1, simH = 1, rtA, rtB;
  function makeTargets() {
    var rect = hero.getBoundingClientRect();
    simW = Math.max(2, Math.round(rect.width * 0.5));
    simH = Math.max(2, Math.round(rect.height * 0.5));
    if (rtA) rtA.dispose();
    if (rtB) rtB.dispose();
    var opts = {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      format: THREE.RGBAFormat,
      depthBuffer: false,
      stencilBuffer: false
    };
    rtA = new THREE.WebGLRenderTarget(simW, simH, opts);
    rtB = new THREE.WebGLRenderTarget(simW, simH, opts);
  }

  var simMat = new THREE.ShaderMaterial({
    uniforms: {
      uPrev: { value: null },
      uMouse: { value: new THREE.Vector2(-1, -1) },
      uPrevMouse: { value: new THREE.Vector2(-1, -1) },
      uSpeed: { value: 0 },
      uAspect: { value: 1 },
      uTime: { value: 0 }
    },
    vertexShader: [
      'varying vec2 vUv;',
      'void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }'
    ].join('\n'),
    fragmentShader: [
      'precision highp float;',
      'varying vec2 vUv;',
      'uniform sampler2D uPrev;',
      'uniform vec2 uMouse; uniform vec2 uPrevMouse;',
      'uniform float uSpeed; uniform float uAspect; uniform float uTime;',

      'float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }',
      'float noise(vec2 p){',
      '  vec2 i = floor(p); vec2 f = fract(p); f = f * f * (3.0 - 2.0 * f);',
      '  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),',
      '             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y);',
      '}',

      // distance from point to the mouse segment, aspect-corrected
      'float segDist(vec2 p, vec2 a, vec2 b){',
      '  p.x *= uAspect; a.x *= uAspect; b.x *= uAspect;',
      '  vec2 pa = p - a, ba = b - a;',
      '  float t = clamp(dot(pa, ba) / max(dot(ba, ba), 1e-6), 0.0, 1.0);',
      '  return length(pa - ba * t);',
      '}',

      'void main(){',
      // advect: sample slightly along a noise flow so the trail goes liquid
      '  vec2 flow = vec2(noise(vUv * 6.0 + uTime * 0.15), noise(vUv * 6.0 - uTime * 0.12)) - 0.5;',
      '  float prev = texture2D(uPrev, vUv + flow * 0.004).r;',
      '  prev *= 0.955;', // decay
      '  float d = segDist(vUv, uPrevMouse, uMouse);',
      '  float radius = 0.045 + min(uSpeed * 0.35, 0.075);',
      '  float brush = 1.0 - smoothstep(0.0, radius, d);',
      '  float v = clamp(prev + brush * 0.55, 0.0, 1.0);',
      '  gl_FragColor = vec4(vec3(v), 1.0);',
      '}'
    ].join('\n')
  });

  var compMat = new THREE.ShaderMaterial({
    uniforms: {
      uTrail: { value: null },
      uSceneA: { value: texDark },
      uSceneB: { value: texGreen },
      uTime: { value: 0 },
      uRes: { value: new THREE.Vector2(1, 1) }
    },
    vertexShader: [
      'varying vec2 vUv;',
      'void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }'
    ].join('\n'),
    fragmentShader: [
      'precision highp float;',
      'varying vec2 vUv;',
      'uniform sampler2D uTrail, uSceneA, uSceneB;',
      'uniform float uTime; uniform vec2 uRes;',

      'float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }',
      'float noise(vec2 p){',
      '  vec2 i = floor(p); vec2 f = fract(p); f = f * f * (3.0 - 2.0 * f);',
      '  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),',
      '             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y);',
      '}',

      // cover-fit uv so scene art is not stretched
      'vec2 cover(vec2 uv, float texAspect, float scrAspect){',
      '  vec2 s = vec2(1.0);',
      '  if (scrAspect > texAspect) { s.y = texAspect / scrAspect; }',
      '  else { s.x = scrAspect / texAspect; }',
      '  return (uv - 0.5) * s + 0.5;',
      '}',

      'void main(){',
      '  float scrAspect = uRes.x / uRes.y;',
      '  vec2 suv = cover(vUv, 1.6, scrAspect);',
      // wobble the mask lookup: gooey, liquid edge
      '  vec2 warp = (vec2(noise(vUv * 9.0 + uTime * 0.4), noise(vUv * 9.0 - uTime * 0.3)) - 0.5) * 0.03;',
      '  float t = texture2D(uTrail, vUv + warp).r;',
      '  float mask = smoothstep(0.22, 0.52, t);',
      '  float edge = smoothstep(0.10, 0.24, t) * (1.0 - smoothstep(0.24, 0.55, t));',
      '  vec3 a = texture2D(uSceneA, suv).rgb;',
      '  vec3 b = texture2D(uSceneB, suv).rgb;',
      '  vec3 col = mix(a, b, mask);',
      '  col += vec3(0.651, 1.0, 0.0) * edge * 0.55;', // green rim at the blob edge
      // faint vignette to keep the type the hero
      '  float vig = smoothstep(1.25, 0.45, length(vUv - 0.5));',
      '  col *= mix(0.82, 1.0, vig);',
      '  gl_FragColor = vec4(col, 1.0);',
      '}'
    ].join('\n')
  });

  var mesh = new THREE.Mesh(quad, compMat);
  scene.add(mesh);

  /* ---------- pointer tracking ------------------------------------------ */
  var mouse = new THREE.Vector2(-1, -1);
  var prevMouse = new THREE.Vector2(-1, -1);
  var targetMouse = new THREE.Vector2(-1, -1);
  var hasPointer = false;

  function setPointer(clientX, clientY) {
    var rect = hero.getBoundingClientRect();
    if (clientY < rect.top || clientY > rect.bottom) return;
    targetMouse.set(
      (clientX - rect.left) / rect.width,
      1 - (clientY - rect.top) / rect.height
    );
    if (!hasPointer) { mouse.copy(targetMouse); prevMouse.copy(targetMouse); hasPointer = true; }
  }
  window.addEventListener('mousemove', function (e) { setPointer(e.clientX, e.clientY); }, { passive: true });
  window.addEventListener('touchmove', function (e) {
    if (e.touches.length) setPointer(e.touches[0].clientX, e.touches[0].clientY);
  }, { passive: true });

  /* ---------- sizing / visibility --------------------------------------- */
  function resize() {
    var rect = hero.getBoundingClientRect();
    renderer.setSize(rect.width, rect.height, false);
    compMat.uniforms.uRes.value.set(rect.width, rect.height);
    simMat.uniforms.uAspect.value = rect.width / Math.max(rect.height, 1);
    makeTargets();
  }
  var resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resize, 150);
  });
  resize();

  var visible = true;
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      visible = entries[0].isIntersecting;
    }).observe(hero);
  }

  /* ---------- idle drift: the blob wanders before first pointer move ---- */
  var idleT = Math.PI * 0.25;

  var clock = new THREE.Clock();
  function frame() {
    requestAnimationFrame(frame);
    if (!visible || prefersReduced) return;
    var t = clock.getElapsedTime();

    if (!hasPointer) {
      idleT += 0.004;
      targetMouse.set(
        0.5 + Math.cos(idleT) * 0.28,
        0.55 + Math.sin(idleT * 1.4) * 0.2
      );
      if (mouse.x < 0) { mouse.copy(targetMouse); prevMouse.copy(targetMouse); }
    }

    prevMouse.copy(mouse);
    mouse.lerp(targetMouse, 0.18);
    var speed = mouse.distanceTo(prevMouse);

    simMat.uniforms.uPrev.value = rtA.texture;
    simMat.uniforms.uMouse.value.copy(mouse);
    simMat.uniforms.uPrevMouse.value.copy(prevMouse);
    simMat.uniforms.uSpeed.value = speed;
    simMat.uniforms.uTime.value = t;

    mesh.material = simMat;
    renderer.setRenderTarget(rtB);
    renderer.render(scene, camera);
    renderer.setRenderTarget(null);

    var tmp = rtA; rtA = rtB; rtB = tmp;

    compMat.uniforms.uTrail.value = rtA.texture;
    compMat.uniforms.uTime.value = t;
    mesh.material = compMat;
    renderer.render(scene, camera);
  }
  frame();
})();
