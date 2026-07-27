---
type: Reference
title: When To Use OKF
description: Use OKF for durable knowledge; keep transient process artifacts out of it.
tags: [okf, knowledge]
status: stable
generated: { by: human:jjgroenendijk, at: 2026-07-14T12:19:29+02:00 }
sources:
  - resource: https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md
---

Use the Open Knowledge Format (OKF) when documenting a knowledge base under `docs/`: durable
context, curated insight, and metadata about data, systems, or processes -> reach for OKF.

Apply OKF when:

- Recording reusable knowledge meant to outlive one task (schemas, playbooks, API contracts,
  domain concepts, decisions).
- Producing docs an agent must retrieve and reason over without bespoke SDKs.
- Building a `docs/` collection that should be self-describing, portable, and version-controlled.

Do not use OKF for transient work notes. Task tracking stays in `docs/backlog/`, status in
`docs/todo.md`, and investigation logs in `docs/troubleshooting/`. Those are process artifacts,
not knowledge concepts.

OKF is deliberately minimal: standardize only structure, not taxonomy. Do not invent fixed
concept types, storage rules, or schemas the spec does not require.

Spec: https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md
