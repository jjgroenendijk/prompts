---
type: Rule
title: Return Installer Exit Codes
description: Install scripts exit with the installer's own code so Intune can retry or reboot.
tags: [intune, packaging]
status: stable
generated: { by: human:jjgroenendijk, at: 2026-09-23T06:08:56Z }
sources:
  - resource: https://learn.microsoft.com/intune/app-management/deployment/add-win32
---

Intune decides success, retry, and reboot from the install command's exit code, so the script
must exit with the installer's real code. Never end with a bare `exit 0` after a setup call. Pass
the setup's no-restart switch and let the return code ask for the reboot, so Intune can apply
the app's restart behaviour and grace period.

Intune's default return code table:

| Code | Type        | Meaning                                         |
| ---- | ----------- | ----------------------------------------------- |
| 0    | Success     | installed                                       |
| 1707 | Success     | installed (MSI)                                 |
| 3010 | Soft reboot | installed, restart needed to finish             |
| 1641 | Hard reboot | installed, restart started or required now      |
| 1618 | Retry       | another MSI install running; 3 tries, 5 min gap |

Add vendor-specific codes to the app's return code table in Intune instead of translating them
in the script.

Example:

```powershell
$msi = Join-Path $PSScriptRoot '7z2408-x64.msi'
$arguments = "/i `"$msi`" /qn /norestart"
$proc = Start-Process msiexec.exe -ArgumentList $arguments -Wait -PassThru
exit $proc.ExitCode
```
