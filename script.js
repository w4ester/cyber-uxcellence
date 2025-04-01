// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('show');
            document.body.classList.toggle('nav-open'); // Prevent scrolling when menu is open
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navLinks && navLinks.classList.contains('show') && 
            !e.target.closest('.nav-links') && 
            !e.target.closest('.hamburger')) {
            navLinks.classList.remove('show');
            document.body.classList.remove('nav-open');
        }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // Skip if it's just "#" or opening a modal
            if (targetId === '#' || this.classList.contains('modal-trigger')) {
                return;
            }
            
            e.preventDefault();
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if it's open
                if (navLinks && navLinks.classList.contains('show')) {
                    navLinks.classList.remove('show');
                    document.body.classList.remove('nav-open');
                }
                
                const headerOffset = 80; // Adjust based on header height
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observer for fade-in animations
    const fadeElements = document.querySelectorAll('.fade-in, .fade-in-delay, .fade-in-delay-2, .category-card, .benefit-card');
    
    if ('IntersectionObserver' in window && fadeElements.length > 0) {
        const fadeObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    fadeObserver.unobserve(entry.target);
                }
            });
        }, {
            root: null,
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        });
        
        fadeElements.forEach(element => {
            fadeObserver.observe(element);
        });
    } else {
        // Fallback for browsers without IntersectionObserver support
        fadeElements.forEach(element => {
            element.classList.add('visible');
        });
    }

    // FAQ accordion functionality
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });

    // Form validation
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            let isValid = true;
            const requiredFields = form.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                    
                    // Add error message if it doesn't exist
                    let errorMessage = field.nextElementSibling;
                    if (!errorMessage || !errorMessage.classList.contains('error-message')) {
                        errorMessage = document.createElement('div');
                        errorMessage.classList.add('error-message');
                        errorMessage.textContent = 'This field is required';
                        field.parentNode.insertBefore(errorMessage, field.nextSibling);
                    }
                } else {
                    field.classList.remove('error');
                    
                    // Remove error message if it exists
                    const errorMessage = field.nextElementSibling;
                    if (errorMessage && errorMessage.classList.contains('error-message')) {
                        errorMessage.remove();
                    }
                }
            });
            
            if (isValid) {
                // Simulate form submission
                alert('Thank you for your submission! We will be in touch soon.');
                form.reset();
            }
        });
    });

    // Add active class to current section in navigation
    const sections = document.querySelectorAll('section[id]');
    
    function highlightNavigation() {
        const scrollPosition = window.scrollY;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                document.querySelector(`.nav-links a[href="#${sectionId}"]`)?.classList.add('active');
            } else {
                document.querySelector(`.nav-links a[href="#${sectionId}"]`)?.classList.remove('active');
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavigation);
    
    // Initialize the navigation highlight
    highlightNavigation();

    // Sticky header effects
    const header = document.querySelector('header');
    let lastScrollPosition = 0;
    
    function handleHeaderVisibility() {
        const currentScrollPosition = window.scrollY;
        
        if (currentScrollPosition > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Hide header when scrolling down, show when scrolling up
        if (currentScrollPosition > lastScrollPosition && currentScrollPosition > 200) {
            header.classList.add('header-hidden');
        } else {
            header.classList.remove('header-hidden');
        }
        
        lastScrollPosition = currentScrollPosition;
    }
    
    window.addEventListener('scroll', handleHeaderVisibility);
});

// Add custom CSS for elements added by JavaScript
const style = document.createElement('style');
style.textContent = `
    .error {
        border-color: #f44336 !important;
    }
    
    .error-message {
        color: #f44336;
        font-size: 0.85rem;
        margin-top: 0.25rem;
    }
    
    .header-hidden {
        transform: translateY(-100%);
    }
    
    header.scrolled {
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    
    .nav-links a.active {
        color: var(--primary-color);
        font-weight: 600;
    }
    
    body.nav-open {
        overflow: hidden;
    }
    
    /* Ensure animations only play when the element is visible */
    .fade-in:not(.visible),
    .fade-in-delay:not(.visible),
    .fade-in-delay-2:not(.visible) {
        opacity: 0;
        transform: translateY(20px);
    }
    
    .fade-in.visible,
    .fade-in-delay.visible,
    .fade-in-delay-2.visible {
        opacity: 1;
        transform: translateY(0);
    }
    
    .category-card:not(.visible),
    .benefit-card:not(.visible) {
        opacity: 0;
        transform: translateY(20px);
    }
    
    .category-card.visible,
    .benefit-card.visible {
        opacity: 1;
        transform: translateY(0);
        transition: opacity 0.5s ease, transform 0.5s ease;
    }
`;
document.head.appendChild(style);