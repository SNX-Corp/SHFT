/* ==========================================================================
   SHFT ROBOTICS / SHOWCASE ORCHESTRATION
   Lenis smooth scroll feeding GSAP ScrollTrigger, the exact pairing
   used on landonorris.com. Everything else in here is one of the
   site's interaction tricks, labeled per section.
   ========================================================================== */
(function () {
  'use strict';

  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var isTouch = window.matchMedia('(hover: none), (pointer: coarse)').matches;

  if (!window.gsap) return;
  gsap.registerPlugin(ScrollTrigger);

  document.body.classList.add('is-loading');

  /* ========================================================================
     LENIS SMOOTH SCROLL + SCROLLTRIGGER SYNC
     ======================================================================== */
  var lenis = null;
  if (window.Lenis && !prefersReduced) {
    lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1, touchMultiplier: 1.6 });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(function (time) { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);
    lenis.stop();
  }

  function scrollTo(target, immediate) {
    if (lenis) lenis.scrollTo(target, { immediate: !!immediate, offset: 0 });
    else {
      var el = document.querySelector(target);
      if (el) el.scrollIntoView();
    }
  }

  /* ========================================================================
     TEXT SPLITTING HELPERS (SplitText, hand-rolled)
     ======================================================================== */
  function splitChars(el) {
    var text = el.textContent;
    el.textContent = '';
    var frag = document.createDocumentFragment();
    for (var i = 0; i < text.length; i++) {
      var s = document.createElement('span');
      s.className = 'char';
      s.textContent = text[i];
      if (text[i] === ' ') s.style.whiteSpace = 'pre';
      frag.appendChild(s);
    }
    el.appendChild(frag);
    return el.querySelectorAll('.char');
  }

  function splitLines(el) {
    var words = el.textContent.split(/\s+/).filter(Boolean);
    el.textContent = '';
    words.forEach(function (w) {
      var s = document.createElement('span');
      s.textContent = w + ' ';
      s.style.display = 'inline-block';
      el.appendChild(s);
    });
    var rows = [], lastTop = null;
    el.querySelectorAll('span').forEach(function (s) {
      var top = s.offsetTop;
      if (top !== lastTop) { rows.push([]); lastTop = top; }
      rows[rows.length - 1].push(s);
    });
    el.textContent = '';
    var inners = [];
    rows.forEach(function (row) {
      var line = document.createElement('span');
      line.className = 'line';
      var inner = document.createElement('span');
      inner.className = 'line-inner';
      inner.textContent = row.map(function (s) { return s.textContent.trim(); }).join(' ');
      line.appendChild(inner);
      el.appendChild(line);
      inners.push(inner);
    });
    return inners;
  }

  /* ========================================================================
     01 / PRELOADER -> HERO INTRO
     ======================================================================== */
  var heroChars = [];
  document.querySelectorAll('[data-split]').forEach(function (el) {
    heroChars.push(splitChars(el));
  });

  function heroIntro() {
    var tl = gsap.timeline();
    heroChars.forEach(function (chars, i) {
      tl.from(chars, {
        yPercent: 120,
        duration: 1,
        ease: 'power4.out',
        stagger: 0.028
      }, 0.12 * i);
    });
    tl.from('[data-intro]', {
      y: 24, autoAlpha: 0,
      duration: 0.8, ease: 'power3.out', stagger: 0.1
    }, 0.5);
    tl.from('.hero__corner-slashes span', {
      scaleY: 0, transformOrigin: 'bottom',
      duration: 0.6, ease: 'power3.out', stagger: 0.08
    }, 0.7);
    return tl;
  }

  var preloader = document.getElementById('preloader');
  if (preloader && !prefersReduced) {
    gsap.set('.hero__scrollcue', { autoAlpha: 0 });
    var count = { v: 0 };
    var countEl = document.getElementById('preloaderCount');
    var loadTl = gsap.timeline({
      onComplete: function () {
        document.body.classList.remove('is-loading');
        if (lenis) lenis.start();
        heroIntro();
        gsap.to('.hero__scrollcue', { autoAlpha: 1, duration: 0.6, delay: 1.2 });
      }
    });
    loadTl
      .from('.preloader__word, .preloader__sub', { yPercent: 60, autoAlpha: 0, duration: 0.7, ease: 'power3.out', stagger: 0.12 })
      .to(count, {
        v: 100, duration: 1.6, ease: 'power2.inOut',
        onUpdate: function () { countEl.textContent = Math.round(count.v); }
      }, 0.2)
      .to('#preloaderBar', { scaleX: 1, duration: 1.6, ease: 'power2.inOut' }, 0.2)
      .to('.preloader__curtain', { scaleY: 1, transformOrigin: 'bottom', duration: 0.5, ease: 'power3.in' }, '+=0.15')
      .to(preloader, { yPercent: -100, duration: 0.8, ease: 'power4.inOut' })
      .set(preloader, { display: 'none' });
  } else {
    if (preloader) preloader.style.display = 'none';
    document.body.classList.remove('is-loading');
    if (lenis) lenis.start();
    if (!prefersReduced) heroIntro();
  }

  /* ========================================================================
     02 / CUSTOM CURSOR (dot + lagging ring, grows on targets)
     ======================================================================== */
  if (!isTouch && !prefersReduced) {
    var dot = document.getElementById('cursorDot');
    var ring = document.getElementById('cursorRing');
    var label = document.getElementById('cursorLabel');
    var mx = -100, my = -100, rx = -100, ry = -100;

    window.addEventListener('mousemove', function (e) {
      mx = e.clientX; my = e.clientY;
    }, { passive: true });

    gsap.ticker.add(function () {
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      gsap.set(dot, { x: mx - 3, y: my - 3 });
      gsap.set(ring, { x: rx - ring.offsetWidth / 2, y: ry - ring.offsetHeight / 2 });
    });

    document.querySelectorAll('[data-cursor], [data-cursor-label]').forEach(function (el) {
      el.addEventListener('mouseenter', function () {
        ring.classList.add('is-active');
        var txt = el.getAttribute('data-cursor-label');
        if (txt) { label.textContent = txt; ring.classList.add('has-label'); }
      });
      el.addEventListener('mouseleave', function () {
        ring.classList.remove('is-active', 'has-label');
      });
    });
  }

  /* ========================================================================
     NAV : hide on scroll down, solid after threshold
     ======================================================================== */
  var nav = document.getElementById('nav');
  var lastY = 0;
  function onScrollPos(y) {
    nav.classList.toggle('is-solid', y > 80);
    if (y > lastY && y > 240 && !document.body.classList.contains('menu-open')) {
      nav.classList.add('is-hidden');
    } else {
      nav.classList.remove('is-hidden');
    }
    lastY = y;
  }
  if (lenis) lenis.on('scroll', function (e) { onScrollPos(e.scroll); });
  else window.addEventListener('scroll', function () { onScrollPos(window.scrollY); }, { passive: true });

  /* ========================================================================
     FULLSCREEN MENU (staggered oversized links)
     ======================================================================== */
  var menu = document.getElementById('menu');
  var menuBtn = document.getElementById('menuBtn');
  var menuOpen = false;
  var menuTl = gsap.timeline({ paused: true });
  menuTl
    .set(menu, { visibility: 'visible' })
    .to('.menu__bg', { scaleY: 1, duration: 0.55, ease: 'power4.inOut' })
    .from('.menu__link', { yPercent: 120, autoAlpha: 0, duration: 0.6, ease: 'power3.out', stagger: 0.07 }, '-=0.15')
    .from('.menu__tag, .menu__foot', { autoAlpha: 0, duration: 0.4 }, '-=0.3');

  function toggleMenu(force) {
    menuOpen = typeof force === 'boolean' ? force : !menuOpen;
    document.body.classList.toggle('menu-open', menuOpen);
    menu.classList.toggle('is-open', menuOpen);
    menuBtn.setAttribute('aria-expanded', String(menuOpen));
    if (menuOpen) { menuTl.timeScale(1).play(); if (lenis) lenis.stop(); }
    else { menuTl.timeScale(1.6).reverse(); if (lenis && !document.body.classList.contains('is-loading')) lenis.start(); }
  }
  menuBtn.addEventListener('click', function () { toggleMenu(); });
  document.querySelectorAll('[data-menu-close]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      e.preventDefault();
      toggleMenu(false);
      setTimeout(function () { scrollTo(a.getAttribute('href')); }, 450);
    });
  });

  /* ========================================================================
     03 / PAGE TRANSITION WIPE (staggered panels + emblem flash)
     ======================================================================== */
  var transitioning = false;
  function runTransition(target) {
    if (transitioning) return;
    transitioning = true;
    var tl = gsap.timeline({ onComplete: function () { transitioning = false; } });
    tl.set('.transition__panel', { transformOrigin: 'bottom', scaleY: 0 })
      .to('.transition__panel', { scaleY: 1, duration: 0.45, ease: 'power4.in', stagger: 0.07 })
      .to('.transition__emblem', { opacity: 1, duration: 0.15 }, '-=0.1')
      .add(function () { scrollTo(target, true); })
      .to('.transition__emblem', { opacity: 0, duration: 0.2 }, '+=0.25')
      .set('.transition__panel', { transformOrigin: 'top' })
      .to('.transition__panel', { scaleY: 0, duration: 0.5, ease: 'power4.out', stagger: 0.07 });
  }
  document.querySelectorAll('[data-transition]').forEach(function (el) {
    el.addEventListener('click', function (e) {
      e.preventDefault();
      if (prefersReduced) { scrollTo(el.getAttribute('data-transition'), true); return; }
      runTransition(el.getAttribute('data-transition'));
    });
  });

  /* ========================================================================
     05 / VELOCITY-REACTIVE MARQUEE
     Fill the track wide enough, loop it with a wrapping xPercent tween,
     then push timeScale and skew with live scroll velocity.
     ======================================================================== */
  document.querySelectorAll('[data-marquee]').forEach(function (mq) {
    var track = mq.querySelector('.marquee__track');
    var item = mq.querySelector('.marquee__item');
    var dir = parseInt(mq.getAttribute('data-marquee-dir') || '1', 10);

    var copies = Math.max(3, Math.ceil((window.innerWidth * 2) / Math.max(item.offsetWidth, 1)));
    for (var i = 0; i < copies; i++) track.appendChild(item.cloneNode(true));

    var itemW = item.offsetWidth;
    var loop = gsap.to(track, {
      x: dir === 1 ? -itemW : 0,
      duration: 14,
      ease: 'none',
      repeat: -1,
      onReverseComplete: function () { loop.progress(1); }
    });
    if (dir === -1) gsap.set(track, { x: -itemW });

    if (!prefersReduced) {
      var proxySkew = gsap.quickTo(mq, 'skewX', { duration: 0.4, ease: 'power2.out' });
      gsap.ticker.add(function () {
        var v = lenis ? lenis.velocity : 0;
        loop.timeScale(1 + Math.min(Math.abs(v) * 0.06, 3));
        proxySkew(gsap.utils.clamp(-6, 6, v * -0.18));
      });
    }
  });

  if (prefersReduced) return; // everything below is motion

  /* ========================================================================
     06 / MANIFESTO : scrubbed line masks + outline fill
     ======================================================================== */
  document.querySelectorAll('[data-lines]').forEach(function (p) {
    var inners = splitLines(p);
    gsap.from(inners, {
      yPercent: 110,
      stagger: 0.15,
      ease: 'none',
      scrollTrigger: {
        trigger: p,
        start: 'top 88%',
        end: 'top 40%',
        scrub: true
      }
    });
  });

  gsap.fromTo('#giantFill',
    { clipPath: 'inset(0 100% 0 0)' },
    {
      clipPath: 'inset(0 0% 0 0)',
      ease: 'none',
      scrollTrigger: {
        trigger: '.manifesto__giant',
        start: 'top 85%',
        end: 'bottom 35%',
        scrub: true
      }
    });

  /* ========================================================================
     07 / STATS COUNT-UP
     ======================================================================== */
  document.querySelectorAll('[data-count]').forEach(function (el) {
    var target = parseInt(el.getAttribute('data-count'), 10);
    var obj = { v: 0 };
    ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true,
      onEnter: function () {
        gsap.to(obj, {
          v: target,
          duration: 1.6,
          ease: 'power3.out',
          onUpdate: function () { el.textContent = Math.round(obj.v); }
        });
      }
    });
  });

  /* ========================================================================
     Titles that split-stagger in on scroll
     ======================================================================== */
  document.querySelectorAll('[data-split-scroll]').forEach(function (el) {
    var chars = splitChars(el);
    gsap.from(chars, {
      yPercent: 120, autoAlpha: 0,
      duration: 0.8, ease: 'power4.out', stagger: 0.03,
      scrollTrigger: { trigger: el, start: 'top 85%', once: true }
    });
  });

  /* ========================================================================
     09 / HALL OF MACHINES : pinned horizontal scrub + inner parallax
     ======================================================================== */
  var track = document.getElementById('hallTrack');
  if (track) {
    var getDistance = function () { return track.scrollWidth - window.innerWidth; };
    var hallTween = gsap.to(track, {
      x: function () { return -getDistance(); },
      ease: 'none',
      scrollTrigger: {
        trigger: '.hall',
        start: 'top top',
        end: function () { return '+=' + getDistance(); },
        pin: '.hall__pin',
        scrub: 1,
        invalidateOnRefresh: true,
        onUpdate: function (self) {
          gsap.set('#hallBar', { scaleX: self.progress });
        }
      }
    });

    document.querySelectorAll('[data-hall-parallax] img').forEach(function (img) {
      gsap.fromTo(img, { xPercent: -6 }, {
        xPercent: 6,
        ease: 'none',
        scrollTrigger: {
          trigger: img.closest('.mcard'),
          containerAnimation: hallTween,
          start: 'left right',
          end: 'right left',
          scrub: true
        }
      });
    });
  }

  /* ========================================================================
     10 / REVEAL GRID : clip-path wipe + inner scale parallax
     ======================================================================== */
  document.querySelectorAll('[data-reveal]').forEach(function (fig) {
    var mask = fig.querySelector('.rimg__mask');
    var img = mask.querySelector('img');
    gsap.to(mask, {
      clipPath: 'inset(0% 0 0 0)',
      duration: 1.2,
      ease: 'power4.inOut',
      scrollTrigger: { trigger: fig, start: 'top 82%', once: true }
    });
    gsap.fromTo(img, { scale: 1.25, yPercent: -6 }, {
      scale: 1.02, yPercent: 6,
      ease: 'none',
      scrollTrigger: { trigger: fig, start: 'top bottom', end: 'bottom top', scrub: true }
    });
  });

  /* ========================================================================
     11 / MAGNETIC ELEMENTS
     ======================================================================== */
  if (!isTouch) {
    document.querySelectorAll('[data-magnetic]').forEach(function (el) {
      var xTo = gsap.quickTo(el, 'x', { duration: 0.4, ease: 'power3.out' });
      var yTo = gsap.quickTo(el, 'y', { duration: 0.4, ease: 'power3.out' });
      el.addEventListener('mousemove', function (e) {
        var r = el.getBoundingClientRect();
        xTo((e.clientX - (r.left + r.width / 2)) * 0.35);
        yTo((e.clientY - (r.top + r.height / 2)) * 0.35);
      });
      el.addEventListener('mouseleave', function () {
        gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.35)' });
      });
    });
  }

  /* ========================================================================
     11 / TEXT SCRAMBLE ON HOVER
     ======================================================================== */
  var GLYPHS = 'SHFT#/<>10X_';
  document.querySelectorAll('[data-scramble]').forEach(function (el) {
    var original = el.textContent;
    var frame = 0, raf = null;
    function scramble() {
      var out = '';
      for (var i = 0; i < original.length; i++) {
        if (original[i] === ' ') { out += ' '; continue; }
        out += i < frame / 2
          ? original[i]
          : GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
      }
      el.textContent = out;
      frame++;
      if (frame / 2 <= original.length) raf = requestAnimationFrame(scramble);
      else el.textContent = original;
    }
    el.addEventListener('mouseenter', function () {
      cancelAnimationFrame(raf);
      frame = 0;
      scramble();
    });
  });

  /* ========================================================================
     11 / RIVE-STYLE VECTOR MOTION LOOP (scripted SVG stand-in)
     ======================================================================== */
  var emblem = document.getElementById('riveEmblem');
  if (emblem) {
    var ringDash = emblem.querySelector('.rive-emblem__ring--dash');
    var solidRing = emblem.querySelector('.rive-emblem__ring');
    var boltPoly = emblem.querySelector('.rive-emblem__bolt');
    var C = 2 * Math.PI * 86;
    solidRing.style.strokeDasharray = C;
    solidRing.style.strokeDashoffset = C;

    gsap.timeline({ repeat: -1, repeatDelay: 0.4, defaults: { ease: 'power2.inOut' } })
      .to(solidRing, { strokeDashoffset: 0, duration: 1.6 })
      .fromTo(boltPoly, { scale: 0.85, opacity: 0.5 }, { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(2)' }, '-=0.5')
      .to(boltPoly, { scale: 0.92, duration: 0.35, yoyo: true, repeat: 3 }, '+=0.2')
      .to(solidRing, { strokeDashoffset: -C, duration: 1.4 }, '+=0.4');

    gsap.to(ringDash, { rotation: 360, svgOrigin: '100 100', duration: 12, ease: 'none', repeat: -1 });
  }

  /* ========================================================================
     12 / ON TRACK rows stagger in
     ======================================================================== */
  gsap.from('.trow:not(.trow--head)', {
    autoAlpha: 0, y: 28,
    duration: 0.7, ease: 'power3.out', stagger: 0.09,
    scrollTrigger: { trigger: '.ontrack__table', start: 'top 82%', once: true }
  });

  /* ========================================================================
     13 / FOOTER giant wordmark scrub
     ======================================================================== */
  gsap.fromTo('#footerGiant', { yPercent: 42 }, {
    yPercent: 0,
    ease: 'none',
    scrollTrigger: { trigger: '.footer', start: 'top bottom', end: 'bottom bottom', scrub: true }
  });

  window.addEventListener('load', function () { ScrollTrigger.refresh(); });
})();
