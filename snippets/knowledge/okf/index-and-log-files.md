---
type: Reference
title: OKF Index And Log Files
description: The reserved index.md and log.md filenames and the structure each one follows.
tags: [okf, knowledge]
status: stable
generated: { by: human:jjgroenendijk, at: 2026-08-14T00:00:00+02:00 }
sources:
  - resource: https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md
---

OKF reserves two filenames inside a knowledge bundle. Every other `.md` file is a concept
document.

`index.md` - optional directory listing for progressive disclosure. Contains no frontmatter. Open
with a heading naming the directory, then one bullet per concept: a markdown link carrying the
concept title, a space-hyphen-space, and the concept's own `description`. Group under further
headings when one listing covers several kinds.

Exception: the root `index.md` may carry a frontmatter block solely to declare the target spec
version, holding `okf_version` as its only key with the version as a quoted string.

`log.md` - optional chronological update history, newest first, grouped by ISO 8601 date. Use a
second-level heading per day holding the `YYYY-MM-DD` date, then one bullet per change. Start each
bullet with a bold prefix naming the change kind, `Creation` or `Update`, followed by a colon and
one sentence describing it.

Add an `index.md` when a directory holds enough concepts that a listing aids navigation. Add a
`log.md` when history and attribution matter. Generate both -> stale listings are a defect.
