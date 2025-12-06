# Debugging Strategies

Effective debugging is a critical skill. Use systematic approaches to identify and fix issues quickly.

## The Debugging Mindset

1. **Stay calm** - Frustration clouds judgment
2. **Be systematic** - Follow a methodical process
3. **Question assumptions** - The bug is often where you least expect
4. **Reproduce first** - Understand how to trigger the issue
5. **Isolate the problem** - Narrow down the scope

## Initial Steps

### 1. Reproduce the Bug

- [ ] Can you consistently trigger the bug?
- [ ] What are the exact steps to reproduce?
- [ ] Does it happen in all environments?
- [ ] What's the expected vs. actual behavior?

### 2. Gather Information

```python
# Add detailed logging
import logging

logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

def process_order(order):
    logger.debug(f"Processing order: {order.id}")
    logger.debug(f"Order data: {order.to_dict()}")
    
    try:
        result = validate_order(order)
        logger.debug(f"Validation result: {result}")
    except Exception as e:
        logger.error(f"Validation failed: {e}", exc_info=True)
        raise
```

### 3. Read Error Messages Carefully

```
Traceback (most recent call last):
  File "main.py", line 42, in process_data
    result = transform(data['values'])
KeyError: 'values'
```

What this tells you:
- Error type: `KeyError`
- Missing key: `'values'`
- Location: `main.py` line 42
- Function: `process_data`

## Debugging Techniques

### Print/Log Debugging

```javascript
function calculateDiscount(price, percentage) {
  console.log('calculateDiscount called:', { price, percentage });
  
  const discount = price * (percentage / 100);
  console.log('Calculated discount:', discount);
  
  const finalPrice = price - discount;
  console.log('Final price:', finalPrice);
  
  return finalPrice;
}
```

### Binary Search / Divide and Conquer

Comment out half the code to isolate the problem:

```python
def complex_function(data):
    # Part 1
    step1 = transform_data(data)
    step2 = validate_data(step1)
    step3 = enrich_data(step2)
    
    # Part 2 - Comment this out first
    # step4 = process_data(step3)
    # step5 = finalize_data(step4)
    # return step5
    
    return step3  # Return early to test Part 1
```

### Rubber Duck Debugging

Explain your code line-by-line to someone (or something):

1. What does this line do?
2. What values do I expect here?
3. What assumptions am I making?
4. Could this fail?

### Add Assertions

```typescript
function getUserById(id: string): User {
  console.assert(typeof id === 'string', 'id must be a string');
  console.assert(id.length > 0, 'id cannot be empty');
  
  const user = database.users.find(u => u.id === id);
  
  console.assert(user !== undefined, `User ${id} not found`);
  
  return user;
}
```

## Debugger Usage

### JavaScript/Node.js

```javascript
function processData(items) {
  debugger; // Execution will pause here
  
  for (let item of items) {
    if (item.price > 100) {
      debugger; // Conditional breakpoint location
      applyDiscount(item);
    }
  }
}

// Run with: node inspect script.js
// Or use Chrome DevTools
```

### Python (pdb)

```python
import pdb

def calculate_total(items):
    total = 0
    for item in items:
        pdb.set_trace()  # Debugger starts here
        total += item['price'] * item['quantity']
    return total

# Commands:
# n - next line
# s - step into
# c - continue
# p variable - print variable
# l - list code
# q - quit
```

### Browser DevTools

```javascript
// Conditional breakpoint
function processUser(user) {
  // Right-click breakpoint, add condition: user.age < 18
  if (user.isActive) {
    sendNotification(user);
  }
}

// Log points (no code changes needed)
// Right-click line number > Add logpoint
// Enter: 'User:', user, 'Status:', user.status
```

## Common Bug Patterns

### Off-by-One Errors

```python
# Bug: Misses last element
for i in range(len(items) - 1):
    process(items[i])

# Fix: Include all elements
for i in range(len(items)):
    process(items[i])

# Better: Use iteration
for item in items:
    process(item)
```

### Null/Undefined Issues

```javascript
// Bug: Potential null reference
function getUsername(user) {
  return user.profile.name; // Crashes if profile is null
}

// Fix: Defensive checks
function getUsername(user) {
  if (!user || !user.profile) {
    return 'Unknown';
  }
  return user.profile.name;
}

// Modern: Optional chaining
function getUsername(user) {
  return user?.profile?.name ?? 'Unknown';
}
```

### Type Mismatches

```python
# Bug: String concatenation instead of addition
def calculate_total(a, b):
    return a + b

result = calculate_total('10', '20')  # Returns '1020' not 30

# Fix: Type validation
def calculate_total(a, b):
    if not isinstance(a, (int, float)) or not isinstance(b, (int, float)):
        raise TypeError('Arguments must be numeric')
    return a + b
```

### Race Conditions

```javascript
// Bug: Race condition
let counter = 0;

async function increment() {
  const current = counter;
  await delay(100);
  counter = current + 1;
}

// Fix: Atomic operations or locking
let counter = 0;
const lock = new AsyncLock();

async function increment() {
  await lock.acquire('counter', async () => {
    counter += 1;
  });
}
```

### Memory Leaks

```javascript
// Bug: Event listener leak
function setupComponent() {
  const button = document.getElementById('myButton');
  button.addEventListener('click', handleClick);
  // Component gets recreated but listeners accumulate
}

// Fix: Clean up listeners
function setupComponent() {
  const button = document.getElementById('myButton');
  button.removeEventListener('click', handleClick);
  button.addEventListener('click', handleClick);
}

function cleanup() {
  const button = document.getElementById('myButton');
  button.removeEventListener('click', handleClick);
}
```

## Advanced Techniques

### Time-Travel Debugging

Use tools like:
- Redux DevTools (JavaScript)
- rr (C/C++)
- Replay.io (JavaScript)

### Performance Debugging

```javascript
// Measure execution time
console.time('processData');
processData(largeDataset);
console.timeEnd('processData');

// Profile specific sections
performance.mark('start-processing');
processData(data);
performance.mark('end-processing');
performance.measure('processing', 'start-processing', 'end-processing');

// Get measurements
const measures = performance.getEntriesByType('measure');
console.log(measures[0].duration);
```

### Network Debugging

```python
# Debug HTTP requests
import requests
import logging

# Enable debug logging
logging.basicConfig(level=logging.DEBUG)

response = requests.get('https://api.example.com/data')
print(f"Status: {response.status_code}")
print(f"Headers: {response.headers}")
print(f"Body: {response.text}")
```

### Database Query Debugging

```python
# SQLAlchemy query debugging
import logging
logging.getLogger('sqlalchemy.engine').setLevel(logging.INFO)

# Django query debugging
from django.db import connection
print(connection.queries)

# Count queries
from django.db import reset_queries
reset_queries()
# ... run code ...
print(f"Queries executed: {len(connection.queries)}")
```

## Debugging Checklist

### When Stuck

- [ ] Take a break - fresh eyes help
- [ ] Read error message completely
- [ ] Check recent changes (git diff)
- [ ] Verify assumptions with print/log statements
- [ ] Search error message online
- [ ] Check documentation
- [ ] Review similar working code
- [ ] Ask for help (rubber duck first!)

### Questions to Ask

1. **What changed?** - Was it working before?
2. **What's different?** - Different environment, data, user?
3. **What am I assuming?** - Are my assumptions correct?
4. **Can I simplify?** - Minimal reproduction case?
5. **What does the data look like?** - Inspect actual values

## Tools and Resources

### JavaScript/TypeScript
- Chrome DevTools
- VS Code Debugger
- Node.js inspect
- React DevTools
- Redux DevTools

### Python
- pdb (built-in debugger)
- ipdb (enhanced pdb)
- VS Code Debugger
- PyCharm Debugger
- Python Tutor (visualizer)

### General
- Git bisect (find breaking commit)
- Wireshark (network analysis)
- Postman (API testing)
- Browser network tab
- System monitors (htop, Activity Monitor)

## Documentation

When you fix a bug:

```python
def calculate_discount(price, quantity):
    """
    Calculate discount based on quantity.
    
    Bug fix: Previously returned negative discount for quantity=0.
    Now returns 0 discount for quantity <= 1.
    
    See issue #123 for details.
    """
    if quantity <= 1:
        return 0
    return price * 0.1 * (quantity - 1)
```

## Prevention

After fixing:

1. **Add a test** - Prevent regression
2. **Document the fix** - Help future developers
3. **Look for similar bugs** - Same pattern elsewhere?
4. **Refactor if needed** - Make it harder to break
5. **Share learnings** - Help the team

Remember: Every bug is an opportunity to learn and improve your code!
