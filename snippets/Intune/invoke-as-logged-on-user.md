Execute code in user context from system context. Uses scheduled task with Authenticated Users group to run script blocks as the currently logged-on user. Self-cleaning after execution.

```PowerShell
function Invoke-AsCurrentLoggedOnUser {
    param (
        [Parameter(Mandatory = $true)]
        [scriptblock]$ScriptBlock,
        [string]$taskName = "RunOnce_$(Get-Random)"
    )

    try {
        # Create script content with self-cleanup
        $scriptContent = "$($ScriptBlock.ToString()); Unregister-ScheduledTask -TaskName '$taskName' -Confirm:`$false"

        # Create and register scheduled task
        $registerTaskParams = @{
            TaskName  = $taskName
            Action    = New-ScheduledTaskAction -Execute "powershell.exe" -Argument "-NoProfile -WindowStyle Hidden -Command `"$scriptContent`""
            Trigger   = New-ScheduledTaskTrigger -Once -At (Get-Date).AddSeconds(1)
            Settings  = New-ScheduledTaskSettingsSet -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries `
                        -RunOnlyIfNetworkAvailable -StartWhenAvailable `
                        -ExecutionTimeLimit (New-TimeSpan -Minutes 5) `
                        -MultipleInstances IgnoreNew
            Principal = New-ScheduledTaskPrincipal -GroupId "Authenticated Users" -RunLevel Highest
            Force     = $true
        }
        Register-ScheduledTask @registerTaskParams

        # Modify task permissions to allow Authenticated Users to run and delete it
        $Scheduler = New-Object -ComObject "Schedule.Service"
        $Scheduler.Connect()
        $Task = $Scheduler.GetFolder('\').GetTask($taskName)
        $SecurityDescriptor = $Task.GetSecurityDescriptor(0xF) + '(A;;FA;;;AU)'
        $Task.SetSecurityDescriptor($SecurityDescriptor, 0)
        Write-Output "Task created and permissions updated successfully"
    }
    catch {
        Write-Error "Failed to run as logged on user: $_"
        Unregister-ScheduledTask -TaskName $taskName -Confirm:$false -ErrorAction SilentlyContinue
    }
    finally {
        if ($Scheduler) { [void][Runtime.InteropServices.Marshal]::ReleaseComObject($Scheduler) }
    }
}

# Usage example:
Invoke-AsCurrentLoggedOnUser -ScriptBlock {
    Write-Output "Running as: $(whoami)"
    # Your user-context code here
}
```
