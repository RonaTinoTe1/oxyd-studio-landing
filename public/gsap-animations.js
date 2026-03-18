// GSAP ScrollTrigger Animations — OXYD Studio
document.addEventListener('DOMContentLoaded', () => {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);

  // Hero entrance
  gsap.from('.hero-title', { y: 60, opacity: 0, duration: 1.2, ease: 'power3.out', delay: 0.2 });
  gsap.from('.hero-description', { y: 40, opacity: 0, duration: 1, ease: 'power3.out', delay: 0.4 });
  gsap.from('.hero-buttons', { y: 30, opacity: 0, duration: 0.8, ease: 'power3.out', delay: 0.6 });
  gsap.from('.hero-badge', { y: 20, opacity: 0, duration: 0.6, ease: 'power3.out', delay: 0.1 });

  // Hero mockup parallax
  var heroMockup = document.querySelector('.hero-mockup');
  if (heroMockup) {
    gsap.to(heroMockup, { y: -80, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1.5 } });
  }

  // Bento cards stagger reveal
  gsap.utils.toArray('.bento-card').forEach(function(card, i) {
    gsap.from(card, { y: 60, opacity: 0, duration: 0.8, ease: 'power2.out', delay: (i % 3) * 0.15, scrollTrigger: { trigger: card, start: 'top 85%', toggleActions: 'play none none none' } });
  });

  // Process steps
  gsap.utils.toArray('.process-step').forEach(function(step, i) {
    gsap.from(step, { x: i % 2 === 0 ? -40 : 40, opacity: 0, duration: 0.8, ease: 'power2.out', scrollTrigger: { trigger: step, start: 'top 85%', toggleActions: 'play none none none' } });
  });

  // Pricing cards
  gsap.utils.toArray('.pricing-col').forEach(function(col, i) {
    gsap.from(col, { y: 80, opacity: 0, scale: 0.95, duration: 0.8, ease: 'power2.out', delay: i * 0.12, scrollTrigger: { trigger: col, start: 'top 85%', toggleActions: 'play none none none' } });
  });

  // FAQ items
  gsap.utils.toArray('.faq-item').forEach(function(item, i) {
    gsap.from(item, { y: 20, opacity: 0, duration: 0.5, ease: 'power2.out', delay: i * 0.05, scrollTrigger: { trigger: item, start: 'top 90%', toggleActions: 'play none none none' } });
  });

  // Section titles
  gsap.utils.toArray('.section-title, .testimonials-header h2, .platforms-header h2, .faq-header h2, .pricing-header h2, .contact-title').forEach(function(title) {
    gsap.from(title, { y: 40, opacity: 0, duration: 0.8, ease: 'power2.out', scrollTrigger: { trigger: title, start: 'top 85%', toggleActions: 'play none none none' } });
  });

  // Floating testimonial cards parallax
  gsap.utils.toArray('.test-card.floating').forEach(function(card, i) {
    gsap.to(card, { y: -40 * (0.3 + i * 0.1), ease: 'none', scrollTrigger: { trigger: card.parentElement, start: 'top bottom', end: 'bottom top', scrub: 2 } });
  });

  // Security cards
  gsap.utils.toArray('.sec-card').forEach(function(card, i) {
    gsap.from(card, { y: 50, opacity: 0, duration: 0.7, ease: 'power2.out', delay: i * 0.15, scrollTrigger: { trigger: card, start: 'top 85%', toggleActions: 'play none none none' } });
  });

  // CTA section
  var ctaInner = document.querySelector('.cta-inner');
  if (ctaInner) {
    gsap.from(ctaInner, { y: 60, opacity: 0, duration: 1, ease: 'power2.out', scrollTrigger: { trigger: '.cta-section', start: 'top 80%', toggleActions: 'play none none none' } });
    gsap.utils.toArray('.cta-float-card').forEach(function(card, i) {
      gsap.from(card, { y: 40 + i * 20, opacity: 0, rotation: -5 + i * 3, duration: 0.8, ease: 'power2.out', delay: 0.3 + i * 0.1, scrollTrigger: { trigger: '.cta-section', start: 'top 75%', toggleActions: 'play none none none' } });
    });
  }

  // Devices
  gsap.utils.toArray('.device').forEach(function(device, i) {
    gsap.from(device, { y: 60, opacity: 0, duration: 0.8, ease: 'power2.out', delay: i * 0.2, scrollTrigger: { trigger: device, start: 'top 85%', toggleActions: 'play none none none' } });
  });

  // Small feature icons — scale bounce
  gsap.utils.toArray('.small-feature-icon').forEach(function(icon) {
    gsap.from(icon, { scale: 0, opacity: 0, duration: 0.6, ease: 'back.out(1.7)', scrollTrigger: { trigger: icon, start: 'top 85%', toggleActions: 'play none none none' } });
  });

  // Integration pills
  gsap.utils.toArray('.tool-pill').forEach(function(pill, i) {
    gsap.from(pill, { y: 20, opacity: 0, duration: 0.4, ease: 'power2.out', delay: i * 0.05, scrollTrigger: { trigger: pill.parentElement, start: 'top 85%', toggleActions: 'play none none none' } });
  });
});
