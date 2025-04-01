/**
 * Mindgrub-style Category Carousel
 * This script implements a horizontal sliding carousel similar to the one on mindgrub.com
 */

document.addEventListener('DOMContentLoaded', () => {
    // Main carousel elements
    const categoryCards = document.querySelectorAll('.category-card');
    const categoryNavItems = document.querySelectorAll('.category-nav-item');
    const carousel = document.querySelector('.category-cards');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (!categoryCards.length || !carousel) return;
    
    // Total number of cards and current active index
    const totalCards = categoryCards.length;
    let activeIndex = 0;
    
    // Function to update carousel position
    const updateCarousel = (newIndex) => {
        // Ensure index is within bounds
        activeIndex = (newIndex + totalCards) % totalCards;
        
        // Update transform to slide horizontally
        carousel.style.transform = `translateX(-${activeIndex * 100}%)`;
        
        // Update active class on navigation items
        categoryNavItems.forEach((item, index) => {
            item.classList.toggle('active', index === activeIndex);
        });
        
        // Update active class on cards
        categoryCards.forEach((card, index) => {
            card.classList.toggle('active', index === activeIndex);
            card.setAttribute('aria-hidden', index !== activeIndex);
        });
        
        // Update carousel indicators
        document.querySelectorAll('.carousel-indicator').forEach((indicator, index) => {
            indicator.classList.toggle('active', index === activeIndex);
        });
    };
    
    // Initialize carousel
    updateCarousel(0);
    
    // Set up navigation functionality
    if (prevBtn && nextBtn) {
        // Next button click
        nextBtn.addEventListener('click', () => {
            updateCarousel(activeIndex + 1);
        });
        
        // Previous button click
        prevBtn.addEventListener('click', () => {
            updateCarousel(activeIndex - 1);
        });
    }
    
    // Category nav item click
    categoryNavItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            updateCarousel(index);
        });
    });
    
    // Carousel indicators click
    document.querySelectorAll('.carousel-indicator').forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            updateCarousel(index);
        });
    });
    
    // Touch/swipe functionality
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
        // Detect swipe direction and minimum distance (50px)
        if (touchStartX - touchEndX > 50) {
            // Swipe left - go to next slide
            updateCarousel(activeIndex + 1);
        } else if (touchEndX - touchStartX > 50) {
            // Swipe right - go to previous slide
            updateCarousel(activeIndex - 1);
        }
    };
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') {
            updateCarousel(activeIndex + 1);
        } else if (e.key === 'ArrowLeft') {
            updateCarousel(activeIndex - 1);
        }
    });
});