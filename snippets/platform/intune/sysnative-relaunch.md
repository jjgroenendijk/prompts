---
type: Playbook
title: Sysnative Relaunch
description: Relaunch 32-bit IME scripts through Sysnative to avoid WOW64 redirection.
tags: [intune, powershell]
status: stable
generated: { by: human:jjgroenendijk, at: 2026-08-14T00:00:00+02:00 }
---

Detect the 32-bit Intune host on 64-bit Windows, then relaunch through Sysnative to avoid WOW64
redirection. Do this at the top of install/uninstall scripts so all file system and registry
calls run in native 64-bit PowerShell.

Guard the relaunch on both conditions: the OS is 64-bit and the current process is not. Inside
the guard, build the native `powershell.exe` path under the `Sysnative` alias in the Windows
directory, and throw when it is absent rather than continuing under redirection. Re-run the
current script file with its original arguments through that native host, without a new window,
waiting for it and exiting with its exit code. Everything after the guard runs only in the
64-bit pass, so put the real work there.
