/**
 * Cyber UXcellence Awards - Enhanced JavaScript
 * ---------------------------------------------
 * A modern, optimized script for the Cyber UXcellence Awards website.
 * 
 * Table of Contents:
 * 1. Global Variables
 * 2. Utility Functions
 * 3. Navigation & Mobile Menu
 * 4. Scroll Behaviors
 * 5. Animations
 * 6. UI Interactions (FAQs, etc)
 * 7. Form Handling & Validation
 * 8. Third-party Integrations
 * 9. Initialization
 */

// Wait for DOM to fully load before executing
document.addEventListener('DOMContentLoaded', () => {
    
    /**
     * 1. Global Variables
     */
    const body = document.body;
    const header = document.getElementById('site-header');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.getElementById('nav-links');
    const sections = document.querySelectorAll('section[id]');
    const faqItems = document.querySelectorAll('.faq-item');
    const forms = document.querySelectorAll('form');
    const backToTopBtn = document.getElementById('back-to-top');
    const cookieConsent = document.getElementById('cookie-consent');
    const categoriesContainer = document.querySelector('.categories-scroll-container');
    const scrollLeftBtn = document.getElementById('scroll-left');
    const scrollRightBtn = document.getElementById('scroll-right');
    const scrollThumb = document.querySelector('.scroll-thumb');
    
    // Configuration variables for animations, scrolling, etc.
    const config = {
        headerHeight: parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-height')),
        scrollThreshold: 100,
        scrollOffset: 80,
        animationThreshold: 0.1,
        animationRootMargin: '0px 0px -100px 0px',
        cookieExpirationDays: 30
    };
    
    /**
     * 2. Utility Functions
     */
    
    // Throttle function to limit execution frequency
    const throttle = (fn, delay) => {
        let lastCall = 0;
        return function(...args) {
            const now = new Date().getTime();
            if (now - lastCall < delay) {
                return;
            }
            lastCall = now;
            return fn(...args);
        };
    };
    
    // Debounce function to delay execution
    const debounce = (fn, delay) => {
        let timeoutId;
        return function(...args) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                fn.apply(this, args);
            }, delay);
        };
    };
    
    // Check if element is in viewport
    const isInViewport = (element, offset = 0) => {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight - offset) &&
            rect.bottom >= offset
        );
    };
    
    // Set or get cookie
    const setCookie = (name, value, days) => {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = `expires=${date.toUTCString()}`;
        document.cookie = `${name}=${value};${expires};path=/;SameSite=Lax`;
    };
    
    const getCookie = (name) => {
        const cookieName = `${name}=`;
        const cookies = document.cookie.split(';');
        for (let cookie of cookies) {
            cookie = cookie.trim();
            if (cookie.indexOf(cookieName) === 0) {
                return cookie.substring(cookieName.length, cookie.length);
            }
        }
        return '';
    };
    
    /**
     * 3. Navigation & Mobile Menu
     */
    
    // Toggle mobile menu
    const toggleMobileMenu = () => {
        const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
        hamburger.setAttribute('aria-expanded', !isExpanded);
        navLinks.classList.toggle('show');
        body.classList.toggle('nav-open');
    };
    
    // Setup mobile menu toggle
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', toggleMobileMenu);
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navLinks && 
            navLinks.classList.contains('show') && 
            !e.target.closest('.nav-links') && 
            !e.target.closest('.hamburger')) {
            toggleMobileMenu();
        }
    });
    
    // Set active navigation link based on scroll position
    const highlightNavigation = () => {
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - config.scrollOffset;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = sectionId;
            }
        });
        
        document.querySelectorAll('.nav-links .nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    };
    
    /**
     * 4. Scroll Behaviors
     */
    
    // Smooth scroll to target
    const smoothScrollTo = (targetId) => {
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const offsetPosition = targetElement.offsetTop - config.scrollOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };
    
    // Handle header visibility and styles on scroll
    const handleHeaderVisibility = () => {
        const currentScrollPos = window.scrollY;
        
        // Add 'scrolled' class for style changes
        if (currentScrollPos > config.scrollThreshold) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Show/hide back to top button
        if (currentScrollPos > window.innerHeight / 2) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    };
    
    // Handle smooth scrolling for all internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // Skip if it's just "#" or opening a modal
            if (targetId === '#' || this.classList.contains('modal-trigger')) {
                return;
            }
            
            e.preventDefault();
            
            // Close mobile menu if it's open
            if (navLinks && navLinks.classList.contains('show')) {
                toggleMobileMenu();
            }
            
            smoothScrollTo(targetId);
        });
    });
    
    // Back to top button click handler
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    /**
     * 5. Animations
     */
    
    // Initialize AOS (Animate On Scroll) library
    const initAOS = () => {
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 800,
                easing: 'ease-out',
                once: true,
                offset: 100
            });
        }
    };
    
    // Update scroll indicator position (global scope for resize handler)
    const updateScrollThumb = () => {
        if (!categoriesContainer || !scrollThumb) return;
        
        const scrollPercentage = categoriesContainer.scrollLeft / 
            (categoriesContainer.scrollWidth - categoriesContainer.clientWidth);
        
        const maxLeft = 80; // 100% - 20% (thumb width)
        scrollThumb.style.left = `${scrollPercentage * maxLeft}%`;
    };
    
    // 3D Category Carousel
    const init3DCategoryCarousel = () => {
        const categoryCards = document.querySelectorAll('.category-card');
        const categoryTabs = document.querySelectorAll('.category-tab');
        const carouselIndicators = document.querySelectorAll('.carousel-indicator');
        const prevBtn = document.getElementById('prev-category');
        const nextBtn = document.getElementById('next-category');
        const carousel = document.querySelector('.category-cards');
        
        if (!categoryCards.length || !carousel) return;
        
        // Total number of cards
        const totalCards = categoryCards.length;
        
        // Current active card index
        let activeIndex = 0;
        
        // Function to update carousel display based on active index
        const updateCarousel = (newIndex) => {
            // Mark carousel as rotating during transition
            carousel.classList.add('rotating');
            
            // Update active card index
            activeIndex = newIndex;
            
            // Update active states
            categoryCards.forEach((card, index) => {
                card.classList.remove('active');
                
                // Calculate position relative to active card
                const relativePosition = (index - activeIndex + totalCards) % totalCards;
                
                // Create circular effect by reassigning z-index and rotation
                let zIndex, rotation, opacity, translateZ, scale;
                
                if (relativePosition === 0) {
                    // Active card (front center)
                    zIndex = 10;
                    rotation = 0;
                    opacity = 1;
                    translateZ = 250; // Pushed further forward
                    scale = 1.05;
                } else if (relativePosition === 1 || relativePosition === totalCards - 1) {
                    // First card to right/left
                    zIndex = 8;
                    rotation = relativePosition === 1 ? 30 : -30; // More rotation
                    opacity = 0.85;
                    translateZ = 50; // Slightly forward
                    scale = 0.97;
                } else if (relativePosition === 2 || relativePosition === totalCards - 2) {
                    // Second card to right/left
                    zIndex = 6;
                    rotation = relativePosition === 2 ? 45 : -45; // More rotation
                    opacity = 0.7;
                    translateZ = -100;
                    scale = 0.92;
                } else {
                    // Cards in back
                    zIndex = 4;
                    rotation = 0;
                    opacity = 0.4; // More transparent
                    translateZ = -250; // Pushed further back
                    scale = 0.85; // Smaller
                }
                
                // Apply 3D transforms
                card.style.zIndex = zIndex;
                card.style.transform = `translate(-50%, -50%) translateZ(${translateZ}px) rotateY(${rotation}deg) scale(${scale})`;
                card.style.opacity = opacity;
            });
            
            // Add active class to current card
            categoryCards[activeIndex].classList.add('active');
            
            // Update tabs
            categoryTabs.forEach((tab, index) => {
                tab.classList.toggle('active', index === activeIndex);
            });
            
            // Update indicators
            carouselIndicators.forEach((indicator, index) => {
                indicator.classList.toggle('active', index === activeIndex);
            });
            
            // Remove rotating class after transition completes
            setTimeout(() => {
                carousel.classList.remove('rotating');
            }, 600);
        };
        
        // Initialize navigation buttons
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                const newIndex = (activeIndex - 1 + totalCards) % totalCards;
                updateCarousel(newIndex);
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                const newIndex = (activeIndex + 1) % totalCards;
                updateCarousel(newIndex);
            });
        }
        
        // Initialize tab navigation
        categoryTabs.forEach((tab) => {
            tab.addEventListener('click', () => {
                const index = parseInt(tab.getAttribute('data-index'), 10);
                if (!isNaN(index) && index >= 0 && index < totalCards) {
                    updateCarousel(index);
                }
            });
        });
        
        // Initialize indicator navigation
        carouselIndicators.forEach((indicator) => {
            indicator.addEventListener('click', () => {
                const index = parseInt(indicator.getAttribute('data-index'), 10);
                if (!isNaN(index) && index >= 0 && index < totalCards) {
                    updateCarousel(index);
                }
            });
        });
        
        // Card click handler
        categoryCards.forEach((card) => {
            card.addEventListener('click', () => {
                const index = parseInt(card.getAttribute('data-index'), 10);
                if (!isNaN(index) && index >= 0 && index < totalCards && index !== activeIndex) {
                    updateCarousel(index);
                }
            });
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                const newIndex = (activeIndex - 1 + totalCards) % totalCards;
                updateCarousel(newIndex);
            } else if (e.key === 'ArrowRight') {
                const newIndex = (activeIndex + 1) % totalCards;
                updateCarousel(newIndex);
            }
        });
        
        // Touch events for swipe
        let touchStartX = 0;
        let touchEndX = 0;
        
        carousel.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        carousel.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });
        
        const handleSwipe = () => {
            const swipeThreshold = 50; // Minimum swipe distance
            
            if (touchStartX - touchEndX > swipeThreshold) {
                // Swipe left, go to next card
                const newIndex = (activeIndex + 1) % totalCards;
                updateCarousel(newIndex);
            } else if (touchEndX - touchStartX > swipeThreshold) {
                // Swipe right, go to previous card
                const newIndex = (activeIndex - 1 + totalCards) % totalCards;
                updateCarousel(newIndex);
            }
        };
        
        // Initialize position for all cards
        categoryCards.forEach((card, index) => {
            // Set each card's initial position in 3D space based on position relative to active
            const relativePosition = (index - activeIndex + totalCards) % totalCards;
            
            let zIndex, rotation, opacity, translateZ, scale;
            
            if (relativePosition === 0) {
                // Active card
                zIndex = 10;
                rotation = 0;
                opacity = 1;
                translateZ = 250; // Pushed further forward
                scale = 1.05;
            } else if (relativePosition === 1 || relativePosition === totalCards - 1) {
                // Cards to the immediate right/left
                zIndex = 8;
                rotation = relativePosition === 1 ? 30 : -30; // More rotation
                opacity = 0.85;
                translateZ = 50; // Slightly forward
                scale = 0.97;
            } else if (relativePosition === 2 || relativePosition === totalCards - 2) {
                // Cards two positions away
                zIndex = 6;
                rotation = relativePosition === 2 ? 45 : -45; // More rotation
                opacity = 0.7;
                translateZ = -100;
                scale = 0.92;
            } else {
                // Cards in the back
                zIndex = 4;
                rotation = 0;
                opacity = 0.4; // More transparent
                translateZ = -250; // Pushed further back
                scale = 0.85; // Smaller
            }
            
            // Apply styles
            card.style.zIndex = zIndex;
            card.style.transform = `translate(-50%, -50%) translateZ(${translateZ}px) rotateY(${rotation}deg) scale(${scale})`;
            card.style.opacity = opacity;
        });
        
        // Add resize handler for responsive adjustments
        window.addEventListener('resize', debounce(() => {
            // Reset positions on resize
            updateCarousel(activeIndex);
        }, 200));
        
        // Initialize animation for stats
        initPremiumStatsCounters();
    };
    
    // Initialize stat counter animations
    const initPremiumStatsCounters = () => {
        if (!window.gsap) return;
        
        const statValues = document.querySelectorAll('.stat-value');
        
        statValues.forEach(stat => {
            const value = stat.textContent;
            let targetValue = parseFloat(value);
            
            // Check if the value has a % or x suffix
            const suffix = value.match(/[%x+-]/g) ? value.match(/[%x+-]/g)[0] : '';
            
            // Don't animate if it's not a simple number
            if (isNaN(targetValue)) return;
            
            // Set initial value to 0
            stat.textContent = suffix === '%' ? '0%' : 
                               suffix === 'x' ? '0x' : 
                               suffix === '+' ? '+0' : 
                               suffix === '-' ? '-0' : '0';
            
            // Create observer for animation trigger
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Animate count from 0 to target value
                        gsap.to(stat, {
                            duration: 2.5,
                            innerText: {
                                value: value,
                                formatted: true
                            },
                            ease: "power2.out",
                            onUpdate: function() {
                                const currentValue = parseFloat(stat.textContent);
                                // Format with suffix
                                if (suffix === '%') {
                                    stat.textContent = Math.round(currentValue) + '%';
                                } else if (suffix === 'x') {
                                    stat.textContent = currentValue.toFixed(1) + 'x';
                                } else if (suffix === '+') {
                                    stat.textContent = '+' + Math.round(currentValue);
                                } else if (suffix === '-') {
                                    stat.textContent = '-' + Math.round(currentValue);
                                } else {
                                    stat.textContent = currentValue.toFixed(0);
                                }
                            },
                            onComplete: function() {
                                // Ensure the final value is exactly what was specified
                                stat.textContent = value;
                            }
                        });
                        
                        // Stop observing after animation is triggered
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            
            // Start observing
            observer.observe(stat.parentElement);
        });
    };
    
    // Fallback for browsers without IntersectionObserver support
    const initFallbackAnimations = () => {
        const animatedElements = document.querySelectorAll('[data-aos]');
        animatedElements.forEach(element => {
            element.classList.add('aos-animate');
        });
    };
    
    // Initialize animation observers or fallbacks
    const initAnimations = () => {
        // Check if AOS library is available
        if (typeof AOS !== 'undefined') {
            initAOS();
        } else if ('IntersectionObserver' in window) {
            // Use native IntersectionObserver as fallback
            const fadeElements = document.querySelectorAll('[data-aos]');
            
            const fadeObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('aos-animate');
                        fadeObserver.unobserve(entry.target);
                    }
                });
            }, {
                root: null,
                threshold: config.animationThreshold,
                rootMargin: config.animationRootMargin
            });
            
            fadeElements.forEach(element => {
                fadeObserver.observe(element);
            });
        } else {
            // Legacy browser fallback
            initFallbackAnimations();
        }
    };
    
    // Add particle animation to hero section
    const initParticleAnimation = () => {
        const heroParticles = document.querySelector('.hero-particles');
        
        if (heroParticles) {
            // Don't add particles for users who prefer reduced motion
            if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                return;
            }
            
            // Create and append particles
            const particleCount = window.innerWidth < 768 ? 30 : 50;
            
            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('span');
                particle.classList.add('particle');
                
                // Random position
                const posX = Math.random() * 100;
                const posY = Math.random() * 100;
                
                // Random size
                const size = Math.random() * 5 + 2;
                
                // Random animation duration
                const duration = Math.random() * 20 + 10;
                
                // Apply styles
                particle.style.cssText = `
                    position: absolute;
                    top: ${posY}%;
                    left: ${posX}%;
                    width: ${size}px;
                    height: ${size}px;
                    background-color: rgba(255, 255, 255, ${Math.random() * 0.3 + 0.1});
                    border-radius: 50%;
                    animation: float ${duration}s linear infinite;
                    animation-delay: ${Math.random() * 5}s;
                    will-change: opacity, transform;
                `;
                
                heroParticles.appendChild(particle);
            }
        }
    };
    
    // Initialize GSAP animations for premium category cards
    const initPremiumCardAnimations = () => {
        if (!window.gsap || !window.ScrollTrigger) return;
        
        // Don't run complex animations for users who prefer reduced motion
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        
        const categoryCards = document.querySelectorAll('.category-card');
        if (!categoryCards.length) return;
        
        // Register ScrollTrigger plugin
        gsap.registerPlugin(ScrollTrigger);
        
        // Animate category cards on scroll
        gsap.utils.toArray('.category-card').forEach((card, i) => {
            // Staggered entrance animation
            gsap.fromTo(card, 
                { 
                    y: 50, 
                    opacity: 0,
                    scale: 0.95
                },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 0.8,
                    ease: "power3.out",
                    stagger: 0.1,
                    scrollTrigger: {
                        trigger: card,
                        start: "top bottom-=100",
                        end: "bottom center",
                        toggleActions: "play none none none"
                    }
                }
            );
            
            // Create hover effect with GSAP
            card.addEventListener('mouseenter', () => {
                gsap.to(card, {
                    y: -15,
                    scale: 1.02,
                    boxShadow: "0 30px 60px rgba(0,0,0,0.15), 0 0 15px rgba(106,27,154,0.2)",
                    duration: 0.4,
                    ease: "power2.out",
                    overwrite: "auto"
                });
                
                // Animate card elements
                const icon = card.querySelector('.category-icon');
                const title = card.querySelector('.category-title');
                const desc = card.querySelector('.category-description');
                
                gsap.to(icon, {
                    rotationY: 180,
                    scale: 1.1,
                    backgroundColor: "#6a1b9a",
                    color: "#ffffff",
                    duration: 0.6,
                    ease: "back.out(1.5)"
                });
                
                gsap.to(title, {
                    color: "#38006b",
                    duration: 0.3,
                    ease: "power1.out"
                });
                
                gsap.to(desc, {
                    color: "#424242",
                    duration: 0.3,
                    ease: "power1.out"
                });
            });
            
            card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    y: 0,
                    scale: 1,
                    boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
                    duration: 0.5,
                    ease: "power3.out",
                    overwrite: "auto"
                });
                
                // Reset card elements
                const icon = card.querySelector('.category-icon');
                const title = card.querySelector('.category-title');
                const desc = card.querySelector('.category-description');
                
                gsap.to(icon, {
                    rotationY: 0,
                    scale: 1,
                    backgroundColor: "rgba(106, 27, 154, 0.1)",
                    color: "#6a1b9a",
                    duration: 0.6,
                    ease: "power3.out"
                });
                
                gsap.to(title, {
                    color: "#6a1b9a",
                    duration: 0.3,
                    ease: "power1.out"
                });
                
                gsap.to(desc, {
                    color: "#757575",
                    duration: 0.3,
                    ease: "power1.out"
                });
            });
            
            // Add click animation effect
            card.addEventListener('click', () => {
                // Create a pulse/heartbeat effect
                gsap.timeline()
                    .to(card, {
                        scale: 1.05,
                        boxShadow: "0 30px 60px rgba(0,0,0,0.2), 0 0 20px rgba(106,27,154,0.3)",
                        duration: 0.2,
                        ease: "power1.inOut"
                    })
                    .to(card, {
                        scale: 1.03,
                        boxShadow: "0 25px 50px rgba(0,0,0,0.15), 0 0 15px rgba(106,27,154,0.2)",
                        duration: 0.2,
                        ease: "power1.inOut"
                    })
                    .to(card, {
                        scale: 1.05,
                        boxShadow: "0 30px 60px rgba(0,0,0,0.2), 0 0 20px rgba(106,27,154,0.3)",
                        duration: 0.3,
                        ease: "power1.inOut"
                    })
                    .to(card, {
                        scale: 1, 
                        y: 0,
                        boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                        duration: 0.5,
                        ease: "elastic.out(1, 0.3)"
                    });
                
                // Flash the icon
                const icon = card.querySelector('.category-icon');
                gsap.timeline()
                    .to(icon, {
                        backgroundColor: "#ff6d00",
                        scale: 1.2,
                        duration: 0.2
                    })
                    .to(icon, {
                        backgroundColor: "#6a1b9a",
                        scale: 1.1,
                        duration: 0.3
                    })
                    .to(icon, {
                        backgroundColor: "rgba(106, 27, 154, 0.1)",
                        scale: 1,
                        rotationY: 0,
                        color: "#6a1b9a",
                        duration: 0.5,
                        ease: "power2.out"
                    });
                    
                // Ensure we always end in the base state
                setTimeout(() => {
                    if (!card.matches(':hover')) {
                        gsap.to(card, {
                            y: 0,
                            scale: 1,
                            boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
                            duration: 0.3
                        });
                    }
                }, 1000);
            });
        });
        
        // Special animation for the hero card
        const heroCard = document.querySelector('.category-card-best-overall');
        if (heroCard) {
            // Create a subtle floating effect
            gsap.to(heroCard, {
                y: -8,
                duration: 3.5,
                ease: "sine.inOut",
                repeat: -1,
                yoyo: true
            });
            
            // Create shimmering gradient background effect
            const gradientAnimation = gsap.timeline({repeat: -1, repeatDelay: 2});
            gradientAnimation.to(heroCard, {
                backgroundImage: 'linear-gradient(160deg, rgba(106, 27, 154, 0.95), rgba(120, 40, 180, 0.9))',
                duration: 5,
                ease: "sine.inOut"
            });
            gradientAnimation.to(heroCard, {
                backgroundImage: 'linear-gradient(200deg, rgba(120, 40, 180, 0.9), rgba(150, 60, 220, 0.85))',
                duration: 5,
                ease: "sine.inOut"
            });
            
            // Add a subtle border pulse
            gsap.to(heroCard, {
                boxShadow: '0 15px 50px rgba(106, 27, 154, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.3)',
                duration: 2.5,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });
            
            // Add subtle animation to hero stats
            const statValues = heroCard.querySelectorAll('.stat-value');
            statValues.forEach(stat => {
                const originalValue = stat.textContent;
                const numValue = parseFloat(originalValue);
                if (!isNaN(numValue)) {
                    // Create counting animation
                    gsap.from(stat, {
                        innerText: 0,
                        duration: 2,
                        ease: "power2.out",
                        snap: { innerText: 1 },
                        delay: 0.5,
                        onComplete: () => {
                            stat.textContent = originalValue;
                        }
                    });
                }
            });
        }
    };
    
    /**
     * 6. UI Interactions
     */
    
    // Handle FAQ accordion functionality
    const initFaqAccordion = () => {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            const answer = item.querySelector('.faq-answer');
            
            question.addEventListener('click', () => {
                const isExpanded = question.getAttribute('aria-expanded') === 'true';
                
                // Close all other items
                faqItems.forEach(otherItem => {
                    const otherQuestion = otherItem.querySelector('.faq-question');
                    if (otherItem !== item && otherQuestion.getAttribute('aria-expanded') === 'true') {
                        otherQuestion.setAttribute('aria-expanded', 'false');
                    }
                });
                
                // Toggle current item
                question.setAttribute('aria-expanded', !isExpanded);
            });
            
            // Allow keyboard navigation
            question.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    question.click();
                }
            });
        });
    };
    
    // Cookie consent banner
    const initCookieConsent = () => {
        const cookieAccepted = getCookie('cookie_consent');
        
        if (!cookieAccepted && cookieConsent) {
            // Wait a bit before showing the cookie banner for better UX
            setTimeout(() => {
                cookieConsent.style.display = 'block';
                cookieConsent.setAttribute('role', 'alert');
                cookieConsent.setAttribute('aria-live', 'polite');
            }, 2000);
            
            // Accept button
            const acceptBtn = document.getElementById('cookie-accept');
            if (acceptBtn) {
                acceptBtn.addEventListener('click', () => {
                    setCookie('cookie_consent', 'accepted', config.cookieExpirationDays);
                    cookieConsent.style.display = 'none';
                });
            }
            
            // Decline button
            const declineBtn = document.getElementById('cookie-decline');
            if (declineBtn) {
                declineBtn.addEventListener('click', () => {
                    setCookie('cookie_consent', 'declined', config.cookieExpirationDays);
                    cookieConsent.style.display = 'none';
                });
            }
        }
    };
    
    /**
     * 7. Form Handling & Validation
     */
    
    // Validate form fields
    const validateField = (field) => {
        let isValid = true;
        
        // Check required fields
        if (field.hasAttribute('required') && !field.value.trim()) {
            isValid = false;
            field.classList.add('error');
            
            // Add error message if it doesn't exist
            let errorMessage = field.nextElementSibling;
            if (!errorMessage || !errorMessage.classList.contains('form-error')) {
                errorMessage = document.createElement('div');
                errorMessage.classList.add('form-error');
                errorMessage.textContent = 'This field is required';
                field.parentNode.insertBefore(errorMessage, field.nextSibling);
            }
        } else {
            field.classList.remove('error');
            
            // Remove error message if it exists
            const errorMessage = field.nextElementSibling;
            if (errorMessage && errorMessage.classList.contains('form-error')) {
                errorMessage.remove();
            }
        }
        
        // Email validation
        if (field.type === 'email' && field.value.trim()) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(field.value)) {
                isValid = false;
                field.classList.add('error');
                
                // Add error message if it doesn't exist
                let errorMessage = field.nextElementSibling;
                if (!errorMessage || !errorMessage.classList.contains('form-error')) {
                    errorMessage = document.createElement('div');
                    errorMessage.classList.add('form-error');
                    errorMessage.textContent = 'Please enter a valid email address';
                    field.parentNode.insertBefore(errorMessage, field.nextSibling);
                }
            }
        }
        
        return isValid;
    };
    
    // Form submission handler
    const handleFormSubmit = (form, event) => {
        event.preventDefault();
        
        let isValid = true;
        const formFields = form.querySelectorAll('input, textarea, select');
        
        // Validate all fields
        formFields.forEach(field => {
            if (!validateField(field)) {
                isValid = false;
            }
        });
        
        if (isValid) {
            // Show loading indicator
            const submitBtn = form.querySelector('[type="submit"]');
            if (submitBtn) {
                const originalText = submitBtn.textContent;
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
                
                // Simulate form submission (replace with actual submission)
                setTimeout(() => {
                    // Show success message
                    const formSuccess = document.createElement('div');
                    formSuccess.classList.add('form-success');
                    formSuccess.innerHTML = '<i class="fas fa-check-circle"></i> Thank you for your submission! We will be in touch soon.';
                    form.prepend(formSuccess);
                    
                    // Reset form
                    form.reset();
                    
                    // Restore submit button
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalText;
                    
                    // Remove success message after delay
                    setTimeout(() => {
                        formSuccess.remove();
                    }, 5000);
                }, 1500);
            }
        }
    };
    
    // Setup form validation
    const initFormValidation = () => {
        forms.forEach(form => {
            // Validate on submit
            form.addEventListener('submit', (e) => handleFormSubmit(form, e));
            
            // Live validation on blur
            const formFields = form.querySelectorAll('input, textarea, select');
            formFields.forEach(field => {
                field.addEventListener('blur', () => {
                    validateField(field);
                });
                
                // Clear error on focus
                field.addEventListener('focus', () => {
                    field.classList.remove('error');
                    const errorMessage = field.nextElementSibling;
                    if (errorMessage && errorMessage.classList.contains('form-error')) {
                        errorMessage.remove();
                    }
                });
            });
        });
    };
    
    /**
     * 8. Third-party Integrations
     */
    
    // Initialize HubSpot form
    const initHubSpotForm = () => {
        const hubspotFormContainer = document.getElementById('hubspot-form');
        
        if (hubspotFormContainer && typeof hbspt !== 'undefined') {
            hbspt.forms.create({
                portalId: "YOUR_HUBSPOT_PORTAL_ID", // Replace with actual HubSpot portal ID
                formId: "YOUR_HUBSPOT_FORM_ID",     // Replace with actual HubSpot form ID
                target: "#hubspot-form",
                onFormReady: function() {
                    console.log('HubSpot form loaded successfully');
                }
            });
        } else {
            // Load HubSpot script if not already loaded
            const hubspotFormScript = document.createElement('script');
            hubspotFormScript.src = "//js.hsforms.net/forms/v2.js";
            hubspotFormScript.async = true;
            hubspotFormScript.onload = function() {
                if (hubspotFormContainer && typeof hbspt !== 'undefined') {
                    hbspt.forms.create({
                        portalId: "YOUR_HUBSPOT_PORTAL_ID", // Replace with actual HubSpot portal ID
                        formId: "YOUR_HUBSPOT_FORM_ID",     // Replace with actual HubSpot form ID
                        target: "#hubspot-form",
                        onFormReady: function() {
                            console.log('HubSpot form loaded successfully');
                        }
                    });
                }
            };
            document.head.appendChild(hubspotFormScript);
        }
    };
    
    /**
     * 9. Initialization
     */
    
    // Modal functionality
    const initModalFunctionality = () => {
        const modalButtons = [
            document.getElementById('open-nomination-modal'),
            document.getElementById('open-nomination-modal-hero'),
            document.getElementById('open-nomination-modal-nav')
        ].filter(btn => btn !== null);
        
        const modal = document.getElementById('nomination-modal');
        const closeModalBtn = modal?.querySelector('.modal-close');
        const modalBackdrop = modal?.querySelector('.modal-backdrop');
        
        if (modalButtons.length === 0 || !modal) return;
        
        // Track which button opened the modal for focus return
        let activeButton = null;
        
        // Open modal function
        const openModal = (clickedButton) => {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
            activeButton = clickedButton;
            
            // Focus first form field for accessibility
            setTimeout(() => {
                const firstInput = modal.querySelector('input');
                if (firstInput) firstInput.focus();
            }, 100);
        };
        
        // Close modal function
        const closeModal = () => {
            modal.classList.remove('active');
            document.body.style.overflow = '';
            
            // Return focus to the button that opened the modal
            if (activeButton) activeButton.focus();
        };
        
        // Add event listeners to all nomination buttons
        modalButtons.forEach(btn => {
            btn.addEventListener('click', () => openModal(btn));
        });
        
        if (closeModalBtn) {
            closeModalBtn.addEventListener('click', closeModal);
        }
        
        if (modalBackdrop) {
            modalBackdrop.addEventListener('click', closeModal);
        }
        
        // Close modal on ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                closeModal();
            }
        });
        
        // Trap focus inside modal for accessibility
        modal.addEventListener('keydown', (e) => {
            if (e.key === 'Tab' && modal.classList.contains('active')) {
                const focusableElements = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
                const firstElement = focusableElements[0];
                const lastElement = focusableElements[focusableElements.length - 1];
                
                // If shift+tab on first element, move to last element
                if (e.shiftKey && document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement.focus();
                }
                // If tab on last element, move to first element
                else if (!e.shiftKey && document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement.focus();
                }
            }
        });
    };

    // Initialize all components
    const init = () => {
        // Initialize animations
        initAnimations();
        
        // Initialize UI components
        initFaqAccordion();
        initFormValidation();
        initCookieConsent();
        initModalFunctionality();
        
        // Initialize 3D category carousel
        init3DCategoryCarousel();
        
        // Initialize premium card animations
        initPremiumCardAnimations();
        
        // Initialize hero particles
        initParticleAnimation();
        
        // Initialize HubSpot form
        if (document.getElementById('hubspot-form')) {
            initHubSpotForm();
        }
        
        // Initial navigation highlighting
        highlightNavigation();
        
        // Initialize scroll event handlers
        window.addEventListener('scroll', throttle(() => {
            handleHeaderVisibility();
            highlightNavigation();
        }, 100));
        
        // Add window resize event handler
        window.addEventListener('resize', debounce(() => {
            // Update any responsive UI elements
            if (window.innerWidth > 768 && navLinks.classList.contains('show')) {
                navLinks.classList.remove('show');
                hamburger.setAttribute('aria-expanded', 'false');
                body.classList.remove('nav-open');
            }
        }, 200));
    };
    
    // Initialize the application
    init();
});

/**
 * Add necessary CSS for elements dynamically created by JavaScript
 */
(() => {
    const style = document.createElement('style');
    style.textContent = `
        /* Floating particles for hero section */
        .particle {
            position: absolute;
            pointer-events: none;
            opacity: 0;
            will-change: transform, opacity;
        }
        
        @keyframes float {
            0% {
                transform: translateY(0) translateX(0);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100px) translateX(20px);
                opacity: 0;
            }
        }
        
        /* Form validation styles */
        .form-error {
            color: var(--error);
            font-size: 0.875rem;
            margin-top: 0.25rem;
        }
        
        .form-success {
            background-color: rgba(76, 175, 80, 0.1);
            color: var(--success);
            padding: 1rem;
            border-radius: 0.5rem;
            margin-bottom: 1rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        
        .form-success i {
            font-size: 1.2rem;
        }
        
        /* Helper classes for navigation */
        .nav-links a.active {
            color: var(--primary-color);
            font-weight: 600;
        }
        
        body.nav-open {
            overflow: hidden;
        }
        
        /* Loading spinner */
        .fa-spin {
            animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
            0% {
                transform: rotate(0deg);
            }
            100% {
                transform: rotate(360deg);
            }
        }
        
        /* Focus visible enhancement */
        :focus-visible {
            outline: 2px solid var(--primary-color);
            outline-offset: 3px;
        }
    `;
    document.head.appendChild(style);
})();

/**
 * Demo Nomination Form JavaScript
 * This script handles form validation and submission simulation
 */

// Nomination form functionality
function initNominationForm() {
    const nominationForm = document.getElementById('nomination-form');
    
    if (!nominationForm) return;
    
    // Form elements
    const reasonTextarea = document.getElementById('nominationReason');
    const characterCount = document.querySelector('.character-count');
    const fileUploadInput = document.getElementById('productScreenshots');
    const fileUploadText = document.querySelector('.file-upload-text');
    
    // Initialize character counter for nomination reason
    if (reasonTextarea && characterCount) {
        const maxChars = 500;
        
        reasonTextarea.addEventListener('input', () => {
            const currentLength = reasonTextarea.value.length;
            characterCount.textContent = `${currentLength}/${maxChars} characters`;
            
            // Optionally limit input to max characters
            if (currentLength > maxChars) {
                reasonTextarea.value = reasonTextarea.value.substring(0, maxChars);
                characterCount.textContent = `${maxChars}/${maxChars} characters`;
            }
            
            // Visual feedback
            if (currentLength > maxChars * 0.9) {
                characterCount.style.color = 'var(--warning)';
            } else {
                characterCount.style.color = 'var(--text-muted)';
            }
        });
    }
    
    // File upload handling
    if (fileUploadInput && fileUploadText) {
        fileUploadInput.addEventListener('change', () => {
            if (fileUploadInput.files.length > 0) {
                // Display selected file count and names
                if (fileUploadInput.files.length === 1) {
                    fileUploadText.textContent = fileUploadInput.files[0].name;
                } else {
                    fileUploadText.textContent = `${fileUploadInput.files.length} files selected`;
                }
                
                // File validation (optional)
                validateFiles(fileUploadInput);
            } else {
                fileUploadText.textContent = 'No files selected';
            }
        });
    }
    
    // File validation function
    function validateFiles(fileInput) {
        const maxFileSize = 5 * 1024 * 1024; // 5MB
        const maxFiles = 5;
        let isValid = true;
        let errorMessage = '';
        
        // Check file count
        if (fileInput.files.length > maxFiles) {
            isValid = false;
            errorMessage = `Please select a maximum of ${maxFiles} files.`;
        }
        
        // Check file sizes
        for (let i = 0; i < fileInput.files.length; i++) {
            if (fileInput.files[i].size > maxFileSize) {
                isValid = false;
                errorMessage = `File "${fileInput.files[i].name}" exceeds the maximum size of 5MB.`;
                break;
            }
        }
        
        // Display error if needed
        let errorElement = fileInput.nextElementSibling?.nextElementSibling?.nextElementSibling;
        if (!errorElement || !errorElement.classList.contains('form-error')) {
            errorElement = document.createElement('div');
            errorElement.classList.add('form-error');
            fileInput.parentNode.appendChild(errorElement);
        }
        
        if (!isValid) {
            fileInput.classList.add('error');
            errorElement.textContent = errorMessage;
            errorElement.style.display = 'block';
        } else {
            fileInput.classList.remove('error');
            errorElement.style.display = 'none';
        }
        
        return isValid;
    }
    
    // Form validation function
    function validateForm(form) {
        const formElements = form.querySelectorAll('input, select, textarea');
        let isValid = true;
        
        formElements.forEach(element => {
            // Skip elements that don't need validation
            if (!element.hasAttribute('required') && element.type !== 'email' && element.type !== 'url') {
                return;
            }
            
            let fieldIsValid = true;
            let errorMessage = '';
            
            // Check required fields
            if (element.hasAttribute('required') && !element.value.trim()) {
                fieldIsValid = false;
                errorMessage = 'This field is required';
            }
            // Email validation
            else if (element.type === 'email' && element.value.trim()) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(element.value)) {
                    fieldIsValid = false;
                    errorMessage = 'Please enter a valid email address';
                }
            }
            // URL validation
            else if (element.type === 'url' && element.value.trim() && element.hasAttribute('required')) {
                try {
                    new URL(element.value);
                } catch (e) {
                    fieldIsValid = false;
                    errorMessage = 'Please enter a valid URL (include http:// or https://)';
                }
            }
            
            // Add or remove error class and message
            if (!fieldIsValid) {
                isValid = false;
                element.classList.add('error');
                
                // Add error message if it doesn't exist
                let errorElement = element.nextElementSibling;
                if (!errorElement || !errorElement.classList.contains('form-error')) {
                    errorElement = document.createElement('div');
                    errorElement.classList.add('form-error');
                    element.parentNode.insertBefore(errorElement, element.nextSibling);
                }
                
                errorElement.textContent = errorMessage;
                errorElement.style.display = 'block';
            } else {
                element.classList.remove('error');
                
                // Remove error message if it exists
                const errorElement = element.nextElementSibling;
                if (errorElement && errorElement.classList.contains('form-error')) {
                    errorElement.style.display = 'none';
                }
            }
        });
        
        return isValid;
    }
    
    // Form submission handler
    nominationForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Validate the form
        const isValid = validateForm(nominationForm);
        
        if (isValid) {
            // Simulate form submission (in real integration, this would submit to HubSpot)
            const submitButton = nominationForm.querySelector('[type="submit"]');
            const formContent = nominationForm.querySelector('form, .form-section, .form-footer');
            const successMessage = nominationForm.querySelector('.form-success');
            
            // Show loading state
            submitButton.disabled = true;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
            
            // Simulate server request delay
            setTimeout(() => {
                // Hide form content
                if (formContent) {
                    formContent.style.display = 'none';
                }
                
                // Show success message
                if (successMessage) {
                    successMessage.style.display = 'flex';
                }
                
                // Optionally scroll to the success message
                window.scrollTo({
                    top: nominationForm.offsetTop - 100,
                    behavior: 'smooth'
                });
                
                // In a real implementation, this would be where you'd trigger form analytics
                console.log('Form submitted successfully (demo)');
                
                // Optional: Reset form for testing
                // setTimeout(() => {
                //     nominationForm.reset();
                //     submitButton.disabled = false;
                //     submitButton.textContent = 'Submit Nomination';
                //     formContent.style.display = 'block';
                //     successMessage.style.display = 'none';
                // }, 5000);
            }, 2000);
        }
    });
}

// Wait for DOM to fully load, then initialize the nomination form
document.addEventListener('DOMContentLoaded', () => {
    // Your existing script.js initialization code here
    
    // Initialize the nomination form and add modal behavior
    const nominationForm = document.getElementById('nomination-form');
    if (nominationForm) {
        initNominationForm();
        
        // Add special handling for modal form success
        nominationForm.addEventListener('submit', function(e) {
            // The main form validation and submission is handled in initNominationForm
            // This adds additional modal-specific behavior
            
            const modal = document.getElementById('nomination-modal');
            if (modal && modal.classList.contains('active')) {
                // Close modal after success message shows
                const successMsg = nominationForm.querySelector('.form-success');
                if (successMsg && window.getComputedStyle(successMsg).display !== 'none') {
                    // Add a delay before closing
                    setTimeout(() => {
                        // Find and trigger the close button
                        const closeBtn = modal.querySelector('.modal-close');
                        if (closeBtn) closeBtn.click();
                    }, 3000);
                }
            }
        });
    }
});