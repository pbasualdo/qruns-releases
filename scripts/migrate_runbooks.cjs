const fs = require('fs');
const path = require('path');

const runbooksDir = path.join(__dirname, '../runbooks');

if (!fs.existsSync(runbooksDir)) {
  console.error(`Directory not found: ${runbooksDir}`);
  process.exit(1);
}

const files = fs.readdirSync(runbooksDir);

files.forEach(file => {
  if (path.extname(file) === '.json') {
    const filePath = path.join(runbooksDir, file);
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const data = JSON.parse(content);
      
      let changed = false;

      // Migrate category -> service
      if (data.category && (data.category === 'IAAS' || data.category === 'PAAS' || data.category === 'SAAS')) {
          data.service = data.category;
          changed = true;
      }
      
      // Migrate type -> category
      if (data.type && data.type !== 'qrun') {
          // Capitalize first letter
          const newCategory = data.type.charAt(0).toUpperCase() + data.type.slice(1);
          data.category = newCategory;
          changed = true;
      }

      // Set explicit type
      if (data.type !== 'qrun') {
          data.type = 'qrun';
          changed = true;
      }

      if (changed) {
          fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
          console.log(`Updated: ${file}`);
      } else {
          console.log(`Skipped (no changes): ${file}`);
      }

    } catch (e) {
      console.error(`Error processing ${file}:`, e);
    }
  }
});

console.log('Migration complete.');
