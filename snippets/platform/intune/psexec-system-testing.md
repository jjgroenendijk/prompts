---
type: Playbook
title: PsExec System Testing
description: Test in 32-bit system context with PsExec, since admin context is not representative.
tags: [intune, testing]
status: stable
generated: { by: human:jjgroenendijk, at: 2026-09-23T06:08:56Z }
sources:
  - resource: https://download.sysinternals.com/files/PSTools.zip
---

Test Intune scripts in system context using PsExec from the Sysinternals PSTools suite,
<https://download.sysinternals.com/files/PSTools.zip>. Intune executes Win32 packages in system
context and 32-bit mode, so testing as admin is not representative.

Launch the 32-bit host by running `psexec.exe` with its system and interactive switches against
`powershell.exe` under the `SysWOW64` PowerShell path. In the shell that opens, confirm the
context with `whoami`; it must report `nt authority\system` before the test means anything. Then
change to the directory holding the package scripts and run the install script from there.
Then run the detection script, the uninstall script, and the detection script again, and check
each exit code. Detection runs 64-bit in Intune, so start it from the native `System32`
PowerShell.

Logs will be written to `C:\ProgramData\Microsoft\IntuneManagementExtension\Logs` when using
standard logging patterns.
