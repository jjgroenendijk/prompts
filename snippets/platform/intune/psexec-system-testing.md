---
type: Playbook
title: PSExec System Testing
description: Test in 32-bit system context with PSExec, since admin context is not representative.
tags: [intune, testing]
status: stable
generated: { by: human:jjgroenendijk, at: 2025-12-10T17:25:53+01:00 }
---

Test Intune scripts in system context using PSExec. Intune executes Win32 packages in system context and 32-bit mode, so testing as admin is not representative.

**Launch 32-bit PowerShell in system context:**
```powershell
psexec.exe -s -i "C:\Windows\SysWOW64\WindowsPowerShell\v1.0\powershell.exe"
```

**Verify you're in system context:**
```powershell
whoami
# Should output: nt authority\system
```

**Test your script:**
```powershell
cd "C:\path\to\your\scripts"
.\application-install.ps1
```

Logs will be written to `C:\ProgramData\Microsoft\IntuneManagementExtension\Logs` when using standard logging patterns.
