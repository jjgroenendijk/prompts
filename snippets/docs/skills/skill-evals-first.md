---
type: Playbook
title: Skill Evals First
description: Write three evaluations and a no-skill baseline before writing the skill body.
tags: [skills, testing, maintenance]
status: draft
generated: { by: human:jjgroenendijk, at: 2026-09-23T07:27:46Z }
sources:
  - resource: https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices
---

Build evaluations before the skill text, so the skill fixes real gaps, not imagined ones.

1. Run the agent on real tasks without the skill. Record each failure.
2. Write at least three evaluation scenarios that hit those failures.
   Each has a query, input files, and the expected behavior.
3. Measure the no-skill baseline.
4. Write the minimum skill text that makes the evaluations pass.
5. Test with a fresh session that has only the skill loaded, on each model you use.
6. Watch how it navigates: files it skips, files it rereads, links it misses.
   Fix structure from those observations, then run the evaluations again.

Keep the evaluations next to the skill. Run them again after each edit to the skill,
and after each model change.
