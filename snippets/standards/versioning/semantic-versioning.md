---
type: Rule
title: Semantic Versioning
description: Version packaged applications and modules with Semantic Versioning 2.0.0.
tags: [standards, versioning, release]
status: stable
generated: { by: human:jjgroenendijk, at: 2026-08-24T00:00:00+02:00 }
sources:
  - resource: https://semver.org
---

Version every packaged application and module with Semantic Versioning 2.0.0. Three numeric
parts, dot separated. Raise the major part for an incompatible change, the minor part for
backwards-compatible functionality, and the patch part for a backwards-compatible fix.

Reset the lower parts to zero whenever a higher one increases, and never reuse or edit a version
that has shipped. Consumers pin and resolve against these numbers, so a version that moves
silently breaks every build that trusted it.
