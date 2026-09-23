---
type: Rule
title: Ask For Organisation Name
description: Ask for the organisation name; never guess it.
tags: [intune, naming]
status: stable
generated: { by: human:jjgroenendijk, at: 2026-09-23T06:22:13Z }
---

The organisation name goes in event logs, registry paths, and package names.
When the request and the repo do not give it, ask the user.
Do not guess it.
Do not use a placeholder such as `Contoso` or `<Organisation>`.
