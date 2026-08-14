---
type: Rule
title: Wait And Propagate Exit Code
description: The 32-bit parent waits for the 64-bit child and returns its exit code to Intune.
tags: [intune, powershell]
status: stable
generated: { by: human:jjgroenendijk, at: 2026-08-14T00:00:00+02:00 }
---

When relaunching from the 32-bit IME host, the parent process must wait for the 64-bit child to finish and pass the exit code back to Intune for accurate detection.

Start the 64-bit child with both a wait switch and a pass-through switch, so the call blocks until the child finishes and hands back the process object. Read the exit code off that object and exit the parent with it. Never exit the parent before the child returns, and never swallow the child's code by exiting zero.
