# Code Review Checklist

A comprehensive checklist for conducting thorough and effective code reviews.

## General

- [ ] Code serves a clear purpose and solves the intended problem
- [ ] Changes align with project requirements and specifications
- [ ] No unnecessary or unused code
- [ ] No commented-out code blocks
- [ ] No debug statements or console logs left in production code

## Code Quality

- [ ] Code is readable and easy to understand
- [ ] Functions are small and focused (single responsibility)
- [ ] Code follows DRY principle (Don't Repeat Yourself)
- [ ] Complex logic is broken down into smaller functions
- [ ] Magic numbers replaced with named constants
- [ ] No overly clever or obscure code

## Naming

- [ ] Variables have clear, descriptive names
- [ ] Functions have verb-based names that describe actions
- [ ] Classes use noun-based names
- [ ] Boolean variables use is/has/can/should prefixes
- [ ] Names follow project conventions (camelCase, snake_case, etc.)
- [ ] No single-letter variables except loop counters

## Error Handling

- [ ] All error cases are handled appropriately
- [ ] Errors include helpful messages
- [ ] Resources are cleaned up in finally blocks
- [ ] No empty catch blocks
- [ ] Errors are logged with sufficient context
- [ ] User-facing error messages are clear and actionable

## Security

- [ ] No hardcoded credentials or secrets
- [ ] User input is validated and sanitized
- [ ] SQL queries use parameterized statements
- [ ] Authentication and authorization are properly implemented
- [ ] Sensitive data is encrypted
- [ ] HTTPS is used for all external requests
- [ ] CSRF protection is in place
- [ ] Rate limiting is implemented where needed

## Performance

- [ ] No unnecessary database queries
- [ ] Queries are optimized and use proper indexes
- [ ] No N+1 query problems
- [ ] Large datasets are paginated
- [ ] Expensive operations are cached when appropriate
- [ ] No infinite loops or recursion without base case
- [ ] Appropriate data structures are used

## Testing

- [ ] New code has adequate test coverage
- [ ] Tests are clear and well-named
- [ ] Edge cases are tested
- [ ] Tests are independent and can run in any order
- [ ] Mocks and stubs are used appropriately
- [ ] All tests pass
- [ ] Integration tests cover critical paths

## Documentation

- [ ] Public APIs have clear documentation
- [ ] Complex algorithms are explained
- [ ] Non-obvious decisions are justified with comments
- [ ] README is updated if needed
- [ ] API documentation is updated
- [ ] Breaking changes are clearly documented

## Database

- [ ] Migrations are reversible
- [ ] Indexes are added for frequently queried columns
- [ ] Foreign key constraints are properly defined
- [ ] No N+1 queries
- [ ] Transactions are used for multi-step operations
- [ ] Database connections are properly closed

## API Design

- [ ] RESTful conventions are followed
- [ ] Endpoints use appropriate HTTP methods
- [ ] Status codes are correct and meaningful
- [ ] Request/response schemas are validated
- [ ] API versioning is considered
- [ ] Pagination is implemented for lists
- [ ] Rate limiting is in place

## Dependencies

- [ ] No unnecessary dependencies added
- [ ] Dependencies are at stable versions
- [ ] License compatibility is verified
- [ ] Dependencies are actively maintained
- [ ] Security vulnerabilities are checked

## Git Practices

- [ ] Commit messages are clear and descriptive
- [ ] Commits are atomic and focused
- [ ] No large files committed
- [ ] No sensitive data in commit history
- [ ] Branch naming follows conventions

## Code Style

- [ ] Code follows project style guide
- [ ] Indentation is consistent
- [ ] Line length is within limits
- [ ] Linter passes without warnings
- [ ] Formatting is consistent

## Specific Language Checks

### JavaScript/TypeScript

- [ ] === used instead of ==
- [ ] Promises are properly handled
- [ ] async/await used correctly
- [ ] TypeScript types are properly defined
- [ ] No 'any' types unless justified
- [ ] Null/undefined checks are in place

### Python

- [ ] Follows PEP 8 style guide
- [ ] Type hints are used
- [ ] Context managers used for resources
- [ ] List comprehensions used appropriately
- [ ] F-strings used for formatting

### Java

- [ ] Proper exception handling
- [ ] Resources closed in finally or try-with-resources
- [ ] Proper use of access modifiers
- [ ] Immutability used where appropriate
- [ ] Generics used correctly

## Review Process

### Before Reviewing

1. Understand the context and requirements
2. Check the ticket/issue description
3. Review the overall approach before details

### During Review

1. Start with architecture and design
2. Check for security issues
3. Look for performance problems
4. Verify error handling
5. Check test coverage
6. Review code style last

### Providing Feedback

- [ ] Comments are constructive and specific
- [ ] Suggestions include reasoning
- [ ] Praise good solutions
- [ ] Distinguish between required and optional changes
- [ ] Ask questions instead of making demands
- [ ] Provide code examples for complex suggestions

## Common Issues to Watch For

### Logic Errors

```javascript
// Bad: Off-by-one error
for (let i = 0; i <= array.length; i++) {
  console.log(array[i]); // Will error on last iteration
}

// Good
for (let i = 0; i < array.length; i++) {
  console.log(array[i]);
}
```

### Resource Leaks

```python
# Bad: File not closed on error
file = open('data.txt', 'r')
data = process(file.read())
file.close()

# Good: Context manager ensures cleanup
with open('data.txt', 'r') as file:
    data = process(file.read())
```

### Race Conditions

```javascript
// Bad: Race condition
if (!cache.has(key)) {
  cache.set(key, await fetchData(key));
}

// Good: Atomic operation
if (!cache.has(key)) {
  const data = await fetchData(key);
  if (!cache.has(key)) {  // Double-check
    cache.set(key, data);
  }
}
```

### SQL Injection

```python
# Bad: SQL injection vulnerability
query = f"SELECT * FROM users WHERE username = '{username}'"

# Good: Parameterized query
query = "SELECT * FROM users WHERE username = ?"
cursor.execute(query, (username,))
```

## Review Etiquette

### Do

- Be respectful and professional
- Focus on the code, not the person
- Explain why something should change
- Ask questions to understand intent
- Acknowledge good work
- Be timely with reviews

### Don't

- Be condescending or dismissive
- Make personal attacks
- Nitpick trivial style issues
- Block on personal preferences
- Rewrite entire implementations in comments
- Let reviews sit for days

## Final Checklist

Before approving:

- [ ] All comments addressed or discussed
- [ ] Tests pass in CI/CD
- [ ] No merge conflicts
- [ ] Documentation updated
- [ ] Ready for production deployment

Remember: Code reviews are about collaboration and learning, not gatekeeping!
