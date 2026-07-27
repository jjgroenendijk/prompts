---
type: Playbook
title: E2E Test Isolation
description: Run script E2E tests against a temp directory with paths overridden by env vars.
tags: [scripts, testing]
status: stable
generated: { by: human:jjgroenendijk, at: 2026-01-25T22:24:37+00:00 }
---

E2E test pattern for script testing: Create isolated temp directory with test data and override paths using environment variables.

Example:
```python
os.environ["PROJECT_ROOT"] = temp_dir  # Override paths for isolation
subprocess.run(["uv", "run", "python", script_path], env=env)
```

This allows testing scripts in isolation without affecting the main project.
