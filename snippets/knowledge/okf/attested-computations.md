---
type: Reference
title: OKF Attested Computations
description: Carry a sanctioned computation as its own concept so a run can be checked.
tags: [okf, knowledge, attestation]
status: stable
generated: { by: human:jjgroenendijk, at: 2026-07-27T00:00:00Z }
sources:
  - resource: https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md
---

An `Attested Computation` concept carries the sanctioned way to compute a value, so a consumer
can confirm the agent ran the blessed computation instead of improvising. Provenance answers
where a claim came from; attestation answers whether a number was produced the way policy says.
OKF records the computation and the means to check it -> it executes nothing itself.

Keep a computation as its own concept, linked from whatever needs the value. `runtime` defines
what `parameters` mean, one computation serves many consumers, and trust state is per
computation: revenue, profit, and margin verify and attest independently.

Contract fields, alongside the usual trust families:

- `runtime` - required for this type, e.g. `bigquery`, `dbt`, `python`. Says how to run it and so
  how executor, attester, and `parameters` are interpreted.
- `parameters` - the typed named holes an agent may fill, each `{ name, type, required }`.
- `computation` - optional path to the computation. Absent -> the body `# Computation` fence is
  the computation. Use a file for long, generated, or shared computations.
- `executor` - `resource` names run instructions or code; `receipt` declares the fields a run
  must return, the evidence the attester inspects.
- `attester` - `resource` names deterministic, no-LLM code that reads a receipt and returns a
  verdict, meant to run consumer-side.

```yaml
type: Attested Computation
runtime: bigquery
parameters:
  - { name: year, type: integer, required: true }
executor:
  resource: references/skills/run-on-bq.md
  receipt: [job_id, executed_sql, result]
attester:
  resource: references/attesters/revenue.py
```

An agent may supply values for declared `parameters` only. It MUST NOT author or edit the
computation. The attester re-derives the binding and compares against the expanded artifact the
receipt carries -> a rewritten query, a swapped computation file, or a mutated dependency fails
the check. A parameter-only surface makes "did the sanctioned thing run" mechanical rather than a
judgement call.

Refuse to display a failing attestation; warn or refuse past `stale_after`. On success, surface
the verdict so trust is visible.

Verification and attestation are distinct and both needed. `verified` confirms the definition
still matches policy: doc-level, slow, stored in the bundle. Attestation confirms one run
produced the value the sanctioned way: per-call, runtime, never stored.
