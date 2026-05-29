import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
gsap.ticker.lagSmoothing(0);
document.documentElement.classList.add('gsap-ready');

/* ------------------------------------------------------------------ */
/*  Reduced-motion bail-out                                           */
/* ------------------------------------------------------------------ */

const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)',
).matches;

function setupHeroRobotZoom() {
  const hero = document.querySelector<HTMLElement>('[data-hero]');
  const trigger = document.querySelector<HTMLButtonElement>('[data-hero-zoom-trigger]');
  const reset = document.querySelector<HTMLButtonElement>('[data-hero-reset]');
  const bg = document.querySelector<HTMLElement>('[data-hero-bg]');
  const shade = document.querySelector<HTMLElement>('[data-hero-shade]');
  const grid = document.querySelector<HTMLElement>('[data-hero-grid]');
  const target = document.querySelector<HTMLElement>('[data-hero-target]');
  const scan = document.querySelector<HTMLElement>('[data-hero-scan]');
  const copy = document.querySelector<HTMLElement>('[data-hero-copy]');
  const scroll = document.querySelector<HTMLElement>('[data-hero-scroll]');

  if (!hero || !trigger || !reset || !bg || !shade || !grid || !target || !scan || !copy) {
    return;
  }

  const isMobile = window.matchMedia('(max-width: 767px)').matches;
  const zoomScale = isMobile ? 2.55 : 3.65;
  const zoomX = isMobile ? '0vw' : '-11vw';
  const zoomY = isMobile ? '6vh' : '4vh';
  const duration = prefersReducedMotion ? 0 : 1.15;
  let isFocused = false;
  let activeTl: gsap.core.Timeline | undefined;

  const setFocused = (nextFocused: boolean) => {
    if (isFocused === nextFocused) return;

    isFocused = nextFocused;
    activeTl?.kill();
    hero.classList.toggle('is-robot-focus', isFocused);
    trigger.setAttribute('aria-expanded', String(isFocused));

    activeTl = gsap.timeline({
      defaults: { ease: 'power3.inOut' },
      onComplete: () => {
        if (isFocused) reset.focus({ preventScroll: true });
      },
    });

    if (isFocused) {
      activeTl
        .to(copy, { x: -42, opacity: 0, filter: 'blur(8px)', duration: duration * 0.45 }, 0)
        .to(scroll ?? [], { opacity: 0, duration: duration * 0.28 }, 0)
        .to(target, { scale: 1.75, opacity: 0, duration: duration * 0.42 }, 0)
        .to(shade, { opacity: 0.42, duration: duration * 0.7 }, 0)
        .to(grid, { opacity: 0.18, duration: duration * 0.7 }, 0)
        .to(scan, { opacity: 0.62, duration: duration * 0.52 }, duration * 0.3)
        .to(
          bg,
          {
            scale: zoomScale,
            x: zoomX,
            y: zoomY,
            rotateX: -2.5,
            rotateY: 4,
            filter: 'contrast(1.13) saturate(1.08)',
            duration,
          },
          0,
        )
        .to(reset, { opacity: 1, duration: duration * 0.3 }, duration * 0.58);
      return;
    }

    activeTl
      .to(reset, { opacity: 0, duration: duration * 0.22 }, 0)
      .to(scan, { opacity: 0, duration: duration * 0.25 }, 0)
      .to(
        bg,
        {
          scale: 1,
          x: 0,
          y: 0,
          rotateX: 0,
          rotateY: 0,
          filter: 'contrast(1) saturate(1)',
          duration: duration * 0.82,
        },
        0,
      )
      .to(shade, { opacity: 1, duration: duration * 0.55 }, 0)
      .to(grid, { opacity: 0.06, duration: duration * 0.55 }, 0)
      .to(target, { scale: 1, opacity: 0.82, duration: duration * 0.45 }, duration * 0.2)
      .to(copy, { x: 0, opacity: 1, filter: 'blur(0px)', duration: duration * 0.52 }, duration * 0.26)
      .to(scroll ?? [], { opacity: 1, duration: duration * 0.25 }, duration * 0.5);
  };

  trigger.addEventListener('click', () => setFocused(!isFocused));
  reset.addEventListener('click', (event) => {
    event.stopPropagation();
    setFocused(false);
    trigger.focus({ preventScroll: true });
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && isFocused) {
      setFocused(false);
    }
  });
}

setupHeroRobotZoom();

if (prefersReducedMotion) {
  // Make everything visible immediately - no animations
  gsap.set(
    [
      '[data-hero-splash]',
      '[data-hero-eyebrow]',
      '[data-hero-word]',
      '[data-hero-sub]',
      '[data-hero-cta]',
      '[data-hero-scroll]',
      '[data-about-heading]',
      '[data-about-text]',
      '[data-about-metric]',
      '[data-value-row]',
      '[data-robot-image]',
      '[data-robot-spec]',
      '[data-team-card]',
      '[data-team-quote]',
      '[data-timeline-line]',
      '[data-timeline-item]',
      '[data-sponsor-card]',
      '[data-gallery-item]',
      '[data-recruit-eyebrow]',
      '[data-recruit-heading]',
      '[data-recruit-sub]',
      '[data-recruit-cta]',
      '[data-page-reveal]',
      '[data-card-reveal]',
    ].join(','),
    { opacity: 1, y: 0, x: 0, scale: 1, clearProps: 'all' },
  );
} else {
  /* ---------------------------------------------------------------- */
  /*  Initial hidden states                                           */
  /* ---------------------------------------------------------------- */

  // Hero
  gsap.set('[data-hero-splash]', { scale: 1.3, opacity: 0 });
  gsap.set('[data-hero-eyebrow]', { y: 20, opacity: 0 });
  gsap.set('[data-hero-word]', { yPercent: 100 });
  gsap.set('[data-hero-sub]', { y: 20, opacity: 0 });
  gsap.set('[data-hero-cta]', { y: 20, opacity: 0 });
  gsap.set('[data-hero-scroll]', { opacity: 0 });

  // About
  gsap.set('[data-about-heading]', { y: 40, opacity: 0 });
  gsap.set('[data-about-text]', { y: 30, opacity: 0 });
  gsap.set('[data-about-metric]', { y: 30, opacity: 0 });

  // Values
  gsap.set('[data-value-row]', { opacity: 0 });

  // Robot
  gsap.set('[data-robot-image]', { scale: 1.05, opacity: 0 });
  gsap.set('[data-robot-spec]', { x: -30, opacity: 0 });

  // Team
  gsap.set('[data-team-card]', { y: 30, opacity: 0 });
  gsap.set('[data-team-quote]', { y: 20, opacity: 0 });

  // Timeline
  gsap.set('[data-timeline-line]', { scaleY: 0, transformOrigin: 'top' });
  gsap.set('[data-timeline-item]', { x: -20, opacity: 0 });

  // Sponsors
  gsap.set('[data-sponsor-card]', { opacity: 0, scale: 0.95 });

  // Gallery
  gsap.set('[data-gallery-item]', { y: 20, opacity: 0 });

  // Recruit
  gsap.set('[data-recruit-eyebrow]', { y: 20, opacity: 0 });
  gsap.set('[data-recruit-heading]', { y: 20, opacity: 0 });
  gsap.set('[data-recruit-sub]', { y: 20, opacity: 0 });
  gsap.set('[data-recruit-cta]', { y: 20, opacity: 0 });

  // Current launch page sections
  const nonHeroSections = gsap.utils.toArray<HTMLElement>('section:not(#hero)');
  nonHeroSections.forEach((section) => {
    const heading = section.querySelector('h2');
    const intro = section.querySelector(':scope > div > p, :scope > div > div > p');
    const cards = section.querySelectorAll(':scope article, :scope .grid > div, :scope button, :scope [class*="border"]');

    if (heading) heading.setAttribute('data-page-reveal', '');
    if (intro) intro.setAttribute('data-page-reveal', '');
    cards.forEach((card) => card.setAttribute('data-card-reveal', ''));
  });

  gsap.set('[data-page-reveal]', { y: 28 });
  gsap.set('[data-card-reveal]', { y: 24 });

  /* ---------------------------------------------------------------- */
  /*  1. HERO - plays on page load (no ScrollTrigger)                 */
  /* ---------------------------------------------------------------- */

  const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  heroTl
    // Green splash
    .to('[data-hero-splash]', {
      scale: 1,
      opacity: 0.9,
      duration: 1.2,
      ease: 'power2.out',
    })
    // Eyebrow
    .to(
      '[data-hero-eyebrow]',
      { y: 0, opacity: 1, duration: 0.6 },
      0.4,
    )
    // Words stagger up
    .to(
      '[data-hero-word]',
      {
        yPercent: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
      },
      0.3,
    )
    // Subtitle - after words finish (0.3 start + 0.8 dur + 2*0.15 stagger = ~1.4)
    .to(
      '[data-hero-sub]',
      { y: 0, opacity: 1, duration: 0.6 },
      '>-0.1',
    )
    // CTAs
    .to(
      '[data-hero-cta]',
      { y: 0, opacity: 1, duration: 0.6 },
      '>-0.1',
    )
    // Scroll indicator - last
    .to('[data-hero-scroll]', { opacity: 1, duration: 0.5 });

  /* ---------------------------------------------------------------- */
  /*  2. ABOUT                                                        */
  /* ---------------------------------------------------------------- */

  const aboutHeading = document.querySelector('[data-about-heading]');
  if (aboutHeading) {
    gsap.to('[data-about-heading]', {
      y: 0,
      opacity: 1,
      duration: 0.8,
      scrollTrigger: {
        trigger: '[data-about-heading]',
        start: 'top 80%',
      },
    });
  }

  const aboutText = document.querySelector('[data-about-text]');
  if (aboutText) {
    gsap.to('[data-about-text]', {
      y: 0,
      opacity: 1,
      duration: 0.7,
      delay: 0.2,
      scrollTrigger: {
        trigger: '[data-about-text]',
        start: 'top 80%',
      },
    });
  }

  const aboutMetrics = gsap.utils.toArray<HTMLElement>('[data-about-metric]');
  if (aboutMetrics.length) {
    gsap.to(aboutMetrics, {
      y: 0,
      opacity: 1,
      duration: 0.6,
      stagger: 0.15,
      scrollTrigger: {
        trigger: aboutMetrics[0],
        start: 'top 80%',
      },
    });
  }

  /* ---------------------------------------------------------------- */
  /*  3. VALUES                                                       */
  /* ---------------------------------------------------------------- */

  const valueRows = gsap.utils.toArray<HTMLElement>('[data-value-row]');
  valueRows.forEach((row, i) => {
    const fromX = i % 2 === 0 ? -60 : 60;
    gsap.fromTo(
      row,
      { x: fromX, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.7,
        scrollTrigger: {
          trigger: row,
          start: 'top 80%',
        },
        delay: i * 0.1,
      },
    );
  });

  /* ---------------------------------------------------------------- */
  /*  4. ROBOT                                                        */
  /* ---------------------------------------------------------------- */

  const robotImage = document.querySelector('[data-robot-image]');
  if (robotImage) {
    gsap.to('[data-robot-image]', {
      scale: 1,
      opacity: 1,
      duration: 1,
      scrollTrigger: {
        trigger: '[data-robot-image]',
        start: 'top 80%',
      },
    });
  }

  const robotSpecs = gsap.utils.toArray<HTMLElement>('[data-robot-spec]');
  if (robotSpecs.length) {
    gsap.to(robotSpecs, {
      x: 0,
      opacity: 1,
      duration: 0.6,
      stagger: 0.1,
      scrollTrigger: {
        trigger: robotSpecs[0],
        start: 'top 80%',
      },
    });
  }

  /* ---------------------------------------------------------------- */
  /*  5. TEAM                                                         */
  /* ---------------------------------------------------------------- */

  const teamCards = gsap.utils.toArray<HTMLElement>('[data-team-card]');
  if (teamCards.length) {
    ScrollTrigger.batch(teamCards, {
      start: 'top 80%',
      onEnter: (batch) => {
        gsap.to(batch, {
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          overwrite: true,
        });
      },
    });
  }

  const teamQuote = document.querySelector('[data-team-quote]');
  if (teamQuote) {
    gsap.to('[data-team-quote]', {
      y: 0,
      opacity: 1,
      duration: 0.6,
      scrollTrigger: {
        trigger: '[data-team-quote]',
        start: 'top 80%',
      },
    });
  }

  /* ---------------------------------------------------------------- */
  /*  6. TIMELINE                                                     */
  /* ---------------------------------------------------------------- */

  const timelineLine = document.querySelector('[data-timeline-line]');
  if (timelineLine) {
    gsap.to('[data-timeline-line]', {
      scaleY: 1,
      scrollTrigger: {
        trigger: '[data-timeline-line]',
        start: 'top 80%',
        end: 'bottom 20%',
        scrub: true,
      },
    });
  }

  const timelineItems = gsap.utils.toArray<HTMLElement>('[data-timeline-item]');
  timelineItems.forEach((item, i) => {
    gsap.to(item, {
      x: 0,
      opacity: 1,
      duration: 0.6,
      scrollTrigger: {
        trigger: item,
        start: 'top 80%',
      },
      delay: i * 0.1,
    });
  });

  /* ---------------------------------------------------------------- */
  /*  7. SPONSORS                                                     */
  /* ---------------------------------------------------------------- */

  const sponsorCards = gsap.utils.toArray<HTMLElement>('[data-sponsor-card]');
  if (sponsorCards.length) {
    ScrollTrigger.batch(sponsorCards, {
      start: 'top 80%',
      onEnter: (batch) => {
        gsap.to(batch, {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.15,
          overwrite: true,
        });
      },
    });
  }

  /* ---------------------------------------------------------------- */
  /*  8. GALLERY                                                      */
  /* ---------------------------------------------------------------- */

  const galleryItems = gsap.utils.toArray<HTMLElement>('[data-gallery-item]');
  if (galleryItems.length) {
    ScrollTrigger.batch(galleryItems, {
      start: 'top 80%',
      onEnter: (batch) => {
        gsap.to(batch, {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.08,
          overwrite: true,
        });
      },
    });
  }

  /* ---------------------------------------------------------------- */
  /*  9. RECRUIT                                                      */
  /* ---------------------------------------------------------------- */

  const recruitEyebrow = document.querySelector('[data-recruit-eyebrow]');
  if (recruitEyebrow) {
    const recruitTl = gsap.timeline({
      scrollTrigger: {
        trigger: recruitEyebrow,
        start: 'top 80%',
      },
      defaults: { ease: 'power3.out' },
    });

    recruitTl
      .to('[data-recruit-eyebrow]', { y: 0, opacity: 1, duration: 0.6 })
      .to('[data-recruit-heading]', { y: 0, opacity: 1, duration: 0.6 }, '-=0.3')
      .to('[data-recruit-sub]', { y: 0, opacity: 1, duration: 0.6 }, '-=0.3')
      .to('[data-recruit-cta]', { y: 0, opacity: 1, duration: 0.6 }, '-=0.3');
  }

  /* ---------------------------------------------------------------- */
  /*  10. CURRENT PAGE DETAIL REVEALS                                 */
  /* ---------------------------------------------------------------- */

  const pageReveals = gsap.utils.toArray<HTMLElement>('[data-page-reveal]');
  pageReveals.forEach((element) => {
    gsap.to(element, {
      y: 0,
      duration: 0.7,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 84%',
      },
    });
  });

  const cardReveals = gsap.utils.toArray<HTMLElement>('[data-card-reveal]');
  if (cardReveals.length) {
    ScrollTrigger.batch(cardReveals, {
      start: 'top 86%',
      onEnter: (batch) => {
        gsap.to(batch, {
          y: 0,
          duration: 0.6,
          stagger: 0.06,
          ease: 'power3.out',
          overwrite: true,
        });
      },
    });
  }
}
