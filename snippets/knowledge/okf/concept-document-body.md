---
type: Reference
title: OKF Concept Body
description: Write concept bodies in structural markdown and attribute claims with keyed footnotes.
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
- `# Computation` - the sanctioned computation of an Attested Computation concept.

Attribute a specific claim with a markdown footnote whose label is a `sources[].id`. The label
is the join key into frontmatter `sources`; consumers resolve attribution through the matching
entry, not by parsing the footnote prose. Keyed labels survive list reordering, positional ones
do not.

```markdown
The `events_` table is sharded daily as `events_YYYYMMDD`.[^ga4-schema]

[^ga4-schema]: GA4 BigQuery Export schema
```

A body `# Citations` list is the v0.1 form, superseded by `sources`. Parse it when reading old
docs; do not write it in new ones.

Keep bodies focused on the single concept the file names. Split unrelated knowledge into separate
concept files and cross-link them.
