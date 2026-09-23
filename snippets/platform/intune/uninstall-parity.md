---
type: Rule
title: Uninstall Parity
description: Each install script has an uninstall script that removes what it added.
tags: [intune, packaging]
status: stable
generated: { by: human:jjgroenendijk, at: 2026-09-23T06:22:13Z }
---

Each install script has an uninstall script.
The uninstall removes what the install added.
Find the product at run time, not by a fixed product code.
When the app is already gone, exit 0.
After uninstall, detection must report not installed.

Example:

```powershell
$app = Get-ItemProperty 'HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall\*' |
    Where-Object DisplayName -Like '7-Zip*' | Select-Object -First 1
if (-not $app) { exit 0 }
$proc = Start-Process msiexec.exe "/x $($app.PSChildName) /qn /norestart" -Wait -PassThru
exit $proc.ExitCode
```
