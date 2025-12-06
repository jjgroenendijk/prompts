const { getAllSnippets } = require('../lib/snippets');

try {
  console.log('Testing snippet processing...');
  const snippets = getAllSnippets();
  console.log(`Found ${snippets.length} snippets.`);
  
  // Group by category to verify categories
  const categories = {};
  snippets.forEach(s => {
    categories[s.category] = (categories[s.category] || 0) + 1;
  });
  console.log('Categories:', categories);

  if (snippets.length > 0) {
    console.log('Sample Snippet:', JSON.stringify(snippets[0], null, 2));
  }
} catch (e) {
  console.error('Error testing snippets:', e);
  process.exit(1);
}
