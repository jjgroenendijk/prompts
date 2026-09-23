---
type: Rule
title: Evidence Based Detection
description: Detect on evidence the app itself leaves, not a marker the install script wrote.
tags: [intune, detection]
status: stable
generated: { by: human:jjgroenendijk, at: 2026-09-23T06:08:56Z }
---

Never detect a Win32 app by a registry key the install script wrote; that only proves the script
ran. Install the application once, find the evidence it leaves behind, such as its uninstall entry,
product code, installed file path, file version, or service, and detect on that. Include the version
so an outdated install fails detection.

Example:

```powershell
# Wrong: proves only that the install script ran
$found = Test-Path 'HKLM:\SOFTWARE\Contoso\Packages\7-Zip'

# Right: evidence 7-Zip itself leaves, version included
$exe = "$env:ProgramFiles\7-Zip\7z.exe"
$found = (Test-Path $exe) -and
    ([version](Get-Item $exe).VersionInfo.ProductVersion -ge [version]'24.8')
```
