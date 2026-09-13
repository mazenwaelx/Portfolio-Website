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

    // ─── Scroll-Based Navbar 
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

    // ================================================================
    // ─── PROJECT GALLERY LIGHTBOX SYSTEM ───
    // ================================================================
    const PROJECT_GALLERIES = {
        'netpoint': {
            title: 'Arabic Hotel Reviews Sentiment Classification',
            badge: 'NetPoint Competition · 95.06% Accuracy',
            github: 'https://github.com/mazenwaelx',
            items: [
                {
                    src: 'assets/projects/netpoint/overview_top_1789163903606.png',
                    thumb: 'assets/projects/netpoint/overview_top_1789163903606.png',
                    title: 'Executive Dashboard & Competition Leaderboard',
                    desc: 'Top competition ranking with 95.06% test accuracy across 105,000+ Arabic reviews.'
                },
                {
                    src: 'assets/projects/netpoint/ensemble_arch_1789163986845.png',
                    thumb: 'assets/projects/netpoint/ensemble_arch_1789163986845.png',
                    title: '4-Way Deep Learning Ensemble Architecture',
                    desc: 'BiGRU, BiLSTM, Multi-Head Self-Attention, and Transformer models fused via soft voting.'
                },
                {
                    src: 'assets/projects/netpoint/live_inference_1789163962934.png',
                    thumb: 'assets/projects/netpoint/live_inference_1789163962934.png',
                    title: 'Real-Time Dialectal Arabic Live Inference',
                    desc: 'Interactive prediction engine with probability distributions and sentiment confidence breakdown.'
                },
                {
                    src: 'assets/projects/netpoint/overview_curves_matrix_1789163916722.png',
                    thumb: 'assets/projects/netpoint/overview_curves_matrix_1789163916722.png',
                    title: 'Loss / Accuracy Curves & Confusion Matrix',
                    desc: 'Training convergence curves and detailed multiclass confusion matrix across 105K hotel reviews.'
                },
                {
                    src: 'assets/projects/netpoint/ensemble_table_1789164010527.png',
                    thumb: 'assets/projects/netpoint/ensemble_table_1789164010527.png',
                    title: 'Model Benchmarking & Ensemble Weight Distribution',
                    desc: 'Comparison across baseline models, individual architectures, and the weighted ensemble.'
                },
                {
                    src: 'assets/projects/netpoint/training_metrics_1789164048933.png',
                    thumb: 'assets/projects/netpoint/training_metrics_1789164048933.png',
                    title: 'Training Progression & Epoch Metrics',
                    desc: 'Loss reduction, learning rate scheduling, validation precision, and recall metrics.'
                },
                {
                    src: 'assets/projects/netpoint/dataset_explorer_1789164089284.png',
                    thumb: 'assets/projects/netpoint/dataset_explorer_1789164089284.png',
                    title: 'Dataset Explorer & Token Distribution',
                    desc: 'Statistical analysis of the 105,000+ Arabic review corpus, token lengths, and vocabulary distribution.'
                },
                {
                    src: 'assets/projects/netpoint/english_view_1789164166919.png',
                    thumb: 'assets/projects/netpoint/english_view_1789164166919.png',
                    title: 'Multilingual UI & English Localization',
                    desc: 'Full English interface support with live inference demonstration and model analytics.'
                },
                {
                    src: 'assets/projects/netpoint/overview_scrolled_1789163909997.png',
                    thumb: 'assets/projects/netpoint/overview_scrolled_1789163909997.png',
                    title: 'System Preprocessing & Embedding Pipeline',
                    desc: 'Arabic text normalization, tashkeel removal, custom tokenization, and vector embedding workflows.'
                },
                {
                    src: 'assets/projects/netpoint/overview_bottom_1789163924275.png',
                    thumb: 'assets/projects/netpoint/overview_bottom_1789163924275.png',
                    title: 'Test Set Evaluation & Export Benchmarks',
                    desc: 'Final test set validation, error analysis, inference latency benchmarks, and export options.'
                }
            ]
        },
        'eyego': {
            title: 'Eyego — Real-Time Object Tracking',
            badge: "Meta SAM 2.1 Tiny · Computer Vision",
            github: 'https://github.com/mazenwaelx/eyogo-object-detection',
            items: [
                {
                    src: 'assets/project-eyego.jpg',
                    thumb: 'assets/project-eyego.jpg',
                    title: 'SAM 2.1 Object Segmentation & Tracking',
                    desc: 'Pixel-level segmentation and real-time GPU-accelerated object tracking with robust re-identification.'
                }
            ]
        },
        'marketmate': {
            title: 'Market Mate',
            badge: 'Full-Stack Marketplace · Microservices',
            github: 'https://github.com/mazenwaelx/MarketMate',
            items: [
                {
                    src: 'assets/project-marketmate.jpg',
                    thumb: 'assets/project-marketmate.jpg',
                    title: 'Market Mate Marketplace Platform',
                    desc: 'Scalable marketplace backend with 15+ RESTful endpoints, MySQL B-tree indexing, and WebSocket alerts.'
                },
                {
                    src: 'assets/project-marketmate.png',
                    thumb: 'assets/project-marketmate.png',
                    title: 'Architecture & System Infrastructure',
                    desc: 'Containerized Linux microservices with Docker, Nginx reverse proxy, and GitHub Actions CI/CD.'
                }
            ]
        },
        'legal-ai': {
            title: 'Egyptian Legal AI & LawyerConnect',
            badge: 'RAG Pipeline · Gemini API & FAISS',
            github: 'https://github.com/mazenwaelx/Grad-2.0v2',
            items: [
                {
                    src: 'assets/projects/legal-ai/ai_chat_assistant_app_1789315922195.png',
                    thumb: 'assets/projects/legal-ai/ai_chat_assistant_app_1789315922195.png',
                    title: 'AI Legal Assistant & Document Analysis',
                    desc: 'Specialized Egyptian Labour Law RAG system with ReAct reasoning, article citation, and document OCR analysis.'
                },
                {
                    src: 'assets/projects/legal-ai/hero_section_1789315705632.png',
                    thumb: 'assets/projects/legal-ai/hero_section_1789315705632.png',
                    title: 'LawyerConnect Platform & Hero Landing',
                    desc: 'Modern dark theme landing page with search by sector, client matchmaking, and consultation booking.'
                },
                {
                    src: 'assets/projects/legal-ai/lawyers_directory_page_1789315837227.png',
                    thumb: 'assets/projects/legal-ai/lawyers_directory_page_1789315837227.png',
                    title: 'Lawyer Directory & Specialization Filter',
                    desc: 'Lawyer directory with filtering across Egyptian legal sectors (Labor, Corporate, Criminal, Family, Real Estate) and verification badges.'
                },
                {
                    src: 'assets/projects/legal-ai/lawyers_directory_grid_1789315863863.png',
                    thumb: 'assets/projects/legal-ai/lawyers_directory_grid_1789315863863.png',
                    title: 'Verified Lawyer Cards & Client Ratings',
                    desc: 'Verified legal practitioner cards displaying star ratings, active cases, office locations, and direct booking.'
                },
                {
                    src: 'assets/projects/legal-ai/lawyer_profile_header_1789315772434.png',
                    thumb: 'assets/projects/legal-ai/lawyer_profile_header_1789315772434.png',
                    title: 'Lawyer Profile & Accreditation',
                    desc: 'Detailed attorney profile with bar registration numbers, practice areas, bio, and hourly rates.'
                },
                {
                    src: 'assets/projects/legal-ai/lawyer_profile_page_1789315758777.png',
                    thumb: 'assets/projects/legal-ai/lawyer_profile_page_1789315758777.png',
                    title: 'Client Reviews & Consultation Booking',
                    desc: 'Interactive booking scheduling system with client feedback, ratings breakdown, and consultation calendar.'
                },
                {
                    src: 'assets/projects/legal-ai/features_services_1789315711551.png',
                    thumb: 'assets/projects/legal-ai/features_services_1789315711551.png',
                    title: 'Platform Features & Capabilities',
                    desc: 'Overview of digital contract review, verified legal advice, emergency consultations, and encrypted communications.'
                },
                {
                    src: 'assets/projects/legal-ai/legal_sectors_how_it_works_1789315718349.png',
                    thumb: 'assets/projects/legal-ai/legal_sectors_how_it_works_1789315718349.png',
                    title: 'How It Works & Security Architecture',
                    desc: 'Step-by-step onboarding flow for clients and lawyers with end-to-end security compliance.'
                },
                {
                    src: 'assets/projects/legal-ai/ai_response_fullpage_1789315602413.png',
                    thumb: 'assets/projects/legal-ai/ai_response_fullpage_1789315602413.png',
                    title: 'Interactive Legal Consultation & Multi-Session History',
                    desc: 'Arabic conversational legal reasoning session citing Law 14 of 2025 with multi-session history sidebar.'
                }
            ]
        },
        'airbnb': {
            title: 'Airbnb Clone',
            badge: 'Distributed REST API · MySQL',
            github: 'https://github.com/mazenwaelx/Airbnb',
            items: [
                {
                    src: 'assets/project-airbnb.png',
                    thumb: 'assets/project-airbnb.png',
                    title: 'Airbnb Clone Architecture',
                    desc: 'Distributed booking API spanning 5 normalized relational models with comprehensive unit test coverage.'
                }
            ]
        },
        'heart-disease': {
            title: 'Heart Disease Prediction',
            badge: 'Machine Learning · 87% Accuracy',
            github: 'https://github.com/mazenwaelx/Heart_Disease_Project',
            items: [
                {
                    src: 'assets/project-heart-disease.png',
                    thumb: 'assets/project-heart-disease.png',
                    title: 'Clinical Diagnostic ML Visualizations',
                    desc: '8 exploratory diagnostic visualizations and hyperparameter-tuned classification model.'
                }
            ]
        },
        'habit-tracker': {
            title: 'Habit Tracker App',
            badge: 'ASP.NET Core MVC · SQL Server',
            github: 'https://github.com/mazenwaelx/Habit_Tracker',
            items: [
                {
                    src: 'assets/project-habit-tracker.png',
                    thumb: 'assets/project-habit-tracker.png',
                    title: 'Habit Tracker Dashboard & Analytics',
                    desc: 'ASP.NET Core MVC CRUD application with Entity Framework Core, SQL Server, and streak tracking.'
                }
            ]
        }
    };

    // Modal DOM Elements
    const galleryModal = document.getElementById('project-gallery-modal');
    const modalBackdrop = document.getElementById('gallery-modal-backdrop');
    const modalCloseBtn = document.getElementById('gallery-modal-close');
    const modalBadge = document.getElementById('gallery-modal-badge');
    const modalTitle = document.getElementById('gallery-modal-title');
    const modalGithub = document.getElementById('gallery-modal-github');
    const modalCounter = document.getElementById('gallery-modal-counter');
    const modalImg = document.getElementById('gallery-modal-img');
    const modalCaptionTitle = document.getElementById('gallery-caption-title');
    const modalCaptionDesc = document.getElementById('gallery-caption-desc');
    const modalCaption = document.getElementById('gallery-modal-caption');
    const thumbsTrack = document.getElementById('gallery-thumbs-track');
    const btnPrev = document.getElementById('gallery-btn-prev');
    const btnNext = document.getElementById('gallery-btn-next');
    const btnFullscreen = document.getElementById('gallery-modal-fullscreen');
    const spinner = document.getElementById('gallery-spinner');

    let currentProjectKey = null;
    let currentSlideIndex = 0;
    let touchStartX = 0;
    let touchEndX = 0;

    function openGallery(projectKey, startIndex = 0) {
        const galleryData = PROJECT_GALLERIES[projectKey];
        if (!galleryData || !galleryData.items || galleryData.items.length === 0) return;

        currentProjectKey = projectKey;
        currentSlideIndex = startIndex;

        // Populate Header info
        if (modalBadge) modalBadge.textContent = galleryData.badge || 'Project';
        if (modalTitle) modalTitle.textContent = galleryData.title || 'Project Screenshots';
        if (modalGithub) {
            modalGithub.href = galleryData.github || 'https://github.com/mazenwaelx';
        }

        // Populate Thumbnails
        if (thumbsTrack) {
            thumbsTrack.innerHTML = '';
            galleryData.items.forEach((item, idx) => {
                const thumbBtn = document.createElement('div');
                thumbBtn.className = `gallery-thumb-item ${idx === currentSlideIndex ? 'is-active' : ''}`;
                thumbBtn.setAttribute('data-index', idx);
                thumbBtn.setAttribute('title', item.title || `Screenshot ${idx + 1}`);

                const thumbImg = document.createElement('img');
                thumbImg.src = item.thumb || item.src;
                thumbImg.alt = item.title || `Thumbnail ${idx + 1}`;
                thumbImg.loading = 'lazy';

                thumbBtn.appendChild(thumbImg);
                thumbBtn.addEventListener('click', () => {
                    goToSlide(idx);
                });
                thumbsTrack.appendChild(thumbBtn);
            });
        }

        // Show navigation buttons if more than 1 item
        const hasMultiple = galleryData.items.length > 1;
        if (btnPrev) btnPrev.style.display = hasMultiple ? 'flex' : 'none';
        if (btnNext) btnNext.style.display = hasMultiple ? 'flex' : 'none';
        if (thumbsTrack && thumbsTrack.parentElement) {
            thumbsTrack.parentElement.style.display = hasMultiple ? 'block' : 'none';
        }

        // Render current slide
        renderSlide(currentSlideIndex);

        // Open modal
        if (galleryModal) {
            galleryModal.classList.add('is-active');
            galleryModal.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeGallery() {
        if (!galleryModal) return;
        galleryModal.classList.remove('is-active');
        galleryModal.classList.remove('is-fullscreen');
        galleryModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        currentProjectKey = null;
    }

    function renderSlide(index) {
        if (!currentProjectKey) return;
        const galleryData = PROJECT_GALLERIES[currentProjectKey];
        if (!galleryData || !galleryData.items[index]) return;

        const item = galleryData.items[index];
        currentSlideIndex = index;

        // Update counter
        if (modalCounter) {
            modalCounter.textContent = `${index + 1} / ${galleryData.items.length}`;
        }

        // Update Captions
        if (modalCaptionTitle) modalCaptionTitle.textContent = item.title || '';
        if (modalCaptionDesc) modalCaptionDesc.textContent = item.desc || '';
        if (modalCaption) {
            modalCaption.style.display = (item.title || item.desc) ? 'block' : 'none';
        }

        // Update active thumbnail
        if (thumbsTrack) {
            const thumbs = thumbsTrack.querySelectorAll('.gallery-thumb-item');
            thumbs.forEach((t, i) => {
                const isActive = i === index;
                t.classList.toggle('is-active', isActive);
                if (isActive) {
                    t.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                }
            });
        }

        // Image Loading State
        if (modalImg) {
            modalImg.classList.add('is-loading');
            if (spinner) spinner.classList.add('is-visible');

            const tempImg = new Image();
            tempImg.src = item.src;
            tempImg.onload = () => {
                modalImg.src = item.src;
                modalImg.alt = item.title || 'Project Screenshot';
                modalImg.classList.remove('is-loading');
                if (spinner) spinner.classList.remove('is-visible');
            };
            tempImg.onerror = () => {
                modalImg.src = item.src;
                modalImg.classList.remove('is-loading');
                if (spinner) spinner.classList.remove('is-visible');
            };
        }
    }

    function nextSlide() {
        if (!currentProjectKey) return;
        const galleryData = PROJECT_GALLERIES[currentProjectKey];
        if (!galleryData) return;
        const nextIdx = (currentSlideIndex + 1) % galleryData.items.length;
        renderSlide(nextIdx);
    }

    function prevSlide() {
        if (!currentProjectKey) return;
        const galleryData = PROJECT_GALLERIES[currentProjectKey];
        if (!galleryData) return;
        const prevIdx = (currentSlideIndex - 1 + galleryData.items.length) % galleryData.items.length;
        renderSlide(prevIdx);
    }

    function goToSlide(index) {
        renderSlide(index);
    }

    // Event Listeners for opening gallery
    document.querySelectorAll('.btn-open-gallery').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const projectKey = btn.getAttribute('data-project');
            if (projectKey) {
                openGallery(projectKey, 0);
            }
        });
    });

    // Also support clicking project cards directly to view gallery if not clicking a link
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', (e) => {
            if (e.target.closest('a') || e.target.closest('.btn-open-gallery')) {
                return;
            }
            const projectKey = card.getAttribute('data-project-id');
            if (projectKey && PROJECT_GALLERIES[projectKey]) {
                openGallery(projectKey, 0);
            }
        });
    });

    // Close buttons & Backdrop
    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', closeGallery);
    }
    if (modalBackdrop) {
        modalBackdrop.addEventListener('click', closeGallery);
    }

    // Navigation arrows
    if (btnPrev) {
        btnPrev.addEventListener('click', (e) => {
            e.stopPropagation();
            prevSlide();
        });
    }
    if (btnNext) {
        btnNext.addEventListener('click', (e) => {
            e.stopPropagation();
            nextSlide();
        });
    }

    // Fullscreen toggle
    if (btnFullscreen && galleryModal) {
        btnFullscreen.addEventListener('click', () => {
            galleryModal.classList.toggle('is-fullscreen');
            const isFull = galleryModal.classList.contains('is-fullscreen');
            btnFullscreen.innerHTML = isFull ? '<i class="fas fa-compress"></i>' : '<i class="fas fa-expand"></i>';
        });
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!galleryModal || !galleryModal.classList.contains('is-active')) return;

        if (e.key === 'Escape') {
            closeGallery();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
        } else if (e.key === 'ArrowLeft') {
            prevSlide();
        } else if (e.key === 'f' || e.key === 'F') {
            if (btnFullscreen) btnFullscreen.click();
        }
    });

    // Touch Swipe navigation on gallery main stage
    const mainStage = document.querySelector('.gallery-main-stage');
    if (mainStage) {
        mainStage.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        mainStage.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });
    }

    function handleSwipe() {
        const swipeThreshold = 50;
        if (touchEndX < touchStartX - swipeThreshold) {
            nextSlide();
        } else if (touchEndX > touchStartX + swipeThreshold) {
            prevSlide();
        }
    }
});

