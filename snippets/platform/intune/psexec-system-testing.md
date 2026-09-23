---
type: Playbook
title: PsExec System Testing
description: Test scripts as SYSTEM in 32-bit PowerShell with PsExec.
tags: [intune, testing]
status: stable
generated: { by: human:jjgroenendijk, at: 2026-09-23T06:22:13Z }
sources:
  - resource: https://download.sysinternals.com/files/PSTools.zip
---

Test the scripts as SYSTEM with PsExec from Sysinternals PSTools.
An admin session does not act the same as SYSTEM.
Start 32-bit PowerShell, as Intune does for installs.
Check that `whoami` shows `nt authority\system`.
Run install, detection, uninstall, and detection again.
Check each exit code.

Example:

```powershell
psexec.exe -s -i C:\Windows\SysWOW64\WindowsPowerShell\v1.0\powershell.exe
whoami
.\7-Zip-install.ps1; $LASTEXITCODE
```
