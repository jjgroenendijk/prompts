---
type: Playbook
title: Sysnative Relaunch
description: Relaunch 32-bit IME scripts through Sysnative and return the child's exit code.
tags: [intune, powershell]
status: stable
generated: { by: human:jjgroenendijk, at: 2026-09-23T06:08:56Z }
---

The IME host starts install and uninstall commands in 32-bit PowerShell, so WOW64 redirects
`System32`, `Program Files`, and `HKLM\SOFTWARE` to their 32-bit views. At the top of
install and uninstall scripts, relaunch in native 64-bit PowerShell before any real work.

Guard the relaunch on both conditions: the OS is 64-bit and the current process is not. Inside
the guard, build the native `powershell.exe` path under the `Sysnative` alias in the Windows
directory, and throw when it is absent rather than continuing under redirection. Re-run the
current script file through that host with `-ExecutionPolicy Bypass -NoProfile` and the
original parameters, rebuilt from `$PSBoundParameters` so values with spaces stay whole.

Start the child without a new window, with both the wait and pass-through switches, so the call
blocks until the child finishes and returns its process object. Exit the parent with the child's
exit code. Never exit before the child returns and never exit 0 over a failed child; Intune maps
that code to success, retry, or reboot. Everything after the guard runs only in the 64-bit pass.

Example:

```powershell
if ([Environment]::Is64BitOperatingSystem -and -not [Environment]::Is64BitProcess) {
    $native = Join-Path $env:WINDIR 'Sysnative\WindowsPowerShell\v1.0\powershell.exe'
    if (-not (Test-Path $native)) { throw "Native PowerShell not found at $native" }

    $arguments = @('-ExecutionPolicy', 'Bypass', '-NoProfile', '-File', "`"$PSCommandPath`"")
    foreach ($p in $PSBoundParameters.GetEnumerator()) {
        if ($p.Value -is [switch]) { $arguments += "-$($p.Key):`$$($p.Value.IsPresent)" }
        else { $arguments += "-$($p.Key)", "`"$($p.Value)`"" }
    }
    $child = Start-Process $native -ArgumentList $arguments -Wait -PassThru -NoNewWindow
    exit $child.ExitCode
}
```
