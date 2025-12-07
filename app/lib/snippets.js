const fs = require('fs');
const path = require('path');
const { globSync } = require('glob');
const { getEditUrl } = require('./github');
const { formatTitle } = require('./utils');

function getAllSnippets() {
  // Use glob to find all markdown files in snippets directory
  // We look for files inside subdirectories of snippets/
  // Pattern: ../snippets/**/*.md
  const pattern = '../snippets/**/*.md';
  
  try {
    const files = globSync(pattern, { cwd: process.cwd() });
    
    const snippets = files.map(filePath => {
      // filePath is relative to CWD, e.g., "snippets/security/input-validation.md"
      
      // Read content
      const absolutePath = path.join(process.cwd(), filePath);
      let content = '';
      try {
        content = fs.readFileSync(absolutePath, 'utf8');
      } catch (e) {
        console.warn(`Could not read file: ${filePath}`, e);
        return null;
      }
      
      // Skip empty files
      if (!content.trim()) {
         return null;
      }

      // Extract category
      // Path is snippets/category/filename.md or ../snippets/category/filename.md
      // We can split by separator (handling both / and \ via path.normalize or just split)
      // glob returns posix paths usually, but let's be safe
      const normalizedPath = filePath.replace(/\\/g, '/');
      const parts = normalizedPath.split('/');
      
      // Find where 'snippets' is in the path
      const snippetsIndex = parts.indexOf('snippets');
      
      let category = 'uncategorized';
      // If 'snippets' is found and there is a segment after it, and that segment is not the filename
      if (snippetsIndex !== -1 && snippetsIndex + 1 < parts.length - 1) {
        category = parts[snippetsIndex + 1];
      }
      
      const filename = parts[parts.length - 1];
      
      // Generate title
      const title = formatTitle(filename);
      
      // ID is the filePath
      const id = filePath;
      
      return {
        id,
        title,
        category,
        content, // Raw content, no frontmatter
        filePath,
        editUrl: getEditUrl(filePath)
      };
    }).filter(item => item !== null);
    
    return snippets;
  } catch (e) {
    console.error('Error scanning snippets:', e);
    return [];
  }
}

module.exports = {
  getAllSnippets
};
