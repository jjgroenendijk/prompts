---
type: Playbook
title: Winget Binary Locator
description: Locate the newest winget.exe explicitly, since system context has no winget in PATH.
tags: [intune, powershell]
status: stable
generated: { by: human:jjgroenendijk, at: 2026-08-14T00:00:00+02:00 }
---

Locate the latest winget.exe binary on the system. Required when running in system context where
winget isn't in PATH. Sorts by LastWriteTime to get the newest version.

Search recursively for `winget.exe` under the `Microsoft.DesktopAppInstaller` package
directories in `C:\Program Files\WindowsApps`, matching the version and publisher parts of the
folder name with a wildcard. Several versions can sit side by side, so sort the matches by last
write time descending and take the full path of the first. Log the resolved path, and treat no
match as a failure rather than falling back to a bare `winget` call.
