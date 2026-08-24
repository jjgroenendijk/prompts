---
type: Rule
title: Strict Linting
description: Strictest ruleset, warnings as errors, every inline suppression justified.
tags: [quality, lint]
status: stable
generated: { by: human:jjgroenendijk, at: 2026-06-21T10:25:16+02:00 }
---

Linting MUST be very strict. Enable the strictest available ruleset for every linter, treat all
warnings as errors, and do not disable or downgrade rules to make code pass. Fix the underlying
issue instead. Inline suppressions are a last resort: each one needs a specific rule code and a
comment explaining why. A build with any lint violation MUST fail.
