---
type: Reference
title: Intune Management Extension Logs
description: Where the IME logs and caches Win32 app data, and what diagnostics collect.
tags: [intune, troubleshooting]
status: stable
generated: { by: human:jjgroenendijk, at: 2026-09-23T07:15:50Z }
sources:
  - resource: https://learn.microsoft.com/intune/device-management/tools/management-extension-windows
  - resource: https://learn.microsoft.com/troubleshoot/mem/intune/app-management/troubleshoot-win32-app-install
---

IME logs are in `C:\ProgramData\Microsoft\IntuneManagementExtension\Logs`.
`AppWorkload.log` holds Win32 app check-in, detection, applicability, and install events.
`AppActionProcessor.log` holds detection and applicability checks.
`IntuneManagementExtension.log` is the main log: check-ins, policy, and reporting.
`AgentExecutor.log` holds PowerShell script runs.
Read the logs with CMTrace.
The IME unpacks app content to `C:\Windows\IMECache\<app-id>`.
"Collect diagnostics" takes up to 25 full file paths and 250 MB.
It accepts only `.log`, `.txt`, `.dmp`, `.cab`, `.zip`, `.xml`, `.evtx`, and `.evtl` files.
Give custom log files one of these extensions.
