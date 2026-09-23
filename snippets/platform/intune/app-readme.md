---
type: Rule
title: Intune App README
description: The package README.md gives Intune admins the portal text and app config.
tags: [intune, docs]
status: stable
generated: { by: human:jjgroenendijk, at: 2026-09-23T06:35:23Z }
sources:
  - resource: https://learn.microsoft.com/intune/app-management/deployment/add-win32
---

Each package has a `README.md` in the package folder, for the Intune admins.
It has three sections:

- Overview: app, version, vendor, and source.
- Company Portal description: short text for users. Basic Markdown only, no HTML.
- Intune configuration: the values the admin enters in the admin center.

Keep the values the same as the scripts in `input/`.

Example:

```markdown
# 7-Zip

## Overview

7-Zip 24.08 x64 by Igor Pavlov, from <https://www.7-zip.org>.

## Company Portal description

Open and create ZIP, 7z, and RAR files.

## Intune configuration

- Install: `powershell.exe -ExecutionPolicy Bypass -NoProfile -File 7-Zip-install.ps1`
- Uninstall: `powershell.exe -ExecutionPolicy Bypass -NoProfile -File 7-Zip-uninstall.ps1`
- Install behaviour: System
- Detection: script `7-Zip-detect.ps1`, run as 32-bit: No
- Requirements: x64, Windows 11 23H2
- Assignment: Available, All users
- Logo: `7-Zip-logo.png`
```
