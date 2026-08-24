---
type: Rule
title: Intune Project Structure
description: Separate input, output, and information directories in an Intune Win32 app package.
tags: [intune, structure]
status: stable
generated: { by: human:jjgroenendijk, at: 2026-08-14T00:00:00+02:00 }
---

Recommended folder structure for Intune Win32 app packages. Separates input files, output
packages, and documentation for easier maintenance and updates.

Name the package root after the application. Give it three directories and one script. `input/`
holds everything that gets packaged: the install, uninstall, and detection scripts plus any
bundled setup binary, each named after the application and its role. `output/` holds the
generated `.intunewin` file and nothing hand-written. `information/` holds the assets Intune and
reviewers need but the package does not, such as the app logo and vendor documentation.
`package.cmd` sits at the root and builds the `.intunewin` from `input/` into `output/`.
