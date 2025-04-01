/**
 * Improved Category Carousel JavaScript
 * Based on Mindgrub.com interaction patterns
 * ------------------------------------------
 */

document.addEventListener('DOMContentLoaded', () => {
    // Main carousel elements
    const categoryCards = document.querySelectorAll('.category-card');
    const categoryNavItems = document.querySelectorAll('.category-nav-item');
    const carousel = document.querySelector('.category-cards');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    console.log('Improved category carousel initialized');
    
    if (!categoryCards.length || !carousel) {
        console.error('Category cards or carousel container not found');
        return;
    }
    
    // Total number of cards and current active index
    const totalCards = categoryCards.length;
    let activeIndex = 0;
    
    // Function to update carousel position with smooth transitions
    const updateCarousel = (newIndex, direction = null) => {
        // Ensure index is within bounds
        activeIndex = (newIndex + totalCards) % totalCards;
        
        console.log(`Updating carousel to index ${activeIndex}`);
        
        // Update transform to slide horizontally
        carousel.style.transform = `translateX(-${activeIndex * 100}%)`;
        
        // Update active class on navigation items
        categoryNavItems.forEach((item, index) => {
            item.classList.toggle('active', index === activeIndex);
            
            // Auto-scroll the active item into view (if in a scrollable container)
            if (index === activeIndex) {
                // Get the parent scroll container
                const navContainer = item.parentElement;
                if (navContainer.scrollWidth > navContainer.clientWidth) {
                    // Calculate scroll position to center active item
                    const itemLeft = item.offsetLeft;
                    const itemWidth = item.offsetWidth;
                    const containerWidth = navContainer.clientWidth;
                    const scrollLeft = itemLeft - (containerWidth / 2) + (itemWidth / 2);
                    
                    // Smooth scroll to position
                    navContainer.scrollTo({
                        left: scrollLeft,
                        behavior: 'smooth'
                    });
                }
            }
        });
        
        // Update active class on cards
        categoryCards.forEach((card, index) => {
            // First remove active class from all cards
            card.classList.remove('active');
            
            // Set aria-hidden for accessibility
            card.setAttribute('aria-hidden', index !== activeIndex);
        });
        
        // Add active class to current card with slight delay for animation sequencing
        setTimeout(() => {
            categoryCards[activeIndex].classList.add('active');
        }, 50);
        
        // Update any indicators if they exist
        document.querySelectorAll('.carousel-indicator').forEach((indicator, index) => {
            indicator.classList.toggle('active', index === activeIndex);
        });
        
        // Add direction-based animation classes if specified
        if (direction) {
            const currentCard = categoryCards[activeIndex];
            currentCard.classList.add(`slide-${direction}`);
            
            // Remove animation class after animation completes
            setTimeout(() => {
                currentCard.classList.remove(`slide-${direction}`);
            }, 600);
        }
    };
    
    // Initialize carousel (with a small delay to ensure DOM is ready)
    setTimeout(() => {
        updateCarousel(0);
        
        // Make the first card visible immediately
        categoryCards[0].classList.add('active');
    }, 100);
    
    // Set up navigation functionality
    if (prevBtn && nextBtn) {
        console.log('Navigation buttons found');
        
        // Next button click
        nextBtn.addEventListener('click', () => {
            console.log('Next button clicked');
            updateCarousel(activeIndex + 1, 'right');
        });
        
        // Previous button click
        prevBtn.addEventListener('click', () => {
            console.log('Previous button clicked');
            updateCarousel(activeIndex - 1, 'left');
        });
    } else {
        console.error('Navigation buttons not found');
    }
    
    // Category nav item click
    categoryNavItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            const direction = index > activeIndex ? 'right' : 'left';
            updateCarousel(index, direction);
        });
    });
    
    // Carousel indicators click (if they exist)
    document.querySelectorAll('.carousel-indicator').forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            const direction = index > activeIndex ? 'right' : 'left';
            updateCarousel(index, direction);
        });
    });
    
    // Touch/swipe functionality with improved physics
    let touchStartX = 0;
    let touchEndX = 0;
    let touchStartY = 0;
    let touchEndY = 0;
    let touchStartTime = 0;
    let touchEndTime = 0;
    
    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
        touchStartTime = new Date().getTime();
    });
    
    carousel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        touchEndY = e.changedTouches[0].screenY;
        touchEndTime = new Date().getTime();
        handleSwipe();
    });
    
    const handleSwipe = () => {
        // Calculate horizontal and vertical distance
        const deltaX = touchEndX - touchStartX;
        const deltaY = touchEndY - touchStartY;
        
        // Calculate distance and speed
        const distance = Math.abs(deltaX);
        const verticalDistance = Math.abs(deltaY);
        const time = touchEndTime - touchStartTime;
        const velocity = distance / time;
        
        // Minimum distance and vertical movement limit
        const minDistance = 50;
        const maxVerticalRatio = 0.8; // Vertical movement shouldn't exceed 80% of horizontal
        
        // Only trigger swipe if:
        // 1. Distance is above minimum
        // 2. Movement is more horizontal than vertical
        // 3. Speed is reasonable (not just a slow drag)
        if (distance > minDistance && 
            verticalDistance / distance < maxVerticalRatio &&
            velocity > 0.2) {
            
            if (deltaX < 0) {
                // Swipe left - go to next slide
                updateCarousel(activeIndex + 1, 'right');
            } else {
                // Swipe right - go to previous slide
                updateCarousel(activeIndex - 1, 'left');
            }
        }
    };
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        // Only respond to keyboard if carousel is in viewport
        if (isElementInViewport(carousel)) {
            if (e.key === 'ArrowRight') {
                updateCarousel(activeIndex + 1, 'right');
            } else if (e.key === 'ArrowLeft') {
                updateCarousel(activeIndex - 1, 'left');
            }
        }
    });
    
    // Helper function to check if an element is in the viewport
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0 &&
            rect.left <= (window.innerWidth || document.documentElement.clientWidth) &&
            rect.right >= 0
        );
    }
    
    // Handle window resize events
    window.addEventListener('resize', debounce(() => {
        // Recalculate and reposition the carousel
        updateCarousel(activeIndex);
    }, 200));
    
    // Debounce function to limit rapid executions
    function debounce(func, delay) {
        let timeout;
        return function() {
            const context = this;
            const args = arguments;
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(context, args), delay);
        };
    }
    
    // Initialize progressive loading of images in the carousel
    initProgressiveImageLoading();
    
    // Function to progressively load images as they come into view
    function initProgressiveImageLoading() {
        // Find all images inside the carousel
        const carouselImages = carousel.querySelectorAll('img[data-src]');
        
        // Check which images should be loaded initially
        checkVisibleImages();
        
        // After each slide change, check for new images to load
        carousel.addEventListener('transitionend', checkVisibleImages);
        
        // Check which images are in the active card and load them
        function checkVisibleImages() {
            const activeCard = document.querySelector('.category-card.active');
            if (!activeCard) return;
            
            // Find all images in active card that haven't been loaded
            const visibleImages = activeCard.querySelectorAll('img[data-src]');
            visibleImages.forEach(img => {
                // Load the image
                img.src = img.getAttribute('data-src');
                // Remove the data-src attribute to prevent reloading
                img.removeAttribute('data-src');
                
                // Add a fade-in effect when loaded
                img.style.opacity = '0';
                img.onload = () => {
                    img.style.transition = 'opacity 0.5s ease';
                    img.style.opacity = '1';
                };
            });
            
            // Preload images from the next card (if it exists)
            const nextIndex = (activeIndex + 1) % totalCards;
            const nextCard = categoryCards[nextIndex];
            if (nextCard) {
                const preloadImages = nextCard.querySelectorAll('img[data-src]');
                // After a short delay, start loading the next card's images
                setTimeout(() => {
                    preloadImages.forEach(img => {
                        const preloadImg = new Image();
                        preloadImg.src = img.getAttribute('data-src');
                    });
                }, 500);
            }
        }
    }
});