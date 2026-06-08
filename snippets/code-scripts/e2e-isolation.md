E2E test pattern for script testing: Create isolated temp directory with test data and override paths using environment variables.

Example:
```python
os.environ["PROJECT_ROOT"] = temp_dir  # Override paths for isolation
subprocess.run(["uv", "run", "python", script_path], env=env)
```

This allows testing scripts in isolation without affecting the main project.
