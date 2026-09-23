---
type: Rule
title: Skill Content Hygiene
description: Write only what the agent lacks, with one term per concept and no dated text.
tags: [skills, writing, maintenance]
status: draft
generated: { by: human:jjgroenendijk, at: 2026-09-23T07:27:46Z }
sources:
  - resource: https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices
  - resource: https://claude.dev/blog/the-new-rules-of-context-engineering-for-claude-5-generation-models/
---

Assume the agent is already capable. Add only project facts, team opinions, and traps.
For each paragraph, ask: does it justify its token cost?

- Give one default tool or approach, plus an escape hatch for the known exception.
  Do not list five equal options.
- Use one term per concept across the skill. Do not mix "field", "box", and "control".
- Do not write "before 2026-08, use X". Put the current method in the main text and
  move legacy methods into an "Old patterns" section.
- Use examples only where output format depends on them. Examples narrow exploration.
- Name MCP tools fully: `ServerName:tool_name`.
- List required packages. Do not assume they are installed.
