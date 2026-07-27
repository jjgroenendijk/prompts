---
type: Rule
title: Detection Runs 64-Bit
description: Detection scripts already run 64-bit, so they need no Sysnative relaunch.
tags: [intune, detection]
status: stable
generated: { by: human:jjgroenendijk, at: 2026-06-28T08:06:36+02:00 }
---

Intune detection scripts always run in 64-bit context, unlike install and
uninstall scripts which run in the 32-bit IME host. Detection scripts therefore
do not need a Sysnative relaunch to reach native 64-bit file system and registry
locations.
