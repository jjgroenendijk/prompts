---
type: Rule
title: UTC Timestamps
description: Record log entries and stored timestamps in UTC; convert to local time on display.
tags: [standards, datetime, logging]
status: stable
generated: { by: human:jjgroenendijk, at: 2026-08-24T00:00:00+02:00 }
---

Record every log entry and stored timestamp in UTC. Mark the offset explicitly so no reader has
to guess: a trailing Z for UTC, or an explicit numeric offset when a local time is unavoidable.

Convert to local time at the point of display only, never in storage. Machines in different
regions, and one machine across a daylight saving transition, produce timestamps that cannot be
ordered or correlated once local time reaches the log.
