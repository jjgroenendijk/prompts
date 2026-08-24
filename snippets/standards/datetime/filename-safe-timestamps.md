---
type: Rule
title: Filename Safe Timestamps
description: Replace each colon with a hyphen when an ISO 8601 timestamp goes into a filename.
tags: [standards, datetime, naming]
status: stable
generated: { by: human:jjgroenendijk, at: 2026-08-24T00:00:00+02:00 }
---

Keep the ISO 8601 shape in filenames, but replace each colon with a hyphen. Windows forbids the
colon in a path segment, and it carries meaning to several shells and tools on other systems.

Change nothing else. Keep the field order, the zero padding, the T separator, and the offset
marker, so the name still sorts chronologically and still parses back to the original instant.
