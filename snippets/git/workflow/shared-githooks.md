---
type: Rule
title: Shared Git Hooks
description: Track hooks in .githooks/ with thin wrappers running numbered scripts per hook.
tags: [git, workflow, automation]
status: stable
generated: { by: human:jjgroenendijk, at: 2026-06-21T11:20:33+02:00 }
---

Store shared Git hooks in tracked `.githooks/`, not private `.git/hooks`.
Configure each checkout with `git config core.hooksPath .githooks/hooks`.
Hook entrypoints in `.githooks/hooks/<hook>` MUST be tiny wrappers only:
run every executable script in matching `.githooks/<hook>/` dir in sorted order,
forward hook args, and stop on first failure.
Put real checks in numbered scripts like `10-lint.sh`, `20-test.sh`, `30-build.sh`.
Keep hook scripts executable and POSIX `sh` unless project needs otherwise.
Use pre-commit for fast staged or targeted checks.
Use pre-push for slower full checks like test/build.
CI remains final backstop.
