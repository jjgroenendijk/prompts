---
type: Rule
title: No Single Use Functions
description: Inline any function that is called only once.
tags: [powershell, style]
status: stable
generated: { by: human:jjgroenendijk, at: 2026-08-05T00:00:00+02:00 }
---

Never wrap single use code in a function. Inline it at the call site. Define a function only when it
is called twice or more, or exported for reuse.
