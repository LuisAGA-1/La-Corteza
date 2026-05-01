/* ═══════════════════════════════════════════
   LA CORTEZA — JavaScript
   script.js
═══════════════════════════════════════════ */

/* ── 1. SCROLL SUAVE para todos los enlaces de navegación ── */
function initSmoothScroll() {
  const allLinks = document.querySelectorAll('a[href^="#"]');

  allLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      const target = document.querySelector(href);

      if (!target) return;
      e.preventDefault();

      const navHeight = document.getElementById('navbar').offsetHeight;
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight;

      window.scrollTo({ top, behavior: 'smooth' });

      // Cierra el menú móvil si está abierto
      const navMobile = document.getElementById('navMobile');
      if (navMobile.classList.contains('open')) {
        navMobile.classList.remove('open');
      }
    });
  });
}

/* ── 2. REVEAL ON SCROLL — secciones aparecen al hacer scroll ── */
function initReveal() {
  const elements = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Retraso escalonado según el índice del elemento
          const delay = entry.target.dataset.delay || 0;
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, delay);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  elements.forEach((el, i) => {
    el.dataset.delay = i * 50; // pequeño stagger si hubiera varios en pantalla
    observer.observe(el);
  });
}

/* ── 3. NAVBAR — cambia de color al hacer scroll ── */
function initNavbarScroll() {
  const navbar = document.getElementById('navbar');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });
}

/* ── 4. NAVBAR ACTIVO — resalta el enlace de la sección actual ── */
function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a, .nav-mobile a');
  const navHeight = document.getElementById('navbar').offsetHeight;

  function setActive() {
    let current = '';

    sections.forEach(section => {
      const top = section.offsetTop - navHeight - 40;
      if (window.scrollY >= top) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', setActive, { passive: true });
  setActive(); // correr una vez al cargar
}

/* ── 5. MENÚ MÓVIL — toggle ── */
function initMobileMenu() {
  const toggle = document.getElementById('navToggle');
  const navMobile = document.getElementById('navMobile');

  toggle.addEventListener('click', () => {
    navMobile.classList.toggle('open');
    toggle.textContent = navMobile.classList.contains('open') ? '✕' : '☰';
  });
}

/* ── 6. ANIMACIÓN CONTADOR para sección FODA (efecto visual de entrada) ── */
function initFodaAnimation() {
  const fodaCells = document.querySelectorAll('.foda-cell');

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }, i * 120);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  fodaCells.forEach(cell => {
    cell.style.opacity = '0';
    cell.style.transform = 'translateY(20px)';
    cell.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(cell);
  });
}

/* ── 7. ANIMACIÓN SOCIO ITEMS — entrada escalonada ── */
function initSocioAnimation() {
  const items = document.querySelectorAll('.socio-item');

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const index = [...items].indexOf(entry.target);
          setTimeout(() => {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateX(0)';
          }, index * 100);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  items.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-20px)';
    item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(item);
  });
}

/* ── 8. ANIMACIÓN TEAM CARDS — entrada escalonada ── */
function initTeamAnimation() {
  const cards = document.querySelectorAll('.team-card');

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const index = [...cards].indexOf(entry.target);
          setTimeout(() => {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0) scale(1)';
          }, index * 90);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(16px) scale(0.97)';
    card.style.transition = 'opacity 0.45s ease, transform 0.45s ease';
    observer.observe(card);
  });
}

/* ── 9. ACTIVE NAV CSS (agregar clase para resaltar) ── */
function injectActiveNavStyle() {
  const style = document.createElement('style');
  style.textContent = `
    .nav-links a.active,
    .nav-mobile a.active {
      color: #E8C97A !important;
    }
    .nav-links a.active::after {
      left: 14px !important;
      right: 14px !important;
    }
  `;
  document.head.appendChild(style);
}

/* ── INIT — ejecutar todo al cargar el DOM ── */
document.addEventListener('DOMContentLoaded', () => {
  initSmoothScroll();
  initReveal();
  initNavbarScroll();
  initActiveNav();
  initMobileMenu();
  initFodaAnimation();
  initSocioAnimation();
  initTeamAnimation();
  injectActiveNavStyle();
});