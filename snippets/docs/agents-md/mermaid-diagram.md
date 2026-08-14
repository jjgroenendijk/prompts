---
type: Rule
title: Mermaid Diagram Required
description: Every AGENTS.md carries a Mermaid diagram of flow or state, not a folder tree.
tags: [agents-md, diagrams]
status: stable
generated: { by: human:jjgroenendijk, at: 2026-08-14T00:00:00+02:00 }
---

Every `AGENTS.md` MUST include at least one Mermaid diagram. Show what the file tree cannot:
control and data flow, build and deploy pipelines, state machines, runtime module interaction.
Make the non-obvious clear at a glance. Do not redraw the folder layout. Keep it current as the
behavior changes.

Wrap the diagram in a fenced `mermaid` block so it renders. Pick the diagram kind that matches
what you are showing: `flowchart` for data and control flow, `stateDiagram` for lifecycles,
`sequenceDiagram` for call ordering between components. Name each node after the real participant
it stands for, a module, a process, or a store, and label the edge whenever a branch depends on a
condition.
