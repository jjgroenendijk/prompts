---
type: Rule
title: No Single Use Functions
description: Inline any function that is called only once.
tags: [powershell, style]
status: stable
generated: { by: human:jjgroenendijk, at: 2026-08-05T00:00:00+02:00 }
---

A function that is called exactly once must not be a function. Inline its body at the call site.

Define a function only when it is called from two or more places, or when it is exported for reuse
by another script or module.

A single use function splits a linear script into a jump the reader has to chase, hides control flow
behind a name, and adds a scope boundary for no gain. Inlining keeps the script flat and sequential.
