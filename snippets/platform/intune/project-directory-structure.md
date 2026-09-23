---
type: Rule
title: Intune Project Structure
description: Every Intune Win32 app package has input/, output/, and info/ directories.
tags: [intune, structure]
status: stable
generated: { by: human:jjgroenendijk, at: 2026-09-23T06:15:39Z }
---

Every packaged application gets the same layout, so any admin finds the same files in the same
place. Name the package root after the application. Give it three directories and one script:

- `input/` holds everything that gets packaged: the install, uninstall, and detection scripts
  plus any bundled setup binary, each named after the application and its role.
- `output/` holds the generated `.intunewin` file and nothing hand-written.
- `info/` holds what Intune admins need but the package does not: the application logo, which
  admins upload as the Company Portal icon, and a `README.md` for the Intune side. Keep both out
  of `input/`, so they never ship inside the `.intunewin`.
- `package.cmd` sits at the root and builds the `.intunewin` from `input/` into `output/`.

Example:

```text
7-Zip/
├── input/
│   ├── 7-Zip-install.ps1
│   ├── 7-Zip-uninstall.ps1
│   ├── 7-Zip-detect.ps1
│   └── 7z2408-x64.msi
├── output/
│   └── 7-Zip-install.intunewin
├── info/
│   ├── 7-Zip-logo.png
│   └── README.md
└── package.cmd
```
