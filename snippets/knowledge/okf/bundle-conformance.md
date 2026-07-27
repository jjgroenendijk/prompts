---
type: Reference
title: OKF Bundle Conformance
description: What makes a bundle conformant with OKF v0.2, plus the permissive consumption rules.
tags: [okf, knowledge]
status: stable
generated: { by: human:jjgroenendijk, at: 2026-07-14T12:19:29+02:00 }
sources:
  - resource: https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md
---

A knowledge bundle conforms to OKF v0.2 when:

- Every non-reserved `.md` file has parseable YAML frontmatter.
- Every frontmatter block includes a non-empty `type` field.
- Reserved files (`index.md`, `log.md`) follow their defined structure when present.

Distribute a bundle as a git repo (preferred -> history and attribution), a tarball, or a subdir
of a larger repo. Structure is producer-determined; there is no prescribed folder layout.

Consume permissively. Do not reject a bundle for missing optional fields, unknown `type` values,
unrecognized frontmatter keys, broken cross-links, or absent `index.md`. This tolerance lets
agent-generated and evolving docs stay valid.

Where the trust families are present, a consumer must treat a bare `verified` mapping as a
one-element list, and must surface rather than silently drop a failing attestation.

Version with `<major>.<minor>`: minor bumps add backward-compatible features, major bumps break.
Declare the target version only in the root `index.md` via `okf_version`. Do not understand the
declared version -> attempt best-effort consumption instead of refusing the bundle.
