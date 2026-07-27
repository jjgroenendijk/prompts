---
type: Playbook
title: Registry Detection Key
description: Make an install detectable by writing a registry key only on a zero setup exit code.
tags: [intune, detection]
status: stable
generated: { by: human:jjgroenendijk, at: 2025-12-10T12:51:11+01:00 }
---

The installation of an application has to be detectable by a key in the registry. Intune could detect the presence of an application by checking a registry key.
If the installation of an application is succesful, this would be an example of setting a registry key:

```PowerShell
# Define registry path for setting the registry detection key
$regPath = "HKLM:\Software\$organisation\$applicationName"

if ($($setup.ExitCode) -eq 0) {
    if (-not (Test-Path -Path $regPath)) { New-Item -Path $regPath -Force }
    Set-ItemProperty -Path $regPath -Name "InstallationDate" -Value $currentDateTime -Force
}
```
