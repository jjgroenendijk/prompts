# Error Handling Patterns

Robust error handling is crucial for building reliable applications. Handle errors gracefully and provide meaningful feedback.

## Core Principles

1. **Fail fast** - Detect errors early
2. **Be specific** - Use specific exception types
3. **Don't swallow errors** - Always handle or propagate
4. **Clean up resources** - Use try-finally or context managers
5. **Log appropriately** - Record errors for debugging

## Try-Catch Best Practices

### JavaScript/TypeScript

```typescript
// Good: Specific error handling
async function fetchUserData(userId: string): Promise<User> {
  try {
    const response = await fetch(`/api/users/${userId}`);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof TypeError) {
      // Network error
      logger.error('Network error fetching user', { userId, error });
      throw new NetworkError('Unable to reach server');
    } else if (error instanceof SyntaxError) {
      // JSON parsing error
      logger.error('Invalid response format', { userId, error });
      throw new DataFormatError('Server returned invalid data');
    } else {
      // Re-throw unknown errors
      logger.error('Unexpected error', { userId, error });
      throw error;
    }
  }
}
```

### Python

```python
# Good: Multiple exception types
def read_config_file(filepath):
    try:
        with open(filepath, 'r') as f:
            config = json.load(f)
        return config
    except FileNotFoundError:
        logger.error(f"Config file not found: {filepath}")
        return get_default_config()
    except json.JSONDecodeError as e:
        logger.error(f"Invalid JSON in config: {e}")
        raise ConfigurationError(f"Malformed config file: {filepath}")
    except PermissionError:
        logger.error(f"Permission denied reading: {filepath}")
        raise ConfigurationError(f"Cannot read config file: {filepath}")
    except Exception as e:
        logger.error(f"Unexpected error reading config: {e}")
        raise
```

## Custom Exception Classes

### Python

```python
class ApplicationError(Exception):
    """Base exception for application errors."""
    def __init__(self, message, code=None, details=None):
        super().__init__(message)
        self.code = code
        self.details = details or {}

class ValidationError(ApplicationError):
    """Raised when input validation fails."""
    def __init__(self, message, field=None):
        super().__init__(message, code='VALIDATION_ERROR')
        self.field = field

class ResourceNotFoundError(ApplicationError):
    """Raised when a requested resource doesn't exist."""
    def __init__(self, resource_type, resource_id):
        message = f"{resource_type} with id {resource_id} not found"
        super().__init__(message, code='NOT_FOUND')
        self.resource_type = resource_type
        self.resource_id = resource_id

class AuthenticationError(ApplicationError):
    """Raised when authentication fails."""
    def __init__(self, message="Authentication failed"):
        super().__init__(message, code='AUTH_ERROR')

# Usage
def get_user(user_id):
    user = db.query(User).get(user_id)
    if not user:
        raise ResourceNotFoundError('User', user_id)
    return user
```

### TypeScript

```typescript
class ApplicationError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode: number = 500,
    public details?: Record<string, any>
  ) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

class ValidationError extends ApplicationError {
  constructor(message: string, public field?: string) {
    super(message, 'VALIDATION_ERROR', 400, { field });
  }
}

class ResourceNotFoundError extends ApplicationError {
  constructor(resourceType: string, resourceId: string) {
    super(
      `${resourceType} with id ${resourceId} not found`,
      'NOT_FOUND',
      404,
      { resourceType, resourceId }
    );
  }
}

class UnauthorizedError extends ApplicationError {
  constructor(message = 'Unauthorized') {
    super(message, 'UNAUTHORIZED', 401);
  }
}

// Usage
function getUser(userId: string): User {
  const user = database.users.find(u => u.id === userId);
  if (!user) {
    throw new ResourceNotFoundError('User', userId);
  }
  return user;
}
```

## Error Handling in Async Code

### Promises

```javascript
// Good: Proper promise error handling
function processUserData(userId) {
  return fetchUser(userId)
    .then(user => validateUser(user))
    .then(validUser => enrichUserData(validUser))
    .then(enrichedUser => saveUser(enrichedUser))
    .catch(ValidationError, error => {
      logger.warn('Validation failed', { userId, error });
      return getDefaultUser(userId);
    })
    .catch(NetworkError, error => {
      logger.error('Network error', { userId, error });
      throw new ServiceUnavailableError('User service unavailable');
    })
    .catch(error => {
      logger.error('Unexpected error processing user', { userId, error });
      throw error;
    });
}
```

### Async/Await

```typescript
// Good: Clean async/await error handling
async function createOrder(orderData: OrderData): Promise<Order> {
  let transaction;
  
  try {
    transaction = await db.beginTransaction();
    
    // Validate order
    const validation = validateOrderData(orderData);
    if (!validation.isValid) {
      throw new ValidationError(validation.errors);
    }
    
    // Check inventory
    const inventoryCheck = await checkInventory(orderData.items);
    if (!inventoryCheck.available) {
      throw new InsufficientInventoryError(inventoryCheck.missing);
    }
    
    // Create order
    const order = await db.orders.create(orderData, { transaction });
    
    // Process payment
    const payment = await processPayment(order.total, orderData.paymentMethod);
    if (!payment.success) {
      throw new PaymentFailedError(payment.reason);
    }
    
    // Update inventory
    await updateInventory(orderData.items, { transaction });
    
    await transaction.commit();
    
    logger.info('Order created successfully', { orderId: order.id });
    return order;
    
  } catch (error) {
    if (transaction) {
      await transaction.rollback();
    }
    
    if (error instanceof ValidationError) {
      logger.warn('Order validation failed', { error });
      throw error;
    } else if (error instanceof PaymentFailedError) {
      logger.error('Payment processing failed', { error });
      throw error;
    } else {
      logger.error('Unexpected error creating order', { error });
      throw new OrderCreationError('Failed to create order', error);
    }
  }
}
```

## Resource Cleanup

### Python Context Managers

```python
from contextlib import contextmanager

@contextmanager
def database_connection(connection_string):
    """Ensure database connection is properly closed."""
    conn = None
    try:
        conn = create_connection(connection_string)
        yield conn
    except DatabaseError as e:
        logger.error(f"Database error: {e}")
        if conn:
            conn.rollback()
        raise
    finally:
        if conn:
            conn.close()
            logger.debug("Database connection closed")

# Usage
with database_connection(DB_URL) as conn:
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM users")
    results = cursor.fetchall()
```

### Try-Finally

```java
public void processFile(String filepath) throws IOException {
    BufferedReader reader = null;
    try {
        reader = new BufferedReader(new FileReader(filepath));
        String line;
        while ((line = reader.readLine()) != null) {
            processLine(line);
        }
    } catch (FileNotFoundException e) {
        logger.error("File not found: " + filepath, e);
        throw new ProcessingException("Cannot process file", e);
    } catch (IOException e) {
        logger.error("Error reading file: " + filepath, e);
        throw new ProcessingException("Error processing file", e);
    } finally {
        if (reader != null) {
            try {
                reader.close();
            } catch (IOException e) {
                logger.warn("Error closing reader", e);
            }
        }
    }
}

// Better: Try-with-resources (Java 7+)
public void processFile(String filepath) throws ProcessingException {
    try (BufferedReader reader = new BufferedReader(new FileReader(filepath))) {
        String line;
        while ((line = reader.readLine()) != null) {
            processLine(line);
        }
    } catch (FileNotFoundException e) {
        logger.error("File not found: " + filepath, e);
        throw new ProcessingException("Cannot process file", e);
    } catch (IOException e) {
        logger.error("Error reading file: " + filepath, e);
        throw new ProcessingException("Error processing file", e);
    }
}
```

## Error Responses in APIs

```typescript
// Express.js error handler middleware
interface ErrorResponse {
  error: {
    code: string;
    message: string;
    details?: any;
  };
  requestId?: string;
}

function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const requestId = req.headers['x-request-id'] as string;
  
  logger.error('API error', {
    error: err,
    requestId,
    method: req.method,
    path: req.path,
    ip: req.ip
  });
  
  if (err instanceof ValidationError) {
    const response: ErrorResponse = {
      error: {
        code: err.code,
        message: err.message,
        details: err.details
      },
      requestId
    };
    return res.status(400).json(response);
  }
  
  if (err instanceof UnauthorizedError) {
    const response: ErrorResponse = {
      error: {
        code: 'UNAUTHORIZED',
        message: 'Authentication required'
      },
      requestId
    };
    return res.status(401).json(response);
  }
  
  if (err instanceof ResourceNotFoundError) {
    const response: ErrorResponse = {
      error: {
        code: 'NOT_FOUND',
        message: err.message
      },
      requestId
    };
    return res.status(404).json(response);
  }
  
  // Default: Don't leak internal errors
  const response: ErrorResponse = {
    error: {
      code: 'INTERNAL_ERROR',
      message: 'An unexpected error occurred'
    },
    requestId
  };
  res.status(500).json(response);
}

app.use(errorHandler);
```

## Retry Logic

```python
import time
from functools import wraps

def retry(max_attempts=3, delay=1, backoff=2, exceptions=(Exception,)):
    """Retry decorator with exponential backoff."""
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            attempt = 0
            current_delay = delay
            
            while attempt < max_attempts:
                try:
                    return func(*args, **kwargs)
                except exceptions as e:
                    attempt += 1
                    if attempt >= max_attempts:
                        logger.error(f"Failed after {max_attempts} attempts: {e}")
                        raise
                    
                    logger.warning(
                        f"Attempt {attempt} failed, retrying in {current_delay}s: {e}"
                    )
                    time.sleep(current_delay)
                    current_delay *= backoff
            
        return wrapper
    return decorator

# Usage
@retry(max_attempts=5, delay=1, backoff=2, exceptions=(NetworkError, TimeoutError))
def fetch_external_data(url):
    response = requests.get(url, timeout=10)
    response.raise_for_status()
    return response.json()
```

## Defensive Programming

```python
def calculate_average(numbers):
    """Calculate average with defensive checks."""
    # Input validation
    if numbers is None:
        raise ValueError("numbers cannot be None")
    
    if not isinstance(numbers, (list, tuple)):
        raise TypeError(f"Expected list or tuple, got {type(numbers)}")
    
    if len(numbers) == 0:
        raise ValueError("Cannot calculate average of empty list")
    
    # Check all elements are numeric
    if not all(isinstance(n, (int, float)) for n in numbers):
        raise TypeError("All elements must be numeric")
    
    # Perform calculation
    total = sum(numbers)
    count = len(numbers)
    
    return total / count
```

## Logging Best Practices

```typescript
// Structured logging with context
import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

function processPayment(orderId: string, amount: number) {
  const context = { orderId, amount };
  
  try {
    logger.info('Processing payment', context);
    
    const result = paymentGateway.charge(amount);
    
    logger.info('Payment processed successfully', {
      ...context,
      transactionId: result.transactionId
    });
    
    return result;
  } catch (error) {
    logger.error('Payment processing failed', {
      ...context,
      error: error.message,
      stack: error.stack
    });
    
    throw new PaymentError('Payment processing failed', error);
  }
}
```

Remember: Good error handling makes your application resilient and maintainable!
