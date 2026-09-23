---
type: Rule
title: Return Installer Exit Codes
description: Exit with the installer's exit code so Intune can retry or reboot.
tags: [intune, packaging]
status: stable
generated: { by: human:jjgroenendijk, at: 2026-09-23T06:22:13Z }
sources:
  - resource: https://learn.microsoft.com/intune/app-management/deployment/add-win32
---

Exit install and uninstall scripts with the installer's exit code.
Intune uses it for success, retry, and reboot.
Do not end with `exit 0` after the installer runs.
Use the installer's no-restart switch.
Let the exit code ask for the reboot.
Intune defaults: 0 and 1707 success, 3010 soft reboot, 1641 hard reboot, 1618 retry.

Example:

```powershell
$arguments = "/i `"$PSScriptRoot\7z2408-x64.msi`" /qn /norestart"
$proc = Start-Process msiexec.exe -ArgumentList $arguments -Wait -PassThru
exit $proc.ExitCode
```
