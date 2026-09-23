---
type: Playbook
title: Invoke As Logged-On User
description: Run user-context code from SYSTEM with a self-removing scheduled task.
tags: [intune, powershell]
status: stable
generated: { by: human:jjgroenendijk, at: 2026-09-23T06:22:13Z }
---

Run user-context code from SYSTEM with a scheduled task.
Use it only for per-user setup, such as `HKCU` values.
Never use it to show installer UI.
Register the task for the `Authenticated Users` group at the highest run level.
Start it once, one second from now.
Add an `Unregister-ScheduledTask` call for the task to the end of the script block.
Then the task removes itself.
Give authenticated users access to the task through the `Schedule.Service` COM object.
Without it, the user cannot run or remove the task.
[WARNING] The task runs elevated for admin users. Pass it no untrusted input.

Example of the access step:

```powershell
$scheduler = New-Object -ComObject 'Schedule.Service'
$scheduler.Connect()
$task = $scheduler.GetFolder('\').GetTask($TaskName)
$task.SetSecurityDescriptor($task.GetSecurityDescriptor(0xF) + '(A;;FA;;;AU)', 0)
```
