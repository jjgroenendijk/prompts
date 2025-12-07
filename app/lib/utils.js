/**
 * Utility Functions for Prompt Management System
 */

/**
 * Truncate text at word boundaries
 * @param {string} text - The text to truncate
 * @param {number} limit - The character limit
 * @returns {string} - Truncated text with "..." if needed, or original if under limit
 */
function truncateText(text, limit) {
  // Handle edge cases
  if (!text || text === null || text === undefined) {
    return '';
  }
  
  // Convert to string if not already
  text = String(text);
  
  // Handle invalid or non-positive limits
  if (!limit || limit <= 0) {
    return text;
  }
  
  // If text is already under limit, return as-is
  if (text.length <= limit) {
    return text;
  }
  
  // Truncate at word boundary
  let truncated = text.substring(0, limit);
  
  // Find the last space to avoid cutting words
  const lastSpace = truncated.lastIndexOf(' ');
  
  // If there's a space, truncate there; otherwise use the limit
  if (lastSpace > 0) {
    truncated = truncated.substring(0, lastSpace);
  }
  
  return truncated + '...';
}

/**
 * Debounce function to limit how often a function is called
 * @param {Function} func - The function to debounce
 * @param {number} delay - The delay in milliseconds
 * @returns {Function} - Debounced function
 */
function debounce(func, delay) {
  // Handle edge cases
  if (typeof func !== 'function') {
    throw new TypeError('First argument must be a function');
  }
  
  if (!delay || delay <= 0) {
    delay = 300; // Default delay
  }
  
  let timeoutId;
  
  return function debounced(...args) {
    // Clear existing timeout
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    
    // Set new timeout
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

/**
 * Copy text to clipboard using modern Clipboard API
 * @param {string} text - The text to copy
 * @returns {Promise<boolean>} - Promise resolving to true on success, false on failure
 */
async function copyToClipboard(text) {
  // Handle edge cases
  if (text === null || text === undefined) {
    text = '';
  }
  
  // Convert to string
  text = String(text);
  
  try {
    // Check if Clipboard API is available
    if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      // Fallback for older browsers or non-HTTPS contexts
      return fallbackCopyToClipboard(text);
    }
  } catch (error) {
    console.error('Failed to copy to clipboard:', error);
    // Try fallback method
    return fallbackCopyToClipboard(text);
  }
}

/**
 * Fallback method for copying to clipboard
 * @param {string} text - The text to copy
 * @returns {boolean} - Success status
 */
function fallbackCopyToClipboard(text) {
  try {
    // Create a temporary textarea element
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    
    // Select and copy
    textarea.select();
    textarea.setSelectionRange(0, 99999); // For mobile devices
    
    const successful = document.execCommand('copy');
    document.body.removeChild(textarea);
    
    return successful;
  } catch (error) {
    console.error('Fallback copy failed:', error);
    return false;
  }
}

/**
 * Format filename to Title Case
 * @param {string} filename - The filename to format
 * @returns {string} - Formatted title
 */
function formatTitle(filename) {
  // Handle edge cases
  if (!filename || filename === null || filename === undefined) {
    return '';
  }
  
  // Convert to string
  filename = String(filename);
  
  // Remove .md extension if present
  filename = filename.replace(/\.md$/i, '');
  
  // Handle empty string after extension removal
  if (!filename) {
    return '';
  }
  
  // Convert kebab-case and snake_case to spaces
  let title = filename.replace(/[-_]/g, ' ');
  
  // Split into words
  const words = title.split(/\s+/);
  
  // Capitalize each word, handling special cases
  const formattedWords = words.map(word => {
    // Skip empty words
    if (!word) {
      return '';
    }
    
    // Handle words with numbers (e.g., "api2" -> "API2")
    // Check if word is all uppercase already (acronyms)
    if (word === word.toUpperCase() && word.length > 1) {
      return word;
    }
    
    // Check for common acronyms or special patterns
    const upperWord = word.toUpperCase();
    const commonAcronyms = ['API', 'HTTP', 'HTTPS', 'URL', 'HTML', 'CSS', 'JS', 'ID', 'UI', 'UX', 'SQL', 'JSON', 'XML'];
    
    if (commonAcronyms.includes(upperWord)) {
      return upperWord;
    }
    
    // Handle words starting with numbers
    if (/^\d/.test(word)) {
      return word;
    }
    
    // Standard title case: capitalize first letter, lowercase rest
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  });
  
  return formattedWords.filter(w => w).join(' ');
}

// Export functions for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    truncateText,
    debounce,
    copyToClipboard,
    formatTitle
  };
}
