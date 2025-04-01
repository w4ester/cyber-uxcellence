document.addEventListener('DOMContentLoaded', function() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    const timelineWrapper = document.querySelector('.timeline-wrapper');
    let isAnimating = false;
    
    // Enhance the timeline with proper sizing
    const setTimelineHeight = () => {
        const height = 
            timelineItems[timelineItems.length - 1].offsetTop + 
            timelineItems[timelineItems.length - 1].offsetHeight;
        timelineWrapper.style.height = `${height}px`;
    };
    
    // Add intersection observer to animate timeline items as they come into view
    const observerOptions = {
        root: null,
        rootMargin: '-10% 0px -10% 0px',
        threshold: 0.2
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Stagger the animation slightly based on the item's position
                const item = entry.target;
                const index = Array.from(timelineItems).indexOf(item);
                
                setTimeout(() => {
                    item.classList.add('in-view');
                }, index * 100);
                
                // Remove the observer after animation
                setTimeout(() => {
                    observer.unobserve(entry.target);
                }, 800);
            }
        });
    }, observerOptions);
    
    // Start observing all timeline items
    timelineItems.forEach(item => {
        observer.observe(item);
    });
    
    // Make timeline items interactive 
    timelineItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            if (isAnimating) return;
            
            // Don't do anything if it's already marked complete
            if (this.classList.contains('complete')) return;
            
            // If it's already active, don't do anything
            if (this.classList.contains('active') && 
                document.querySelectorAll('.timeline-item.active').length === 1) {
                return;
            }
            
            isAnimating = true;
            
            // Reset active classes
            document.querySelectorAll('.timeline-item').forEach(el => {
                if (el !== this) el.classList.remove('active');
            });
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // Scroll to center the active item if it's not already visible
            const rect = this.getBoundingClientRect();
            const isVisible = (
                rect.top >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
            );
            
            if (!isVisible) {
                const offset = this.offsetTop - (window.innerHeight / 2) + (this.offsetHeight / 2);
                window.scrollTo({
                    top: offset,
                    behavior: 'smooth'
                });
            }
            
            setTimeout(() => {
                isAnimating = false;
            }, 500);
        });
    });
    
    // Highlight the active timeline item on scroll
    window.addEventListener('scroll', function() {
        if (isAnimating) return;
        
        const items = document.querySelectorAll('.timeline-item');
        let activeItemFound = false;
        
        // Find which item is most visible in the viewport
        items.forEach(item => {
            const rect = item.getBoundingClientRect();
            const itemCenter = rect.top + (rect.height / 2);
            const viewportCenter = window.innerHeight / 2;
            
            // If this item is close to the center of the viewport
            if (Math.abs(itemCenter - viewportCenter) < rect.height * 0.8 && !activeItemFound) {
                if (!item.classList.contains('active')) {
                    // Remove active class from all items
                    items.forEach(el => el.classList.remove('active'));
                    // Add active class to this item
                    item.classList.add('active');
                }
                activeItemFound = true;
            }
        });
    });
    
    // Initial activation of first item
    if (!document.querySelector('.timeline-item.active')) {
        timelineItems[0].classList.add('active');
    }
    
    // Call this function after all items are positioned correctly
    setTimeout(setTimelineHeight, 100);
    
    // Also update on window resize
    window.addEventListener('resize', setTimelineHeight);
});