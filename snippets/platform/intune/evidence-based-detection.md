---
type: Rule
title: Evidence Based Detection
description: Detect on evidence the application itself leaves, not on a marker the install script wrote.
tags: [intune, detection]
status: stable
generated: { by: human:jjgroenendijk, at: 2026-08-05T00:00:00+02:00 }
---

Never detect a Win32 app by a registry key the install script wrote; that only proves the script
ran. Install the application once, find the evidence it leaves behind, such as its uninstall entry,
product code, installed file path, file version, or service, and detect on that. Include the version
so an outdated install fails detection.
