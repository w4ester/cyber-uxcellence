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
            // Create and append particles
            for (let i = 0; i < 50; i++) {
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
                `;
                
                heroParticles.appendChild(particle);
            }
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
            cookieConsent.style.display = 'block';
            
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
    
    // Initialize all components
    const init = () => {
        // Initialize animations
        initAnimations();
        
        // Initialize UI components
        initFaqAccordion();
        initFormValidation();
        initCookieConsent();
        
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
    `;
    document.head.appendChild(style);
})();