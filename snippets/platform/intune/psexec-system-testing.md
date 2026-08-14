---
type: Playbook
title: PSExec System Testing
description: Test in 32-bit system context with PSExec, since admin context is not representative.
tags: [intune, testing]
status: stable
generated: { by: human:jjgroenendijk, at: 2026-08-14T00:00:00+02:00 }
---

Test Intune scripts in system context using PSExec. Intune executes Win32 packages in system context and 32-bit mode, so testing as admin is not representative.

Launch the 32-bit host by running `psexec.exe` with its system and interactive switches against `powershell.exe` under the `SysWOW64` PowerShell path. In the shell that opens, confirm the context with `whoami`; it must report `nt authority\system` before the test means anything. Then change to the directory holding the package scripts and run the install script from there.

Logs will be written to `C:\ProgramData\Microsoft\IntuneManagementExtension\Logs` when using standard logging patterns.
