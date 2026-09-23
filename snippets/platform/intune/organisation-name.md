---
type: Rule
title: Ask For Organisation Name
description: Ask the user for the organisation name instead of guessing or inventing one.
tags: [intune, naming]
status: stable
generated: { by: human:jjgroenendijk, at: 2026-09-23T06:08:56Z }
---

The organisation name appears in registry paths, event log sources, and package names. When it is
not clear from the request or the repo, ask the user for it. Never guess, invent, or leave a
placeholder.

Example: the request says "package 7-Zip" and the repo holds no organisation name. Ask "Which
organisation name should appear in the event log and registry paths?" before writing scripts.
Do not use `Contoso`, `MyOrg`, or `<Organisation>`.
