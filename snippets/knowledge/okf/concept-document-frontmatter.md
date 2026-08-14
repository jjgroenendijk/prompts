---
type: Reference
title: OKF Concept Frontmatter
description: Required and recommended frontmatter fields on an OKF concept document.
tags: [okf, knowledge]
status: stable
generated: { by: human:jjgroenendijk, at: 2026-08-14T00:00:00+02:00 }
sources:
  - resource: https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md
---

Each OKF concept is one UTF-8 markdown file with two parts: a YAML frontmatter block, then a
markdown body. Delimit frontmatter with `---` at file start and end.

Required frontmatter field:

- `type` - short string naming the concept category, e.g. `BigQuery Table`, `API Endpoint`,
  `Playbook`. Pick descriptive, self-explanatory values. Types are not registered centrally.

A concept carrying only `type` is fully conformant.

Recommended fields, in priority order:

- `title` - human-readable display name. Absent -> derive from filename.
- `description` - single-sentence summary. Feeds index entries, search, previews.
- `resource` - URI uniquely identifying the underlying asset. Absent for abstract concepts.
- `tags` - YAML list of cross-cutting categorization strings.

Optional provenance, trust, and lifecycle families layer on top: `sources`, `generated`,
`verified`, `status`, `stale_after`.

Write the keys in priority order: `type`, `title`, `description`, `resource`, `tags`, `status`,
then the provenance fields. Keep `tags` an inline flow list and `generated` an inline flow mapping
of `by` and `at`, so the block stays scannable.

Extra keys are allowed. When editing a doc, preserve unknown keys -> do not drop fields you do
not recognize.

`timestamp` is a v0.1 field superseded by `generated.at`. Read it as a fallback when
`generated` is absent; do not write it in new docs.
