---
type: Rule
title: Quality Gates
description: Run tests before every commit and keep shared branches free of failing commits.
tags: [git, workflow]
status: stable
generated: { by: human:jjgroenendijk, at: 2026-01-25T22:24:37+00:00 }
---

MUST run tests before every commit (minimum: fast suite or targeted tests for changed area).
EACH COMMIT MUST KEEP REPO GREEN: build passes, tests pass. Failing commits are forbidden on
shared branches. Intermediate failing steps must stay local and be squashed before PR/merge.
