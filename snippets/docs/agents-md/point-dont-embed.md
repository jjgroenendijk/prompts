---
type: Rule
title: Point, Do Not Embed
description: Link to skills, scripts, tests, and specs instead of copying procedures into AGENTS.md.
tags: [agents-md, skills, context]
status: draft
generated: { by: human:jjgroenendijk, at: 2026-09-23T07:27:46Z }
sources:
  - resource: https://claude.dev/blog/the-new-rules-of-context-engineering-for-claude-5-generation-models/
---

`AGENTS.md` loads on every task. Put only always-relevant guidance in it.
Move procedures used on some tasks (release, migration, verification) into a skill or doc.
Leave one line that names the file and says when to read it.

Prefer code as the reference: a test suite, a schema, a script, or an example file.
Code is exact and stays checked; prose about code drifts.
Say whether the agent must run a script or read it:
"Run `pnpm check:okf`" versus "See `scripts/check-okf.mjs` for the frontmatter rules".
