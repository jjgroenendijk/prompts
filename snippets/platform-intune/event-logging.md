Use consistent Intune logging: write to the IME log path and to a custom Windows Event Log for the app. Create the log folder and event source before writing; build the log path from variables so installs and uninstalls stay separated.

```PowerShell

$EventLogName = "$ORGANISATION"
$EventSource = "$APPLICATION"
$LogPath = "$env:ProgramData\Microsoft\IntuneManagementExtension\Logs\AppName_$currentDate.log"
$LogDir = Split-Path -Path $LogPath -Parent

# Create log directory if needed
if (-not (Test-Path -Path $LogDir)) {
    New-Item -Path $LogDir -ItemType Directory -Force | Out-Null
}

# Create custom Windows Event Log
if (-not [System.Diagnostics.EventLog]::SourceExists($EventSource)) {
    New-EventLog -LogName $EventLogName -Source $EventSource
}

function Write-Log {
    param(
        [string]$Message,
        [string]$Level = "Information"
    )

    $LogMessage = "$(Get-Date -Format 'yyyy-MM-dd HH:mm:ss') - $Message"
    Write-Output $LogMessage
    Add-Content -Path $LogPath -Value $LogMessage -Force

    Write-EventLog -LogName $EventLogName -Source $EventSource -EntryType $Level -EventId 1000 -Message $Message
}
```
