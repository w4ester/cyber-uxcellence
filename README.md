# Cyber UXcellence Awards Website

A professional, modern website for the Cyber UXcellence Awards, celebrating excellence in cybersecurity user experience design.

## Quick Links

- **Demo Site**: [https://w4ester.github.io/cyber-uxcellence/](https://w4ester.github.io/cyber-uxcellence/)
- **Repository**: [https://github.com/w4ester/cyber-uxcellence](https://github.com/w4ester/cyber-uxcellence)
- **Final Review Date**: April 4, 2025
- **Launch Date**: April 8, 2025

## Overview

This website serves as the hub for the Cyber UXcellence Awards, providing information about the awards, categories, nomination process, and event timeline. The site is designed to be visually appealing, user-friendly, and mobile-responsive.

## How to Use the Site

### Navigating the Demo

1. Visit the live demo at [https://w4ester.github.io/cyber-uxcellence/](https://w4ester.github.io/cyber-uxcellence/)
2. Use the navigation menu at the top to jump to different sections
3. On mobile devices, tap the hamburger menu icon to access navigation options
4. Explore each section to understand the awards program:
   - **Hero Section**: Introduction and primary call-to-action
   - **About Section**: Program details and value proposition
   - **Categories Section**: Award categories with descriptions
   - **Why Nominate Section**: Benefits of participation
   - **Judges Section**: Information about the judging panel
   - **Timeline Section**: Key dates and milestones
   - **FAQ Section**: Common questions and answers
   - **CTA Section**: Final call-to-action for nominations
   - **Footer**: Contact information and quick links

### Testing Forms

The nomination and registration forms are ready for integration with HubSpot. Until connected:
- Forms will display as designed but submissions will not be processed
- Test submissions display a success message but don't send data to a backend

### Responsive Design

The site is fully responsive with three major breakpoints:
- **Desktop**: 992px and above
- **Tablet**: 768px to 991px  
- **Mobile**: Below 768px

Test the responsive design by resizing your browser window or using browser developer tools to simulate different devices.

## Complete Site Map

```
/cyber-uxcellence/
│
├── index.html                         # Main website HTML structure and content
├── styles.css                         # Comprehensive CSS styling for the entire site
├── script.js                          # JavaScript for interactive elements
│
├── README.md                          # This documentation file
├── readmeGithubdemo.md                # Instructions for GitHub Pages deployment
│
├── Brand Guide.png                    # Brand guidelines and style specifications
├── Brand Guide (1).png                # Duplicate of brand guidelines
│
├── Property 1=Purple Horizontal.png   # Purple logo variant (horizontal)
├── Property 1=Purple Horizontal (1).png # Duplicate of purple logo
├── Property 1=Orange Horizontal.jpg   # Orange logo variant (horizontal)
├── Property 1=Orange Horizontal (1).jpg # Duplicate of orange logo
│
├── CyberUXcellenceWebpageContent.md   # Source content for website sections
├── pressRelease.md                    # Press release content for the awards
├── Cyber_UXcellence_Awards_Website_Project_Final_Invoice.md # Project invoice
│
├── index_v1.html                      # Original version of the website
│
├── april4Ready.md                     # Plan for final review on April 4
├── april8Deployed.md                  # Deployment plan for April 8 launch
│
├── respond_to_kimBranddy03_31_25.md   # Response to client feedback
│
└── .gitignore                         # Git configuration for excluded files
```

### Key Files Description

#### Core Website Files
- **index.html**: The main HTML file containing all website content and structure
- **styles.css**: Contains all styling for the website using CSS variables, flexbox, and grid layouts
- **script.js**: Handles interactive elements like smooth scrolling, animations, form validation, and mobile menu

#### Documentation Files
- **README.md**: Complete documentation of the project
- **readmeGithubdemo.md**: Step-by-step guide for deploying via GitHub Pages
- **april4Ready.md**: Comprehensive plan for the April 4 final review milestone
- **april8Deployed.md**: Detailed deployment plan for the April 8 launch date

#### Content & Brand Assets
- **CyberUXcellenceWebpageContent.md**: Source content for all website sections
- **pressRelease.md**: Press release content announcing the Cyber UXcellence Awards
- **Brand Guide.png**: Visual guidelines for brand usage
- **Property 1=Purple Horizontal.png**: Primary logo in purple
- **Property 1=Orange Horizontal.jpg**: Alternative logo in orange

## Project Timeline

The project follows these key milestones:

1. **March 31, 2025**: Content finalization deadline
2. **April 4, 2025**: Final review with stakeholders
3. **April 8, 2025**: Official website launch
4. **April 29, 2025**: Judges announcement at RSA Conference
5. **June 27, 2025**: Nominations close
6. **August 5, 2025**: Winners announced at Black Hat

See **april4Ready.md** and **april8Deployed.md** for detailed plans related to these milestones.

## Features

- **Responsive design** that works seamlessly across all devices
- **Interactive elements** including smooth scrolling navigation, FAQ accordions, and animated content
- **Modern design** based on the Cyber UXcellence brand colors (purple and orange)
- **Nomination form** with HubSpot CRM integration capability
- **Registration capability** for event updates
- **SEO-friendly structure** with semantic HTML

## Technical Details

- Built with vanilla **HTML, CSS, and JavaScript** for optimal performance
- No dependencies required for core functionality
- Uses modern CSS features including **CSS variables, Flexbox, and Grid layouts**
- **Progressive enhancement** approach for broad browser compatibility
- **Intersection Observer API** for scroll-based animations

## Setup Instructions

### Running Locally

1. Clone the repository:
   ```
   git clone https://github.com/w4ester/cyber-uxcellence.git
   cd cyber-uxcellence
   ```

2. Open `index.html` in your browser to view the site locally.

3. For development, use a local server such as Live Server extension for VS Code.

### Viewing the Demo Site

Visit [https://w4ester.github.io/cyber-uxcellence/](https://w4ester.github.io/cyber-uxcellence/) to view the live demo.

## HubSpot CRM Integration

### Form Integration Steps

1. **Create HubSpot Forms**:
   - Log in to your HubSpot account
   - Navigate to Marketing > Lead Capture > Forms
   - Create two separate forms:
     - **Nomination Form**: Include fields for nominator details, nominee details, and category selection
     - **Registration Form**: Include fields for name, email, company, and subscription preferences

2. **Get the HubSpot Embed Code**:
   - After creating each form, click "Share" and select "Embed"
   - Copy the provided JavaScript embed code

3. **Implement in the website**:
   - For the Nomination Form, replace the form in the nomination section (around line 100 in `index.html`) with the HubSpot embed code
   - For the Registration Form, replace the CTA form with the HubSpot embed code

4. **Add the HubSpot Tracking Code**:
   - Go to HubSpot > Settings > Tracking Code
   - Copy the HubSpot tracking code
   - Add it to the `<head>` section of `index.html`

### Custom HubSpot Implementation

For deeper customization of the HubSpot forms while maintaining the site's design:

1. **Use the HubSpot Forms API**:
   ```javascript
   // Example code to add to script.js
   document.addEventListener('DOMContentLoaded', function() {
     // Load the HubSpot Forms API
     const script = document.createElement('script');
     script.src = 'https://js.hsforms.net/forms/v2.js';
     document.body.appendChild(script);
     
     script.addEventListener('load', function() {
       // Initialize nomination form
       hbspt.forms.create({
         region: "na1",
         portalId: "YOUR_PORTAL_ID",
         formId: "YOUR_NOMINATION_FORM_ID",
         target: "#nomination-form-container",
         onFormSubmit: function($form) {
           // Custom submission handler
           console.log("Form submitted");
           // Show success message
           document.querySelector('.nomination-success').style.display = 'block';
         }
       });
       
       // Initialize registration form
       hbspt.forms.create({
         region: "na1",
         portalId: "YOUR_PORTAL_ID",
         formId: "YOUR_REGISTRATION_FORM_ID",
         target: "#registration-form-container",
         onFormSubmit: function($form) {
           // Custom submission handler
           console.log("Registration submitted");
         }
       });
     });
   });
   ```

2. **Set Up HubSpot List Segmentation**:
   - Create separate lists in HubSpot for nominees and nominators
   - Set up workflows to automatically add contacts to the appropriate lists
   - Configure follow-up email sequences for both groups

3. **HubSpot Workflows for Nominees**:
   - Create a workflow that triggers when someone is nominated
   - Add steps to send an email notification about the nomination
   - Set follow-up reminders for judges during the review period

## Deployment

The site can be deployed through:

1. **GitHub Pages** (as is currently set up):
   - See `readmeGithubdemo.md` for detailed instructions

2. **Custom Hosting**:
   - Create a `deployment.yml` file with your hosting configuration (excluded from git for security)
   - Example structure:
   ```yaml
   # deployment.yml
   name: cyber-uxcellence-website
   
   environment:
     production:
       host: your-production-host.com
       username: your-username
       port: 22
       path: /var/www/cyberuxcellence
     
     staging:
       host: staging-host.com
       username: staging-username
       port: 22
       path: /var/www/staging/cyberuxcellence
   
   hubspot:
     portalId: "YOUR_PORTAL_ID"
     nominationFormId: "YOUR_NOMINATION_FORM_ID"
     registrationFormId: "YOUR_REGISTRATION_FORM_ID"
     apiKey: "YOUR_HUBSPOT_API_KEY"
   ```

## Final Steps Before Launch

See the following files for detailed plans:

1. **april4Ready.md**: Comprehensive checklist for final review readiness
2. **april8Deployed.md**: Complete deployment plan for launch day

Key tasks include:
- Integrating analytics (Google Analytics, Search Console, LinkedIn Insight Tag)
- Finalizing HubSpot form connections
- Setting up SSL certificate
- Performing cross-browser and device testing
- Implementing site monitoring

## Maintenance

Regular maintenance tasks include:

1. Updating event information and timeline
2. Adding judges' profiles when announced (after April 29, 2025)
3. Reviewing and optimizing form conversion rates
4. Updating content based on stakeholder feedback

## Credits

Built by FIRST_PROGRAMMING_PRINCIPLES with attention to detail and professional standards.

## License

All rights reserved. This website is proprietary to Cyber UXcellence and may not be reproduced without permission.