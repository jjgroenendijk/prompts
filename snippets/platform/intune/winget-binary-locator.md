---
type: Playbook
title: Winget Binary Locator
description: Find winget.exe by path, since SYSTEM has no winget on PATH.
tags: [intune, powershell]
status: stable
generated: { by: human:jjgroenendijk, at: 2026-09-23T06:22:13Z }
---

SYSTEM has no `winget` on PATH.
Find `winget.exe` by path.
It is in the `Microsoft.DesktopAppInstaller_*` folders in `WindowsApps`.
Take the highest version from the folder name, not the newest date.
When there is no match, fail.

Example:

```powershell
$folders = "$env:ProgramFiles\WindowsApps\Microsoft.DesktopAppInstaller_*_x64__8wekyb3d8bbwe"
$winget = Get-ChildItem $folders |
    Sort-Object { [version]($_.Name -split '_')[1] } -Descending |
    ForEach-Object { Join-Path $_.FullName 'winget.exe' } |
    Where-Object { Test-Path $_ } | Select-Object -First 1
if (-not $winget) { throw 'winget.exe not found' }
```
