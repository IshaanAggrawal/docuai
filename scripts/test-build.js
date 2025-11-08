// Simple script to test if the app builds correctly
const { exec } = require('child_process');
const path = require('path');

console.log('Testing build process...');

// Run the build command
exec('npm run build', { cwd: path.resolve(__dirname, '..') }, (error, stdout, stderr) => {
  if (error) {
    console.error('Build failed:');
    console.error(stderr);
    process.exit(1);
  }
  
  console.log('Build successful!');
  console.log(stdout);
  
  // Check if dist directory exists
  const fs = require('fs');
  const distPath = path.resolve(__dirname, '..', 'dist');
  
  if (fs.existsSync(distPath)) {
    console.log('Dist directory created successfully');
    
    // Check if index.html exists in dist
    const indexPath = path.join(distPath, 'index.html');
    if (fs.existsSync(indexPath)) {
      console.log('index.html found in dist directory');
      console.log('Deployment should work correctly!');
    } else {
      console.error('index.html not found in dist directory');
      process.exit(1);
    }
  } else {
    console.error('Dist directory not found');
    process.exit(1);
  }
});