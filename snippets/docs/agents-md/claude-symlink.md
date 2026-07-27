---
type: Rule
title: CLAUDE.md Symlink
description: Every directory with AGENTS.md also holds CLAUDE.md as a committed symlink to it.
tags: [agents-md, tooling]
status: stable
generated: { by: human:jjgroenendijk, at: 2026-06-21T10:20:32+02:00 }
---

Each directory with an `AGENTS.md` MUST also hold a `CLAUDE.md` symlink to it. Run `ln -s AGENTS.md CLAUDE.md`. Both agents and Claude Code then read one file. Commit the link, never a copy.
