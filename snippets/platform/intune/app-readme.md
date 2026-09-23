---
type: Rule
title: Intune App README
description: The package README.md gives Intune admins the portal text and app config.
tags: [intune, docs]
status: stable
generated: { by: human:jjgroenendijk, at: 2026-09-23T06:36:14Z }
sources:
  - resource: https://learn.microsoft.com/intune/app-management/deployment/add-win32
---

Each package has a `README.md` in the package folder, for the Intune admins.
It has three sections:

- Overview: app, version, vendor, and source.
- Company Portal description: short text for users. Basic Markdown only, no HTML.
- Intune configuration: the values the admin enters in the admin center.

Keep the values the same as the scripts in `input/`.
