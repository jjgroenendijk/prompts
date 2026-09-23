---
type: Rule
title: Intune Project Structure
description: Separate input, output, and information directories in an Intune Win32 app package.
tags: [intune, structure]
status: stable
generated: { by: human:jjgroenendijk, at: 2026-09-23T06:08:56Z }
---

Recommended folder structure for Intune Win32 app packages. Separates input files, output
packages, and documentation for easier maintenance and updates.

Name the package root after the application. Give it three directories and one script. `input/`
holds everything that gets packaged: the install, uninstall, and detection scripts plus any
bundled setup binary, each named after the application and its role. `output/` holds the
generated `.intunewin` file and nothing hand-written. `information/` holds the assets Intune and
reviewers need but the package does not, such as the app logo and vendor documentation.
`package.cmd` sits at the root and builds the `.intunewin` from `input/` into `output/`.

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
├── information/
│   ├── 7-Zip-logo.png
│   └── 7-Zip-readme.pdf
└── package.cmd
```
