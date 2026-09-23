---
type: Rule
title: Detection Bitness
description: Check OS and process bitness with .NET in detection scripts.
tags: [intune, detection]
status: stable
generated: { by: human:jjgroenendijk, at: 2026-09-23T06:22:13Z }
sources:
  - resource: https://learn.microsoft.com/intune/app-management/deployment/add-win32
---

Intune runs detection scripts as 64-bit by default.
An admin setting can make them 32-bit.
Do not assume the bitness.
Check it with .NET and pick the paths from the result.

Example:

```powershell
$programFiles = $env:ProgramFiles
if ([Environment]::Is64BitOperatingSystem -and -not [Environment]::Is64BitProcess) {
    $programFiles = $env:ProgramW6432
}
$exe = Join-Path $programFiles '7-Zip\7z.exe'
```
