// ================================
// Navigation Functionality
// ================================
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle mobile menu
navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Navbar scroll effect
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// ================================
// Smooth Scrolling
// ================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ================================
// Active Navigation Link
// ================================
const sections = document.querySelectorAll('section[id]');

function setActiveNav() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (navLink) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLink.classList.add('active');
            } else {
                navLink.classList.remove('active');
            }
        }
    });
}

window.addEventListener('scroll', setActiveNav);

// ================================
// Scroll Reveal Animation
// ================================
function reveal() {
    const reveals = document.querySelectorAll('.skill-category, .project-card, .cert-card');

    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('reveal', 'active');
            element.style.transitionDelay = '0ms';
        }
    });
}

window.addEventListener('scroll', reveal);
reveal(); // Initial check

// ================================
// Staggered Reveal & Scroll Progress
// ================================
// Apply incremental delay so cards animate in sequence
const revealGroups = document.querySelectorAll('.projects-grid, .skills-grid, .cert-grid, .timeline');
revealGroups.forEach(group => {
    const items = group.querySelectorAll('.project-card, .skill-category, .cert-card, .timeline-item');
    items.forEach((item, i) => {
        item.style.transitionDelay = `${Math.min(i * 80, 400)}ms`;
    });
});

// Scroll progress bar
const progressBar = document.createElement('div');
progressBar.style.cssText = 'position:fixed;top:0;left:0;height:3px;width:0;z-index:2000;background:linear-gradient(90deg,#7C3AED,#0891B2);box-shadow:0 0 12px rgba(124,58,237,0.6);transition:width 0.1s ease;';
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = pct + '%';
});

// ================================
// Contact — handled inline via mailto links (no form)
// ================================

// ================================
// Typing Effect for Hero Title
// ================================
const heroTitle = document.getElementById('hero-title') || document.querySelector('.hero-title');
const titles = (heroTitle && heroTitle.dataset.rotate)
    ? heroTitle.dataset.rotate.split('|')
    : ['Software Engineer', 'Backend Developer', 'Full-Stack Developer', 'AI/ML Enthusiast'];
let titleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeTitle() {
    const currentTitleText = titles[titleIndex];

    if (!isDeleting) {
        charIndex++;
        heroTitle.innerHTML = currentTitleText.substring(0, charIndex) + '<span class="type-cursor">|</span>';

        if (charIndex > currentTitleText.length) {
            isDeleting = true;
            setTimeout(typeTitle, 2200);
            return;
        }
    } else {
        charIndex--;
        heroTitle.innerHTML = currentTitleText.substring(0, charIndex) + '<span class="type-cursor">|</span>';

        if (charIndex === 0) {
            isDeleting = false;
            titleIndex = (titleIndex + 1) % titles.length;
        }
    }

    const speed = isDeleting ? 40 : 80;
    setTimeout(typeTitle, speed);
}

// Start typing effect after a delay
if (heroTitle) {
    setTimeout(() => {
        heroTitle.innerHTML = '<span class="type-cursor">|</span>';
        typeTitle();
    }, 1000);
}

// ================================
// Back to Top Button (optional)
// ================================
function createBackToTop() {
    const backToTop = document.createElement('button');
    backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTop.className = 'back-to-top';
    backToTop.setAttribute('aria-label', 'Back to top');
    document.body.appendChild(backToTop);

    // Style the button
    backToTop.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--primary);
        color: white;
        border: none;
        cursor: pointer;
        display: none;
        align-items: center;
        justify-content: center;
        font-size: 1.25rem;
        box-shadow: 0 4px 14px rgba(99, 102, 241, 0.4);
        transition: all 0.3s ease;
        z-index: 999;
    `;

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            backToTop.style.display = 'flex';
        } else {
            backToTop.style.display = 'none';
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    backToTop.addEventListener('mouseenter', () => {
        backToTop.style.transform = 'translateY(-3px)';
        backToTop.style.boxShadow = '0 6px 20px rgba(99, 102, 241, 0.5)';
    });

    backToTop.addEventListener('mouseleave', () => {
        backToTop.style.transform = 'translateY(0)';
        backToTop.style.boxShadow = '0 4px 14px rgba(99, 102, 241, 0.4)';
    });
}

createBackToTop();

// ================================
// Console Easter Egg
// ================================
console.log('%c Welcome to Mazen Wael\'s Portfolio! 👋', 'color: #6366f1; font-size: 20px; font-weight: bold;');
console.log('%c Feel free to explore the code!', 'color: #94a3b8; font-size: 14px;');
