---
type: Rule
title: Skill Progressive Disclosure
description: Keep SKILL.md under 500 lines and link reference files one level deep.
tags: [skills, size, structure]
status: draft
generated: { by: human:jjgroenendijk, at: 2026-09-23T07:27:46Z }
sources:
  - resource: https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices
---

Keep the `SKILL.md` body under 500 lines. It is an overview that points to detail.
Move detail into reference files named by content, such as `reference/finance.md`.
Split by domain so a task loads only the file it needs.

Link every reference file directly from `SKILL.md`.
Do not chain references: the agent may only preview a file it reaches through another file.
Start each reference file longer than 100 lines with a table of contents.

Put deterministic work in scripts. The agent runs the script; only its output uses context.
State whether the agent must run a script or read it.
Use forward slashes in all paths.
