Objective: Do not fix anything. Do not edit code. Do not create a PR. Only detect cleanup opportunities and create 3 separate issues for the top 3 highest-value cleanup candidates: 1 issue per cleanup opportunity.

Cleanup pattern search (must perform explicitly):
- Excessive defensive checks inside trusted/internal code paths
- Redundant error handling (`catch`/`except` that only rethrow, broad blanket handlers without clear need)
- Duplicate code / duplicate conditional fragments
- Deeply nested conditionals instead of guard clauses / early returns
- Unnecessary `else` after an early return path
- Dead, unreachable, obsolete, or otherwise unused code
- Speculative abstractions, wrappers, helpers, or indirection with no demonstrated need
- Overly long functions or long parameter lists that indicate avoidable complexity
- Compatibility residue: deprecated paths, migration code, transitional aliases, backward-compat branches, or old data flows still kept after the new path is primary
- Schema mirroring / data clumps: repeated request fields, validators, error strings, or payload reshaping across multiple components
- Wrapper accretion / middle-men: helper layers that mostly forward, normalize, or repackage data without materially reducing complexity
- Test clone farms: many near-identical tests covering permutations that could be table-driven or shared through fixtures/helpers
- Comment-heavy scaffolding: comments/docstrings that mostly restate obvious code or preserve implementation narration rather than intent
- Contract/integration drift: stale or duplicated contracts, partial migrations, or code that reshapes one contract into another only to preserve legacy structure
- Complexity-heavy branching that can be removed or simplified

Research requirements:
- Research in the codebase first and gather concrete file-level evidence.
- Search open and closed issues for possible duplicates before creating new issues.
- Use current online research to sharpen pattern recognition when useful, especially for distinguishing classic cleanup from common AI-generated code patterns.
- Prefer primary or authoritative sources when citing external guidance.

Selection rule:
- Rank candidates by estimated net LOC removal first, then safety/risk, then implementation feasibility.
- Choose exactly 3 highest-impact candidates.
- Do not merge unrelated cleanup opportunities into one issue.
- Prefer bounded, actionable cleanup work over broad rewrites.

Issue creation requirements:
- Create 3 issues, one for each selected cleanup opportunity, unless a matching open issue already exists.
- If a matching open issue already exists, add a comment with new evidence instead of creating a duplicate issue.
- If only closed duplicates exist, do not create a new issue for that candidate; move to the next best candidate.
- Use a file-backed markdown body for each new issue (not inline multiline text).
- After creation, read back each created issue body and confirm formatting is correct (no literal `\n` escapes).

Issue body template:
- Context
- Cleanup Pattern(s) Found
- Evidence (files/paths, concise examples)
- Proposed Cleanup
- Estimated LOC Reduction
- Why This Is In The Top 3
- Impact/Risk
- Acceptance Criteria
- Out of Scope

Output to user:
- For each of the 3 final issues:
  - Issue number and URL
  - Estimated LOC reduction
- Provide the final ranking of the 3 selected opportunities from highest to lowest impact
- Briefly mention the core pattern category for each selected issue
- Do not list additional runner-up opportunities beyond these 3

Important constraints:
- Do not implement fixes.
- Do not modify repository files.
- Do not open a PR.
- Keep each issue narrowly scoped so it can be implemented safely in a follow-up cleanup change.
