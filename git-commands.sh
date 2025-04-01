#!/bin/bash
# Script to create a new branch and push changes to GitHub

# Navigate to the project directory
cd /Users/willf/smartIndex/TigerTeam/cyberUXcellence

# Make sure we have the latest changes from main
git checkout main
git pull origin main

# Create and switch to the new branch
git checkout -b updateSite2

# Add all the modified and new files
git add index.html
git add styles.css
git add script.js
git add hubspotIntegrationReadme.md
git add deploymentPlan.md

# Commit the changes
git commit -m "Enhanced website with improved UI/UX, added HubSpot integration guide and deployment plan"

# Push the new branch to GitHub
git push -u origin updateSite2

# Output instructions for creating a pull request
echo ""
echo "Branch 'updateSite2' has been pushed to GitHub."
echo "To create a pull request and merge with main, visit:"
echo "https://github.com/w4ester/cyberUXcellence/pull/new/updateSite2"
echo ""
