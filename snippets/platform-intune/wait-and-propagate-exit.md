When relaunching from the 32-bit IME host, the parent process must wait for the 64-bit child to finish and pass the exit code back to Intune for accurate detection.

```PowerShell
$proc = Start-Process -FilePath $nativePwsh -ArgumentList $argsList -Wait -PassThru
exit $proc.ExitCode
```
