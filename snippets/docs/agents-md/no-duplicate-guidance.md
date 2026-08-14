---
type: Rule
title: No Duplicate Guidance
description: Check sibling and parent AGENTS.md files for the same guidance before editing one.
tags: [agents-md, structure]
status: stable
generated: { by: human:jjgroenendijk, at: 2026-08-14T00:00:00+02:00 }
---

Whenever you edit an `AGENTS.md`, read the parent and sibling `AGENTS.md` files first and check
that nothing you are adding is already stated in one of them. Each piece of guidance MUST live in
exactly one file.

Guidance that applies to a whole subtree belongs in the nearest common ancestor, not repeated in
every child. Guidance that is specific to one directory belongs in that directory's file, not in
the ancestor. When you find the same rule in two files, delete the copy from the file whose scope
is wrong and keep the one whose scope matches.

Duplicated guidance drifts: one copy gets updated and the other keeps contradicting it. An agent
reading both cannot tell which one is current.
