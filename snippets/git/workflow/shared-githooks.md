---
type: Rule
title: Shared Git Hooks
description: Track hooks in .githooks/ with a thin wrapper per hook and scripts in <hook>.d/.
tags: [git, workflow, automation]
status: stable
generated: { by: human:jjgroenendijk, at: 2026-09-23T06:25:12Z }
---

Store shared Git hooks in the tracked `.githooks/` folder, not in `.git/hooks`.
Point each checkout at it with `git config core.hooksPath .githooks`.
The preferred structure is:

- `.githooks/<hook>`: a thin wrapper, such as `.githooks/pre-commit`.
- `.githooks/<hook>.d/`: the scripts for that hook, such as `.githooks/pre-commit.d/10-lint.sh`.

The wrapper runs each executable script in `<hook>.d/` in sorted order.
It passes on the hook arguments and stops at the first failure.
Put the real checks in the scripts, not in the wrapper.
Number the scripts to set the order: `10-lint.sh`, `20-test.sh`, `30-build.sh`.
Keep the scripts executable and in POSIX `sh`, unless the project needs another shell.
Use pre-commit for fast checks on staged files.
Use pre-push for slower full checks, such as tests and build.
CI stays the final check.

Example:

```text
.githooks/
├── pre-commit
├── pre-commit.d/
│   ├── 10-format.sh
│   └── 20-lint.sh
├── pre-push
└── pre-push.d/
    ├── 10-test.sh
    └── 20-build.sh
```
