---
type: Rule
title: Detection Output Contract
description: A detection script reports installed by exiting 0 with STDOUT, and prints nothing else.
tags: [intune, detection]
status: stable
generated: { by: human:jjgroenendijk, at: 2026-09-23T06:08:56Z }
sources:
  - resource: https://learn.microsoft.com/intune/app-management/deployment/add-win32
---

Intune reads a detection script by its exit code and STDOUT, not by any string it prints:

| Exit code | STDOUT    | Result                                 |
| --------- | --------- | -------------------------------------- |
| 0         | any text  | installed                              |
| 0         | empty     | not installed                          |
| non-zero  | any       | script failed, app counts as not found |

Write one line to STDOUT only when the app is found, and always exit 0. Keep everything else off
STDOUT: no `Write-Output` log lines and no uncaptured pipeline values, since a stray `New-Item`
result reads as "installed". Send diagnostics to a log file. Save the script as UTF-8 with BOM.

Example:

```powershell
$app = Get-ItemProperty -ErrorAction SilentlyContinue -Path @(
    'HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall\*'
    'HKLM:\SOFTWARE\WOW6432Node\Microsoft\Windows\CurrentVersion\Uninstall\*'
) | Where-Object DisplayName -Like '7-Zip*' | Select-Object -First 1

if ($app -and [version]$app.DisplayVersion -ge [version]'24.8') {
    Write-Output "Found 7-Zip $($app.DisplayVersion)"
}
exit 0
```
