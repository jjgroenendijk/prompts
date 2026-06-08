Intune applications must be packaged using the IntuneWinAppUtil executable to create `.intunewin` files for deployment.

Create a `package.cmd` script to automate the packaging process:

```batch
@echo off

REM Check if IntuneWinAppUtil is available in PATH
where IntuneWinAppUtil >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    REM Install IntuneWinAppUtil using winget
    echo [INFO] Installing IntuneWinAppUtil via winget...
    winget install Microsoft.Win32ContentPrepTool --force
    REM PATH is modified by installer, requires terminal restart
    echo [WARNING] Restart your terminal and run this script again
    exit /b 0
)

REM Package the in/ folder into an .intunewin file in out/ folder
IntuneWinAppUtil -c in -s install.ps1 -o out -q
```

This script:
- Checks if IntuneWinAppUtil is available
- Installs it via winget if missing
- Packages the `in/` folder contents with `install.ps1` as the setup file
- Outputs the `.intunewin` file to the `out/` folder
