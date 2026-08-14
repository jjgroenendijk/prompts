---
type: Rule
title: Child Directory Summaries
description: Include a commented directory tree, stopping at child AGENTS.md files.
tags: [agents-md, structure]
status: stable
generated: { by: human:jjgroenendijk, at: 2026-08-14T00:00:00+02:00 }
---

Every `AGENTS.md` MUST include a tree of the directories below it, each with a short `#` comment.
Annotate the root, then descend as deep as needed. Stop at any sub-directory that has its own
`AGENTS.md`; that file documents its own subtree. Keep each comment to a few words.

Draw the tree inside a fenced `text` block. Put the root directory on the first line, then one
line per entry, indented one level per depth, using the box-drawing branch characters with the
last child of each group closing the branch. Suffix every directory name with a slash. Align a
`#` comment after each entry. List directories only; name a single file only when that file
carries the directory's purpose.
