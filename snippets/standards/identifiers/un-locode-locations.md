---
type: Rule
title: UN/LOCODE Location Codes
description: Abbreviate places with UN/LOCODE rather than an invented site or office code.
tags: [standards, identifiers]
status: stable
generated: { by: human:jjgroenendijk, at: 2026-08-24T00:00:00+02:00 }
sources:
  - resource: https://unece.org/trade/cefact/unlocode-code-list-country-and-territory
---

Abbreviate every place with its UN/LOCODE. The code is the ISO 3166-1 alpha-2 country code
followed by a three-character location code, so it stays unambiguous across countries that
share a city name.

Never invent a site or office abbreviation. Locally coined codes collide, drift between teams,
and cannot be resolved by anyone outside the team that coined them. Look the code up and use it
verbatim in device names, group names, paths, and documentation.
