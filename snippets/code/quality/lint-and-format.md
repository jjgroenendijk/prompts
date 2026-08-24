---
type: Rule
title: Lint And Format Every Language
description: Every language needs linter and auto-formatter coverage, Markdown included.
tags: [quality, lint]
status: stable
generated: { by: human:jjgroenendijk, at: 2026-06-21T10:20:32+02:00 }
---

Every language MUST have a linter and an auto-formatter. This includes Markdown. No language is
exempt.

Run the formatter over every file. A configured formatter that nobody runs is not coverage, so
wire it into the editor, a hook, or a task, and let it own layout decisions instead of arguing
about them in review.
