---
type: Playbook
title: Winget Binary Locator
description: Locate the newest winget.exe explicitly, since system context has no winget in PATH.
tags: [intune, powershell]
status: stable
generated: { by: human:jjgroenendijk, at: 2025-12-10T17:25:53+01:00 }
---

Locate the latest winget.exe binary on the system. Required when running in system context where winget isn't in PATH. Sorts by LastWriteTime to get the newest version.

```PowerShell
# Find latest winget.exe in WindowsApps (system context requires explicit path)
$wingetPath = "C:\Program Files\WindowsApps\Microsoft.DesktopAppInstaller_*_8wekyb3d8bbwe"
$winget = (Get-ChildItem -Path $wingetPath -Filter "winget.exe" -Recurse |
           Sort-Object LastWriteTime -Descending |
           Select-Object -First 1).FullName

Write-Output "Using winget at: $winget"
```
