---
type: Playbook
title: Intune Event Logging
description: Log install and uninstall runs to a file and a Windows event log.
tags: [intune, logging]
status: stable
generated: { by: human:jjgroenendijk, at: 2026-09-23T06:22:13Z }
---

Log install and uninstall scripts to a file and to a Windows event log.
Put the file in the IME log folder.
Name the file after the app, the action, and the date.
Name the event log after the organisation.
Name the event source after the app.
Create the folder and the event source once, at the start.
Log through one function that writes to STDOUT, the file, and the event log.
Detection scripts do not log to STDOUT.

Example:

```powershell
$log = "$env:ProgramData\Microsoft\IntuneManagementExtension\Logs\" +
    "7-Zip-install-$(Get-Date -Format 'yyyy-MM-dd').log"
New-Item -ItemType Directory -Path (Split-Path $log) -Force | Out-Null
if (-not [Diagnostics.EventLog]::SourceExists('7-Zip')) {
    New-EventLog -LogName 'Contoso' -Source '7-Zip'
}
function Write-Log([string]$Message, [string]$Level = 'Information') {
    $line = "$((Get-Date).ToUniversalTime().ToString('s'))Z [$Level] $Message"
    Write-Host $line
    Add-Content -Path $log -Value $line
    Write-EventLog -LogName 'Contoso' -Source '7-Zip' -EntryType $Level -EventId 1000 `
        -Message $Message
}
```
