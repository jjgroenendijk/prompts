---
type: Rule
title: Detection Runs 64-Bit
description: Detection scripts run 64-bit by default, so they need no Sysnative relaunch.
tags: [intune, detection]
status: stable
generated: { by: human:jjgroenendijk, at: 2026-09-23T06:08:56Z }
sources:
  - resource: https://learn.microsoft.com/intune/app-management/deployment/add-win32
---

On 64-bit clients Intune runs detection scripts in 64-bit PowerShell by default, unlike install
and uninstall commands, which the 32-bit IME host starts. A detection script therefore needs no
Sysnative relaunch. Keep "Run script as 32-bit process on 64-bit clients" at No, and read 32-bit
locations such as `WOW6432Node` or `Program Files (x86)` by explicit path instead of flipping
the toggle, so one script sees both views.
