// =============================================
// OXYD Studio — Premium Animations
// GSAP ScrollTrigger + Custom Effects
// =============================================

document.addEventListener('DOMContentLoaded', () => {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);

  // Disable all animations if user prefers reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  // =============================================
  // 1. PAGE LOAD CHOREOGRAPHY
  // Precise staggered entrance — every element has its moment
  // =============================================
  const loadTL = gsap.timeline({ defaults: { ease: 'power3.out' } });

  // Start with everything hidden — add a CSS class so elements are visible if JS fails
  document.documentElement.classList.add('gsap-ready');
  gsap.set('.hero-badge, .hero-title, .hero-description, .hero-buttons, .hero-mockup', {
    opacity: 0, y: 30
  });
  // Don't hide navbar — it should always be visible
  gsap.set('.navbar', { opacity: 0, y: -20 });

  loadTL
    // Navbar slides down
    .to('.navbar', { opacity: 1, y: 0, duration: 0.6 }, 0.1)
    // Badge fades in from above
    .to('.hero-badge', { opacity: 1, y: 0, duration: 0.5 }, 0.3)
    // Title — word by word reveal via clip-path
    .to('.hero-title', { opacity: 1, y: 0, duration: 0.9 }, 0.4)
    // Description slides up
    .to('.hero-description', { opacity: 1, y: 0, duration: 0.7 }, 0.7)
    // CTA buttons with a subtle scale bounce
    .to('.hero-buttons', { opacity: 1, y: 0, duration: 0.6 }, 0.9)
    // Mockup rises from below with a bigger travel distance
    .to('.hero-mockup', { opacity: 1, y: 0, duration: 1.2, ease: 'power2.out' }, 0.6);


  // =============================================
  // 2. GRADIENT VIVANT — breathing background
  // Subtle animated mesh gradient behind the hero
  // =============================================
  const heroSection = document.querySelector('.hero');
  if (heroSection) {
    const gradientEl = document.createElement('div');
    gradientEl.className = 'oxyd-gradient-bg';
    gradientEl.style.cssText = `
      position: absolute; inset: 0; z-index: -1; opacity: 0.4; pointer-events: none;
      background:
        radial-gradient(ellipse 80% 50% at 20% 40%, rgba(244,81,30,0.08), transparent),
        radial-gradient(ellipse 60% 80% at 80% 20%, rgba(244,81,30,0.05), transparent),
        radial-gradient(ellipse 50% 60% at 50% 80%, rgba(59,130,246,0.04), transparent);
    `;
    heroSection.style.position = 'relative';
    heroSection.style.overflow = 'hidden';
    heroSection.insertBefore(gradientEl, heroSection.firstChild);

    // Animate the gradient position
    let gradAngle = 0;
    function animateGradient() {
      gradAngle += 0.003;
      const x1 = 20 + Math.sin(gradAngle) * 15;
      const y1 = 40 + Math.cos(gradAngle * 0.7) * 20;
      const x2 = 80 + Math.cos(gradAngle * 1.3) * 15;
      const y2 = 20 + Math.sin(gradAngle * 0.5) * 20;
      gradientEl.style.background = `
        radial-gradient(ellipse 80% 50% at ${x1}% ${y1}%, rgba(244,81,30,0.08), transparent),
        radial-gradient(ellipse 60% 80% at ${x2}% ${y2}%, rgba(244,81,30,0.05), transparent),
        radial-gradient(ellipse 50% 60% at 50% 80%, rgba(59,130,246,0.04), transparent)
      `;
      requestAnimationFrame(animateGradient);
    }
    animateGradient();
  }


  // =============================================
  // 3. CUSTOM CURSOR — OXYD signature
  // Subtle ring that follows with spring physics
  // =============================================
  if (window.matchMedia('(pointer: fine)').matches) {
    const cursor = document.createElement('div');
    cursor.id = 'oxyd-cursor';
    cursor.style.cssText = `
      position: fixed; top: 0; left: 0; z-index: 99999; pointer-events: none;
      width: 32px; height: 32px; border-radius: 50%;
      border: 1.5px solid rgba(244,81,30,0.4);
      transition: width 0.2s, height 0.2s, border-color 0.2s, background 0.2s;
      transform: translate(-50%, -50%);
      mix-blend-mode: difference;
      opacity: 0;
    `;
    document.body.appendChild(cursor);

    const dot = document.createElement('div');
    dot.style.cssText = `
      position: fixed; top: 0; left: 0; z-index: 99999; pointer-events: none;
      width: 5px; height: 5px; border-radius: 50%;
      background: #F4511E;
      transform: translate(-50%, -50%);
      opacity: 0;
    `;
    document.body.appendChild(dot);

    let mx = 0, my = 0, cx = 0, cy = 0;

    document.addEventListener('mousemove', (e) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.left = mx + 'px';
      dot.style.top = my + 'px';
      cursor.style.opacity = '1';
      dot.style.opacity = '1';
    });

    document.addEventListener('mouseleave', () => {
      cursor.style.opacity = '0';
      dot.style.opacity = '0';
    });

    // Spring-follow for the ring
    function followCursor() {
      cx += (mx - cx) * 0.12;
      cy += (my - cy) * 0.12;
      cursor.style.left = cx + 'px';
      cursor.style.top = cy + 'px';
      requestAnimationFrame(followCursor);
    }
    followCursor();

    // Grow on hover over interactive elements
    document.querySelectorAll('a, button, .option-btn, .bento-card, .pricing-col, .faq-question, .btn-primary').forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.style.width = '56px';
        cursor.style.height = '56px';
        cursor.style.borderColor = 'rgba(244,81,30,0.6)';
        cursor.style.background = 'rgba(244,81,30,0.05)';
      });
      el.addEventListener('mouseleave', () => {
        cursor.style.width = '32px';
        cursor.style.height = '32px';
        cursor.style.borderColor = 'rgba(244,81,30,0.4)';
        cursor.style.background = 'transparent';
      });
    });

    // Shrink on click
    document.addEventListener('mousedown', () => {
      cursor.style.width = '24px';
      cursor.style.height = '24px';
    });
    document.addEventListener('mouseup', () => {
      cursor.style.width = '32px';
      cursor.style.height = '32px';
    });
  }


  // =============================================
  // 4. BENTO CARDS 3D TILT + LIGHT REFLECTION
  // Perspective tilt with moving light surface
  // =============================================
  document.querySelectorAll('.bento-card, .sec-card').forEach(card => {
    if (window.matchMedia('(pointer: fine)').matches) {
      card.style.transition = 'transform 0.4s cubic-bezier(0.03, 0.98, 0.52, 0.99)';
      card.style.transformStyle = 'preserve-3d';

      // Create light reflection overlay
      const reflection = document.createElement('div');
      reflection.style.cssText = `
        position: absolute; inset: 0; border-radius: inherit; pointer-events: none;
        background: radial-gradient(600px circle at var(--rx) var(--ry), rgba(244,81,30,0.06), transparent 40%);
        opacity: 0; transition: opacity 0.3s;
      `;
      card.style.position = 'relative';
      card.style.overflow = 'hidden';
      card.appendChild(reflection);

      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        // Tilt (max 6 degrees)
        const rotateX = ((y - centerY) / centerY) * -6;
        const rotateY = ((x - centerX) / centerX) * 6;
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;

        // Light reflection
        reflection.style.setProperty('--rx', x + 'px');
        reflection.style.setProperty('--ry', y + 'px');
        reflection.style.opacity = '1';
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        reflection.style.opacity = '0';
      });
    }

    // Scroll reveal — cascade diagonal
    gsap.from(card, {
      y: 60,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: card,
        start: 'top 88%',
        toggleActions: 'play none none none'
      }
    });
  });


  // =============================================
  // 5. BLUR-TO-FOCUS — sections sharpen on scroll
  // Text starts blurred, focuses as you approach
  // =============================================
  gsap.utils.toArray('.section-title, .testimonials-header h2, .platforms-header h2, .faq-header h2, .pricing-header h2, .contact-title').forEach(title => {
    gsap.fromTo(title, {
      filter: 'blur(8px)',
      opacity: 0,
      y: 30
    }, {
      filter: 'blur(0px)',
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: title,
        start: 'top 85%',
        toggleActions: 'play none none none'
      }
    });
  });

  // Section descriptions also blur-reveal
  gsap.utils.toArray('.section-desc').forEach(desc => {
    gsap.fromTo(desc, {
      filter: 'blur(4px)',
      opacity: 0,
      y: 20
    }, {
      filter: 'blur(0px)',
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: desc,
        start: 'top 85%',
        toggleActions: 'play none none none'
      }
    });
  });


  // =============================================
  // 6. HERO MOCKUP SHRINK + PARALLAX
  // Mockup starts large, scales down as you scroll
  // =============================================
  const heroMockup = document.querySelector('.hero-mockup');
  if (heroMockup) {
    gsap.to(heroMockup, {
      scale: 0.85,
      y: -60,
      opacity: 0.6,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom 20%',
        scrub: 1.5
      }
    });
  }


  // =============================================
  // 7. FLOATING PARTICLES — depth atmosphere
  // Subtle dots at different depths
  // =============================================
  if (heroSection) {
    const particleContainer = document.createElement('div');
    particleContainer.style.cssText = 'position:absolute;inset:0;z-index:-1;pointer-events:none;overflow:hidden;';
    heroSection.appendChild(particleContainer);

    for (let i = 0; i < 20; i++) {
      const p = document.createElement('div');
      const size = 2 + Math.random() * 4;
      const opacity = 0.06 + Math.random() * 0.1;
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const duration = 15 + Math.random() * 25;
      const delay = Math.random() * -20;

      p.style.cssText = `
        position:absolute;
        width:${size}px; height:${size}px;
        border-radius:50%;
        background:${Math.random() > 0.5 ? '#F4511E' : '#ffffff'};
        opacity:${opacity};
        left:${x}%; top:${y}%;
        animation: floatParticle ${duration}s ${delay}s infinite ease-in-out;
      `;
      particleContainer.appendChild(p);
    }

    // Add the keyframe animation
    if (!document.getElementById('oxyd-particle-styles')) {
      const style = document.createElement('style');
      style.id = 'oxyd-particle-styles';
      style.textContent = `
        @keyframes floatParticle {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(${10 + Math.random() * 20}px, ${-15 - Math.random() * 30}px) scale(1.1); }
          50% { transform: translate(${-5 - Math.random() * 15}px, ${-25 - Math.random() * 20}px) scale(0.9); }
          75% { transform: translate(${15 + Math.random() * 10}px, ${-10 - Math.random() * 15}px) scale(1.05); }
        }
        #oxyd-cursor, #oxyd-cursor + div { display: none; }
        @media (pointer: fine) { #oxyd-cursor, #oxyd-cursor + div { display: block; } }
      `;
      document.head.appendChild(style);
    }
  }


  // =============================================
  // SCROLL REVEALS — remaining sections
  // =============================================

  // Pricing cards — slide up with scale
  gsap.utils.toArray('.pricing-col').forEach((col, i) => {
    gsap.from(col, {
      y: 80,
      opacity: 0,
      scale: 0.95,
      duration: 0.8,
      ease: 'power2.out',
      delay: i * 0.12,
      scrollTrigger: {
        trigger: col,
        start: 'top 88%',
        toggleActions: 'play none none none'
      }
    });
  });

  // FAQ items — subtle slide
  gsap.utils.toArray('.faq-item').forEach((item, i) => {
    gsap.from(item, {
      y: 20,
      opacity: 0,
      duration: 0.5,
      ease: 'power2.out',
      delay: i * 0.05,
      scrollTrigger: {
        trigger: item,
        start: 'top 92%',
        toggleActions: 'play none none none'
      }
    });
  });

  // Process steps
  gsap.utils.toArray('.process-step').forEach((step, i) => {
    gsap.from(step, {
      x: i % 2 === 0 ? -40 : 40,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: step,
        start: 'top 85%',
        toggleActions: 'play none none none'
      }
    });
  });

  // Floating testimonial cards — parallax depth
  gsap.utils.toArray('.test-card.floating').forEach((card, i) => {
    gsap.to(card, {
      y: -40 * (0.3 + i * 0.1),
      ease: 'none',
      scrollTrigger: {
        trigger: card.parentElement,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 2
      }
    });
  });

  // Security cards
  gsap.utils.toArray('.sec-card').forEach((card, i) => {
    gsap.from(card, {
      y: 50,
      opacity: 0,
      duration: 0.7,
      ease: 'power2.out',
      delay: i * 0.15,
      scrollTrigger: {
        trigger: card,
        start: 'top 85%',
        toggleActions: 'play none none none'
      }
    });
  });

  // CTA section
  var ctaInner = document.querySelector('.cta-inner');
  if (ctaInner) {
    gsap.from(ctaInner, {
      y: 60,
      opacity: 0,
      duration: 1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.cta-section',
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    });

    gsap.utils.toArray('.cta-float-card').forEach((card, i) => {
      gsap.from(card, {
        y: 40 + i * 20,
        opacity: 0,
        rotation: -5 + i * 3,
        duration: 0.8,
        ease: 'power2.out',
        delay: 0.3 + i * 0.1,
        scrollTrigger: {
          trigger: '.cta-section',
          start: 'top 75%',
          toggleActions: 'play none none none'
        }
      });
    });
  }

  // Devices
  gsap.utils.toArray('.device').forEach((device, i) => {
    gsap.from(device, {
      y: 60,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out',
      delay: i * 0.2,
      scrollTrigger: {
        trigger: device,
        start: 'top 85%',
        toggleActions: 'play none none none'
      }
    });
  });

  // Small feature icons — scale bounce
  gsap.utils.toArray('.small-feature-icon').forEach(icon => {
    gsap.from(icon, {
      scale: 0,
      opacity: 0,
      duration: 0.6,
      ease: 'back.out(1.7)',
      scrollTrigger: {
        trigger: icon,
        start: 'top 85%',
        toggleActions: 'play none none none'
      }
    });
  });

  // Integration tool pills
  gsap.utils.toArray('.tool-pill').forEach((pill, i) => {
    gsap.from(pill, {
      y: 20,
      opacity: 0,
      duration: 0.4,
      ease: 'power2.out',
      delay: i * 0.04,
      scrollTrigger: {
        trigger: pill.parentElement,
        start: 'top 85%',
        toggleActions: 'play none none none'
      }
    });
  });

  // Contact section
  var contactTitle = document.querySelector('.contact-title');
  if (contactTitle) {
    gsap.fromTo(contactTitle, {
      filter: 'blur(6px)', opacity: 0, y: 30
    }, {
      filter: 'blur(0px)', opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
      scrollTrigger: { trigger: contactTitle, start: 'top 85%', toggleActions: 'play none none none' }
    });
  }

  // Stats counter section
  var statsSection = document.querySelector('.stats-section');
  if (statsSection) {
    gsap.from(statsSection.querySelectorAll('.stat-number'), {
      y: 30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: statsSection,
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    });
  }
});
