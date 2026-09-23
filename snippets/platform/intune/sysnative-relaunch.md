---
type: Playbook
title: Sysnative Relaunch
description: Relaunch install scripts in 64-bit PowerShell and return its exit code.
tags: [intune, powershell]
status: stable
generated: { by: human:jjgroenendijk, at: 2026-09-23T06:22:13Z }
---

Intune starts install and uninstall scripts in 32-bit PowerShell.
On 64-bit Windows, relaunch the script in 64-bit PowerShell through `Sysnative`.
Do it at the top of the script.
Pass on the script parameters, if any.
Wait for the child and exit with its exit code.

Example:

```powershell
if ([Environment]::Is64BitOperatingSystem -and -not [Environment]::Is64BitProcess) {
    $ps = "$env:WINDIR\Sysnative\WindowsPowerShell\v1.0\powershell.exe"
    $arguments = "-ExecutionPolicy Bypass -NoProfile -File `"$PSCommandPath`""
    $child = Start-Process $ps -ArgumentList $arguments -Wait -PassThru -NoNewWindow
    exit $child.ExitCode
}
```
