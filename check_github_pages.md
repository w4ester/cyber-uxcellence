# GitHub Pages Troubleshooting

If your GitHub Pages site at https://w4ester.github.io/cyber-uxcellence is not showing content, follow these steps:

1. **Verify GitHub Pages is enabled**:
   - Go to https://github.com/w4ester/cyber-uxcellence/settings/pages
   - Ensure "Source" is set to "Deploy from a branch"
   - Ensure "Branch" is set to "main" (or "master" if that's your default branch) with "/ (root)" folder
   - Click "Save" if you made any changes

2. **Check deployment status**:
   - Still on the GitHub Pages settings page, look for a deployment status message
   - If it shows "Your site is published at..." but the site isn't working, there may be a deployment delay
   - If it shows an error, note the error message for troubleshooting

3. **Verify index.html exists at repository root**:
   - Go to https://github.com/w4ester/cyber-uxcellence
   - Confirm index.html is visible at the root of the repository (not in a subfolder)
   - If index.html is in a subfolder, move it to the root

4. **Force a new deployment**:
   - Create a minor change to any file (like adding a comment to index.html)
   - Commit and push the change
   - This will trigger a new GitHub Pages deployment

5. **Check for path issues**:
   - If your repository is accessed at github.com/username/reponame, your GitHub Pages site will be at username.github.io/reponame
   - Make sure all resource paths (CSS, JS, images) in index.html use relative paths, not absolute paths

6. **Review GitHub Pages logs**:
   - Go to https://github.com/w4ester/cyber-uxcellence/actions
   - Look for the "pages-build-deployment" workflow
   - Check if there are any errors in the most recent workflow run

7. **Test a minimal index.html**:
   - If none of the above work, try creating a minimal index.html file with just basic HTML to see if GitHub Pages is working at all
   - This helps determine if the issue is with GitHub Pages itself or with your specific content

GitHub Pages typically takes 1-3 minutes to deploy changes, but occasionally it can take longer (up to 10 minutes).
