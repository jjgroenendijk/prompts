---
type: Playbook
title: E2E Test Isolation
description: Run script E2E tests against a temp directory with paths overridden by env vars.
tags: [scripts, testing]
status: stable
generated: { by: human:jjgroenendijk, at: 2026-08-14T00:00:00+02:00 }
---

E2E test pattern for script testing: Create isolated temp directory with test data and override
paths using environment variables.

Point the environment variable the script reads for its project root at the temp directory, seed
that directory with the fixture data the run needs, then launch the script as a subprocess with
that environment passed through. Assert against files inside the temp tree and delete it when
the test ends. This allows testing scripts in isolation without affecting the main project.
