---
type: Rule
title: Uninstall Parity
description: Every install script has an uninstall script that removes what the install added.
tags: [intune, packaging]
status: stable
generated: { by: human:jjgroenendijk, at: 2026-09-23T06:08:56Z }
---

Ship an uninstall script with every install script. It removes everything the install added
machine-wide: the app, services, scheduled tasks, shortcuts, files, and registry keys. Leave user
data unless the user asks for its removal. Find the installed product at run time from its
uninstall entry, not from a hard-coded product code, so the script also removes older versions.
When the app is already absent, exit 0. Test the pair: after uninstall, the detection script must
report not installed.

Example:

```powershell
$app = Get-ItemProperty 'HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall\*' |
    Where-Object DisplayName -Like '7-Zip*' | Select-Object -First 1
if (-not $app) { exit 0 }

$arguments = "/x $($app.PSChildName) /qn /norestart"
$proc = Start-Process msiexec.exe -ArgumentList $arguments -Wait -PassThru
exit $proc.ExitCode
```
