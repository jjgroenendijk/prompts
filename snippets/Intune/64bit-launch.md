Intune application install and uninstall scripts, are run in 32 bit context by Intune in System context.
Make sure installation and uninstall scripts elevate to 64bit context early.

For example:

```PowerShell
If ($ENV:PROCESSOR_ARCHITEW6432 -eq "AMD64") {
    Try {   & "$ENV:WINDIR\SysNative\WindowsPowershell\v1.0\PowerShell.exe" "$PSCOMMANDPATH" }
    Catch { Throw "Failed to start $PSCOMMANDPATH" }
    Exit
}
```
