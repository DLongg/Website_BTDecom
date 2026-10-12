const fs = require('fs');
const path = require('path');

const dest = path.join(__dirname, '..', 'src', 'content', 'projects');

const files = fs.readdirSync(dest);

files.forEach(file => {
  if (file.endsWith('.md')) {
    const fullPath = path.join(dest, file);
    const content = fs.readFileSync(fullPath, 'utf8');
    // Replace literal '\n' with actual newlines
    const fixedContent = content.replace(/\\n/g, '\n');
    fs.writeFileSync(fullPath, fixedContent);
  }
});

console.log('Fixed markdown files');
