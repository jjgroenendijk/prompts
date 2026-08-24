---
type: Rule
title: Max 600 LOC Per File
description: Cap hand-written files at 600 lines; generated and vendored files are exempt.
tags: [quality, size]
status: stable
generated: { by: human:jjgroenendijk, at: 2026-06-21T10:20:32+02:00 }
---

No hand-written file may exceed 600 lines. As a file nears the limit, split it by
responsibility. Do not pack more into one file. Generated and vendored files are exempt: lock
files (`pnpm-lock.yaml`, `package-lock.json`, `yarn.lock`), minified bundles, snapshots, and
other machine-generated output.
