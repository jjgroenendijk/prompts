---
type: Rule
title: Backlog Task Files
description: Track tasks as files moving through docs/backlog/ open, pending-review, and done.
tags: [docs, process]
status: stable
generated: { by: human:jjgroenendijk, at: 2026-01-22T15:35:31+01:00 }
---

Tasks are tracked as markdown files in `docs/backlog/` with the naming convention
`<index>_<task-slug>.md`:

- `docs/backlog/open/` - Open tasks awaiting work
- `docs/backlog/pending-review/` - Completed tasks awaiting review
- `docs/backlog/done/` - Completed and reviewed tasks

Move task files between directories as their status changes.
