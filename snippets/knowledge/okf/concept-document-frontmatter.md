Each OKF concept is one UTF-8 markdown file with two parts: a YAML frontmatter block, then a
markdown body. Delimit frontmatter with `---` at file start and end.

Required frontmatter field:

- `type` - short string naming the concept category, e.g. `BigQuery Table`, `API Endpoint`,
  `Playbook`. Pick descriptive, self-explanatory values. Types are not registered centrally.

Recommended fields, in priority order:

- `title` - human-readable display name.
- `description` - single-sentence summary.
- `resource` - URI uniquely identifying the underlying asset.
- `tags` - YAML list of cross-cutting categorization strings.
- `timestamp` - ISO 8601 last-modified datetime.

Extra keys are allowed. When editing a doc, preserve unknown keys -> do not drop fields you do
not recognize.

Example:

```markdown
---
type: BigQuery Table
title: Customers
description: One row per customer account with billing status.
resource: bigquery://project/dataset/customers
tags: [billing, pii]
timestamp: 2026-07-14T09:00:00Z
---
```
