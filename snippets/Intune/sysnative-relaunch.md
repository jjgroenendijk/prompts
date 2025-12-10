Detect Intune’s 32-bit host on 64-bit Windows, then relaunch through Sysnative to avoid WOW64 redirection. Do this at the top of install/uninstall scripts so all file system and registry calls run in native 64-bit PowerShell.

```PowerShell
# Only relaunch if we are a 32-bit process on a 64-bit OS (IME default)
if ([Environment]::Is64BitOperatingSystem -and -not [Environment]::Is64BitProcess) {
    $nativePwsh = Join-Path $env:WINDIR 'Sysnative\WindowsPowerShell\v1.0\powershell.exe'
    if (-not (Test-Path $nativePwsh)) { Throw "Sysnative PowerShell not found at $nativePwsh" }

    # Re-run the current script with original args inside 64-bit PowerShell
    $argsList = @('-File', "`"$PSCommandPath`"") + $args
    $proc = Start-Process -FilePath $nativePwsh -ArgumentList $argsList -Wait -PassThru -NoNewWindow
    exit $proc.ExitCode
}

# Already running in 64-bit — continue script here
```
