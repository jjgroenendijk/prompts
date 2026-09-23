---
type: Playbook
title: Winget Binary Locator
description: Locate the newest winget.exe explicitly, since system context has no winget in PATH.
tags: [intune, powershell]
status: stable
generated: { by: human:jjgroenendijk, at: 2026-09-23T06:08:56Z }
---

SYSTEM has no `winget` on `PATH`, so resolve `winget.exe` by path. It sits in the root of the
`Microsoft.DesktopAppInstaller_<version>_<arch>__8wekyb3d8bbwe` folders under
`$env:ProgramFiles\WindowsApps`. Match the folder for the OS architecture, `x64` or `arm64`.
Several versions can sit side by side. Parse the version part of each folder name as
`[version]` and take the highest; do not sort by last write time, which changes on repair and
re-provisioning. Log the resolved path, and treat no match as a failure rather than falling back
to a bare `winget` call.

Example:

```powershell
$arch = if ($env:PROCESSOR_ARCHITECTURE -eq 'ARM64') { 'arm64' } else { 'x64' }
$pattern = "Microsoft.DesktopAppInstaller_*_$($arch)__8wekyb3d8bbwe"
$winget = Get-ChildItem "$env:ProgramFiles\WindowsApps" -Directory -Filter $pattern |
    Sort-Object { [version]($_.Name -split '_')[1] } -Descending |
    ForEach-Object { Join-Path $_.FullName 'winget.exe' } |
    Where-Object { Test-Path $_ } | Select-Object -First 1
if (-not $winget) { throw 'winget.exe not found' }
```
