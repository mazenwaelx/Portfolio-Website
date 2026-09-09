/* ================================
   Majd-Inspired Portfolio — JavaScript
   Scroll reveals, nav toggle, interactions
================================ */

document.addEventListener('DOMContentLoaded', () => {
    // ─── Element References ───
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navClose = document.getElementById('nav-close');
    const navLinks = navMenu ? navMenu.querySelectorAll('a') : [];

    // ─── Scroll-Based Navbar ───
    let lastScrollY = 0;
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        if (navbar) {
            navbar.classList.toggle('scrolled', scrollY > 60);
        }
        lastScrollY = scrollY;
    }, { passive: true });

    // ─── Mobile Nav Toggle ───
    function openMenu() {
        if (navMenu) {
            navMenu.classList.add('active');
            navClose.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeMenu() {
        if (navMenu) {
            navMenu.classList.remove('active');
            navClose.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    if (navToggle) {
        navToggle.addEventListener('click', openMenu);
    }

    if (navClose) {
        navClose.addEventListener('click', closeMenu);
    }

    // Close menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeMenu();
        });
    });

    // Close menu on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu && navMenu.classList.contains('active')) {
            closeMenu();
        }
    });

    // ─── Hero Dynamic Title Rotator ───
    const heroRotator = document.getElementById('hero-rotator');
    if (heroRotator) {
        const titles = [
            '<span class="line">SOFTWARE</span><span class="line">ENGINEER</span>',
            '<span class="line">BACKEND &</span><span class="line">FULL-STACK</span>',
            '<span class="line">AI / ML &</span><span class="line">VISION</span>',
            '<span class="line">PRODUCTION</span><span class="line">SYSTEMS</span>'
        ];
        let currentIndex = 0;

        setInterval(() => {
            heroRotator.classList.add('changing-out');

            setTimeout(() => {
                currentIndex = (currentIndex + 1) % titles.length;
                heroRotator.innerHTML = titles[currentIndex];
                heroRotator.classList.remove('changing-out');
                heroRotator.classList.add('changing-in');

                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        heroRotator.classList.remove('changing-in');
                    });
                });
            }, 500);
        }, 3200);
    }

    // ─── Scroll Reveal Animation ───
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Don't unobserve — we want one-time reveal
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -60px 0px'
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // ─── Process Text Word-by-Word Reveal ───
    const processText = document.querySelector('.process-text');
    if (processText) {
        const processObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    processObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        processObserver.observe(processText);
    }

    // ─── Smooth Anchor Scrolling ───
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetEl = document.querySelector(targetId);
            if (targetEl) {
                e.preventDefault();
                targetEl.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ─── Project Card Tilt Effect (Subtle) ───
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / centerY * -3;
            const rotateY = (x - centerX) / centerX * 3;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });

    // ─── Service Row Hover Effect ───
    const serviceRows = document.querySelectorAll('.service-row');
    serviceRows.forEach(row => {
        row.addEventListener('mouseenter', () => {
            serviceRows.forEach(r => {
                if (r !== row) {
                    r.style.opacity = '0.4';
                }
            });
        });

        row.addEventListener('mouseleave', () => {
            serviceRows.forEach(r => {
                r.style.opacity = '';
            });
        });
    });

    // ─── Hero Parallax (Subtle) ───
    const heroPhoto = document.querySelector('.hero-photo');
    const heroTitle = document.querySelector('.hero-title');

    if (heroPhoto && heroTitle) {
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            const heroHeight = window.innerHeight;

            if (scrollY < heroHeight) {
                const progress = scrollY / heroHeight;
                heroPhoto.style.transform = `translateX(-50%) translateY(${progress * -30}px)`;
                heroTitle.style.transform = `translateY(${progress * 20}px)`;
                heroTitle.style.opacity = 1 - progress * 0.6;
            }
        }, { passive: true });
    }

    // ─── Footer Watermark Parallax ───
    const watermark = document.querySelector('.footer-watermark');
    if (watermark) {
        window.addEventListener('scroll', () => {
            const rect = watermark.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
                watermark.style.transform = `translateX(${(progress - 0.5) * -60}px)`;
            }
        }, { passive: true });
    }

    // ─── Contact Form Enhancement ───
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const project = document.getElementById('project').value;
            
            const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
            const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nProject Details:\n${project}`);
            
            window.location.href = `mailto:mazenwael575@gmail.com?subject=${subject}&body=${body}`;
        });
    }

    // ─── Decorative Stars Animation (Random Float) ───
    const stars = document.querySelectorAll('.hero-star');
    stars.forEach((star, index) => {
        const duration = 5 + Math.random() * 3;
        const delay = index * -2;
        star.style.animationDuration = `${duration}s`;
        star.style.animationDelay = `${delay}s`;
    });
});
