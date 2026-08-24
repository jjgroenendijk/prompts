---
type: Rule
title: Intune Command Format
description: Run install and uninstall commands with ExecutionPolicy Bypass and NoProfile.
tags: [intune, packaging]
status: stable
generated: { by: human:jjgroenendijk, at: 2026-08-14T00:00:00+02:00 }
---

Standard PowerShell command format for Intune Win32 app install and uninstall commands. Use
ExecutionPolicy Bypass and NoProfile for reliability.

Invoke `PowerShell.exe` with `-ExecutionPolicy Bypass` and `-NoProfile`, then `-File` naming the
script in quotes. The install command names the install script, the uninstall command names the
uninstall script. When a script takes arguments, such as a shared winget setup script that
switches on an action and a package id, append those parameters after the `-File` value in the
same command line.
