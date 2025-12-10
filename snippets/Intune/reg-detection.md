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
