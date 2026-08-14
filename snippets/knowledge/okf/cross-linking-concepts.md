---
type: Reference
title: OKF Cross-Linking
description: Express concept relationships as markdown links and tolerate broken ones.
tags: [okf, knowledge]
status: stable
generated: { by: human:jjgroenendijk, at: 2026-08-14T00:00:00+02:00 }
sources:
  - resource: https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md
---

Express relationships between OKF concepts with markdown links. Links form a directed, untyped
graph; the relationship kind (parent/child, references, joins, depends-on) comes from surrounding
prose, not link syntax.

Prefer bundle-relative absolute links, whose target path starts at the bundle root with a leading
slash and names the concept file including its `.md` extension -> stable when a file moves between
subdirs. Plain relative links are also valid for neighbors; write those targets starting with
`./` and resolve them against the linking file's own directory. Use the concept's title as the
link text in both forms.

Tolerate broken links. A missing target means incomplete docs, not a malformed bundle. Do not
delete a concept solely because something links to it; do not fail a build on a dangling link.
