---
type: Rule
title: Judgment Over Constraints
description: Give the goal and the reason; keep hard MUST rules for fragile, high-risk areas.
tags: [agents-md, skills, context]
status: draft
generated: { by: human:jjgroenendijk, at: 2026-09-23T07:27:46Z }
sources:
  - resource: https://claude.dev/blog/the-new-rules-of-context-engineering-for-claude-5-generation-models/
  - resource: https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices
---

Write instructions as context and intent, not as a list of prohibitions.
Give the reason with each rule so the agent can apply it to cases the rule does not name.
Prefer "match the comment density, naming, and idiom of the surrounding code" over
"do not add comments".

Match strictness to risk:

- Open task, many valid paths: state the goal and let the agent choose.
- Preferred pattern, some variation fine: give a default and an escape hatch.
- Fragile or irreversible step (migration, release, deletion): give the exact command.

Stacked constraints conflict. The agent then spends effort on the conflict, not the task.
When a rule and a newer rule disagree, remove one; do not add a third to settle it.
