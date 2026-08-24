---
type: Playbook
title: Intune Event Logging
description: Write to the IME log path and a custom event log, creating folder and source first.
tags: [intune, logging]
status: stable
generated: { by: human:jjgroenendijk, at: 2026-08-14T00:00:00+02:00 }
---

Use consistent Intune logging: write to the IME log path and to a custom Windows Event Log for
the app. Create the log folder and event source before writing; build the log path from
variables so installs and uninstalls stay separated.

Name the event log after the organisation and the event source after the application, both held
in variables at the top of the script. Build the log file path under the IME log directory in
`ProgramData`, combining the application name with the current date so each run is its own file
and installs never overwrite uninstalls. Derive the log directory from that path rather than
repeating it.

Before the first write, create the log directory when it does not exist, and register the event
source against the organisation log when the source does not already exist. Registering a source
needs administrative rights, so do it once at startup, not per message.

Write every message through a single logging function taking the message and a severity level
that defaults to information. That function prefixes a sortable timestamp, emits the line to
standard output so the IME transcript captures it, appends the same line to the log file, and
writes the message to the event log under the registered source with a fixed event id. One
function, three destinations, so no call site can log to only one of them.
