---
type: Rule
title: Wait And Propagate Exit Code
description: The 32-bit parent waits for the 64-bit child and returns its exit code to Intune.
tags: [intune, powershell]
status: stable
generated: { by: human:jjgroenendijk, at: 2025-12-10T15:28:55+01:00 }
---

When relaunching from the 32-bit IME host, the parent process must wait for the 64-bit child to finish and pass the exit code back to Intune for accurate detection.

```PowerShell
$proc = Start-Process -FilePath $nativePwsh -ArgumentList $argsList -Wait -PassThru
exit $proc.ExitCode
```
