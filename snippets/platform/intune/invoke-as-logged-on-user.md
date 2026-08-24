---
type: Playbook
title: Invoke As Logged-On User
description: Run a script block as the logged-on user via a self-cleaning scheduled task.
tags: [intune, powershell]
status: stable
generated: { by: human:jjgroenendijk, at: 2026-08-14T00:00:00+02:00 }
---

Execute code in user context from system context. Uses scheduled task with Authenticated Users
group to run script blocks as the currently logged-on user. Self-cleaning after execution.

Wrap this in a function taking the caller's script block and an optional task name that defaults
to a randomised value, so concurrent runs cannot collide.

Build the task body by appending an unregister call for the task's own name to the caller's
script block, so the task deletes itself once the work finishes and nothing is left behind on
the device. Register the task to run `powershell.exe` with no profile in a hidden window against
that body, triggered once a second from now. Set the principal to the `Authenticated Users`
group at the highest run level so it lands in the session of whoever is signed in, and allow it
to start on battery, when available, and without stopping on a power change, with a short
execution time limit and new instances ignored.

Registering alone is not enough: the task is created by SYSTEM, so connect to the task scheduler
through its COM service, read the registered task's security descriptor, append full access for
authenticated users, and write it back. Without that the logged-on user can neither run nor
delete the task.

Catch failures, unregister the task on the way out so a partial registration does not linger,
and release the COM object in a finally block.
