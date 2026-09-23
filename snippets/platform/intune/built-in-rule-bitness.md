---
type: Rule
title: Built-In Rule Bitness
description: Set the 32-bit toggle on file and registry rules to match the app's bitness.
tags: [intune, detection]
status: stable
generated: { by: human:jjgroenendijk, at: 2026-09-23T07:15:50Z }
sources:
  - resource: https://learn.microsoft.com/intune/app-management/deployment/add-win32
---

Built-in file and registry rules have the setting "Associated with a 32-bit app on 64-bit clients".
It applies to detection rules and requirement rules.
No is the default: the rule reads the 64-bit registry and 64-bit path variables.
Yes makes the rule read the 32-bit registry and 32-bit path variables.
Set Yes only for a 32-bit app on 64-bit Windows.
32-bit Windows always uses the 32-bit view.
