---
type: Rule
title: Low Nesting Depth
description: Keep nesting shallow; use early exits and guard clauses instead of nested blocks.
tags: [quality, style]
status: stable
generated: { by: human:jjgroenendijk, at: 2026-08-24T00:00:00+02:00 }
---

Keep the nesting depth of every function as low as it will go. Handle each failing or
uninteresting case first with a guard clause that returns, throws, or continues, so the body
that follows is the normal path at the outermost level.

Prefer flat, sequential code to blocks inside blocks. When a branch grows a branch, invert the
condition, extract the inner work, or split the loop, rather than indenting further. Deep
nesting hides the exit paths and makes each added condition harder to reason about than the
last.
