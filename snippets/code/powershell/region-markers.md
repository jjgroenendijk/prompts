---
type: Rule
title: Region Markers
description: Structure scripts with #region and #endregion comment markers.
tags: [powershell, style]
status: stable
generated: { by: human:jjgroenendijk, at: 2026-08-05T00:00:00+02:00 }
sources:
  - resource: https://learn.microsoft.com/powershell/module/microsoft.powershell.core/about/about_comments
---

Split a PowerShell script into named sections with `#region <name>` and `#endregion` comments. Both
markers must start at the beginning of a line; the PowerShell ISE and the VS Code PowerShell
extension fold on them. They are plain comments to PowerShell, so they cost nothing at runtime.

```powershell
#region Configuration
$AppName = 'Application-Name'
#endregion

#region Preflight
if (-not (Test-Path $InstallDir)) {
    Write-Output "[ERROR] $InstallDir missing"
    exit 1
}
#endregion

#region Main
Write-Output "[INFO] installing $AppName"
#endregion
```

Every top level section gets a region. Do not nest regions inside a function body.
