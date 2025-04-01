# Plan for Redesigning the 'Categories' Section

This document outlines the plan to refactor the 'Categories' section of the Cyber UXcellence Awards website to match the layout shown in `better.png`. The current implementation uses a 3D carousel, which will be replaced with a two-column layout displaying category details and a visual element side-by-side.

## 1. HTML (`index.html`) Changes

*   **Remove:** The existing `.categories-scroll-container` div and its contents (the `.category-card` elements and `.category-navigation`).
*   **Keep/Modify:** Keep the `.category-tabs` div. It will serve as the primary navigation for selecting categories. Styles might be updated.
*   **Add:** A new container div below the tabs (`<div class="category-display-container">`). Inside this container:
    *   A main content area (`<div class="category-content-display">`) to dynamically show the details (title, description, stats, quote) of the *currently selected* category.
    *   A secondary area (`<div class="category-visual-display">`) to dynamically show a corresponding image or visual element for the selected category.
*   **Data Storage:** Category content (currently inside `.category-card`) will be extracted and stored, likely in JavaScript objects, for dynamic loading into the display areas.

## 2. CSS (`styles.css`) Changes

*   **Remove/Comment Out:** CSS rules related to the 3D carousel effect. This includes styles targeting:
    *   `.categories-scroll-container`
    *   `.category-card` (specifically `transform`, `opacity`, `z-index` properties used for the 3D effect)
    *   `.category-navigation`
    *   `.carousel-indicators`
*   **Add:**
    *   New styles for `.category-display-container` using Flexbox or CSS Grid to create the two-column layout.
    *   Styles for the `.category-content-display` area (typography, spacing, etc.).
    *   Styles for the `.category-visual-display` area (image sizing, alignment, potential borders/shadows).
    *   Updated styles for `.category-tabs` and `.category-tab` to match the new aesthetic and clearly indicate the active tab.

## 3. JavaScript (`script.js`) Changes

*   **Remove/Comment Out:**
    *   The `init3DCategoryCarousel` function definition.
    *   The call to `init3DCategoryCarousel()` within the main `init` function.
    *   Associated event listeners (for prev/next buttons, indicators, keyboard navigation, swipe gestures, and card clicks related to the carousel).
*   **Add:**
    *   A JavaScript data structure (e.g., an array of objects) to hold the content for each category (title, description, stats, quote, image path).
    *   New event listeners for clicks on the `.category-tab` elements.
    *   Logic within the event listener to:
        *   Identify the selected category (e.g., via a `data-category-id` attribute).
        *   Retrieve the corresponding data from the JavaScript data structure.
        *   Update the `innerHTML` or `textContent` of elements within `.category-content-display` with the retrieved data.
        *   Update the `src` attribute of an `<img>` tag (or similar) within `.category-visual-display`.
        *   Manage the 'active' class on the `.category-tab` elements, ensuring only the selected one is marked as active.
    *   Initialize the display with the content of the default category (e.g., "Best Overall") on page load.

## Visualization (Mermaid Diagram)

```mermaid
graph TD
    A[section#categories] --> B(div.container);
    B --> C{div.section-header};
    B --> D(div.category-tabs);
    D --> E[div.category-tab data-category-id='best-overall'];
    D --> F[div.category-tab data-category-id='intuitive-ui'];
    D --> G[...];
    B --> H(div.category-display-container);
    H --> I(div.category-content-display);
    H --> J(div.category-visual-display);

    subgraph Category Data (JS Array of Objects)
        K{{id: 'best-overall', title: '...', desc: '...', img: '...'}};
        L{{id: 'intuitive-ui', title: '...', desc: '...', img: '...'}};
        M{{...}};
    end

    E -- onClick --> X{Update Content & Visuals};
    F -- onClick --> X;
    X -- uses data from --> K;
    X -- uses data from --> L;
    X -- updates --> I;
    X -- updates --> J;
```

## Next Steps

Implement the changes outlined above in `index.html`, `styles.css`, and `script.js`.