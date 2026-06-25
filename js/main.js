/* AXAZURE · GitHub Copilot Microsite — main.js */

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ── NAV ─────────────────────────────────────────────────── */
(function initNav() {
  const nav    = document.getElementById('nav');
  const toggle = document.getElementById('nav-toggle');
  const menu   = document.getElementById('nav-menu');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  toggle.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open);
  });

  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
})();

/* ── SCROLL REVEAL ───────────────────────────────────────── */
(function initReveal() {
  if (prefersReducedMotion) {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
})();

/* ── TYPEWRITER HERO ─────────────────────────────────────── */
(function initTypewriter() {
  const target = document.getElementById('typewriter-target');
  const ghost  = document.getElementById('ghost-text');
  if (!target || !ghost) return;

  const typed = 'Execute(';
  const completion = 'IServiceProvider serviceProvider, ITracingService tracingService)';

  let i = 0;
  let phase = 'typing';

  function step() {
    if (prefersReducedMotion) {
      target.textContent = typed;
      ghost.textContent  = completion;
      return;
    }
    if (phase === 'typing') {
      if (i < typed.length) {
        target.textContent = typed.slice(0, ++i);
        setTimeout(step, 90 + Math.random() * 60);
      } else {
        phase = 'ghost';
        setTimeout(step, 500);
      }
    } else if (phase === 'ghost') {
      ghost.textContent = completion;
      phase = 'wait';
      setTimeout(step, 3200);
    } else if (phase === 'wait') {
      ghost.textContent  = '';
      target.textContent = '';
      i = 0;
      phase = 'typing';
      setTimeout(step, 800);
    }
  }

  setTimeout(step, 1400);
})();

/* ── COUNTER ANIMATION ───────────────────────────────────── */
(function initCounter() {
  const el = document.querySelector('.counter');
  if (!el) return;

  const target = parseInt(el.dataset.target, 10);

  if (prefersReducedMotion) {
    el.textContent = target;
    return;
  }

  const io = new IntersectionObserver((entries) => {
    if (!entries[0].isIntersecting) return;
    io.disconnect();

    const duration = 1600;
    const start    = performance.now();

    function tick(now) {
      const p = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 4);
      el.textContent = Math.round(ease * target);
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }, { threshold: 0.5 });

  io.observe(el);
})();

/* ── AGENT LOOP ANIMATION ────────────────────────────────── */
(function initAgentLoop() {
  const loop  = document.getElementById('agent-loop');
  if (!loop) return;

  const steps = loop.querySelectorAll('.loop-step');
  if (!steps.length) return;

  if (prefersReducedMotion) {
    steps.forEach(s => s.classList.add('active'));
    return;
  }

  let current   = -1;
  let interval  = null;
  let observed  = false;

  function advance() {
    steps.forEach(s => s.classList.remove('active'));
    current = (current + 1) % steps.length;
    steps[current].classList.add('active');
  }

  const io = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !observed) {
      observed = true;
      advance();
      interval = setInterval(advance, 1400);
    } else if (!entries[0].isIntersecting && observed) {
      clearInterval(interval);
      observed = false;
      current  = -1;
      steps.forEach(s => s.classList.remove('active'));
    }
  }, { threshold: 0.4 });

  io.observe(loop);
})();

/* ── VIDEO: load if file exists ──────────────────────────── */
(function initVideo() {
  const container   = document.getElementById('video-container');
  const placeholder = document.getElementById('video-placeholder');
  if (!container) return;

  const videoPath = 'assets/video/demo.mp4';

  const probe = document.createElement('video');
  probe.preload = 'none';
  probe.src = videoPath;

  probe.addEventListener('loadedmetadata', () => {
    placeholder.remove();
    const video = document.createElement('video');
    video.src          = videoPath;
    video.controls     = true;
    video.preload      = 'metadata';
    video.playbackRate = 1.5;
    video.style.cssText = 'width:100%;display:block;border-radius:0 0 20px 20px;';
    video.setAttribute('aria-label', 'Demo de GitHub Copilot en AXAZURE');
    // Mantener la velocidad 1.5× si el usuario no la cambia manualmente
    video.addEventListener('ratechange', () => {}, { once: true });
    container.appendChild(video);
    video.playbackRate = 1.5; // forzar tras insertar en el DOM
  });
})();

/* ── SCREENSHOT HOVER TILT ───────────────────────────────── */
(function initTilt() {
  if (prefersReducedMotion) return;

  document.querySelectorAll('.screenshot-wrapper').forEach(wrapper => {
    wrapper.addEventListener('mousemove', (e) => {
      const rect = wrapper.getBoundingClientRect();
      const cx   = rect.left + rect.width  / 2;
      const cy   = rect.top  + rect.height / 2;
      const dx   = (e.clientX - cx) / rect.width;
      const dy   = (e.clientY - cy) / rect.height;
      wrapper.style.transform = `perspective(1000px) rotateY(${dx * 4}deg) rotateX(${-dy * 3}deg) translateY(-6px)`;
    });
    wrapper.addEventListener('mouseleave', () => {
      wrapper.style.transform = '';
    });
  });
})();

/* ── SMOOTH ACTIVE NAV ───────────────────────────────────── */
(function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.nav-menu a[href^="#"]');

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const id = e.target.id;
        links.forEach(a => {
          const active = a.getAttribute('href') === `#${id}`;
          a.style.color = active ? 'var(--azure)' : '';
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => io.observe(s));
})();

/* ── IMG PLACEHOLDER STYLE ───────────────────────────────── */
(function addPlaceholderStyles() {
  const style = document.createElement('style');
  style.textContent = `
    .img-placeholder {
      min-height: 220px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 12px;
      padding: 2rem;
      background: rgba(255,255,255,0.03);
      border-radius: 0 0 12px 12px;
    }
    .img-placeholder span { font-size: 2rem; opacity: 0.4; }
    .img-placeholder p {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.75rem;
      color: rgba(232,237,243,0.35);
      text-align: center;
      letter-spacing: 0.04em;
    }
  `;
  document.head.appendChild(style);
})();
