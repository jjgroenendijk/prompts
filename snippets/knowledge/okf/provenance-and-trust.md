---
type: Reference
title: OKF Provenance And Trust
description: Record sources, authorship, verification, and lifecycle so trust is derivable.
tags: [okf, knowledge, trust]
status: stable
generated: { by: human:jjgroenendijk, at: 2026-07-27T00:00:00Z }
sources:
  - resource: https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md
---

OKF v0.2 answers four questions from frontmatter: where content came from, how much to trust it,
whether it is still true, and whether it is current. All fields optional. Absence carries meaning
-> an unverified concept is distinguishable from a verified one, never rejected.

`sources` records materials a concept derives from. Each entry needs `resource`, either a
followable artifact (URL, bundle-relative path) or a scope descriptor it cannot follow. Add `id`
when the body cites the source, `title` for a label, and the credibility signals `author`,
`usage_count`, and `last_modified`. Frame every `usage_count` with a sibling `usage_window`.

```yaml
sources:
  - id: ga4-schema
    resource: https://developers.google.com/analytics/bigquery/export-schema
    title: GA4 BigQuery Export schema
    author: team:ga4-docs
    usage_count: 5000
    last_modified: 2026-05-30
usage_window: { from: 2026-06-01, to: 2026-06-30 }
```

Record signals, not scores. A stored credibility score is subjective, unportable, and goes stale;
infer credibility from the signals at read time. Read `usage_count` as liveness and trend, not as
a precise cross-kind ranking.

`generated` records how current content was produced, `verified` who confirmed it against its
sources. Keep them distinct -> who wrote a concept need not be who confirmed it. Both use the
actor convention: `<producer>/<version>` for agents, `human:<id>` for people, `process:<id>` for
automated processes.

```yaml
generated: { by: reference_agent/gemini-2.5-pro, at: 2026-06-20T22:53:05Z }
verified:
  - { by: human:ahormati, at: 2026-06-25T09:00:00Z }
  - { by: process:finance-nightly, at: 2026-06-26T02:00:00Z }
```

Derive trust tiers, do not store them. No `verified` -> unverified. Non-human actors only ->
machine-confirmed. Any `human:` actor -> human-reviewed. Treat a bare `verified` mapping as a
one-element list.

Lifecycle uses two fields. `status` is `draft`, `stable`, or `deprecated`; absent means `stable`.
`stale_after` is an absolute `YYYY-MM-DD` date, stale when `today >= stale_after`. Absolute, not
a relative TTL -> staleness stays a plain date comparison.

Express lineage through links, not a dedicated field. A `resource` pointing at another concept
already forms the derivation edge in the bundle graph; recurse into that source's own `sources`
and let credibility propagate.
