---
type: Rule
title: RFC 4122 GUID Format
description: Write GUIDs in RFC 4122 canonical form, lowercase hex, hyphenated, no braces.
tags: [standards, identifiers]
status: stable
generated: { by: human:jjgroenendijk, at: 2026-08-24T00:00:00+02:00 }
sources:
  - resource: https://www.rfc-editor.org/rfc/rfc4122
---

Write every GUID in the RFC 4122 canonical textual form: thirty-two hexadecimal digits in five
hyphen-separated groups. Use lowercase hex throughout and no surrounding braces or parentheses.

Normalise on the way in. Tools that emit braced or uppercase forms produce values that fail a
naive string comparison against the same identifier written canonically, so strip the braces and
lowercase the digits before storing, logging, or comparing.
