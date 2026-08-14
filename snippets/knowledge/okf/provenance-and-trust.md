---
type: Reference
title: OKF Provenance And Trust
description: Record sources, authorship, verification, and lifecycle so trust is derivable.
tags: [okf, knowledge, trust]
status: stable
generated: { by: human:jjgroenendijk, at: 2026-08-14T00:00:00+02:00 }
sources:
  - resource: https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md
---

OKF v0.2 answers four questions from frontmatter: where content came from, how much to trust it,
whether it is still true, and whether it is current. All fields optional. Absence carries meaning
-> an unverified concept is distinguishable from a verified one, never rejected.

`sources` records materials a concept derives from. Each entry needs `resource`, either a
followable artifact (URL, bundle-relative path) or a scope descriptor it cannot follow. Add `id`
when the body cites the source, `title` for a label, and the credibility signals `author`,
`usage_count`, and `last_modified`. Write `sources` as a list of mappings, one per material, each carrying those
keys. Frame every `usage_count` with a `usage_window` sibling of `sources` itself, a mapping of
`from` and `to` dates bounding the window the count was measured over.

Record signals, not scores. A stored credibility score is subjective, unportable, and goes stale;
infer credibility from the signals at read time. Read `usage_count` as liveness and trend, not as
a precise cross-kind ranking.

`generated` records how current content was produced, `verified` who confirmed it against its
sources. Keep them distinct -> who wrote a concept need not be who confirmed it. Both use the
actor convention: `<producer>/<version>` for agents, `human:<id>` for people, `process:<id>` for
automated processes. Each carries `by` naming the actor and `at` holding an ISO 8601 timestamp.
`generated` is a single mapping; `verified` is a list of such mappings, one per confirmation, so
several actors can confirm the same concept.

Derive trust tiers, do not store them. No `verified` -> unverified. Non-human actors only ->
machine-confirmed. Any `human:` actor -> human-reviewed. Treat a bare `verified` mapping as a
one-element list.

Lifecycle uses two fields. `status` is `draft`, `stable`, or `deprecated`; absent means `stable`.
`stale_after` is an absolute `YYYY-MM-DD` date, stale when `today >= stale_after`. Absolute, not
a relative TTL -> staleness stays a plain date comparison.

Express lineage through links, not a dedicated field. A `resource` pointing at another concept
already forms the derivation edge in the bundle graph; recurse into that source's own `sources`
and let credibility propagate.
