#\!/bin/bash

# Check if we're in a git repository
if [ \! -d ".git" ]; then
    echo "Error: This does not appear to be a git repository (.git directory not found)"
    exit 1
fi

# Create a backup directory
echo "Creating a backup of your repository..."
BACKUP_DIR="../cyberUXcellence_backup_$(date +%Y%m%d%H%M%S)"
cp -r . "$BACKUP_DIR"
echo "Backup created at: $BACKUP_DIR"

# Install git-filter-repo if needed
echo "Installing git-filter-repo if needed..."
if \! command -v git-filter-repo &> /dev/null; then
    echo "git-filter-repo not found, installing with pip..."
    pip3 install git-filter-repo
fi

# Create a temporary file listing files to remove
echo "Identifying files to remove..."
git ls-files | grep -E "seanResources|careerConnectedLearningHub" > /tmp/files_to_remove.txt

if [ \! -s /tmp/files_to_remove.txt ]; then
    echo "No files found matching the patterns seanResources or careerConnectedLearningHub"
    exit 0
fi

echo "The following files will be removed from git history:"
cat /tmp/files_to_remove.txt
echo

# Confirm before proceeding
read -p "This will permanently rewrite git history. Are you sure? (y/n) " -n 1 -r
echo
if [[ \! $REPLY =~ ^[Yy]$ ]]; then
    echo "Operation cancelled."
    exit 1
fi

# Use the BFG Repo Cleaner as an alternative to git-filter-repo
echo "Removing unwanted directories from git history..."
for file in $(cat /tmp/files_to_remove.txt); do
    git filter-branch --force --index-filter "git rm --cached --ignore-unmatch $file" --prune-empty --tag-name-filter cat -- --all
done

echo "Cleaning up..."
git for-each-ref --format="delete %(refname)" refs/original | git update-ref --stdin
git reflog expire --expire=now --all
git gc --prune=now --aggressive

echo "Force pushing changes to GitHub (this will overwrite remote history)..."
git push origin --force

echo "Done\! The directories have been removed from git history."
echo "Backup is available at: $BACKUP_DIR"
