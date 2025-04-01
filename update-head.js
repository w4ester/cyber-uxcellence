// Add the category-circles.css to the head when the page loads
document.addEventListener('DOMContentLoaded', () => {
    // Create a new link element for the CSS file
    const linkElement = document.createElement('link');
    linkElement.rel = 'stylesheet';
    linkElement.href = 'category-circles.css';
    
    // Append it to the head of the document
    document.head.appendChild(linkElement);
    
    console.log('Added category-circles.css to the document head');
});
