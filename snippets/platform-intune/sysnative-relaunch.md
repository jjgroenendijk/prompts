Detect Intune's 32-bit host on a 64-bit OS, then relaunch through Sysnative to avoid WOW64 redirection. Put this at the top of install/uninstall scripts so file system and registry calls run in native PowerShell. Covers AMD64 and ARM64: Sysnative redirects to the native System32, so the child is x64 on Intel/AMD and ARM64-native on ARM devices.

```PowerShell
# Resolve the native OS architecture, even from a 32-bit (WOW64) host.
# PROCESSOR_ARCHITEW6432 is only set inside WOW64 and reports the real arch;
# fall back to PROCESSOR_ARCHITECTURE when running natively.
$osArch = $env:PROCESSOR_ARCHITEW6432
if (-not $osArch) {
    $osArch = $env:PROCESSOR_ARCHITECTURE
}
$isArm = $osArch -match 'ARM'

# Relaunch only when we are a 32-bit process on a 64-bit OS (IME default on
# both AMD64 and ARM64). Sysnative lands on the native arch in both cases.
$needsRelaunch = (
    [Environment]::Is64BitOperatingSystem -and
    -not [Environment]::Is64BitProcess
)

if ($needsRelaunch) {
    $nativePwsh = Join-Path $env:WINDIR 'Sysnative\WindowsPowerShell\v1.0\powershell.exe'
    if (-not (Test-Path $nativePwsh)) {
        Throw "Sysnative PowerShell not found at $nativePwsh"
    }

    $hostArch = if ($isArm) { 'ARM64' } else { 'x64' }
    Write-Output "Relaunching in native $hostArch PowerShell"

    # Re-run the current script with original args inside native PowerShell
    $argsList = @('-File', "`"$PSCommandPath`"") + $args
    $startParams = @{
        FilePath     = $nativePwsh
        ArgumentList = $argsList
        Wait         = $true
        PassThru     = $true
        NoNewWindow  = $true
    }
    $proc = Start-Process @startParams
    exit $proc.ExitCode
}

# Already running in native PowerShell - continue script here
```
