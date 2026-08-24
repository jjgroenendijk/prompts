---
type: Rule
title: ISO 8601 Dates And Times
description: Write every date and time in ISO 8601, never in a locale-specific format.
tags: [standards, datetime]
status: stable
generated: { by: human:jjgroenendijk, at: 2026-08-24T00:00:00+02:00 }
sources:
  - resource: https://www.iso.org/iso-8601-date-and-time-format.html
---

Write every date and time in ISO 8601. Order the fields from largest to smallest, pad each one
to its full width, and separate date from time with a literal T. A date alone is four-digit
year, two-digit month, two-digit day, hyphen separated.

Never write a locale-specific format. Day-first and month-first orderings are ambiguous across
readers and sort wrong as text. ISO 8601 sorts lexicographically into chronological order, which
is what log files, filenames, and generated indexes depend on.
