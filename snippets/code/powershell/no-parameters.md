---
type: Rule
title: No Script Parameters
description: Scripts take no parameters; expose settings in a config block at the top instead.
tags: [powershell, style]
status: stable
generated: { by: human:jjgroenendijk, at: 2026-08-05T00:00:00+02:00 }
---

PowerShell scripts must not declare `param()` or accept configurable arguments. Put every tunable
value in a single configuration section at the top of the file.

```powershell
#region Configuration
$AppName    = 'Application-Name'
$InstallDir = 'C:\Program Files\Application-Name'
$LogPath    = 'C:\ProgramData\Application-Name\install.log'
#endregion
```

A script invoked by Intune, a scheduled task, or a detection rule gets no chance to pass arguments,
so a parameter is a value that silently falls back to a default. A config block keeps the effective
settings in one readable place and in version control.
