# Naming Conventions

Clear, consistent naming is essential for maintainable code. Follow these conventions for better readability.

## General Principles

1. **Be descriptive** - Names should reveal intent
2. **Be consistent** - Follow language conventions
3. **Avoid abbreviations** - Unless universally understood
4. **Use pronounceable names** - Code is read more than written
5. **Avoid mental mapping** - Don't make readers translate names

## Variables

### Use meaningful names

```javascript
// Bad
let d; // elapsed time in days
let x = getUserData();

// Good
let elapsedTimeInDays;
let userData = getUserData();
```

### Boolean variables

Prefix with `is`, `has`, `can`, `should`:

```python
# Good
is_active = True
has_permission = check_permission()
can_edit = user.role == 'admin'
should_notify = user.preferences.notifications
```

### Collections

Use plural names:

```java
// Bad
List<User> userList;
Set<String> nameSet;

// Good
List<User> users;
Set<String> names;
Map<String, Integer> scoresByPlayer;
```

## Functions and Methods

### Use verb phrases

```typescript
// Bad
function data() { }
function user(id) { }

// Good
function fetchData() { }
function getUserById(id: string) { }
function calculateTotal(items: Item[]) { }
function isValidEmail(email: string): boolean { }
```

### Consistent naming patterns

```python
# Getters/Setters
def get_username(self):
    return self._username

def set_username(self, value):
    self._username = value

# Boolean queries
def is_authenticated(self):
    return self._authenticated

def has_permission(self, permission):
    return permission in self._permissions

# Actions
def create_user(data):
    pass

def update_profile(user_id, data):
    pass

def delete_comment(comment_id):
    pass
```

## Classes

### Use nouns or noun phrases

```java
// Bad
class HandleData { }
class DoStuff { }

// Good
class User { }
class ShoppingCart { }
class PaymentProcessor { }
class EmailValidator { }
```

### Avoid generic names

```typescript
// Bad
class Manager { }
class Helper { }
class Utility { }

// Good
class UserSessionManager { }
class StringHelper { }
class DateUtility { }
```

## Constants

### Use UPPER_SNAKE_CASE

```python
MAX_RETRY_ATTEMPTS = 3
DEFAULT_TIMEOUT_SECONDS = 30
API_BASE_URL = "https://api.example.com"
ALLOWED_FILE_EXTENSIONS = ['.jpg', '.png', '.gif']
```

```javascript
const MAX_LOGIN_ATTEMPTS = 5;
const SESSION_TIMEOUT_MS = 3600000;
const ERROR_MESSAGES = {
  NOT_FOUND: 'Resource not found',
  UNAUTHORIZED: 'Unauthorized access'
};
```

## Interfaces and Types

```typescript
// Interfaces: Use "I" prefix or descriptive noun
interface IUser {
  id: string;
  name: string;
}

interface Serializable {
  serialize(): string;
}

// Types: Use descriptive names
type UserId = string;
type Callback = (error: Error | null, data: any) => void;
type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
```

## File Naming

```
components/
  UserProfile.tsx          # PascalCase for components
  user-settings.tsx        # kebab-case alternative
  
utils/
  string-helpers.js        # kebab-case for utilities
  dateFormatter.js         # camelCase alternative
  
constants/
  API_ENDPOINTS.js         # UPPER_SNAKE_CASE
  
tests/
  user.test.js             # Match source file + .test
  integration.spec.js      # Or .spec suffix
```

## Language-Specific Conventions

### Python (PEP 8)

```python
# Variables and functions: snake_case
user_name = "Alice"
def calculate_total_price(items):
    pass

# Classes: PascalCase
class UserProfile:
    pass

# Constants: UPPER_SNAKE_CASE
MAX_CONNECTIONS = 100

# Private members: leading underscore
class Account:
    def __init__(self):
        self._balance = 0  # Protected
        self.__secret = "hidden"  # Private
```

### JavaScript/TypeScript

```typescript
// Variables and functions: camelCase
const userName = "Bob";
function calculateTotalPrice(items: Item[]): number {
  return items.reduce((sum, item) => sum + item.price, 0);
}

// Classes and interfaces: PascalCase
class UserProfile { }
interface UserData { }

// Constants: UPPER_SNAKE_CASE or camelCase
const MAX_CONNECTIONS = 100;
const defaultTimeout = 5000;
```

### Java

```java
// Variables and methods: camelCase
String userName = "Charlie";
public int calculateTotalPrice(List<Item> items) { }

// Classes and interfaces: PascalCase
public class UserProfile { }
public interface Serializable { }

// Constants: UPPER_SNAKE_CASE
public static final int MAX_CONNECTIONS = 100;

// Packages: lowercase
package com.example.project;
```

## Naming Anti-Patterns

### Avoid

```javascript
// Single letter names (except loop counters)
let a = getUserData();

// Meaningless names
let data, info, thing, stuff;

// Hungarian notation in modern languages
let strName, intAge, bIsActive;

// Encoded type information
let userMap, nameString, countInteger;

// Overly abbreviated
let usrNm, calcTtl, procData;

// Mental mapping required
let temp, foo, bar, baz;
```

## Good Examples

```python
# Clear, self-documenting code
def send_welcome_email_to_new_users(users):
    for user in users:
        if user.is_new and not user.welcome_email_sent:
            email_service.send(
                recipient=user.email,
                template='welcome',
                context={'name': user.full_name}
            )
            user.mark_welcome_email_sent()
```

```typescript
class OrderProcessor {
  private readonly maxRetries = 3;
  private readonly retryDelayMs = 1000;
  
  async processOrder(order: Order): Promise<ProcessedOrder> {
    const validatedOrder = this.validateOrder(order);
    const paymentResult = await this.processPayment(validatedOrder);
    
    if (paymentResult.isSuccessful) {
      return this.createProcessedOrder(validatedOrder, paymentResult);
    }
    
    throw new PaymentFailedError(paymentResult.errorMessage);
  }
}
```

Remember: Good names make code self-documenting and reduce the need for comments!
