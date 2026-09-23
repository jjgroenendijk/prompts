---
type: Rule
title: Evidence Based Detection
description: Detect what the app leaves behind, not a marker the script wrote.
tags: [intune, detection]
status: stable
generated: { by: human:jjgroenendijk, at: 2026-09-23T06:22:13Z }
---

Detect the app by what it leaves behind.
Use its uninstall entry, file version, or service.
Do not detect a registry key that the install script wrote.
That key only proves that the script ran.
Include the version, so an old install fails detection.

Example:

```powershell
# Wrong: marker written by the install script
Test-Path 'HKLM:\SOFTWARE\Contoso\7-Zip'
# Right: file and version of the app
(Get-Item "$env:ProgramFiles\7-Zip\7z.exe").VersionInfo.ProductVersion
```
