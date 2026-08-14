---
type: Rule
title: File Found Issues
description: Record every issue you find as a GitHub issue, or in the backlog or todo document.
tags: [docs, process]
status: stable
generated: { by: human:jjgroenendijk, at: 2026-08-14T00:00:00+02:00 }
---

When you find an issue, record it before moving on. This covers pre-existing problems you stumble
across as much as ones your own change introduced, and it applies whether or not you intend to fix
it now. An issue you only mention in a reply is lost as soon as the session ends.

When the repo is connected to GitHub, file a GitHub issue. Search the open issues first and add to
the existing one rather than filing a duplicate. When there is no GitHub connection, add a task
file under `docs/backlog/open/` for anything that needs its own work, or a `- [ ]` line in
`docs/todo.md` for something small.

State what is wrong, where it is, and how it shows up, so the entry stands on its own without the
conversation that produced it. Do not silently fix an unrelated problem inside a change about
something else; file it, then decide separately whether to fix it.
