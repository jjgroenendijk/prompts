---
type: Rule
title: No ASCII Decoration
description: Forbid ASCII art, banner boxes, separator bars, and drawn frames.
tags: [writing, formatting]
status: stable
generated: { by: human:jjgroenendijk, at: 2026-08-05T00:00:00+02:00 }
---

ASCII decoration is forbidden. Never draw banners, boxes, frames, separator bars, or ASCII art in
code, comments, log output, or documentation.

Forbidden:

```text
==========================================
#          INSTALL PHASE START           #
==========================================
------------------------------------------
*** DONE ***
```

Use a plain heading, a bracket label, or a single log line instead:

```text
[INFO] install phase start
```

Decoration carries no information, breaks on rewrap and in narrow terminals, and inflates diffs.
Box-drawing characters in a directory tree are structure, not decoration, and stay allowed.
