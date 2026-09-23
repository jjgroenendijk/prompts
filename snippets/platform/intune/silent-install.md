---
type: Rule
title: Silent Install
description: Installs run silent and unattended; nobody sees a prompt.
tags: [intune, packaging]
status: stable
generated: { by: human:jjgroenendijk, at: 2026-09-23T06:22:13Z }
sources:
  - resource: https://learn.microsoft.com/intune/app-management/deployment/win32
---

Intune installs run as SYSTEM by default.
Nobody sees a prompt.
A prompt blocks the install until it times out.
Use the installer's silent and no-restart switches.
When the installer has no silent mode, stop with an error.

Example:

```text
msiexec.exe /i "7z2408-x64.msi" /qn /norestart
```
