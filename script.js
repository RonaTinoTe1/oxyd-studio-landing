// =============================================
// SIMPLISTIC — Landing Page Interactions
// =============================================
// =============================================
// CONFIG — à remplir avant mise en ligne
// =============================================
// CAL_LINK : ton username Cal.com + event slug (ex: "nathan-oxyd/diagnostic-gratuit")
// Va sur cal.com → ton event → Partager → copie la partie après cal.com/
const CAL_LINK = null; // ex: 'nathan-oxyd/diagnostic-gratuit'

document.addEventListener('DOMContentLoaded', () => {

  // ---------- Cal.com — wire all CTA buttons ----------
  if (CAL_LINK && window.Cal) {
    document.querySelectorAll('.btn-primary[href="#contact"], .btn-primary[href="#"]').forEach(btn => {
      btn.removeAttribute('href');
      btn.setAttribute('data-cal-link', CAL_LINK);
      btn.setAttribute('data-cal-config', JSON.stringify({layout:'month_view'}));
      btn.style.cursor = 'pointer';
    });
  }

  // ---------- Navbar scroll effect ----------
  const navbar = document.getElementById('navbar');
  const mockup = document.querySelector('.hero-mockup');

  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    navbar.classList.toggle('scrolled', scrolled > 20);

    // ---------- Mockup 3D Tilt ----------
    if (mockup) {
      const rotation = Math.max(0, 12 - (scrolled / 25));
      const scale = Math.min(1, 0.96 + (scrolled / 5000));
      mockup.style.transform = `perspective(1200px) rotateX(${rotation}deg) scale(${scale})`;
    }
  });

  // ---------- Resources dropdown ----------
  const dropdowns = document.querySelectorAll('.nav-dropdown');
  dropdowns.forEach(dd => {
    const toggle = dd.querySelector('.nav-dropdown-toggle');
    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      dd.classList.toggle('open');
    });
  });
  document.addEventListener('click', () => {
    dropdowns.forEach(dd => dd.classList.remove('open'));
  });

  // ---------- Mobile hamburger ----------
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  if (hamburger) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('mobile-open');
    });
  }

  // ---------- FAQ accordion ----------
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      faqItems.forEach(i => {
        i.classList.remove('open');
        i.querySelector('.faq-answer').style.maxHeight = null;
        i.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      });
      if (!isOpen) {
        item.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
        question.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // ---------- Scroll fade-in animations ----------
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px 80px 0px',
    threshold: 0.05
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.fade-in').forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      el.classList.add('visible');
    } else {
      observer.observe(el);
    }
  });

  // World map is now SVG-based (see index.html)

  // ---------- Contact form ----------
  // TODO: set FORMSPREE_ID to your Formspree form ID (create free at formspree.io)
  const FORMSPREE_ID = null; // e.g. 'xpwzdkka'
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('button');
      const originalText = btn.textContent;
      const name    = contactForm.querySelector('[name=name]')?.value.trim();
      const email   = contactForm.querySelector('[name=email]')?.value.trim();
      const company = contactForm.querySelector('[name=company]')?.value.trim() || '';
      const message = contactForm.querySelector('[name=message]')?.value.trim() || '';

      if (!name || !email) {
        btn.style.background = '#dc2626';
        btn.textContent = 'Prénom, nom et email requis.';
        setTimeout(() => { btn.textContent = originalText; btn.style.background = ''; }, 3000);
        return;
      }

      if (FORMSPREE_ID) {
        btn.textContent = 'Envoi en cours…';
        btn.disabled = true;
        try {
          const res = await fetch('https://formspree.io/f/' + FORMSPREE_ID, {
            method: 'POST',
            headers: { 'Accept': 'application/json' },
            body: new FormData(contactForm)
          });
          if (res.ok) {
            const successDiv = document.createElement('div');
            successDiv.className = 'form-success';
            const successP = document.createElement('p');
            successP.textContent = 'Message envoyé ! Je vous réponds sous 24h.';
            successDiv.appendChild(successP);
            contactForm.replaceWith(successDiv);
          } else {
            throw new Error('error');
          }
        } catch {
          btn.textContent = 'Erreur — réessayez.';
          btn.disabled = false;
          setTimeout(() => { btn.textContent = originalText; }, 3000);
        }
      } else {
        // Fallback: open mail client
        const subject = encodeURIComponent('Diagnostic Oxyd — ' + name);
        const body = encodeURIComponent('Nom: ' + name + '\nEmail: ' + email + '\nEntreprise: ' + company + '\n\n' + message);
        window.location.href = 'mailto:contact@oxyd.studio?subject=' + subject + '&body=' + body;
      }
    });
  }

  // =============================================
  // CURSOR GLOW
  // =============================================
  const cursorGlow = document.getElementById('cursorGlow');
  if (cursorGlow && window.matchMedia('(pointer: fine)').matches) {
    let glowVisible = false;
    document.addEventListener('mousemove', (e) => {
      cursorGlow.style.left = e.clientX + 'px';
      cursorGlow.style.top  = e.clientY + 'px';
      if (!glowVisible) {
        cursorGlow.style.opacity = '1';
        glowVisible = true;
      }
    });
    document.addEventListener('mouseleave', () => {
      cursorGlow.style.opacity = '0';
      glowVisible = false;
    });
  }

  // =============================================
  // CARD SPOTLIGHT — mouse-tracking inner glow
  // =============================================
  document.querySelectorAll('.bento-card, .sec-card, .process-step').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width  * 100).toFixed(1) + '%';
      const y = ((e.clientY - rect.top)  / rect.height * 100).toFixed(1) + '%';
      card.style.setProperty('--spotlight-x', x);
      card.style.setProperty('--spotlight-y', y);
      card.style.setProperty('--spotlight-opacity', '1');
    });
    card.addEventListener('mouseleave', () => {
      card.style.setProperty('--spotlight-opacity', '0');
    });
  });

  // =============================================
  // MAGNETIC BUTTONS
  // =============================================
  if (window.matchMedia('(pointer: fine)').matches) {
    document.querySelectorAll('.btn-primary').forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const cx = rect.left + rect.width  / 2;
        const cy = rect.top  + rect.height / 2;
        const dx = (e.clientX - cx) * 0.28;
        const dy = (e.clientY - cy) * 0.28;
        btn.style.transform = `translate(${dx}px, ${dy}px)`;
      });
      btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0, 0)';
      });
    });
  }

  // =============================================
  // STATS COUNTER — count-up animation
  // =============================================
  const statEls = document.querySelectorAll('.stat-number');
  if (statEls.length) {
    statEls.forEach(el => {
      const text = el.textContent.trim();
      const match = text.match(/^([^0-9]*)([0-9][0-9.]*)([^0-9]*)$/);
      if (!match) return;
      const prefix = match[1];
      const target = parseFloat(match[2]);
      const suffix = match[3];
      el.dataset.prefix = prefix;
      el.dataset.target = target;
      el.dataset.suffix = suffix;
    });

    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseFloat(el.dataset.target);
        const prefix = el.dataset.prefix || '';
        const suffix = el.dataset.suffix || '';
        const isDecimal = String(target).includes('.');
        const decimals = isDecimal ? String(target).split('.')[1].length : 0;
        const duration = 1400;
        const start = performance.now();

        function tick(now) {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          // Ease-out cubic
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = target * eased;
          el.textContent = prefix + current.toFixed(decimals) + suffix;
          if (progress < 1) requestAnimationFrame(tick);
        }

        requestAnimationFrame(tick);
        statsObserver.unobserve(el);
      });
    }, { threshold: 0.5 });

    statEls.forEach(el => {
      if (el.dataset.target) statsObserver.observe(el);
    });
  }

});

// =============================================
// WORLD MAP — replaced by inline SVG
// =============================================
function initWorldMap_UNUSED() {
  const canvas = document.getElementById('worldMapCanvas');
  if (!canvas) return;

  // Simplified continent polygons [lat, lon] — good enough at canvas resolution
  const CONTINENTS = [
    // North America
    [[71,-140],[60,-137],[49,-124],[32,-117],[22,-106],[10,-84],[9,-78],[12,-62],[45,-63],[55,-62],[60,-64],[71,-75],[71,-140]],
    // Greenland
    [[76,-73],[83,-34],[83,-20],[72,-22],[60,-45],[63,-52],[70,-55],[76,-73]],
    // South America
    [[12,-72],[11,-60],[5,-52],[-5,-35],[-23,-43],[  -34,-53],[-55,-67],[-54,-65],[-23,-70],[0,-78],[12,-72]],
    // Europe
    [[71,-26],[71,28],[60,28],[48,28],[38,15],[36,-5],[40,-9],[44,-9],[51,-5],[58,-5],[71,-26]],
    // Africa
    [[37,-5],[37,37],[10,42],[-10,40],[-35,25],[-35,18],[0,8],[15,-17],[37,-5]],
    // Asia (main)
    [[71,28],[71,140],[60,142],[35,140],[22,122],[8,104],[0,104],[20,72],[28,60],[40,44],[55,30],[71,28]],
    // Australia
    [[-16,128],[-27,114],[-37,140],[-38,148],[-34,152],[-23,153],[-15,145],[-12,136],[-16,128]],
    // Japan (approx)
    [[31,130],[45,141],[44,145],[33,135],[30,131],[31,130]],
    // UK / Ireland (approx)
    [[58,-5],[60,-2],[57,2],[52,2],[50,-5],[53,-5],[58,-5]],
    // Iceland
    [[63,-24],[66,-14],[64,-13],[62,-22],[63,-24]],
    // New Zealand (south island approx)
    [[-46,168],[-44,172],[-46,169],[-46,168]],
    // Borneo
    [[7,108],[7,118],[0,118],[-4,114],[1,108],[7,108]],
    // Sumatra
    [[5,95],[4,108],[-6,106],[-6,96],[2,95],[5,95]],
    // Madagascar
    [[-12,44],[-14,50],[-25,47],[-26,44],[-16,43],[-12,44]],
  ];

  function pointInPolygon(lat, lon, poly) {
    let inside = false;
    for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
      const [yi, xi] = poly[i];
      const [yj, xj] = poly[j];
      if (((yi > lat) !== (yj > lat)) && (lon < (xj - xi) * (lat - yi) / (yj - yi) + xi)) {
        inside = !inside;
      }
    }
    return inside;
  }

  function isLand(lat, lon) {
    for (const poly of CONTINENTS) {
      if (pointInPolygon(lat, lon, poly)) return true;
    }
    return false;
  }

  // Crop polar regions — focus on inhabited world (-58° to +72°)
  const LAT_MAX = 72, LAT_MIN = -58;

  // Build the landmask grid once
  const GRID_W = 120, GRID_H = 43;
  const landmask = new Uint8Array(GRID_W * GRID_H);
  for (let row = 0; row < GRID_H; row++) {
    const lat = LAT_MAX - (row / GRID_H) * (LAT_MAX - LAT_MIN);
    for (let col = 0; col < GRID_W; col++) {
      const lon = -180 + (col / GRID_W) * 360;
      if (isLand(lat, lon)) landmask[row * GRID_W + col] = 1;
    }
  }

  // User nodes that float around
  const NODE_COUNT = 5;
  const nodes = Array.from({ length: NODE_COUNT }, (_, i) => ({
    // Place nodes roughly on inhabited land
    lat:  [48, 40, 35, -23, 52][i],
    lon:  [2,  -4, 140, -46, -1][i],
    vx: (Math.random() - 0.5) * 0.004,
    vy: (Math.random() - 0.5) * 0.003,
    pulse: Math.random() * Math.PI * 2,
    pulseSpeed: 0.02 + Math.random() * 0.015,
    hue: [30, 20, 40, 15, 25][i],
  }));

  function latLonToCanvas(lat, lon, w, h) {
    const x = ((lon + 180) / 360) * w;
    const y = ((LAT_MAX - lat) / (LAT_MAX - LAT_MIN)) * h;
    return [x, y];
  }

  let animFrameId;
  let lastTime = 0;

  function resize() {
    const dpr = window.devicePixelRatio || 1;
    // Use offsetWidth (layout width, works even when off-screen)
    const parent = canvas.parentElement;
    const w = parent ? parent.offsetWidth : canvas.offsetWidth;
    const h = 114; // fixed height matching CSS (correct 2.77:1 geo ratio)
    if (w === 0) return;
    canvas.width  = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    const ctx = canvas.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function draw(ts) {
    animFrameId = requestAnimationFrame(draw);
    const dt = Math.min(ts - lastTime, 50); // cap dt
    lastTime = ts;

    const dpr  = window.devicePixelRatio || 1;
    const W    = canvas.width  / dpr;
    const H    = canvas.height / dpr;
    const ctx  = canvas.getContext('2d');
    ctx.clearRect(0, 0, W, H);

    // --- Draw dot grid ---
    const dotSpacingX = W / GRID_W;
    const dotSpacingY = H / GRID_H;
    const dotR = Math.max(0.7, Math.min(dotSpacingX, dotSpacingY) * 0.22);

    for (let row = 0; row < GRID_H; row++) {
      for (let col = 0; col < GRID_W; col++) {
        if (!landmask[row * GRID_W + col]) continue;
        const x = (col + 0.5) * dotSpacingX;
        const y = (row + 0.5) * dotSpacingY;
        ctx.beginPath();
        ctx.arc(x, y, dotR, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,255,255,0.18)';
        ctx.fill();
      }
    }

    // --- Update & draw nodes ---
    const nodePositions = [];

    nodes.forEach(node => {
      node.pulse += node.pulseSpeed;
      node.lat += node.vy * dt;
      node.lon += node.vx * dt;
      // Soft boundary clamp
      if (node.lat >  75) { node.lat =  75; node.vy *= -1; }
      if (node.lat < -50) { node.lat = -50; node.vy *= -1; }
      if (node.lon >  175) { node.lon  = 175; node.vx *= -1; }
      if (node.lon < -175) { node.lon = -175; node.vx *= -1; }

      const [x, y] = latLonToCanvas(node.lat, node.lon, W, H);
      nodePositions.push({ x, y, node });
    });

    // --- Draw connection lines ---
    for (let i = 0; i < nodePositions.length; i++) {
      for (let j = i + 1; j < nodePositions.length; j++) {
        const a = nodePositions[i];
        const b = nodePositions[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = W * 0.45;
        if (dist > maxDist) continue;
        const alpha = (1 - dist / maxDist) * 0.35;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = `rgba(244, 81, 30, ${alpha})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }
    }

    // --- Draw node avatars ---
    nodePositions.forEach(({ x, y, node }) => {
      const pulse = Math.sin(node.pulse);
      const r = 4 + pulse * 0.6;

      // Pulse ring
      ctx.beginPath();
      ctx.arc(x, y, r + 4 + pulse * 3, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(244, 81, 30, ${0.12 + pulse * 0.06})`;
      ctx.lineWidth = 1;
      ctx.stroke();

      // Outer ring
      ctx.beginPath();
      ctx.arc(x, y, r + 2, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(244, 81, 30, 0.45)`;
      ctx.lineWidth = 1;
      ctx.stroke();

      // Core
      const grad = ctx.createRadialGradient(x, y, 0, x, y, r);
      grad.addColorStop(0, 'rgba(255, 140, 80, 1)');
      grad.addColorStop(1, 'rgba(244, 81, 30, 0.8)');
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();
    });
  }

  // Start immediately (handles already-visible canvas)
  resize();
  lastTime = performance.now();
  animFrameId = requestAnimationFrame(draw);

  // Pause when off-screen to save CPU
  const mapObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (!animFrameId) {
          resize();
          lastTime = performance.now();
          animFrameId = requestAnimationFrame(draw);
        }
      } else {
        cancelAnimationFrame(animFrameId);
        animFrameId = null;
      }
    });
  }, { threshold: 0 });

  mapObserver.observe(canvas);
  window.addEventListener('resize', () => {
    resize();
  }, { passive: true });
}

// =============================================
// CONNECTOR LINES — vault2 & hub2
// =============================================
function drawConnectors(wrapId, svgId, leftSel, rightSel, nodeSel, leftStroke, rightStroke) {
  const wrap = document.getElementById(wrapId);
  const svg  = document.getElementById(svgId);
  if (!wrap || !svg) return;

  const wrapRect = wrap.getBoundingClientRect();
  svg.setAttribute('width',  wrapRect.width);
  svg.setAttribute('height', wrapRect.height);
  svg.innerHTML = '';

  const nodeEl   = wrap.querySelector(nodeSel);
  if (!nodeEl) return;
  const nodeRect = nodeEl.getBoundingClientRect();
  const nodeCX   = nodeRect.left + nodeRect.width  / 2 - wrapRect.left;
  const nodeCY   = nodeRect.top  + nodeRect.height / 2 - wrapRect.top;
  const nodeR    = nodeRect.width / 2;

  function makeLine(x1, y1, x2, y2, stroke, delay) {
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', x1); line.setAttribute('y1', y1);
    line.setAttribute('x2', x2); line.setAttribute('y2', y2);
    line.setAttribute('stroke', stroke);
    line.setAttribute('stroke-width', '1.2');
    line.setAttribute('stroke-dasharray', '5 4');
    line.setAttribute('stroke-dashoffset', '0');
    line.setAttribute('stroke-linecap', 'round');
    line.classList.add('svg-wire');
    line.style.animationDelay = delay + 's';
    svg.appendChild(line);
  }

  // Angle from node center to chip center, offset line end to node circle edge
  function nodeEdge(chipCX, chipCY) {
    const angle = Math.atan2(chipCY - nodeCY, chipCX - nodeCX);
    return {
      x: nodeCX + Math.cos(angle) * (nodeR + 2),
      y: nodeCY + Math.sin(angle) * (nodeR + 2)
    };
  }

  wrap.querySelectorAll(leftSel).forEach((chip, i) => {
    const r   = chip.getBoundingClientRect();
    const cx  = r.right  - wrapRect.left;
    const cy  = r.top + r.height / 2 - wrapRect.top;
    const end = nodeEdge(cx, cy);
    makeLine(cx, cy, end.x, end.y, leftStroke, i * 0.18);
  });

  wrap.querySelectorAll(rightSel).forEach((chip, i) => {
    const r   = chip.getBoundingClientRect();
    const cx  = r.left   - wrapRect.left;
    const cy  = r.top + r.height / 2 - wrapRect.top;
    const end = nodeEdge(cx, cy);
    makeLine(end.x, end.y, cx, cy, rightStroke, i * 0.18);
  });
}

function initConnectors() {
  drawConnectors(
    'vault2-wrap', 'vault2-svg',
    '.v2-chip-l', '.v2-badge', '.v2-shield-icon',
    'rgba(244,81,30,0.6)', 'rgba(34,197,94,0.55)'
  );
  drawConnectors(
    'hub2-wrap', 'hub2-svg',
    '.h2-chip-l', '.h2-chip-r', '.h2-oxyd-icon',
    'rgba(244,81,30,0.55)', 'rgba(244,81,30,0.55)'
  );
}

// Draw after layout settles (chip enter animations + fade-in observer)
window.addEventListener('load', () => setTimeout(initConnectors, 100));
window.addEventListener('resize', initConnectors, { passive: true });
