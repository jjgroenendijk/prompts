---
type: Rule
title: Keep Config Files Out Of Root
description: Package, build, test, and lint config lives in purpose dirs, not the repo root.
tags: [quality, structure]
status: stable
generated: { by: human:jjgroenendijk, at: 2026-06-21T10:52:48+02:00 }
---

Keep the repository root clean. Files that define a package, build, test, lint, or
secret-scanning setup MUST live in a purpose-named package directory instead of the repo root.

Use `app/`, `web/`, or `packages/<name>/` when the files belong to product code. Use
`tools/<name>/` when the files only support repository tooling or automation.

This includes files such as `package.json`, `package-lock.json`, `tsconfig.json`,
`vite.config.ts`, `vitest.config.ts`, `eslint.config.js`, and `.secretlintrc.json`.
