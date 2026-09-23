---
type: Rule
title: Intune App README
description: info/README.md tells Intune admins how to configure the app, incl. portal text.
tags: [intune, docs]
status: stable
generated: { by: human:jjgroenendijk, at: 2026-09-23T06:15:39Z }
sources:
  - resource: https://learn.microsoft.com/intune/app-management/deployment/add-win32
---

Every packaged application has an `info/README.md` next to `input/` and `output/`. Its readers
are the IT admins who add and maintain the app in Intune, not the scripts. An admin must be able
to create the Win32 app in the Intune admin center from this file alone. Keep these sections:

- Overview: what the app is, version, vendor, installer source, and package maintainer.
- Company Portal description: user-facing text the admin pastes into the app's Description
  field. Write for end users: what the app does and why they would install it, in plain words.
  Use only basic Markdown; Intune does not render HTML there.
- Intune configuration: every value the admin enters, grouped by the admin center pages.
  - App information: name, publisher, app version, category, information and privacy URLs,
    developer, owner, and the logo file in `info/` to upload as the Company Portal icon.
  - Program: install and uninstall commands, installation time, allow available uninstall,
    install behaviour, device restart behaviour, and any return codes added to the defaults.
  - Requirements: OS architecture, minimum OS, and any extra requirement rules.
  - Detection rules: rule type, script file, and the 32-bit and signature check settings.
  - Dependencies and supersedence, or "none".
  - Assignments: intent (required, available, uninstall) and the target groups.
- Notes: known issues, log file location, and how to update to a new version.

Take every value from the package itself: the commands must match the script names in `input/`,
and the version must match the one detection checks. Update the README in the same change as
the scripts.

Example:

````markdown
# 7-Zip

## Overview

7-Zip 24.08 x64 from <https://www.7-zip.org>, installed from `7z2408-x64.msi`.
Package maintainer: Workplace team.

## Company Portal description

7-Zip opens and creates compressed files such as ZIP, 7z, and RAR. Install it when you
need to unpack archives you receive or send large files in a smaller size.

## Intune configuration

### App information

| Setting         | Value                         |
| --------------- | ----------------------------- |
| Name            | 7-Zip                         |
| Publisher       | Igor Pavlov                   |
| App version     | 24.08                         |
| Category        | Productivity                  |
| Information URL | <https://www.7-zip.org>       |
| Logo            | `info/7-Zip-logo.png`         |

### Program

- Install command:
  `powershell.exe -ExecutionPolicy Bypass -NoProfile -File 7-Zip-install.ps1`
- Uninstall command:
  `powershell.exe -ExecutionPolicy Bypass -NoProfile -File 7-Zip-uninstall.ps1`
- Installation time: 60 minutes
- Allow available uninstall: Yes
- Install behaviour: System
- Device restart behaviour: Determine behaviour based on return codes
- Return codes: Intune defaults

### Requirements

x64, Windows 11 23H2 or later.

### Detection rules

Custom script `input/7-Zip-detect.ps1`. Run as 32-bit process: No. Enforce signature check: No.

### Dependencies and supersedence

None.

### Assignments

Available for enrolled devices: All users.

## Notes

Logs: `C:\ProgramData\Microsoft\IntuneManagementExtension\Logs\7-Zip-*.log`.
To update: replace the MSI in `input/`, bump the version here and in the detection script.
````
