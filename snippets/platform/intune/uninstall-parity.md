---
type: Rule
title: Uninstall Parity
description: Each install script has an uninstall script that removes what it added.
tags: [intune, packaging]
status: stable
generated: { by: human:jjgroenendijk, at: 2026-09-23T06:36:14Z }
---

Each install script has an uninstall script.
The uninstall removes what the install added.
Find the product at run time, not by a fixed product code.
When the app is already gone, exit 0.
After uninstall, detection must report not installed.
