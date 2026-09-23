---
type: Rule
title: Intune App README
description: The package README.md gives Intune admins the portal text and app config.
tags: [intune, docs]
status: stable
generated: { by: human:jjgroenendijk, at: 2026-09-23T07:15:50Z }
sources:
  - resource: https://learn.microsoft.com/intune/app-management/deployment/add-win32
---

Each package has a `README.md` in the package folder, for the Intune admins.
It has three sections:

- Overview: app, version, vendor, and source.
- Company Portal description: short text for users. Basic Markdown only, no HTML.
- Intune configuration: the values the admin enters in the admin center.

The Company Portal shows the name, description, logo, category, and information and privacy URLs.
Give each app a unique name; the portal shows only one app when two share a name.

Keep the values the same as the scripts in `input/`.
