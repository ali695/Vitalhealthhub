/* VitalHealth Hub Theme JS */
(function () {
    'use strict';

    /* ── Mobile Menu Toggle ───────────────────────────────────────── */
    const toggle   = document.querySelector('.vhh-menu-toggle');
    const mobileNav = document.querySelector('.vhh-mobile-nav');

    if (toggle && mobileNav) {
        toggle.addEventListener('click', function () {
            const open = mobileNav.classList.toggle('is-open');
            toggle.classList.toggle('is-open', open);
            toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
            document.body.style.overflow = open ? 'hidden' : '';
        });

        /* Close on outside click */
        document.addEventListener('click', function (e) {
            if (!toggle.contains(e.target) && !mobileNav.contains(e.target)) {
                mobileNav.classList.remove('is-open');
                toggle.classList.remove('is-open');
                toggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        });

        /* Close on ESC */
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && mobileNav.classList.contains('is-open')) {
                mobileNav.classList.remove('is-open');
                toggle.classList.remove('is-open');
                toggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        });
    }

    /* ── Sticky Header Shadow ─────────────────────────────────────── */
    const header = document.querySelector('.vhh-site-header');
    if (header) {
        window.addEventListener('scroll', function () {
            header.style.boxShadow = window.scrollY > 10
                ? '0 2px 20px rgba(45,106,79,.14)'
                : '0 2px 8px rgba(45,106,79,.08)';
        }, { passive: true });
    }

    /* ── Smooth Scroll for anchor links ──────────────────────────── */
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                const offset = 80;
                const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({ top: top, behavior: 'smooth' });
            }
        });
    });

    /* ── Fade-in on scroll ────────────────────────────────────────── */
    if ('IntersectionObserver' in window) {
        const fadeEls = document.querySelectorAll(
            '.vhh-calc-card, .vhh-post-card, .vhh-feature-item'
        );
        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

        fadeEls.forEach(function (el) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(16px)';
            el.style.transition = 'opacity .4s ease, transform .4s ease';
            observer.observe(el);
        });
    }

    /* ── Back to Top button (auto-inject) ─────────────────────────── */
    const btt = document.createElement('button');
    btt.innerHTML = '&#8679;';
    btt.setAttribute('aria-label', 'Back to top');
    btt.style.cssText = [
        'position:fixed', 'bottom:1.5rem', 'right:1.5rem', 'z-index:500',
        'width:44px', 'height:44px', 'border-radius:50%',
        'background:#2D6A4F', 'color:#fff', 'border:none',
        'font-size:1.4rem', 'cursor:pointer',
        'box-shadow:0 4px 16px rgba(45,106,79,.3)',
        'opacity:0', 'transform:translateY(8px)',
        'transition:opacity .25s,transform .25s',
        'display:flex', 'align-items:center', 'justify-content:center',
        'line-height:1'
    ].join(';');
    document.body.appendChild(btt);

    window.addEventListener('scroll', function () {
        const show = window.scrollY > 400;
        btt.style.opacity  = show ? '1' : '0';
        btt.style.transform = show ? 'translateY(0)' : 'translateY(8px)';
        btt.style.pointerEvents = show ? 'auto' : 'none';
    }, { passive: true });

    btt.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

})();
