Transition to HubSpot
When you're ready to transition to the actual HubSpot form:

Create the HubSpot Form following the steps in the HubSpot integration guide
Get the Embed Code from HubSpot
Replace the Demo Form with the HubSpot embed code
Preserve Custom Styling by updating your CSS to target the HubSpot form elements

You can use the demo form to test user experience and make design adjustments before finalizing the HubSpot form.
7. Example Integration
Here's how you can integrate the form with your existing HTML:
htmlCopy<!-- In your index.html -->
<section id="nominate" class="cta section-padding">
    <div class="container">
        <div class="cta-content" data-aos="fade-up">
            <h2>Ready to highlight your product's exceptional UX?</h2>
            <p>Nominations for the inaugural Cyber UXcellence Awards open on April 14, 2025</p>
            
            <!-- Replace this div with the full form HTML -->
            <div class="hubspot-form-container">
                <!-- Demo form HTML goes here -->
            </div>
        </div>
    </div>
</section>
