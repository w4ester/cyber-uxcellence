[Schedule Followup Meeting](https://calendar.app.google/w2WAstEthPZoTW1s5)

### **My Questions**

**Timeline:**

* **Target Launch Date:** What is the target launch date for the site? Apr 4, 2025  
* **Content Finalization:** By what date should the HERO, ABOUT, CATEGORIES (thanks, Kim, for sharing the updated categories), JUDGES, TIMELINE, and FAQ sections be finalized (with no further changes to allow for testing)? Mar 31, 2025, that said Judges will be announced on Apr 29, 2025 so we’ll need to be prepared to update the site on Apr 30, 2025 with their headshots, name, title and short bio (word count TBD)

**Functionality & Integrations:**

* Are there any third-party tools or plugins you’d like to integrate beyond HubSpot? Yes, let’s add Google Analytics, Google Search Console, and LinkedIn Insight Tag  
  *  *Example Code: if we only need the form embed on site \- no webhook(s), no api(s) – only Form onSite fill \=\> CRM*   
     \<\!-- HubSpot Form Embed \--\>  
    * \<div class="hubspot-form-container"\>\</div\>  
    * \<script charset="utf-8" type="text/javascript" src="//js.hsforms.net/forms/v2.js"\>\</script\>  
    * \<script\>  
    *   hbspt.forms.create({  
    *     portalId: "YOUR\_HUBSPOT\_PORTAL\_ID",  // Replace with your actual HubSpot portal ID  
    *     formId: "YOUR\_HUBSPOT\_FORM\_ID",        // Replace with your actual HubSpot form ID  
    *     target: ".hubspot-form-container"  
    *   });  
    * \</script\>

**Design & User Experience:**

* Are there any extra design elements or specific brand aesthetics that need to be incorporated beyond the provided guidelines? Yes, brand guidelines have been finalized with layout examples. Will share a folder with all design assets and brand guidelines.  
* Do you have any specific layout or navigation preferences based on the design direction you wanted to share with me (showed example during meeting)? 

**Platform & Technical Requirements:**

* I understand we have the domain, could you share more details about your current hosting environment (for example, are you using Gandi.net or another provider)?  
* Do we have an SSL certificate in place? I can handle that during setup and deployment.

**Approval Process & Communication:**

* How frequently would you like to schedule check-ins or update meetings throughout the project? However frequently you think is needed, but given the tight schedule perhaps 2x a week would be ideal. What do you think?  
* Where would you like the site to be stored (for example, in the Mindgrub GitHub repo)? I’m usually not the person to decide this but since you have access to our GitHub repo that may make sense.

**Hosting Credentials:**

* Please provide the necessary hosting credentials. Alternatively, if you’re using WordPress, could you add me as an editor/administrator to the site?  
* I can work with the Mindgrub Dev team (e.g., Jonathan Hawk) to set up the site within the Mindgrub GitHub environment and scope for deployment.

**Note:** The Quality Assurance & Testing phase will include secure site deployment tasks such as:

* Installing and configuring (or verifying) the SSL/TLS certificate.  
* Reviewing the hosting environment (leveraging WordPress role-based access via Mindgrub GitHub) to ensure proper security settings.  
* Securely storing sensitive deployment credentials using internal Secrets (preferred) and ensuring minimal access permissions.  
* Conducting a post-deployment vulnerability scan and security verification.

---

### **Cyber UXcellence Awards Website Project – Comprehensive Overview**

**Project Overview:**  
The Cyber UXcellence Awards website is a modern, responsive landing page designed to showcase and recognize outstanding cybersecurity products with exceptional user experience. With the content draft largely in place, the site will be built using HTML, CSS, and JavaScript. Key features include:

* **Responsive Design:** A mobile-first approach ensuring excellent usability across devices.  
* **Interactive Elements:** Smooth scrolling and animated sections (leveraging the Intersection Observer API for on-scroll animations) plus a mobile hamburger menu for easy navigation.

**Integrated Forms:** A nomination form integrated with HubSpot to capture leads and sync with your CRM.

* **Content & Branding:** Nearly finalized content for the HERO, ABOUT, CATEGORIES, WHY, JUDGES, TIMELINE, and FAQ sections; brand guidelines are provided as a PNG (with a forthcoming PDF), and logos are available in both vertical and horizontal formats.

**Key Points from Communication:**

* **Assets & Branding:**  
  * A brand guidelines image (Brand Guide.png) and logos in both “Orange Horizontal” and “Purple Horizontal” formats have been provided.  
* **HubSpot Integration:**  
  * Branddy confirmed that embedding the HubSpot form is straightforward (no specialized triggers or custom actions required).  
* **Content & Scheduling:**  
  * A total of 1-2 hours of virtual meetings have been planned (an initial 30-minute meeting on 03/19/25, a midpoint review of 30 minutes, and a final review of 30 minutes) to ensure collaborative progress. ([Schedule Meeting](https://calendar.app.google/w2WAstEthPZoTW1s5))

**Assets Provided:**

* **Branding & Guidelines:**  
  * **Brand Guide.png:** Contains the finalized (soon-to-be-finalized) visual guidelines.  
  * **Logos:** Provided in both vertical and horizontal formats (purple and orange versions).  
* **Content & Documentation:**  
  * **Cyber UXcellence Web Page Content:** Detailed copy for HERO, ABOUT, CATEGORIES, WHY, JUDGES, TIMELINE, and FAQ sections.  
  * **Press Release (pressRelease.md):** Includes announcement details, key dates, and industry statements.  
  * **README.md:** Offers an overview of the website’s features, file structure, and technical requirements.  
* **Website Code:**  
  * **index.html, styles.css, script.js:** These files provide the reusable, responsive, and dynamic structure of the landing page.

---

### **Project Estimation and Invoice Details**

Based on our discussions and the current scope, the site requires final code, cleanup, integration, testing/securing, and secure deployment. I anticipate about 8-10 hours of work for the project.

* **Total Estimated Hours:** 8-10 hours  
* **Total Estimated Cost:** $850  
* **Availability:** I will start next week – Monday, March 24, 2025

**Invoice Details:**

* **Invoice \#:** 34  
* **Date:** March 19, 2025  
* **Site Due Date:** \[Insert Due Date\]  
* **Bill To:**  
  William Forrester  
  Pierup, LLC  
* **Project:** Cyber UXcellence Awards Website Project

**Detailed Cost Breakdown:**

| Task | Hours | Amount |
| :---: | :---: | :---: |
| **Project Planning & Meetings** | 2 |  |
| **Clean Up Code – Finalize Development & Deployment** | 2–4 |  |
| **Nomination Form & CRM Integration** | 1 |  |
| **Quality Assurance & Testing (Secure Site)** | 2–3 |  |
| **Total Estimated** | **8-10** | **$850** |

**Note:** The Quality Assurance & Testing phase includes secure site deployment tasks such as installing/verifying the SSL/TLS certificate, reviewing the hosting environment (leveraging WordPress role-based access via Mindgrub GitHub), securely storing sensitive deployment credentials using Secrets (or your preferred method), and conducting a post-deployment vulnerability scan.

---

### **Next Steps**

1. **Finalize Assets:**  
   Build and adjust the site (including updating nomination form) as needed, incorporating any changes to categories or additional content.

2. **Meeting & Clarifications:**  
   Let’s schedule a virtual meeting during the week of 03/24/25 to confirm final project requirements, address any questions, and review the overall scope and budget. ([Schedule Meeting](https://calendar.app.google/w2WAstEthPZoTW1s5))

3. **Project Execution:**  
   Once we have agreement on the scope, I’ll proceed with integrating the HubSpot form, finalizing the design per the brand guidelines, and making any necessary revisions.

4. **Delivery:**  
   The final deliverable will be a fully functional website along with all source code files (HTML, CSS, JavaScript), packaged for deployment and built for reusability (to extend the site for future awards or related projects).

---

### **Payment**

**Preferred Contract Payment Method:**  
Please let me know your preferred method for contract payments? I'm comfortable with Stripe, PayPal, direct deposit, or Zelle, whichever works best for you.

---

### **Conclusion**

With the content nearly finalized and clear guidelines for design and functionality, ready to finalize integration details, confirm project scope, and move forward with development. 

I appreciate this opportunity to collaborate together\! And I am looking forward to bringing this project live \- Branddy and Kim.

*Resources:*

\<[link](https://docs.google.com/document/d/1uxPJmeQgAd8zB35gaqtIcZIgUkj1oe03/edit)\> \- Kim shared press release

\<[link](https://docs.google.com/document/d/106wHHFlrqA0kX9q7si4qVmDGKnpiqTrKZyMQrB9prC0/edit?tab=t.0)\> \- Brandy shared webcontent

\<download\> \- Brand Guide shared via Branddy

\<[link](https://docs.google.com/document/d/1rNWNvkHlviGPiLqUMoiltomdSYqwpP_aka19wFxOSjg/edit?tab=t.0#heading=h.l0c04ue4u7or)\> FAQ (will be updated)

[Email link](https://mail.google.com/mail/u/0/#scheduled/KtbxLwHPwwqxJGMgqrcMzcJCNrhSQTvSdq)