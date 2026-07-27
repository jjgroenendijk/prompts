---
type: Reference
title: OKF Concept Body
description: Write concept bodies in structural markdown using the conventional section headings.
tags: [okf, knowledge]
status: stable
generated: { by: human:jjgroenendijk, at: 2026-07-14T12:19:29+02:00 }
sources:
  - resource: https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md
---

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
