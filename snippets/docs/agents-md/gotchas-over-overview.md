---
type: Rule
title: Gotchas Over Overview
description: Spend AGENTS.md lines on non-obvious traps, not on facts the agent can discover.
tags: [agents-md, context]
status: draft
generated: { by: human:jjgroenendijk, at: 2026-09-23T07:27:46Z }
sources:
  - resource: https://claude.dev/blog/the-new-rules-of-context-engineering-for-claude-5-generation-models/
---

State the project purpose in one or two lines.
Spend the rest on gotchas: what an agent gets wrong when it reads only the code.
Examples: a type file kept monolithic on purpose, a generated file never edited by hand,
a test that needs a local service, a rule that looks unused but is loaded at runtime.

Do not describe what `ls`, the manifest, or the code already shows.
Do not explain general language or tool knowledge.
For each line, ask: would an agent do the wrong thing without it? If no, delete it.
