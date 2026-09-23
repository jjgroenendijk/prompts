---
type: Rule
title: Detection Output Contract
description: Detection exits 0 and writes STDOUT only when the app is found.
tags: [intune, detection]
status: stable
generated: { by: human:jjgroenendijk, at: 2026-09-23T06:36:14Z }
sources:
  - resource: https://learn.microsoft.com/intune/app-management/deployment/add-win32
---

Intune reads the exit code and STDOUT of a detection script.
Exit 0 with output means installed.
Exit 0 without output means not installed.
A non-zero exit means the script failed.
Write one line only when the app is found.
Keep all other output off STDOUT.
