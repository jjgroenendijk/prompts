---
type: Rule
title: Intune Project Structure
description: Each Intune package has input/, output/, a logo, a README.md, and package.cmd.
tags: [intune, structure]
status: stable
generated: { by: human:jjgroenendijk, at: 2026-09-23T06:35:23Z }
---

Name the package folder after the app.
It holds two folders and three files:

- `input/`: install, uninstall, and detection scripts, and the setup file.
- `output/`: the generated `.intunewin` file only.
- The app logo: the icon for the Company Portal.
- `README.md`: notes for the Intune admins.
- `package.cmd`: builds `output/` from `input/`.

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
├── 7-Zip-logo.png
├── README.md
└── package.cmd
```
