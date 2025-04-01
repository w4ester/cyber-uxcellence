#!/bin/bash

# Define the file paths
INDEX_FILE="index.html"
CATEGORIES_FILE="categories-section.html"
BACKUP_FILE="index.html.bak"

# Make sure we're in the right directory
cd "$(dirname "$0")"

# Create a backup of the original file
cp "$INDEX_FILE" "$BACKUP_FILE"
echo "Created backup of $INDEX_FILE as $BACKUP_FILE"

# Find the start and end of the categories section
START_LINE=$(grep -n '<section id="categories"' "$INDEX_FILE" | head -1 | cut -d: -f1)
if [ -z "$START_LINE" ]; then
  echo "Error: Could not find the start of the categories section"
  exit 1
fi

# Count the number of lines in the file
TOTAL_LINES=$(wc -l < "$INDEX_FILE")

# Extract everything before the categories section
head -n $((START_LINE - 1)) "$INDEX_FILE" > temp_before.html

# Extract everything after the categories section
# We'll look for the "why-nominate" section which comes after categories
END_MARKER='<section id="why" class="why-nominate'
END_LINE=$(grep -n "$END_MARKER" "$INDEX_FILE" | head -1 | cut -d: -f1)

if [ -z "$END_LINE" ]; then
  echo "Error: Could not find the end marker section"
  exit 1
fi

tail -n $((TOTAL_LINES - END_LINE + 1)) "$INDEX_FILE" > temp_after.html

# Combine everything into the new file
cat temp_before.html "$CATEGORIES_FILE" temp_after.html > "$INDEX_FILE"

# Clean up temporary files
rm temp_before.html temp_after.html

echo "Successfully updated the categories section in $INDEX_FILE"
echo "A backup of the original file is saved as $BACKUP_FILE"
