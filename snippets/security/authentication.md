# Authentication Best Practices

Secure authentication is critical for protecting user accounts and sensitive data.

## Password Security

### Password Hashing

**NEVER store passwords in plain text.** Always use modern hashing algorithms:

```python
import bcrypt

# Hashing a password
def hash_password(password):
    salt = bcrypt.gensalt(rounds=12)
    return bcrypt.hashpw(password.encode('utf-8'), salt)

# Verifying a password
def verify_password(password, hashed):
    return bcrypt.checkpw(password.encode('utf-8'), hashed)
```

```javascript
const bcrypt = require('bcrypt');

async function hashPassword(password) {
  const saltRounds = 12;
  return await bcrypt.hash(password, saltRounds);
}

async function verifyPassword(password, hash) {
  return await bcrypt.compare(password, hash);
}
```

### Password Requirements

Enforce strong password policies:

```python
import re

def validate_password_strength(password):
    """Validate password meets security requirements."""
    errors = []
    
    if len(password) < 12:
        errors.append("Password must be at least 12 characters")
    
    if len(password) > 128:
        errors.append("Password must not exceed 128 characters")
    
    if not re.search(r'[a-z]', password):
        errors.append("Password must contain lowercase letters")
    
    if not re.search(r'[A-Z]', password):
        errors.append("Password must contain uppercase letters")
    
    if not re.search(r'\d', password):
        errors.append("Password must contain numbers")
    
    if not re.search(r'[!@#$%^&*(),.?":{}|<>]', password):
        errors.append("Password must contain special characters")
    
    # Check against common passwords
    with open('common_passwords.txt') as f:
        if password.lower() in [line.strip().lower() for line in f]:
            errors.append("Password is too common")
    
    return errors
```

## Session Management

### Secure Session Configuration

```javascript
const session = require('express-session');

app.use(session({
  secret: process.env.SESSION_SECRET, // Strong, random secret
  name: 'sessionId', // Don't use default name
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: true, // HTTPS only
    httpOnly: true, // Prevent XSS access
    sameSite: 'strict', // CSRF protection
    maxAge: 3600000 // 1 hour
  }
}));
```

### Session Timeout

Implement automatic session expiration:

```python
from datetime import datetime, timedelta

class SessionManager:
    def __init__(self):
        self.sessions = {}
        self.timeout = timedelta(minutes=30)
    
    def create_session(self, user_id):
        session_id = secrets.token_urlsafe(32)
        self.sessions[session_id] = {
            'user_id': user_id,
            'created_at': datetime.now(),
            'last_activity': datetime.now()
        }
        return session_id
    
    def validate_session(self, session_id):
        if session_id not in self.sessions:
            return None
        
        session = self.sessions[session_id]
        if datetime.now() - session['last_activity'] > self.timeout:
            del self.sessions[session_id]
            return None
        
        session['last_activity'] = datetime.now()
        return session['user_id']
```

## Multi-Factor Authentication (MFA)

### TOTP Implementation

```python
import pyotp
import qrcode

def setup_mfa(user_email):
    """Generate MFA secret and QR code."""
    secret = pyotp.random_base32()
    
    # Generate provisioning URI
    totp = pyotp.TOTP(secret)
    uri = totp.provisioning_uri(
        name=user_email,
        issuer_name='YourApp'
    )
    
    # Generate QR code
    qr = qrcode.make(uri)
    
    return secret, qr

def verify_mfa_code(secret, code):
    """Verify TOTP code."""
    totp = pyotp.TOTP(secret)
    return totp.verify(code, valid_window=1)
```

## JWT Token Security

```javascript
const jwt = require('jsonwebtoken');

function generateToken(userId) {
  return jwt.sign(
    { userId: userId },
    process.env.JWT_SECRET,
    {
      expiresIn: '1h',
      algorithm: 'HS256',
      issuer: 'your-app',
      audience: 'your-app-users'
    }
  );
}

function verifyToken(token) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET, {
      algorithms: ['HS256'],
      issuer: 'your-app',
      audience: 'your-app-users'
    });
  } catch (error) {
    return null;
  }
}
```

## OAuth 2.0 Implementation

```python
from authlib.integrations.flask_client import OAuth

oauth = OAuth(app)

oauth.register(
    name='google',
    client_id=os.getenv('GOOGLE_CLIENT_ID'),
    client_secret=os.getenv('GOOGLE_CLIENT_SECRET'),
    server_metadata_url='https://accounts.google.com/.well-known/openid-configuration',
    client_kwargs={'scope': 'openid email profile'}
)

@app.route('/login/google')
def google_login():
    redirect_uri = url_for('google_callback', _external=True)
    return oauth.google.authorize_redirect(redirect_uri)

@app.route('/callback/google')
def google_callback():
    token = oauth.google.authorize_access_token()
    user_info = oauth.google.parse_id_token(token)
    # Create or update user session
    return redirect('/dashboard')
```

## Brute Force Protection

```python
from datetime import datetime, timedelta
from collections import defaultdict

class LoginAttemptTracker:
    def __init__(self):
        self.attempts = defaultdict(list)
        self.max_attempts = 5
        self.lockout_duration = timedelta(minutes=15)
    
    def is_locked(self, identifier):
        """Check if account/IP is locked."""
        if identifier not in self.attempts:
            return False
        
        # Clean old attempts
        cutoff = datetime.now() - self.lockout_duration
        self.attempts[identifier] = [
            attempt for attempt in self.attempts[identifier]
            if attempt > cutoff
        ]
        
        return len(self.attempts[identifier]) >= self.max_attempts
    
    def record_attempt(self, identifier, success):
        """Record login attempt."""
        if success:
            # Clear attempts on success
            self.attempts[identifier] = []
        else:
            self.attempts[identifier].append(datetime.now())
```

## Security Checklist

- [ ] Passwords are hashed with bcrypt/argon2
- [ ] Strong password requirements enforced
- [ ] MFA is available
- [ ] Sessions expire after inactivity
- [ ] HTTPS is enforced
- [ ] Cookies are secure and httpOnly
- [ ] CSRF protection is enabled
- [ ] Brute force protection implemented
- [ ] Account lockout after failed attempts
- [ ] Password reset tokens expire
- [ ] Secure password reset flow
- [ ] No sensitive data in URLs

## Common Vulnerabilities

1. **Weak passwords** - Enforce complexity requirements
2. **Session fixation** - Regenerate session ID after login
3. **Missing MFA** - Offer two-factor authentication
4. **Insecure password reset** - Use secure tokens, verify identity
5. **No account lockout** - Implement brute force protection
6. **Plaintext passwords** - Always hash passwords
7. **Predictable tokens** - Use cryptographically secure random generators

Remember: Authentication is the gateway to your application—get it right!
