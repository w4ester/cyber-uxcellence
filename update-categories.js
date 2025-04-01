const fs = require('fs');
const path = require('path');

// File paths
const indexPath = path.join(__dirname, 'index.html');
const categoriesSectionPath = path.join(__dirname, 'categories-section.html');

// Read files
const indexContent = fs.readFileSync(indexPath, 'utf8');
const newCategoriesSection = fs.readFileSync(categoriesSectionPath, 'utf8');

// Find the beginning and end of the categories section
const sectionStartMarker = '<section id="categories" class="categories section-padding section-alternate">';
const sectionEndMarker = '</section>';

const startIndex = indexContent.indexOf(sectionStartMarker);
if (startIndex === -1) {
  console.error('Could not find categories section in index.html');
  process.exit(1);
}

// Find the end of the section by looking for the next section after the categories section
const sectionContentStart = startIndex;
const searchStartIndex = startIndex + sectionStartMarker.length;
const remainingContent = indexContent.substring(searchStartIndex);
const nextSectionIndex = remainingContent.indexOf(sectionEndMarker);

if (nextSectionIndex === -1) {
  console.error('Could not find the end of categories section');
  process.exit(1);
}

const sectionContentEnd = searchStartIndex + nextSectionIndex + sectionEndMarker.length;

// Replace the categories section with the new content
const updatedContent = 
  indexContent.substring(0, sectionContentStart) + 
  newCategoriesSection + 
  indexContent.substring(sectionContentEnd);

// Create a backup of the original file
fs.writeFileSync(indexPath + '.bak', indexContent, 'utf8');
console.log('Created backup of index.html as index.html.bak');

// Write the updated content back to index.html
fs.writeFileSync(indexPath, updatedContent, 'utf8');
console.log('Successfully updated the categories section in index.html');
