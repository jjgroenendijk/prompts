---
type: Rule
title: Commit Body Sections
description: Non-trivial commits carry Context, Change, Rationale, Impact/Risk, Tests.
tags: [git, commits]
status: stable
generated: { by: human:jjgroenendijk, at: 2026-01-25T22:24:37+00:00 }
---

Required Commit Body Sections for non-trivial commits:

- Context: What problem/need triggered this
- Change: High-level summary of what changed
- Rationale: Why this approach, trade-offs, alternatives rejected
- Impact/Risk: Behavior changes, migrations, compatibility, performance
- Tests: Exact command(s) run (e.g., `Tests: cd src && uv run pytest tests/`)
