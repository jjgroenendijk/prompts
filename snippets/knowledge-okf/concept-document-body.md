Write the OKF concept body in structural markdown: headings, lists, tables, code blocks. Favor
structure over freeform prose -> easier for humans to scan and agents to retrieve.

Use these conventional section headings when they fit the concept:

- `# Schema` - structured field or column descriptions.
- `# Examples` - concrete usage examples.
- `# Citations` - external sources supporting claims.

Under `# Citations`, use numbered references. Links may be absolute URLs, bundle-relative paths,
or entries in a `references/` subdir:

```markdown
# Citations

[1] [Source title](https://example.com/doc)
[2] [Internal spec](/specs/billing.md)
```

Keep bodies focused on the single concept the file names. Split unrelated knowledge into separate
concept files and cross-link them.
