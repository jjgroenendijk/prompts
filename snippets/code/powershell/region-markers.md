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

Split every script into named sections with `#region <name>` and `#endregion` comments at the start
of a line. The PowerShell ISE and the VS Code PowerShell extension fold on them.
