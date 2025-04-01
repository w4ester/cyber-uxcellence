const puppeteer = require('puppeteer');

async function takeScreenshot(url, outputPath = 'categories_screenshot.png') {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // Set viewport to a large size
  await page.setViewport({
    width: 1440,
    height: 1200,
    deviceScaleFactor: 1.5,
  });

  console.log(`Navigating to ${url}...`);
  // Load the website
  await page.goto(url, { waitUntil: 'networkidle0' });
  
  console.log('Page loaded, looking for categories section...');
  
  // Wait for the categories section to load
  try {
    // Try both potential selectors for the categories section
    await page.waitForSelector('#categories, .categories-section', { 
      visible: true,
      timeout: 5000 
    });
    
    console.log('Categories section found, taking screenshot...');
    
    // Try to find the categories section using various potential selectors
    const categoriesSection = await page.$('#categories') || 
                            await page.$('.categories-section') || 
                            await page.$('.categories-container');
    
    if (categoriesSection) {
      // Take screenshot of the specific section
      await categoriesSection.screenshot({ 
        path: outputPath,
        omitBackground: false
      });
      console.log(`Screenshot taken successfully: ${outputPath}`);
    } else {
      // If we can't find the exact section, take a full page screenshot
      console.log('Could not find specific categories section, taking full page screenshot');
      await page.screenshot({ 
        path: outputPath,
        fullPage: false
      });
      console.log(`Full page screenshot taken: ${outputPath}`);
    }
  } catch (error) {
    console.log('Timeout waiting for categories section, taking full page screenshot');
    await page.screenshot({ 
      path: outputPath,
      fullPage: false
    });
    console.log(`Full page screenshot taken as fallback: ${outputPath}`);
  }
  
  await browser.close();
}

// Check if URL and output path were provided as command line arguments
const args = process.argv.slice(2);
if (args.length >= 1) {
  const url = args[0];
  const outputPath = args[1] || 'categories_screenshot.png';
  takeScreenshot(url, outputPath).catch(err => {
    console.error('Error taking screenshot:', err);
  });
} else {
  console.error('Please provide a URL as the first argument');
  process.exit(1);
}