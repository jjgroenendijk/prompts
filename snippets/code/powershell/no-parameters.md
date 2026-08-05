---
type: Rule
title: No Script Parameters
description: Scripts take no parameters; expose settings in a config block at the top instead.
tags: [powershell, style]
status: stable
generated: { by: human:jjgroenendijk, at: 2026-08-05T00:00:00+02:00 }
---

Never declare `param()` or accept configurable arguments. Put every tunable value in one
configuration section at the top of the script.
