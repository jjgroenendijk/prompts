A `docs/` knowledge bundle conforms to OKF v0.1 when:

- Every non-reserved `.md` file has parseable YAML frontmatter.
- Every frontmatter block includes a non-empty `type` field.
- Reserved files (`index.md`, `log.md`) follow their defined structure when present.

Distribute a bundle as a git repo (preferred -> history and attribution), a tarball, or a subdir
of a larger repo. Structure is producer-determined; there is no prescribed folder layout.

Consume permissively. Do not reject a bundle for missing optional fields, unknown `type` values,
unrecognized frontmatter keys, broken cross-links, or absent `index.md`. This tolerance lets
agent-generated and evolving docs stay valid.

Version with `<major>.<minor>`: minor bumps add backward-compatible features, major bumps break.
Declare the target version only in the root `index.md` via `okf_version`.
