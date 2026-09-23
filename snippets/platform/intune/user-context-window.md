---
type: Rule
title: Hide User Context Window
description: In user context the script window shows to the user; hide it where possible.
tags: [intune, packaging]
status: stable
generated: { by: human:jjgroenendijk, at: 2026-09-23T06:50:27Z }
---

With install behaviour User, Intune runs the install command in the user's session.
Then the PowerShell window is visible to the user.
Hide the window where possible.
Add `-WindowStyle Hidden` to the `powershell.exe` install and uninstall commands.
The window can still show for a moment at start.
A child process with its own window shows it too.
Start it with `-WindowStyle Hidden`, or with `-NoNewWindow` to share the hidden window.
