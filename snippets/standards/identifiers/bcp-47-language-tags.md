---
type: Rule
title: BCP 47 Language Tags
description: Identify languages with BCP 47 tags, lowercase language and uppercase region.
tags: [standards, identifiers, i18n]
status: stable
generated: { by: human:jjgroenendijk, at: 2026-08-24T00:00:00+02:00 }
sources:
  - resource: https://www.rfc-editor.org/info/bcp47
---

Identify every language with a BCP 47 tag. Write the language subtag in lowercase, the region
subtag in uppercase, and join them with a hyphen. Add a region subtag whenever the regional
variant matters, and leave it off when it does not.

Never substitute a language name, a locale identifier with an underscore, or a bare country
code. Browsers, operating systems, and content platforms all negotiate on BCP 47, so any other
form has to be translated before it is usable.
