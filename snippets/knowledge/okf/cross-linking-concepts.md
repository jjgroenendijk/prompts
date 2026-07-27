---
type: Reference
title: OKF Cross-Linking
description: Express concept relationships as markdown links and tolerate broken ones.
tags: [okf, knowledge]
status: stable
generated: { by: human:jjgroenendijk, at: 2026-07-14T12:19:29+02:00 }
sources:
  - resource: https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md
---

Express relationships between OKF concepts with markdown links. Links form a directed, untyped
graph; the relationship kind (parent/child, references, joins, depends-on) comes from surrounding
prose, not link syntax.

Prefer bundle-relative absolute links -> stable when a file moves between subdirs:

```markdown
[customers table](/tables/customers.md)
```

Plain relative links are also valid for neighbors:

```markdown
[related concept](./other.md)
```

Tolerate broken links. A missing target means incomplete docs, not a malformed bundle. Do not
delete a concept solely because something links to it; do not fail a build on a dangling link.
