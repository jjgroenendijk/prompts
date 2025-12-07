/**
 * Unit Tests for Utility Functions
 */

const { truncateText, debounce, formatTitle } = require('./utils.js');

// Test Results Tracker
const testResults = {
  passed: 0,
  failed: 0,
  total: 0
};

function assert(condition, testName) {
  testResults.total++;
  if (condition) {
    testResults.passed++;
    console.log(`✓ ${testName}`);
  } else {
    testResults.failed++;
    console.error(`✗ ${testName}`);
  }
}

function assertEquals(actual, expected, testName) {
  testResults.total++;
  if (actual === expected) {
    testResults.passed++;
    console.log(`✓ ${testName}`);
  } else {
    testResults.failed++;
    console.error(`✗ ${testName}`);
    console.error(`  Expected: "${expected}"`);
    console.error(`  Actual: "${actual}"`);
  }
}

console.log('\n========================================');
console.log('TESTING: truncateText()');
console.log('========================================\n');

// Test 1: Text under limit - should return original
assertEquals(
  truncateText('Hello World', 20),
  'Hello World',
  'Text under limit returns original'
);

// Test 2: Text over limit - should truncate at word boundary
assertEquals(
  truncateText('This is a long text that needs truncation', 20),
  'This is a long text...',
  'Text over limit truncates at word boundary'
);

// Test 3: Text exactly at limit
assertEquals(
  truncateText('Exact length text!!', 19),
  'Exact length text!!',
  'Text exactly at limit returns original'
);

// Test 4: Empty string
assertEquals(
  truncateText('', 10),
  '',
  'Empty string returns empty'
);

// Test 5: Null value
assertEquals(
  truncateText(null, 10),
  '',
  'Null value returns empty string'
);

// Test 6: Undefined value
assertEquals(
  truncateText(undefined, 10),
  '',
  'Undefined value returns empty string'
);

// Test 7: Very short limit
assertEquals(
  truncateText('Hello World', 5),
  'Hello...',
  'Very short limit works correctly'
);

// Test 8: No spaces in text (single word longer than limit)
assertEquals(
  truncateText('Supercalifragilisticexpialidocious', 10),
  'Supercalif...',
  'Single long word truncates at limit'
);

// Test 9: Zero or negative limit
assertEquals(
  truncateText('Hello World', 0),
  'Hello World',
  'Zero limit returns original'
);

assertEquals(
  truncateText('Hello World', -5),
  'Hello World',
  'Negative limit returns original'
);

console.log('\n========================================');
console.log('TESTING: debounce()');
console.log('========================================\n');

// Test 1: Debounce function is callable
let callCount = 0;
const testFunc = () => { callCount++; };
const debouncedFunc = debounce(testFunc, 100);
assert(typeof debouncedFunc === 'function', 'Debounce returns a function');

// Test 2: Function is debounced (only called once after delay)
callCount = 0;
const debouncedCounter = debounce(() => { callCount++; }, 50);
debouncedCounter();
debouncedCounter();
debouncedCounter();

setTimeout(() => {
  assertEquals(callCount, 1, 'Debounced function called only once after multiple rapid calls');
}, 100);

// Test 3: Invalid function throws error
try {
  debounce('not a function', 100);
  assert(false, 'Should throw error for non-function argument');
} catch (e) {
  assert(e instanceof TypeError, 'Throws TypeError for non-function argument');
}

// Test 4: Invalid delay defaults to 300ms
const debouncedWithInvalidDelay = debounce(() => {}, 0);
assert(typeof debouncedWithInvalidDelay === 'function', 'Handles invalid delay gracefully');

// Test 5: Debounce preserves function context and arguments
let capturedArgs = null;
const argCapture = (...args) => { capturedArgs = args; };
const debouncedArgCapture = debounce(argCapture, 50);
debouncedArgCapture('test', 123, true);

setTimeout(() => {
  assert(
    capturedArgs && capturedArgs[0] === 'test' && capturedArgs[1] === 123 && capturedArgs[2] === true,
    'Debounced function receives correct arguments'
  );
}, 100);

console.log('\n========================================');
console.log('TESTING: formatTitle()');
console.log('========================================\n');

// Test 1: Basic kebab-case conversion
assertEquals(
  formatTitle('my-awesome-prompt'),
  'My Awesome Prompt',
  'Converts kebab-case to Title Case'
);

// Test 2: Remove .md extension
assertEquals(
  formatTitle('readme.md'),
  'Readme',
  'Removes .md extension'
);

// Test 3: Kebab-case with .md extension
assertEquals(
  formatTitle('my-project-readme.md'),
  'My Project Readme',
  'Converts kebab-case and removes .md extension'
);

// Test 4: Snake_case conversion
assertEquals(
  formatTitle('my_awesome_prompt'),
  'My Awesome Prompt',
  'Converts snake_case to Title Case'
);

// Test 5: Mixed separators
assertEquals(
  formatTitle('my-awesome_prompt'),
  'My Awesome Prompt',
  'Handles mixed separators'
);

// Test 6: Numbers in filename
assertEquals(
  formatTitle('version-2-update'),
  'Version 2 Update',
  'Handles numbers correctly'
);

// Test 7: Leading number
assertEquals(
  formatTitle('2024-report'),
  '2024 Report',
  'Handles leading numbers'
);

// Test 8: Common acronyms
assertEquals(
  formatTitle('api-documentation'),
  'API Documentation',
  'Recognizes common acronyms (API)'
);

assertEquals(
  formatTitle('html-css-guide'),
  'HTML CSS Guide',
  'Recognizes multiple acronyms'
);

// Test 9: Empty string
assertEquals(
  formatTitle(''),
  '',
  'Empty string returns empty'
);

// Test 10: Null value
assertEquals(
  formatTitle(null),
  '',
  'Null value returns empty string'
);

// Test 11: Undefined value
assertEquals(
  formatTitle(undefined),
  '',
  'Undefined value returns empty string'
);

// Test 12: Only .md extension
assertEquals(
  formatTitle('.md'),
  '',
  'Only extension returns empty string'
);

// Test 13: Special characters (edge case)
assertEquals(
  formatTitle('my-prompt-v1.2'),
  'My Prompt V1.2',
  'Handles version numbers'
);

// Test 14: Multiple consecutive separators
assertEquals(
  formatTitle('my--awesome---prompt'),
  'My Awesome Prompt',
  'Handles multiple consecutive separators'
);

// Test 15: Case variations (MD, Md, mD)
assertEquals(
  formatTitle('file.MD'),
  'File',
  'Removes .MD extension (uppercase)'
);

assertEquals(
  formatTitle('file.Md'),
  'File',
  'Removes .Md extension (mixed case)'
);

// Summary
setTimeout(() => {
  console.log('\n========================================');
  console.log('TEST SUMMARY');
  console.log('========================================\n');
  console.log(`Total Tests: ${testResults.total}`);
  console.log(`Passed: ${testResults.passed}`);
  console.log(`Failed: ${testResults.failed}`);
  console.log(`Success Rate: ${((testResults.passed / testResults.total) * 100).toFixed(2)}%`);
  console.log('\n========================================\n');
  
  if (testResults.failed === 0) {
    console.log('✓ All tests passed!');
  } else {
    console.log('✗ Some tests failed. Please review.');
  }
  
  process.exit(testResults.failed === 0 ? 0 : 1);
}, 200);
