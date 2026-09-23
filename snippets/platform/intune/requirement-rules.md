---
type: Rule
title: Requirement Rules
description: Use requirement rules to keep a Win32 app off devices it does not fit.
tags: [intune, packaging]
status: stable
generated: { by: human:jjgroenendijk, at: 2026-09-23T07:15:50Z }
sources:
  - resource: https://learn.microsoft.com/intune/app-management/deployment/add-win32
---

Use requirement rules to keep an app off devices it does not fit.
Set OS architecture and minimum OS for every app.
Add file, registry, or script rules for prerequisites.
Intune does not install the app on a device that fails a requirement.
A requirement script must exit 0.
Intune then reads its STDOUT as the selected data type and compares it to the set value.
Data types are string, date and time, integer, floating point, version, and boolean.
Write only that one value to STDOUT.
