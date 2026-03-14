Start working on this gitea issue.

Scrutinize the issues first,
it might be a false alarm, outdated,
or some codebase aspects might be forgotten,
or maybe there is a deeper underlying issue.

Do the following phases using a sub agent.
- check if current open gitea issue has related issues using a sub agent.
- - Code exploration phase by a sub agent
- Internet research phase by a sub agent
- Planning phase by a sub agent

Try to split out and delegate as much work as possible to sub agents.
Make sure to update the issue with progress thus far.
And keep updating the issue while working on it, not after, but during.

Make sure to check PR checks.
Keep fixing and verifying until all pr checks are green.
Follow the branch, commit, pr, push, rules from AGENTS.md.
If the issue is solved already, close the issue with comments.
If related open gitea issues had been found, comment on those, or close them if this solves the related issue as well.

Start by reading the gitea issue and creating a new feature branch.
You will focus on gitea issue ###
