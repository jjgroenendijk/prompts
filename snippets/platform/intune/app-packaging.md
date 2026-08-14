---
type: Playbook
title: Intune App Packaging
description: Package Win32 apps into .intunewin with IntuneWinAppUtil via a package.cmd script.
tags: [intune, packaging]
status: stable
generated: { by: human:jjgroenendijk, at: 2026-08-14T00:00:00+02:00 }
---

Intune applications must be packaged using the IntuneWinAppUtil executable to create `.intunewin` files for deployment.

`package.cmd` must download `IntuneWinAppUtil.exe` on the fly when it is not already present, so a clean checkout packages in one run with no manual install and no terminal restart.

Resolve the tool in two steps. Prefer a copy already on `PATH`; otherwise look for one next to the script, using the script's own directory rather than the caller's working directory. When neither exists, download it with `curl.exe` from the official prep tool repo into the script directory, and fail the script with a non-zero exit code when the download fails instead of continuing into a broken package step.

Then run the tool quietly, giving it the input folder as the content source, the install script as the setup file, and the output folder as the destination.

Add `IntuneWinAppUtil.exe` to `.gitignore`; it is a fetched tool, not a source file.
