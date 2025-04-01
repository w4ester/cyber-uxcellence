# HubSpot Integration Guide for Cyber UXcellence Awards

This guide provides step-by-step instructions for integrating the Cyber UXcellence Awards nomination form with HubSpot CRM.

## Table of Contents

1. [HubSpot Account Setup](#1-hubspot-account-setup)
2. [Creating the Nomination Form](#2-creating-the-nomination-form)
3. [Embedding the Form on the Website](#3-embedding-the-form-on-the-website)
4. [Form-to-CRM Field Mapping](#4-form-to-crm-field-mapping)
5. [Setting Up Workflow Automations](#5-setting-up-workflow-automations)
6. [Testing the Integration](#6-testing-the-integration)
7. [Troubleshooting](#7-troubleshooting)

## 1. HubSpot Account Setup

### Prerequisites
- HubSpot account with Marketing Hub (Starter, Professional, or Enterprise) or a standalone Forms subscription
- Admin access to the HubSpot portal

### Steps:
1. **Log in to your HubSpot account** at [app.hubspot.com](https://app.hubspot.com/)
2. **Verify your portal ID**:
   - Go to Settings (gear icon) → Account Setup → Integrations → HubSpot API
   - Note your Hub ID (Portal ID) for later use

## 2. Creating the Nomination Form

### Configure Form Fields

1. Navigate to **Marketing → Lead Capture → Forms**
2. Click **Create form**
3. Select **Regular form** and click **Next**
4. Name your form (e.g., "Cyber UXcellence Nomination Form")
5. Add the following fields to the form:

#### Basic Information (Contact Properties)
- First Name (required)
- Last Name (required)
- Email (required)
- Company Name (required)
- Job Title
- Phone Number

#### Nomination Details (Custom Properties)
You'll need to create these custom properties first:

1. Go to **Settings → Properties**
2. Click **Create property**
3. Create the following properties:
   - Product Name (Single-line text)
   - Product Website (Single-line text)
   - Award Category (Dropdown, with values matching your 8 award categories)
   - Reason for Nomination (Multi-line text)
   - Supporting Materials (File upload)

4. Add these custom properties to your form
5. Configure form settings:
   - Add a GDPR consent checkbox if serving European users
   - Set up double opt-in if desired
   - Configure form submission behavior (redirect URL, thank you message)

6. Click **Save** to create your form

## 3. Embedding the Form on the Website

### Get Embed Code

1. In the HubSpot Forms tool, locate your nomination form
2. Click **Embed**
3. Choose **JavaScript embed code**
4. Copy the generated code

### Add to Website

1. Open the `script.js` file in your code editor
2. Locate the `initHubSpotForm()` function around line 400
3. Replace the placeholder IDs with your actual HubSpot credentials:

```javascript
hbspt.forms.create({
    portalId: "YOUR_PORTAL_ID_HERE", // Replace with your actual portal ID
    formId: "YOUR_FORM_ID_HERE",     // Replace with your actual form ID
    target: "#hubspot-form",
    onFormReady: function() {
        console.log('HubSpot form loaded successfully');
    }
});
```

4. Save the file

## 4. Form-to-CRM Field Mapping

### Map Form Fields to CRM Properties

1. In HubSpot, go to **Marketing → Lead Capture → Forms**
2. Edit your nomination form
3. Click on each field and verify the "Map to property" setting
4. Ensure each field is mapped to the correct contact property
5. For custom fields, make sure they're mapped to the custom properties you created
6. Click **Save** when done

### Configure Record Creation

1. Go to **Form Options** in the form editor
2. Under "Create records for submitted forms," select:
   - Create or update a contact record
   - Create a new record for the nomination (custom object)
3. Configure deduplication settings if needed
4. Save your changes

## 5. Setting Up Workflow Automations

### Create Notification Workflow

1. Go to **Automation → Workflows**
2. Click **Create workflow**
3. Select **Contact-based** workflow
4. Set the enrollment trigger: "Contact has filled out Cyber UXcellence Nomination Form"
5. Add actions:
   - Send notification email to team members
   - Create a task to review the nomination
   - Add contact to "Nominators" list
6. Turn on your workflow

### Create Follow-up Workflow

1. Create another workflow
2. Set enrollment trigger: "Contact has filled out Cyber UXcellence Nomination Form"
3. Add a delay: 1 day after submission
4. Add actions:
   - Send thank you/confirmation email
   - Schedule follow-up task if needed
5. Turn on your workflow

## 6. Testing the Integration

### Test Submission Process

1. Navigate to your website
2. Submit a test nomination
3. Verify in HubSpot that:
   - Contact record was created/updated
   - Nomination record was created
   - Workflows were triggered
4. Check email notifications
5. Verify data accuracy in CRM

### Test Form Validation

1. Try submitting without required fields
2. Test with invalid data formats
3. Verify error messages appear appropriately
4. Test with very large file uploads

## 7. Troubleshooting

### Common Issues and Solutions

- **Form not displaying**: Check if JavaScript is loading properly, verify portal ID and form ID
- **Submissions not appearing in HubSpot**: Verify form mapping and check for JavaScript console errors
- **Field validation errors**: Review form field settings in HubSpot
- **Workflow not triggering**: Check workflow enrollment criteria and activation status

### HubSpot Support Resources

- [HubSpot Forms Documentation](https://knowledge.hubspot.com/forms)
- [HubSpot Community Forum](https://community.hubspot.com/)
- [HubSpot Support](https://help.hubspot.com/)

## Additional Configuration Options

### GDPR Compliance

If serving European users, ensure your form is GDPR compliant:

1. Go to **Settings → Privacy & Consent**
2. Configure your communication consent options
3. Add these consent options to your form

### Spam Protection

Enhance form security:

1. Enable reCAPTCHA in form settings
2. Set up rate limiting for submissions
3. Configure honeypot fields to catch bot submissions

---

## Notes for Development Team

- Update the HubSpot tracking code in the website header
- Configure Google Tag Manager to work with HubSpot Analytics
- Set up custom tracking events for form interactions
- Create a plan for handling nomination data after the form closes

**Important**: Remember to replace all placeholder values with your actual HubSpot account information before deploying to production.

For any questions about this integration, contact the technical team at [tech-team@example.com](mailto:tech-team@example.com).
