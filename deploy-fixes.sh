#!/bin/bash

# Script to deploy category card fixes to GitHub Pages site

echo "Deploying category card fixes to GitHub Pages site"

# Step 1: Add the new CSS file and modified files to git
git add styles-categories.css
git add index.html
git add category-carousel.js

# Step 2: Commit the changes
git commit -m "Fix category cards with improved horizontal carousel design

- Created dedicated CSS file for category cards
- Fixed carousel navigation and layout
- Improved card design with consistent styling
- Enhanced accessibility and readability
"

# Step 3: Push to GitHub to trigger GitHub Pages rebuild
git push origin main

echo "Deployment complete! Changes should be live in a few minutes."
echo "Visit https://w4ester.github.io/cyber-uxcellence/ to see the changes."