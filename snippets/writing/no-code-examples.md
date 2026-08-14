---
type: Rule
title: No Code Examples
description: State a rule in prose instead of showing a sample block to copy.
tags: [writing, formatting]
status: stable
generated: { by: human:jjgroenendijk, at: 2026-08-14T00:00:00+02:00 }
---

NEVER teach a rule with a fenced example block. A sample gets copied verbatim, placeholder names
and all, instead of applied. Describe the required shape in words: name the fields, flags,
ordering, and failure handling the reader must produce, and say what each one is for. Keep
identifiers, paths, and flag names inline in backticks so they stay exact.
