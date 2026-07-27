---
type: Rule
title: Conventional Commits
description: "Use type(scope?): subject, with allowed types and explicit breaking-change markers."
tags: [git, commits]
status: stable
generated: { by: human:jjgroenendijk, at: 2026-01-25T22:24:37+00:00 }
---

Use Conventional Commits format: `type(scope?): subject`

Allowed types: `feat, fix, docs, refactor, test, perf, build, ci, chore, style, revert`

Breaking changes: use `type(scope)!: subject` OR `BREAKING CHANGE: ...` footer with migration steps.
