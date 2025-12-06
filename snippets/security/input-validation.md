# Input Validation Best Practices

Input validation is the first line of defense against security vulnerabilities. Always validate, sanitize, and verify user input before processing.

## Core Principles

1. **Never trust user input** - Assume all external data is malicious
2. **Validate on the server** - Client-side validation is for UX only
3. **Use allowlists over denylists** - Define what is acceptable
4. **Fail securely** - Reject invalid input by default

## Common Validation Patterns

### Email Validation

```javascript
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!email || typeof email !== 'string') {
    throw new Error('Email is required and must be a string');
  }
  
  if (email.length > 254) {
    throw new Error('Email exceeds maximum length');
  }
  
  if (!emailRegex.test(email)) {
    throw new Error('Invalid email format');
  }
  
  return email.toLowerCase().trim();
}
```

### Numeric Input Validation

```python
def validate_age(age):
    """Validate age input with range checking."""
    try:
        age_int = int(age)
    except (ValueError, TypeError):
        raise ValueError("Age must be a valid integer")
    
    if age_int < 0 or age_int > 150:
        raise ValueError("Age must be between 0 and 150")
    
    return age_int
```

### String Sanitization

```java
public class InputValidator {
    private static final Pattern ALPHANUMERIC = Pattern.compile("^[a-zA-Z0-9_-]+$");
    
    public static String sanitizeUsername(String username) {
        if (username == null || username.isEmpty()) {
            throw new IllegalArgumentException("Username cannot be empty");
        }
        
        String trimmed = username.trim();
        
        if (trimmed.length() < 3 || trimmed.length() > 20) {
            throw new IllegalArgumentException("Username must be 3-20 characters");
        }
        
        if (!ALPHANUMERIC.matcher(trimmed).matches()) {
            throw new IllegalArgumentException("Username contains invalid characters");
        }
        
        return trimmed;
    }
}
```

## SQL Injection Prevention

**ALWAYS use parameterized queries:**

```sql
-- DANGEROUS - vulnerable to SQL injection
SELECT * FROM users WHERE username = '" + userInput + "'

-- SAFE - parameterized query
SELECT * FROM users WHERE username = ?
```

```python
# DANGEROUS
cursor.execute(f"SELECT * FROM users WHERE id = {user_id}")

# SAFE
cursor.execute("SELECT * FROM users WHERE id = ?", (user_id,))
```

## XSS Prevention

Escape output based on context:

```javascript
// HTML context
function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// JavaScript context
function escapeJs(unsafe) {
  return JSON.stringify(unsafe).slice(1, -1);
}

// URL context
function escapeUrl(unsafe) {
  return encodeURIComponent(unsafe);
}
```

## File Upload Validation

```python
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif', 'pdf'}
MAX_FILE_SIZE = 5 * 1024 * 1024  # 5MB

def validate_file_upload(file):
    # Check file exists
    if not file or not file.filename:
        raise ValueError("No file provided")
    
    # Check extension
    ext = file.filename.rsplit('.', 1)[1].lower() if '.' in file.filename else ''
    if ext not in ALLOWED_EXTENSIONS:
        raise ValueError(f"File type .{ext} not allowed")
    
    # Check file size
    file.seek(0, 2)  # Seek to end
    size = file.tell()
    file.seek(0)  # Reset
    
    if size > MAX_FILE_SIZE:
        raise ValueError("File exceeds maximum size")
    
    # Verify MIME type matches extension
    import magic
    mime = magic.from_buffer(file.read(1024), mime=True)
    file.seek(0)
    
    allowed_mimes = {
        'png': 'image/png',
        'jpg': 'image/jpeg',
        'jpeg': 'image/jpeg',
        'gif': 'image/gif',
        'pdf': 'application/pdf'
    }
    
    if mime != allowed_mimes.get(ext):
        raise ValueError("File content doesn't match extension")
    
    return True
```

## API Rate Limiting

Implement rate limiting to prevent abuse:

```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests, please try again later',
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/api/', limiter);
```

## Validation Checklist

- [ ] All user inputs are validated
- [ ] Validation happens server-side
- [ ] Length limits are enforced
- [ ] Type checking is performed
- [ ] Range checks for numeric values
- [ ] Format validation (regex patterns)
- [ ] Encoding/escaping for output
- [ ] File uploads are restricted and verified
- [ ] Rate limiting is implemented
- [ ] Error messages don't leak sensitive info

## Common Mistakes to Avoid

1. **Trusting client-side validation alone**
2. **Using denylists instead of allowlists**
3. **Insufficient length checking**
4. **Revealing system details in error messages**
5. **Not validating data from trusted sources**
6. **Concatenating user input into queries**
7. **Forgetting to validate file uploads**
8. **Not implementing rate limiting**

## Testing Your Validation

Test with malicious inputs:

- SQL injection: `' OR '1'='1`
- XSS: `<script>alert('XSS')</script>`
- Path traversal: `../../etc/passwd`
- Command injection: `; rm -rf /`
- Null bytes: `file.txt\0.jpg`
- Extremely long strings
- Special characters: `!@#$%^&*()`
- Unicode characters: `\u0000`, `\uFEFF`

Remember: Input validation is not optional—it's a fundamental security requirement!
