# Cyber UXcellence Awards Website

A professional, modern website for the Cyber UXcellence Awards, celebrating excellence in cybersecurity user experience design.

## Overview

This website serves as the hub for the Cyber UXcellence Awards, providing information about the awards, categories, nomination process, and event timeline. The site is designed to be visually appealing, user-friendly, and mobile-responsive.

## Features

- Responsive design that works seamlessly across all devices
- Interactive elements including smooth scrolling navigation, FAQ accordions, and animated content
- Modern design based on the Cyber UXcellence brand colors (purple and orange)
- Nomination form with HubSpot CRM integration
- Registration capability for event updates
- SEO-friendly structure

## Technical Details

- Built with vanilla HTML, CSS, and JavaScript for optimal performance
- No dependencies required for core functionality
- Uses modern CSS features including CSS variables, Flexbox, and Grid layouts
- Progressive enhancement approach for broad browser compatibility

## Project Structure

```
/cyberUXcellence/
├── index.html              # Main website HTML
├── styles.css              # Main stylesheet
├── script.js               # JavaScript functionality
├── README.md               # Project documentation
├── .gitignore              # Git ignore configuration
├── deployment.yml          # Deployment configuration (ignored in git)
└── assets/                 # Images and logos
    ├── Brand Guide.png
    ├── Property 1=Purple Horizontal.png
    └── Property 1=Orange Horizontal.jpg
```

## Setup Instructions

1. Clone the repository:
   ```
   git clone [repository-url]
   cd cyberUXcellence
   ```

2. Open `index.html` in your browser to view the site locally.

3. For development, use a local server such as Live Server extension for VS Code.

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

1. **Set up deployment.yml**:
   Create a `deployment.yml` file with your hosting configuration. This file is excluded from git for security.

   Example structure:
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

2. **Create .gitignore file**:
   ```
   # .gitignore
   
   # Sensitive deployment information
   deployment.yml
   .env
   
   # OS generated files
   .DS_Store
   .DS_Store?
   ._*
   .Spotlight-V100
   .Trashes
   ehthumbs.db
   Thumbs.db
   
   # Editor directories and files
   .idea
   .vscode
   *.swp
   *.swo
   
   # Logs
   logs
   *.log
   npm-debug.log*
   
   # Runtime data
   pids
   *.pid
   *.seed
   
   # Optional npm cache & logs
   .npm
   node_modules/
   ```

## Need to Setup

1. **HubSpot CRM Integration**:
   - Complete the HubSpot form integrations as described above
   - Connect nomination and registration forms to your CRM
   - Set up automated workflows for nominee and nominator communications

2. **Deployment Configuration**:
   - Create the `deployment.yml` file with your hosting details
   - Configure automated deployment if using CI/CD pipelines

3. **Domain and SSL**:
   - Purchase and configure your custom domain
   - Set up SSL certificates for secure connections

4. **Analytics**:
   - Implement Google Analytics or HubSpot analytics for visitor tracking
   - Set up conversion tracking for form submissions

## Maintenance

Regular maintenance tasks include:

1. Updating event information and timeline
2. Adding judges' profiles when announced
3. Reviewing and optimizing form conversion rates
4. Updating content based on stakeholder feedback

## Credits

Built by FIRST_PROGRAMMING_PRINCIPLES with attention to detail and professional standards.

## License

All rights reserved. This website is proprietary to Cyber UXcellence and may not be reproduced without permission.