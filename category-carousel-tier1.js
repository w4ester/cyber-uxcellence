/**
 * Circle Category Navigation JavaScript
 * ------------------------------------------
 * Modern, premium circular navigation for award categories
 */

document.addEventListener('DOMContentLoaded', () => {
    initCircleCategoriesNavigation();

    function initCircleCategoriesNavigation() {
        // Core elements
        const categoryCards = document.querySelectorAll('.category-card');
        const categoryNavItems = document.querySelectorAll('.category-nav-item');
        const categorySection = document.querySelector('.categories');
        
        // Validate required elements
        if (!categoryCards.length || !categoryNavItems.length) {
            console.error('Category navigation elements not found');
            return;
        }
        
        // Create circular navigation background if not already present
        if (!document.querySelector('.categories-nav-circle')) {
            const circleBackground = document.createElement('div');
            circleBackground.className = 'categories-nav-circle';
            
            // Find the appropriate container to append to
            const navContainer = document.querySelector('.categories-nav-vertical');
            if (navContainer) {
                navContainer.appendChild(circleBackground);
            }
        }
        
        // Core variables
        let activeIndex = 0;
        let isAnimating = false;
        
        // Initialize navigation
        function initializeNavigation() {
            // Set initial active item 
            setTimeout(() => {
                // Allow time for icons to be loaded first
                setActiveCategory(0, false); // No animation on initial load
            }, 100);
            
            // Add click event listeners to nav items
            categoryNavItems.forEach((item, index) => {
                item.addEventListener('click', () => {
                    if (isAnimating) return;
                    setActiveCategory(index, true);
                });
                
                // Add keyboard accessibility
                item.setAttribute('role', 'button');
                item.setAttribute('tabindex', '0');
                item.setAttribute('aria-label', `Select ${item.textContent.trim()} category`);
                
                item.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        item.click();
                    }
                });
            });
            
            // Keyboard navigation for focused elements
            document.addEventListener('keydown', (e) => {
                if (!isElementInViewport(categorySection)) return;
                
                // Arrow key navigation
                if (e.key === 'ArrowRight') {
                    const nextIndex = (activeIndex + 1) % categoryCards.length;
                    setActiveCategory(nextIndex, true);
                } else if (e.key === 'ArrowLeft') {
                    const prevIndex = (activeIndex - 1 + categoryCards.length) % categoryCards.length;
                    setActiveCategory(prevIndex, true);
                }
            });
            
            // Handle any hash navigation on page load
            handleHashNavigation();
        }
        
        // Handle hash-based navigation
        function handleHashNavigation() {
            const hash = window.location.hash;
            if (hash && hash.includes('category-')) {
                const index = parseInt(hash.replace('#category-', ''));
                if (!isNaN(index) && index >= 0 && index < categoryCards.length) {
                    setActiveCategory(index, false);
                }
            }
        }
        
        // Set active category
        function setActiveCategory(index, animate = true) {
            if (isAnimating || index === activeIndex) return;
            
            if (animate) {
                isAnimating = true;
            }
            
            // Update nav items
            categoryNavItems.forEach((item, i) => {
                item.classList.toggle('active', i === index);
                item.setAttribute('aria-pressed', i === index ? 'true' : 'false');
            });
            
            // Update cards with fade animation
            // First hide current card
            if (categoryCards[activeIndex]) {
                categoryCards[activeIndex].classList.remove('active');
                categoryCards[activeIndex].setAttribute('aria-hidden', 'true');
            }
            
            // Short delay for smooth transition
            const transitionDelay = animate ? 200 : 0;
            
            setTimeout(() => {
                // Then show new card
                if (categoryCards[index]) {
                    categoryCards[index].classList.add('active');
                    categoryCards[index].setAttribute('aria-hidden', 'false');
           
                    // Scroll to card if needed
                    if (animate) {
                        const cardTop = categoryCards[index].getBoundingClientRect().top;
                        const navBottom = document.querySelector('.categories-nav-vertical').getBoundingClientRect().bottom;
                        
                        // Only scroll if the card is not visible in the viewport
                        if (cardTop < navBottom) {
                            categoryCards[index].scrollIntoView({ 
                                behavior: animate ? 'smooth' : 'auto', 
                                block: 'center' 
                            });
                        }
                    }
                }
                
                // Update active index
                activeIndex = index;
                
                // Clear animation flag after transition
                if (animate) {
                    setTimeout(() => {
                        isAnimating = false;
                    }, 300);
                }
            }, transitionDelay);
            
            // Update URL hash for deep linking without scrolling
            if (animate) {
                const newUrl = window.location.pathname + window.location.search + `#category-${index}`;
                history.replaceState(null, '', newUrl);
            }
        }
        
        // Helper: Check if element is in viewport
        function isElementInViewport(el) {
            if (!el) return false;
            
            const rect = el.getBoundingClientRect();
            return (
                rect.top < (window.innerHeight || document.documentElement.clientHeight) &&
                rect.bottom > 0 &&
                rect.left < (window.innerWidth || document.documentElement.clientWidth) &&
                rect.right > 0
            );
        }
        
        // Initialize icons and animations
        initIconAnimations();
        
        // Initialize the navigation
        initializeNavigation();
    }
    
    function initIconAnimations() {
        // Get all category navigation items
        const categoryNavItems = document.querySelectorAll('.category-nav-item');
        
        // Define unique icons for each category
        const icons = [
            'fa-award', // Best Overall
            'fa-desktop', // Intuitive UI
            'fa-mobile-alt', // Mobile Security
            'fa-universal-access', // Accessibility
            'fa-chart-pie', // Data Visualization
            'fa-users-cog', // Onboarding
            'fa-shield-alt', // Incident Response
            'fa-key' // Access Management
        ];
        
        // Add icons to category nav items if they don't already exist
        categoryNavItems.forEach((item, index) => {
            const existingIcon = item.querySelector('.category-icon');
            
            // Only create a new icon if one doesn't already exist
            if (!existingIcon && index < icons.length) {
                const icon = document.createElement('i');
                icon.className = `fas ${icons[index]} category-icon`;
                
                // Make sure we place the icon before any existing content
                if (item.firstChild) {
                    item.insertBefore(icon, item.firstChild);
                } else {
                    item.appendChild(icon);
                }
            }
        });
    }
});
