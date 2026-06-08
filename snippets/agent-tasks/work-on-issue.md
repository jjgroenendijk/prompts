Start working on this gitea issue.

Scrutinize the issue first.
It might be a false alarm, outdated,
missing important codebase context,
or there may be a deeper underlying issue.

Do the following phases using sub agents.
- check whether the current open gitea issue has related issues using a sub agent
- code exploration phase by a sub agent
- internet research phase by a sub agent
- planning phase by a sub agent

Try to split out and delegate as much work as possible to sub agents.
Make sure to update the issue with progress thus far.
Keep updating the issue while working on it, not after, but during.

Follow the branch, commit, push, PR, and verification rules from AGENTS.md.

Before posting a PR, run an internal review using the `code-reviewer` agent against the branch diff and current changes.
Treat that review as findings-first internal feedback.
Fix all actionable review findings, re-verify the changes, and repeat the review if needed until the result is clean or only has clearly documented residual risks.

Only open the PR after:
- the implementation is complete
- verification has passed
- the `code-reviewer` review feedback has been addressed
- the branch is ready for PR checks

After opening the PR:
- check PR checks
- keep fixing and verifying until all PR checks are green

If the issue is already solved, close the issue with comments.
If related open gitea issues are found, comment on those, or close them if this work solves them as well.

Start by reading the gitea issue and creating a new feature branch.
You will focus on gitea issue ###
