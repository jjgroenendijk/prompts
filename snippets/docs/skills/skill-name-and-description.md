---
type: Rule
title: Skill Name and Description
description: Name skills by activity; describe what they do and when to use them, in third person.
tags: [skills, discovery]
status: draft
generated: { by: human:jjgroenendijk, at: 2026-09-23T07:27:46Z }
sources:
  - resource: https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices
---

The agent picks a skill from its `name` and `description` only.
The body loads after that choice, so a weak description hides a good skill.

- `name`: max 64 chars, lowercase letters, digits, and hyphens. No XML tags.
  No reserved words `anthropic` or `claude`. Prefer gerund form: `processing-pdfs`.
  Do not use vague names such as `helper`, `utils`, or `tools`.
- `description`: non-empty, max 1024 chars, no XML tags.
  Say what the skill does, then when to use it, with the key terms a user types:
  "Extracts text and tables from PDF files. Use when the user mentions PDFs or forms."
- Write the description in third person. Not "I can help" and not "You can use this".

Keep one naming pattern across all skills in the project.
