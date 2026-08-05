---
type: Playbook
title: Intune App Packaging
description: Package Win32 apps into .intunewin with IntuneWinAppUtil via a package.cmd script.
tags: [intune, packaging]
status: stable
generated: { by: human:jjgroenendijk, at: 2025-12-10T15:51:59+01:00 }
---

Intune applications must be packaged using the IntuneWinAppUtil executable to create `.intunewin` files for deployment.

`package.cmd` must download `IntuneWinAppUtil.exe` on the fly when it is not already present, so a clean checkout packages in one run with no manual install and no terminal restart.

```batch
@echo off
setlocal

set "UTIL=%~dp0IntuneWinAppUtil.exe"
set "UTIL_URL=https://github.com/microsoft/Microsoft-Win32-Content-Prep-Tool/raw/master/IntuneWinAppUtil.exe"

REM Prefer a copy already on PATH
where IntuneWinAppUtil >nul 2>&1
if %ERRORLEVEL% EQU 0 set "UTIL=IntuneWinAppUtil"

REM Otherwise download it next to this script if it is missing
if not exist "%UTIL%" (
    echo [INFO] IntuneWinAppUtil.exe not found, downloading...
    curl.exe -sSfL "%UTIL_URL%" -o "%UTIL%"
    if %ERRORLEVEL% NEQ 0 (
        echo [ERROR] Download failed: %UTIL_URL%
        exit /b 1
    )
)

REM Package the in/ folder into an .intunewin file in out/ folder
"%UTIL%" -c in -s install.ps1 -o out -q
```

Add `IntuneWinAppUtil.exe` to `.gitignore`; it is a fetched tool, not a source file.
