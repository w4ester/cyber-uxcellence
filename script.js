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
 * 5. Animations (AOS, GSAP, Particles)
 * 6. UI Interactions (FAQs, Modals, Categories, etc)
 * 7. Form Handling & Validation
 * 8. Third-party Integrations (Commented Out)
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
    const sections = document.querySelectorAll('main section[id]'); // Target sections within main
    const faqItems = document.querySelectorAll('.faq-item');
    const forms = document.querySelectorAll('form');
    const backToTopBtn = document.getElementById('back-to-top');
    const cookieConsent = document.getElementById('cookie-consent');
    // Note: Specific category selectors will be inside their init function

    // Configuration variables for animations, scrolling, etc.
    const config = {
        // Calculate header height more reliably after potential style changes
        getHeaderHeight: () => header ? header.offsetHeight : 80,
        scrollThreshold: 50, // Lower threshold for scrolled header
        getScrollOffset: () => (header ? header.offsetHeight : 80) + 20, // Recalculate offset dynamically + buffer
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
        let timeoutId; // Store timeout ID
        return function(...args) {
            const now = new Date().getTime();
            // Clear any existing timeout to prevent delayed execution after a recent call
            clearTimeout(timeoutId);
            if (now - lastCall >= delay) {
                lastCall = now;
                fn.apply(this, args);
            } else {
                // Optional: Schedule the call for the end of the delay window if needed
                 // timeoutId = setTimeout(() => {
                 //     lastCall = new Date().getTime();
                 //     fn.apply(this, args);
                 // }, delay - (now - lastCall));
            }
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
        if (!element) return false;
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
        // Add Secure and SameSite attributes for better security
        document.cookie = `${name}=${value};${expires};path=/;SameSite=Lax;Secure`;
    };

    const getCookie = (name) => {
        const cookieName = `${name}=`;
        const decodedCookie = decodeURIComponent(document.cookie); // Handle encoded characters
        const cookies = decodedCookie.split(';');
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
        if (!hamburger || !navLinks) return;
        const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
        hamburger.setAttribute('aria-expanded', !isExpanded);
        navLinks.classList.toggle('show');
        body.classList.toggle('nav-open'); // Used for potential styling (e.g., disabling body scroll)
    };

    // Setup mobile menu toggle
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', toggleMobileMenu);

        // Close mobile menu when a nav link is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('show')) {
                    // Only toggle if it's actually a link to a section on the page
                    if (link.getAttribute('href')?.startsWith('#')) {
                        toggleMobileMenu();
                    }
                }
            });
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navLinks &&
            navLinks.classList.contains('show') &&
            !e.target.closest('.main-nav')) { // Check if click is outside the entire nav container
            toggleMobileMenu();
        }
    });

    // Set active navigation link based on scroll position
    const highlightNavigation = () => {
        let currentSectionId = '';
        const scrollY = window.scrollY;
        const scrollOffsetValue = config.getScrollOffset();

        sections.forEach(section => {
            const sectionTop = section.offsetTop - scrollOffsetValue;
            const sectionHeight = section.offsetHeight;

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

         // Handle edge case for top of page
         if (scrollY < sections[0]?.offsetTop - scrollOffsetValue) {
             currentSectionId = ''; // No section active at the very top
         }
         // Handle edge case for bottom of page
         else if (window.innerHeight + scrollY >= document.body.offsetHeight - 5) { // Added buffer
             if (sections.length > 0) {
                currentSectionId = sections[sections.length - 1].getAttribute('id'); // Activate last section
             }
         }


        document.querySelectorAll('.nav-links .nav-link').forEach(link => {
            link.classList.remove('active');
            // Check if link's href matches the current section ID
            if (currentSectionId && link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    };


    /**
     * 4. Scroll Behaviors
     */

    // Smooth scroll to target
    const smoothScrollTo = (targetId) => {
        const targetElement = document.getElementById(targetId.substring(1)); // Get element by ID (remove #)

        if (targetElement) {
             const offsetPosition = targetElement.offsetTop - config.getScrollOffset() + 10; // Use dynamic offset + small adjust

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        } else {
            console.warn(`Smooth scroll target not found: ${targetId}`);
        }
    };

    // Handle header visibility and styles on scroll
    const handleHeaderOnScroll = () => {
        if (!header) return;
        const currentScrollPos = window.scrollY;

        // Add 'scrolled' class for style changes
        if (currentScrollPos > config.scrollThreshold) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Show/hide back to top button
        if (backToTopBtn) {
            if (currentScrollPos > window.innerHeight / 1.5) { // Show earlier
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        }
    };

    // Handle smooth scrolling for all internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');

            // Skip if it's just "#" or doesn't link to an actual ID on the page
            if (targetId === '#' || !document.getElementById(targetId.substring(1))) {
                return;
            }

            e.preventDefault();

            // Close mobile menu if open and the link was inside it
            if (navLinks && navLinks.classList.contains('show') && this.closest('#nav-links')) {
                 toggleMobileMenu();
            }

            smoothScrollTo(targetId);

             // Optionally update URL hash after scroll completes (for better history state)
             const scrollTarget = document.getElementById(targetId.substring(1));
             if (scrollTarget) {
                 const checkScrollEnd = setInterval(() => {
                    // Very basic check: compare current scroll position to target
                    // More robust check might involve comparing scrollY before/after a short timeout
                    if (Math.abs(window.scrollY - (scrollTarget.offsetTop - config.getScrollOffset() + 10)) < 5) {
                         clearInterval(checkScrollEnd);
                         // Update hash only if it's different (prevents unnecessary history entries)
                         if(window.location.hash !== targetId) {
                             history.pushState(null, '', targetId);
                         }
                    }
                 }, 100);
                 // Failsafe timeout
                 setTimeout(() => clearInterval(checkScrollEnd), 1500);
             }
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
     * 5. Animations (AOS, GSAP, Particles)
     */

    // Initialize AOS (Animate On Scroll) library
    const initAOS = () => {
        if (typeof AOS !== 'undefined') {
             AOS.init({
                 duration: 600, // Faster duration
                 easing: 'ease-out-quad', // Different easing
                 once: true,
                 offset: 80, // Trigger slightly earlier
                 disable: window.matchMedia('(prefers-reduced-motion: reduce)').matches
             });
             window.addEventListener('load', () => setTimeout(AOS.refreshHard, 100)); // Refresh hard after load + delay
        } else {
            console.warn('AOS library not found.');
            document.querySelectorAll('[data-aos]').forEach(el => {
                 el.style.opacity = '1';
                 el.style.transform = 'none';
            });
        }
    };

    // --- REMOVED init3DCategoryCarousel ---

    // --- RETAINED initPremiumStatsCounters ---
    const initPremiumStatsCounters = () => {
        if (!window.gsap || !ScrollTrigger) { // Check for ScrollTrigger too
            console.warn('GSAP or ScrollTrigger not found, skipping stats counter animation.');
            return;
        }
        gsap.registerPlugin(ScrollTrigger); // Register plugin

        const statElements = gsap.utils.toArray('.stat-value'); // Use GSAP utility

        statElements.forEach(stat => {
            if (!stat.offsetParent) return;

            const endValue = stat.textContent.trim();
            let targetValue = parseFloat(endValue.replace(/[^0-9.-]+/g,""));
            const suffix = endValue.replace(/[0-9.,]/g, '');

            if (isNaN(targetValue)) return;

            let startValue = { val: 0 };

            gsap.to(startValue, { // Use gsap.to directly
                val: targetValue,
                duration: 2, // Slightly faster
                ease: "power1.out", // Smoother ease
                scrollTrigger: {
                    trigger: stat,
                    start: "top 90%", // Adjust trigger point
                    toggleActions: "play none none none",
                },
                onUpdate: () => {
                    let displayValue;
                    if (endValue.includes('.')) {
                        displayValue = startValue.val.toFixed(1);
                    } else {
                        displayValue = Math.round(startValue.val);
                    }
                     // Use innerHTML if suffixes contain special characters, otherwise textContent is fine
                    stat.textContent = displayValue + suffix;
                },
                onComplete: () => {
                    stat.textContent = endValue; // Ensure final value
                }
            });
        });
    };

    // Initialize animation observers or fallbacks
    const initAnimationsFallback = () => {
        if (typeof AOS !== 'undefined' && AOS.isInitialized()) return; // Don't run if AOS is working

        if ('IntersectionObserver' in window) {
             const fadeElements = document.querySelectorAll('[data-aos]');
             if (fadeElements.length === 0) return; // No elements to animate

             const fadeObserver = new IntersectionObserver((entries, observer) => {
                 entries.forEach(entry => {
                     if (entry.isIntersecting) {
                         entry.target.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
                         entry.target.style.opacity = '1';
                         entry.target.style.transform = 'none'; // Reset transform
                         observer.unobserve(entry.target);
                     }
                 });
             }, {
                 threshold: config.animationThreshold,
                 rootMargin: config.animationRootMargin
             });

             fadeElements.forEach(element => {
                 element.style.opacity = '0'; // Initial state
                 const aosType = element.dataset.aos || '';
                 if (aosType.includes('fade-up')) element.style.transform = 'translateY(20px)';
                 else if (aosType.includes('fade-down')) element.style.transform = 'translateY(-20px)';
                 else if (aosType.includes('fade-right')) element.style.transform = 'translateX(-20px)';
                 else if (aosType.includes('fade-left')) element.style.transform = 'translateX(20px)';
                 else if (aosType.includes('zoom-in')) element.style.transform = 'scale(0.95)';
                 else element.style.transform = 'translateY(10px)'; // Default subtle up fade

                 fadeObserver.observe(element);
             });
         } else {
             document.querySelectorAll('[data-aos]').forEach(element => {
                 element.style.opacity = '1';
                 element.style.transform = 'none';
             });
         }
    };

    // Add particle animation to hero section
    const initParticleAnimation = () => {
        const heroParticlesContainer = document.querySelector('.hero-particles');
        if (!heroParticlesContainer || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        const particleCount = window.innerWidth < 768 ? 20 : 35; // Reduced count
        const fragment = document.createDocumentFragment();

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('span');
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            const size = Math.random() * 2.5 + 1; // Even smaller
            const duration = Math.random() * 18 + 12;
            const delay = Math.random() * duration;

            particle.style.cssText = `
                position: absolute; top: ${posY}%; left: ${posX}%;
                width: ${size}px; height: ${size}px;
                background-color: rgba(255, 255, 255, ${Math.random() * 0.3 + 0.05}); /* More subtle */
                border-radius: 50%;
                animation: floatParticles ${duration}s linear ${delay}s infinite alternate;
                opacity: 0; will-change: transform, opacity; pointer-events: none;
            `;
            fragment.appendChild(particle);
        }
        heroParticlesContainer.appendChild(fragment);

        // Ensure keyframes are injected only once
        if (!document.getElementById('particle-keyframes')) {
            const styleSheet = document.createElement("style");
            styleSheet.id = 'particle-keyframes';
            // Simpler keyframes
            styleSheet.textContent = `
                @keyframes floatParticles {
                    0% { transform: translate(0, 0); opacity: 0; }
                    20% { opacity: ${Math.random() * 0.2 + 0.1}; }
                    80% { opacity: ${Math.random() * 0.2 + 0.05}; }
                    100% { transform: translate(${Math.random() * 30 - 15}px, ${Math.random() * 30 - 15}px); opacity: 0; }
                }
            `;
            document.head.appendChild(styleSheet);
        }
    };

    // --- RETAINED initPremiumCardAnimations ---
    const initPremiumCardAnimations = () => {
        if (!window.gsap || !window.ScrollTrigger || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        gsap.registerPlugin(ScrollTrigger);

        // Animate only cards within the #categories section
        const cards = gsap.utils.toArray('#categories .category-card');

        cards.forEach((card) => {
            // Entrance animation - Subtler, triggers earlier
             gsap.from(card, {
                 opacity: 0,
                 y: 20,
                 duration: 0.5,
                 ease: "power1.out",
                 scrollTrigger: {
                     trigger: card.closest('.categories-flex-container') || card,
                     start: "top 88%", // Trigger slightly earlier
                     toggleActions: "play none none none",
                 }
             });

            // GSAP Hover effect
            const tlHover = gsap.timeline({ paused: true, defaults: { duration: 0.25, ease: 'power1.out' } }); // Faster, smoother ease

            tlHover.to(card, {
                y: -6,
                scale: 1.01, // Very subtle scale
                boxShadow: 'var(--shadow-lg)', // Use CSS variable
                borderColor: 'var(--primary-lighter)',
            }, 0);

             // Animate relevant elements if they exist
             const iconContainer = card.querySelector('.category-icon');
             const icon = card.querySelector('.category-icon i');
             const title = card.querySelector('.category-title');
             const link = card.querySelector('.learn-more-link');

             if (iconContainer) tlHover.to(iconContainer, { backgroundColor: 'var(--primary-color)' }, 0);
             if (icon) tlHover.to(icon, { scale: 1.1, color: 'white' }, 0);
             if (title) tlHover.to(title, { color: 'var(--primary-dark)' }, 0);
             if (link) tlHover.to(link, { x: 3, color: 'var(--primary-dark)' }, 0);

             // Reverse animation fully on mouseleave
             card.addEventListener('mouseenter', () => tlHover.play());
             card.addEventListener('mouseleave', () => tlHover.reverse());

        });
    };


    /**
     * 6. UI Interactions (FAQs, Modals, Categories, etc)
     */

    // Handle FAQ accordion functionality
    const initFaqAccordion = () => {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            const answer = item.querySelector('.faq-answer');
            const toggleIcon = question?.querySelector('.faq-toggle i'); // Use optional chaining

            if (!question || !answer || !toggleIcon) {
                 // console.warn("FAQ item missing elements:", item);
                 return;
            }

             // Ensure correct initial state based on HTML attribute
            const isInitiallyExpanded = question.getAttribute('aria-expanded') === 'true';
            answer.style.maxHeight = isInitiallyExpanded ? answer.scrollHeight + "px" : '0';
            toggleIcon.className = isInitiallyExpanded ? 'fas fa-minus' : 'fas fa-plus'; // Set initial icon

            question.addEventListener('click', () => {
                const isExpanded = question.getAttribute('aria-expanded') === 'true';

                question.setAttribute('aria-expanded', !isExpanded);
                answer.style.maxHeight = isExpanded ? '0' : answer.scrollHeight + "px";
                // Toggle icon class
                toggleIcon.classList.toggle('fa-plus', isExpanded);
                toggleIcon.classList.toggle('fa-minus', !isExpanded);

                // Optional: Close others (uncomment if desired)
                // if (!isExpanded) { // Only close others when opening one
                //     faqItems.forEach(otherItem => {
                //         if (otherItem !== item) {
                //             const otherQuestion = otherItem.querySelector('.faq-question');
                //             const otherAnswer = otherItem.querySelector('.faq-answer');
                //             const otherIcon = otherQuestion?.querySelector('.faq-toggle i');
                //             if (otherQuestion?.getAttribute('aria-expanded') === 'true') {
                //                 otherQuestion.setAttribute('aria-expanded', 'false');
                //                 otherAnswer.style.maxHeight = '0';
                //                 if(otherIcon) {
                //                     otherIcon.classList.remove('fa-minus');
                //                     otherIcon.classList.add('fa-plus');
                //                 }
                //             }
                //         }
                //     });
                // }
            });

            // Keyboard accessibility
            question.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    question.click();
                }
            });
        });

        // Adjust max-height on resize for open items
        window.addEventListener('resize', debounce(() => {
            faqItems.forEach(item => {
                const question = item.querySelector('.faq-question');
                const answer = item.querySelector('.faq-answer');
                if (question?.getAttribute('aria-expanded') === 'true') {
                    answer.style.maxHeight = answer.scrollHeight + "px";
                }
            });
        }, 250));
    };


    // Cookie consent banner
    const initCookieConsent = () => {
        if (!cookieConsent) return;

        const consentValue = getCookie('cookie_consent');

        if (!consentValue) { // Only show if no cookie is set
            setTimeout(() => {
                cookieConsent.classList.add('visible');
            }, 1500);

            const acceptBtn = document.getElementById('cookie-accept');
            const declineBtn = document.getElementById('cookie-decline');

            const handleConsent = (value) => {
                setCookie('cookie_consent', value, config.cookieExpirationDays);
                cookieConsent.classList.remove('visible');
                 // Optional: Remove the banner from DOM after hiding
                 // setTimeout(() => cookieConsent.remove(), 500);
            };

            if (acceptBtn) acceptBtn.addEventListener('click', () => handleConsent('accepted'));
            if (declineBtn) declineBtn.addEventListener('click', () => handleConsent('declined'));
        }
         // Optional: Hide banner immediately if already consented/declined
         // else {
         //     cookieConsent.style.display = 'none';
         // }
    };


    // Initialize Vertical Category Navigation
    const initVerticalCategories = () => {
        const categorySection = document.getElementById('categories');
        if (!categorySection) return;

        const navContainer = categorySection.querySelector('.categories-nav-vertical');
        const cardsContainer = categorySection.querySelector('.categories-cards-container');
        if (!navContainer || !cardsContainer) {
             console.warn('Vertical Categories: Nav or Cards container not found.');
             return;
        }

        const navItems = Array.from(navContainer.querySelectorAll('.category-nav-item'));
        const cards = Array.from(cardsContainer.querySelectorAll('.category-card'));

        if (navItems.length === 0 || cards.length === 0) {
            console.warn('Vertical Categories: No nav items or cards found.');
            return;
        }
        if (navItems.length !== cards.length) {
            console.warn('Vertical Categories: Mismatch between nav items and cards count.');
        }

        // --- Switch Category Function ---
        function switchCategory(targetIndex) {
            if (targetIndex < 0 || targetIndex >= navItems.length) return;

             // 1. Update Nav Items State
            navItems.forEach((item, index) => {
                const isActive = index === targetIndex;
                item.classList.toggle('active', isActive);
                item.setAttribute('aria-selected', isActive);
                // Scroll active item into view on smaller screens if needed
                if (isActive && window.innerWidth <= 992 && navContainer.scrollWidth > navContainer.clientWidth) {
                    item.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                }
            });

            // 2. Update Cards State and Container Height
            let activeCardHeight = 0;
            cards.forEach((card) => {
                const cardIndex = parseInt(card.dataset.index, 10);
                const isActive = cardIndex === targetIndex;
                card.classList.toggle('active', isActive);
                // Update ARIA hidden state for accessibility
                card.setAttribute('aria-hidden', !isActive);
                if (isActive) {
                    // Use rAF to get height after styles applied
                    requestAnimationFrame(() => {
                        activeCardHeight = card.offsetHeight;
                        // Adjust container height only on desktop where cards are absolute
                        if (window.innerWidth > 992) {
                            const currentMinHeight = parseFloat(getComputedStyle(cardsContainer).minHeight) || 450;
                            cardsContainer.style.minHeight = `${Math.max(currentMinHeight, activeCardHeight)}px`;
                        } else {
                            cardsContainer.style.minHeight = 'auto'; // Reset on mobile
                        }
                    });
                }
            });
        }

        // --- Event Listeners ---
        navContainer.addEventListener('click', (e) => {
            const clickedNavItem = e.target.closest('.category-nav-item');
            if (clickedNavItem) {
                 const index = parseInt(clickedNavItem.dataset.index, 10);
                 if (!isNaN(index)) switchCategory(index);
            }
        });
        navContainer.addEventListener('keydown', (e) => {
            const currentFocused = document.activeElement.closest('.category-nav-item');
            if (!currentFocused || (e.key !== 'Enter' && e.key !== ' ')) return;

            e.preventDefault();
            const index = parseInt(currentFocused.dataset.index, 10);
            if (!isNaN(index)) switchCategory(index);
        });


        // --- Initialization ---
        let initialActiveIndex = navItems.findIndex(item => item.classList.contains('active'));
        if (initialActiveIndex === -1) initialActiveIndex = 0; // Default to first if none active
        switchCategory(initialActiveIndex); // Set initial state

        // --- Resize Handling ---
        window.addEventListener('resize', debounce(() => {
            const currentActiveNavItem = navContainer.querySelector('.category-nav-item.active');
            if (currentActiveNavItem) {
                const currentIndex = parseInt(currentActiveNavItem.dataset.index, 10);
                 if (!isNaN(currentIndex)) {
                     // Recalculate height immediately on resize end
                    setTimeout(() => switchCategory(currentIndex), 50);
                 }
            }
        }, 250));
    };
    // --- END Vertical Category Navigation ---


    // Modal functionality
    const initModalFunctionality = () => {
        const modalTriggerButtons = document.querySelectorAll(
            '#open-nomination-modal, #open-nomination-modal-hero, #open-nomination-modal-nav, #open-nomination-modal-why'
        );
        const modal = document.getElementById('nomination-modal');

        if (modalTriggerButtons.length === 0 || !modal) return;

        const closeModalBtn = modal.querySelector('.modal-close');
        const modalBackdrop = modal.querySelector('.modal-backdrop');
        let previouslyFocusedElement = null;

        const openModal = (triggerButton) => {
            previouslyFocusedElement = triggerButton || document.activeElement;
            modal.classList.add('active');
            body.classList.add('modal-open');
            modal.setAttribute('aria-hidden', 'false');
            setTimeout(() => {
                const firstFocusable = modal.querySelector('button, [href], input:not([type="hidden"]), select, textarea, [tabindex]:not([tabindex="-1"])');
                if (firstFocusable) firstFocusable.focus();
            }, 100);
        };

        const closeModal = () => {
            modal.classList.remove('active');
            body.classList.remove('modal-open');
            modal.setAttribute('aria-hidden', 'true');
            if (previouslyFocusedElement) {
                 previouslyFocusedElement.focus();
                 previouslyFocusedElement = null;
            }
            // Reset form state on close
            const form = modal.querySelector('form');
             if (form) resetFormState(form);
        };

        // Function to reset form (called on close and after successful submission)
         const resetFormState = (form) => {
             const formSections = form.querySelectorAll('.form-section');
             const formFooter = form.querySelector('.form-footer');
             const successMessage = form.querySelector('.form-success');
             const submitButton = form.querySelector('[type="submit"]');
             const characterCount = form.querySelector('.character-count');
             const fileUploadText = form.querySelector('.file-upload-text');

             // Reset visibility
             formSections.forEach(section => section.style.display = '');
             if (formFooter) formFooter.style.display = '';
             if (successMessage) successMessage.style.display = 'none';

             // Reset button
             if (submitButton) {
                 submitButton.disabled = false;
                 submitButton.innerHTML = 'Submit Nomination'; // Restore original text
             }

             // Clear validation
             form.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
             form.querySelectorAll('.form-error').forEach(el => el.remove());

             // Reset form fields
             form.reset();

              // Reset dynamic elements
             if (characterCount) {
                 const maxChars = parseInt(form.querySelector('#nominationReason')?.getAttribute('maxlength') || '500', 10);
                 characterCount.textContent = `0/${maxChars} characters`;
                 characterCount.classList.remove('warning', 'error');
             }
             if (fileUploadText) fileUploadText.textContent = 'No files selected';
         };


        modalTriggerButtons.forEach(btn => btn.addEventListener('click', (e) => openModal(e.currentTarget)));
        if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
        if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
        });

        // Trap focus
        modal.addEventListener('keydown', (e) => {
            if (e.key !== 'Tab' || !modal.classList.contains('active')) return;
            const focusableElements = Array.from(modal.querySelectorAll('button, [href], input:not([type="hidden"]), select, textarea, [tabindex]:not([tabindex="-1"])')).filter(el => el.offsetParent !== null);
            if (focusableElements.length === 0) return;
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];
            if (e.shiftKey && document.activeElement === firstElement) { lastElement.focus(); e.preventDefault(); }
            else if (!e.shiftKey && document.activeElement === lastElement) { firstElement.focus(); e.preventDefault(); }
        });
    };


    /**
     * 7. Form Handling & Validation (Includes Nomination Form Logic)
     */

    // General form validation function
    const validateFormField = (field) => {
        // ... (Keep the existing validation logic from previous response) ...
         let isValid = true;
         let errorMessage = '';
         const parentGroup = field.closest('.form-group') || field.parentElement;
         let errorElement = parentGroup.querySelector('.form-error');

         field.classList.remove('error');
         if (errorElement) errorElement.remove();

         if (field.hasAttribute('required') && !field.value.trim() && field.type !== 'checkbox' && field.type !== 'file') {
             isValid = false;
             errorMessage = 'This field is required';
         } else if (field.type === 'checkbox' && field.hasAttribute('required') && !field.checked) {
             isValid = false;
             errorMessage = 'You must agree to the terms';
         } else if (field.type === 'email' && field.value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)) {
             isValid = false;
             errorMessage = 'Please enter a valid email address';
         } else if (field.type === 'url' && field.value.trim()) {
             try {
                 const url = new URL(field.value);
                 if (!['http:', 'https:', 'ftp:'].includes(url.protocol)) { // Check protocol
                     isValid = false;
                     errorMessage = 'Please include http:// or https://';
                 }
             } catch (_) {
                 isValid = false;
                 errorMessage = 'Please enter a valid URL';
             }
         } else if (field.type === 'tel' && field.value.trim() && !/^[0-9\s\-()+]{7,}$/.test(field.value)) { // Basic phone check
            // isValid = false; // Optional: Relax phone validation
            // errorMessage = 'Please enter a valid phone number';
         } else if (field.tagName === 'SELECT' && field.hasAttribute('required') && field.value === '') {
             isValid = false;
             errorMessage = 'Please select an option';
         }


         if (!isValid) {
             field.classList.add('error');
             errorElement = document.createElement('div');
             errorElement.classList.add('form-error');
             errorElement.textContent = errorMessage;
             parentGroup.appendChild(errorElement);
         }

         return isValid;
    };

    // File validation specific to nomination form
    function validateNominationFiles(fileInput) {
        // ... (Keep the existing file validation logic from previous response) ...
        const parentGroup = fileInput.closest('.form-group') || fileInput.parentElement;
         let errorElement = parentGroup.querySelector('.form-error');
         const fileUploadText = parentGroup.querySelector('.file-upload-text');

         fileInput.classList.remove('error');
         if (errorElement) errorElement.remove();

         const maxFileSize = 5 * 1024 * 1024; // 5MB
         const maxFiles = 5;
         const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'];
         let isValid = true;
         let errorMessage = '';

         if (fileInput.files.length > 0) {
             if (fileInput.files.length > maxFiles) {
                 isValid = false;
                 errorMessage = `You can upload a maximum of ${maxFiles} files.`;
             } else {
                 for (let i = 0; i < fileInput.files.length; i++) {
                     const file = fileInput.files[i];
                     if (file.size > maxFileSize) {
                         isValid = false;
                         errorMessage = `File "${file.name}" exceeds the 5MB size limit.`;
                         break;
                     }
                     if (!allowedTypes.includes(file.type.toLowerCase())) { // Case-insensitive check
                         isValid = false;
                         errorMessage = `File type for "${file.name}" is not supported. Allowed: PNG, JPG, GIF.`;
                         break;
                     }
                 }
             }

             if (isValid) {
                 fileUploadText.textContent = fileInput.files.length === 1 ? fileInput.files[0].name : `${fileInput.files.length} files selected`;
                 fileUploadText.style.color = '';
                 fileUploadText.classList.remove('error-text'); // Remove error class if valid
             } else {
                 fileUploadText.textContent = errorMessage.length > 60 ? `${fileInput.files.length} files selected (with errors)` : errorMessage;
                 fileUploadText.style.color = 'var(--error)';
                 fileUploadText.classList.add('error-text'); // Add error class
                 fileInput.classList.add('error');
             }
         } else {
             fileUploadText.textContent = 'No files selected';
             fileUploadText.style.color = '';
             fileUploadText.classList.remove('error-text');
         }

         if (!isValid && errorMessage) {
             errorElement = document.createElement('div');
             errorElement.classList.add('form-error');
             errorElement.textContent = errorMessage;
             parentGroup.appendChild(errorElement);
         }
         return isValid;
    }

    // Initialize nomination form specific logic
    const initNominationForm = () => {
        const nominationForm = document.getElementById('nomination-form');
        if (!nominationForm) return;

        const reasonTextarea = document.getElementById('nominationReason');
        const characterCount = nominationForm.querySelector('.character-count');
        const fileUploadInput = document.getElementById('productScreenshots');
        const fileUploadText = nominationForm.querySelector('.file-upload-text');
        const submitButton = nominationForm.querySelector('[type="submit"]');
        const formSections = nominationForm.querySelectorAll('.form-section');
        const formFooter = nominationForm.querySelector('.form-footer');
        const successMessage = nominationForm.querySelector('.form-success');
        const maxChars = parseInt(reasonTextarea?.getAttribute('maxlength') || '500', 10);

        // Character counter
        if (reasonTextarea && characterCount) {
            reasonTextarea.setAttribute('maxlength', maxChars);
            const updateCharCount = () => {
                const currentLength = reasonTextarea.value.length;
                characterCount.textContent = `${currentLength}/${maxChars} characters`;
                characterCount.classList.toggle('warning', currentLength > maxChars * 0.9 && currentLength < maxChars);
                characterCount.classList.toggle('error', currentLength >= maxChars);
            };
            reasonTextarea.addEventListener('input', updateCharCount);
            updateCharCount(); // Initial state
        }

        // File upload listener
        if (fileUploadInput && fileUploadText) {
            fileUploadInput.addEventListener('change', () => validateNominationFiles(fileUploadInput));
        }

        // Live validation on blur/input
        nominationForm.querySelectorAll('input:not([type="file"]), select, textarea').forEach(field => {
            field.addEventListener('blur', () => validateFormField(field));
            field.addEventListener('input', () => {
                if (field.classList.contains('error')) validateFormField(field);
            });
        });

        // Form submission
        nominationForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let isFormValid = true;

            // Clear previous errors first
            nominationForm.querySelectorAll('.form-error').forEach(el => el.remove());
            nominationForm.querySelectorAll('.error').forEach(el => el.classList.remove('error'));

            // Validate all fields
            nominationForm.querySelectorAll('input:not([type="file"]), select, textarea').forEach(field => {
                if (!validateFormField(field)) isFormValid = false;
            });
            if (fileUploadInput && !validateNominationFiles(fileUploadInput)) {
                isFormValid = false;
            }

            if (isFormValid) {
                console.log('Nomination form valid. Submitting...');
                const originalButtonText = submitButton.innerHTML;
                submitButton.disabled = true;
                submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';

                // --- Replace with actual submission logic ---
                 // Example: Simulate network delay
                setTimeout(() => {
                    console.log('Simulated submission successful.');
                    formSections.forEach(section => section.style.display = 'none');
                    if (formFooter) formFooter.style.display = 'none';
                    if (successMessage) successMessage.style.display = 'flex';

                    const modalContent = nominationForm.closest('.modal-content');
                    if (modalContent) modalContent.scrollTop = 0;

                    // Close modal after delay - closeModal now handles reset
                    const modal = nominationForm.closest('#nomination-modal');
                    if (modal && modal.classList.contains('active')) {
                        setTimeout(() => {
                             const closeBtn = modal.querySelector('.modal-close');
                             if (closeBtn) closeBtn.click();
                        }, 3500); // Slightly longer delay
                    }

                }, 1500);
                // --- End of submission logic ---

            } else {
                console.log('Nomination form validation failed.');
                const firstError = nominationForm.querySelector('.error');
                if (firstError) {
                    firstError.focus();
                    firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }
        });
    };

    // Initialize general form validation (for non-nomination forms)
    const initFormValidation = () => {
        forms.forEach(form => {
            if (form.id === 'nomination-form') return; // Skip nomination form
            form.setAttribute('novalidate', true); // Disable browser validation

            form.addEventListener('submit', (e) => {
                let isFormValid = true;
                // Clear previous errors
                form.querySelectorAll('.form-error').forEach(el => el.remove());
                form.querySelectorAll('.error').forEach(el => el.classList.remove('error'));

                form.querySelectorAll('input, select, textarea').forEach(field => {
                    if (!validateFormField(field)) isFormValid = false;
                });

                if (!isFormValid) {
                    e.preventDefault();
                    const firstError = form.querySelector('.error');
                    if (firstError) firstError.focus();
                } else {
                    console.log(`Form ${form.id || 'unnamed'} submitted`);
                    // Add submission handling for other forms here
                }
            });

            // Optional live validation
            form.querySelectorAll('input, select, textarea').forEach(field => {
                field.addEventListener('blur', () => validateFormField(field));
                field.addEventListener('input', () => {
                    if (field.classList.contains('error')) validateFormField(field);
                });
            });
        });
    };

    /**
     * 8. Third-party Integrations
     */

    // Placeholder if needed later
    // const initThirdPartyIntegrations = () => {};


    /**
     * 9. Initialization
     */
    const init = () => {
        // UI & Navigation First
        handleHeaderOnScroll();
        highlightNavigation(); // Call initially
        initModalFunctionality();
        initFaqAccordion();
        initCookieConsent();

        // Initialize Animations
        initAOS();
        initAnimationsFallback(); // Run only if AOS didn't initialize
        initParticleAnimation();
        if (window.gsap) {
            initPremiumStatsCounters();
            initPremiumCardAnimations();
        } else {
            console.warn('GSAP library not found. Skipping GSAP animations.');
        }

        // Component-Specific Logic
        initVerticalCategories();
        initNominationForm();
        initFormValidation(); // For any other forms

        // Event Listeners
        window.addEventListener('scroll', throttle(() => {
            handleHeaderOnScroll();
            highlightNavigation(); // Update active link on scroll
        }, 150)); // Adjust throttle delay slightly

        window.addEventListener('resize', debounce(() => {
            // Update dynamic offsets/heights
            // config.headerHeight = config.getHeaderHeight(); // Update config if needed
            // config.scrollOffset = config.getScrollOffset();

            // Close mobile nav on resize to desktop
            if (window.innerWidth > 768 && navLinks?.classList.contains('show')) {
                toggleMobileMenu();
            }
            // Recalculate necessary component dimensions (like FAQ max-height) handled in their respective init functions' resize listeners
        }, 250));
    };

    // Run Initialization
    init();

}); // End DOMContentLoaded


/**
 * Add necessary CSS for elements dynamically created/styled by JavaScript
 * (This IIFE ensures styles are added without polluting global scope)
 */
(() => {
    // Check if styles already injected
    if (document.getElementById('dynamic-js-styles')) return;

    const style = document.createElement('style');
    style.id = 'dynamic-js-styles';
    style.textContent = `
        /* Header Scrolled State */
        /* Styles applied directly via .scrolled class in styles2.css */

        /* Mobile Nav Open State */
        body.nav-open { overflow: hidden; }
        /* .nav-links.show styles handled in styles2.css */

        /* Back to Top Button Visibility */
        .back-to-top { /* Base styles in styles2.css */ }
        .back-to-top.visible { /* Visibility styles in styles2.css */ }

        /* FAQ Accordion Transitions */
        .faq-answer { /* Transition handled in styles2.css */ }
        .faq-question .faq-toggle i { /* Transition handled in styles2.css */ }

        /* Cookie Consent Visibility */
        .cookie-consent { /* Base/Transition styles in styles2.css */ }
        .cookie-consent.visible { /* Visibility styles in styles2.css */ }

        /* Form Validation Styles (if not fully covered in styles2.css) */
        .form-group .form-error {
            color: var(--error, #e74c3c);
            font-size: 0.85rem;
            margin-top: 4px;
            display: block;
        }
        input.error, select.error, textarea.error {
            border-color: var(--error, #e74c3c) !important;
            box-shadow: 0 0 0 1px var(--error, #e74c3c);
        }
        .character-count.warning { color: var(--warning, #ff9800); }
        .character-count.error { color: var(--error, #e74c3c); }
        .file-upload-text.error-text { color: var(--error, #e74c3c); font-weight: 500; }


        /* Form Success Message (if not fully covered in styles2.css) */
        .form-success {
            background-color: #dff0d8;
            color: #3c763d;
            border: 1px solid #d6e9c6;
            padding: 15px;
            border-radius: 4px;
            margin-bottom: 15px;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        .form-success i { font-size: 1.2em; }

        /* Loading Spinner */
        .fa-spinner.fa-spin { animation: fa-spin 1s linear infinite; }
        @keyframes fa-spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }

        /* Modal Active State */
        .modal { /* Base/Transition styles in styles2.css */ }
        .modal.active { /* Visibility styles in styles2.css */ }
        body.modal-open { overflow: hidden; }

        /* Focus Visible Enhancement (keep this here for robustness) */
        :focus-visible {
            outline: 2px solid var(--primary-light, #9c4dcc);
            outline-offset: 2px;
            box-shadow: 0 0 0 3px rgba(106, 27, 154, 0.2);
            border-radius: 3px;
        }
        *:focus:not(:focus-visible) { outline: none; }
    `;
    document.head.appendChild(style);
})();