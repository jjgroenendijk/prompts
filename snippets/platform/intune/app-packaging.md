---
type: Playbook
title: Intune App Packaging
description: Build the .intunewin with IntuneWinAppUtil from package.cmd.
tags: [intune, packaging]
status: stable
generated: { by: human:jjgroenendijk, at: 2026-09-23T06:22:13Z }
sources:
  - resource: https://github.com/Microsoft/Microsoft-Win32-Content-Prep-Tool
---

Build the `.intunewin` file with `IntuneWinAppUtil.exe`.
Run it from `package.cmd` in the package root.
Get the tool from the official Microsoft Win32 Content Prep Tool repo.
When the tool is missing, `package.cmd` fetches it.
When the fetch fails, `package.cmd` stops with a non-zero exit code.
Add `IntuneWinAppUtil.exe` to `.gitignore`.

Example:

```batch
IntuneWinAppUtil.exe -c "%~dp0input" -s "%~dp0input\7-Zip-install.ps1" -o "%~dp0output" -q
```
