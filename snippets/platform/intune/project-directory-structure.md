---
type: Rule
title: Intune Project Structure
description: Each Intune package has input/, output/, info/, and package.cmd.
tags: [intune, structure]
status: stable
generated: { by: human:jjgroenendijk, at: 2026-09-23T06:22:13Z }
---

Name the package folder after the app.
It holds three folders and one script:

- `input/`: install, uninstall, and detection scripts, and the setup file.
- `output/`: the generated `.intunewin` file only.
- `info/`: the app logo for the Company Portal and a `README.md` for the admins.
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
├── info/
│   ├── 7-Zip-logo.png
│   └── README.md
└── package.cmd
```
