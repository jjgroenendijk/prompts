---
type: Rule
title: Max 250 Lines Per AGENTS.md
description: Cap AGENTS.md at 250 lines; push local detail into a nested AGENTS.md instead.
tags: [agents-md, size]
status: stable
generated: { by: human:jjgroenendijk, at: 2026-06-21T10:20:32+02:00 }
---

Keep each `AGENTS.md` under 250 lines. When it grows past 250, move directory-specific detail into a nested `AGENTS.md` in the right child directory. Leave a short pointer behind. Depth follows the tree, not one big file.
