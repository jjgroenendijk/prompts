---
type: Rule
title: Detection Output Contract
description: Detection exits 0 and writes STDOUT only when the app is found.
tags: [intune, detection]
status: stable
generated: { by: human:jjgroenendijk, at: 2026-09-23T07:15:50Z }
sources:
  - resource: https://learn.microsoft.com/intune/app-management/deployment/add-win32
---

Intune reads the exit code, STDOUT, and STDERR of a detection script.
Exit 0 with output means installed.
Exit 0 without output means not installed.
A non-zero exit means the script failed.
Any STDERR output means not installed, also with exit 0 and STDOUT.
Write one line only when the app is found.
Keep all other output off STDOUT.
Keep errors off STDERR, for example with `-ErrorAction SilentlyContinue`.
Save the script as UTF-8 with BOM.
