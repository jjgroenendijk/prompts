---
type: Rule
title: Detection Output Contract
description: Detection exits 0 and writes STDOUT only when the app is found.
tags: [intune, detection]
status: stable
generated: { by: human:jjgroenendijk, at: 2026-09-23T06:22:13Z }
sources:
  - resource: https://learn.microsoft.com/intune/app-management/deployment/add-win32
---

Intune reads the exit code and STDOUT of a detection script.
Exit 0 with output means installed.
Exit 0 without output means not installed.
A non-zero exit means the script failed.
Write one line only when the app is found.
Keep all other output off STDOUT.

Example:

```powershell
$exe = "$env:ProgramFiles\7-Zip\7z.exe"
if ((Test-Path $exe) -and [version](Get-Item $exe).VersionInfo.ProductVersion -ge '24.8') {
    Write-Output 'Found 7-Zip'
}
exit 0
```
