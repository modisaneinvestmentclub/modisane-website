// ── Mobile menu ──────────────────────────────────────────────

const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu    = document.getElementById('mobileMenu');

function toggleMobileMenu() {
    const open = mobileMenu.classList.toggle('open');
    mobileMenuBtn.classList.toggle('open', open);
}

function closeMobileMenu() {
    mobileMenu.classList.remove('open');
    mobileMenuBtn.classList.remove('open');
}

mobileMenuBtn.addEventListener('click', toggleMobileMenu);

document.addEventListener('click', (e) => {
    if (!mobileMenuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
        closeMobileMenu();
    }
});

// ── Header scroll state ───────────────────────────────────────

const header = document.getElementById('header');

window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// ── Active nav link on scroll ─────────────────────────────────

const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        if (window.scrollY >= section.offsetTop - 100) {
            current = section.getAttribute('id');
        }
    });
    navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
}, { passive: true });

// ── Smooth scroll ─────────────────────────────────────────────

document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        const target = document.querySelector(link.getAttribute('href'));
        if (!target) return;
        e.preventDefault();
        const headerHeight = parseInt(
            getComputedStyle(document.documentElement).getPropertyValue('--header-h')
        ) || 72;
        window.scrollTo({ top: target.offsetTop - headerHeight, behavior: 'smooth' });
        closeMobileMenu();
    });
});

// ── Scroll reveal ─────────────────────────────────────────────

const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.08, rootMargin: '0px 0px -36px 0px' });

revealEls.forEach(el => revealObserver.observe(el));
