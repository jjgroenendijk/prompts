---
type: Rule
title: No AI Attribution Trailers
description: Forbid AI attribution trailers; allow Fixes, Refs, BREAKING CHANGE, human sign-off.
tags: [git, commits]
status: stable
generated: { by: human:jjgroenendijk, at: 2026-01-25T22:24:37+00:00 }
---

MUST NOT add author/co-author attribution trailers for AI. Forbidden: `Co-authored-by:`, `Generated-by:`, `AI-Generated-by:`, `Assisted-by:`, `Model:`. Allowed trailers: `Fixes #...`, `Refs #...`, `BREAKING CHANGE:...`, `Signed-off-by:` (human only).
