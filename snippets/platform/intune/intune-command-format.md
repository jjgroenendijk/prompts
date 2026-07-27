---
type: Rule
title: Intune Command Format
description: Run install and uninstall commands with ExecutionPolicy Bypass and NoProfile.
tags: [intune, packaging]
status: stable
generated: { by: human:jjgroenendijk, at: 2025-12-10T17:25:53+01:00 }
---

Standard PowerShell command format for Intune Win32 app install and uninstall commands. Use ExecutionPolicy Bypass and NoProfile for reliability.

**Install command:**
```
PowerShell.exe -ExecutionPolicy Bypass -NoProfile -File "application-install.ps1"
```

**Uninstall command:**
```
PowerShell.exe -ExecutionPolicy Bypass -NoProfile -File "application-uninstall.ps1"
```

**With parameters (e.g., for Winget template):**
```
PowerShell.exe -ExecutionPolicy Bypass -NoProfile -File "winget-setup.ps1" -action install -wingetpkg "7zip.7zip"
```
