const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      // Replace glass-panel with surface-panel
      content = content.replace(/glass-panel/g, 'surface-panel');
      
      // Strip out gradient, background, and soft border overrides
      content = content.replace(/bg-gradient-to-br from-[a-z0-9\-\/]+ to-[a-z0-9\-\/]+/g, '');
      content = content.replace(/bg-gradient-to-br from-[a-z0-9\-\/]+ via-[a-z0-9\-\/]+ to-[a-z0-9\-\/]+/g, '');
      content = content.replace(/border-border\/50/g, '');
      content = content.replace(/border-primary\/20/g, '');
      content = content.replace(/border-primary\/30/g, '');
      content = content.replace(/border-primary\/40/g, '');
      content = content.replace(/shadow-\[.*?\]/g, '');
      content = content.replace(/bg-primary\/5/g, '');
      content = content.replace(/bg-primary\/10/g, '');
      
      // Fix double spaces
      content = content.replace(/  +/g, ' ');
      
      fs.writeFileSync(fullPath, content);
    }
  }
}

processDir(srcDir);
console.log("Glassmorphism stripped.");
