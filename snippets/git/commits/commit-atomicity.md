---
type: Rule
title: Commit Atomicity
description: One logical change per commit, each independently checkable and green.
tags: [git, commits]
status: stable
generated: { by: human:jjgroenendijk, at: 2026-01-25T22:24:37+00:00 }
---

Each commit must contain one logical change only. Do not mix unrelated changes, refactors with
behavior changes, or formatting with functional changes. Each commit must be independently
checkable and in working state.
