---
type: Rule
title: Silent Install
description: Installs run silently and unattended; nobody sees a prompt in SYSTEM context.
tags: [intune, packaging]
status: stable
generated: { by: human:jjgroenendijk, at: 2026-09-23T06:08:56Z }
sources:
  - resource: https://learn.microsoft.com/intune/app-management/deployment/win32
---

Intune installs run as SYSTEM by default, in a session no user sees. A prompt there blocks until
the install timeout, 60 minutes by default. Pass the vendor's silent and no-restart switches, and
stop with an error when a setup has none. Microsoft does not support interactive installs or
workarounds such as ServiceUI that push UI into the user session. The User install behaviour
runs with the user's rights, so it fails when setup needs admin.
