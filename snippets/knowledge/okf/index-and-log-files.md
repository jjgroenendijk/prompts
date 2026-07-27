OKF reserves two filenames inside a knowledge bundle. Every other `.md` file is a concept
document.

`index.md` - optional directory listing for progressive disclosure. Contains no frontmatter.
Group entries under headings with relative links plus a short description pulled from each linked
concept:

```markdown
# Tables

* [Customers](/tables/customers.md) - one row per customer account
* [Invoices](/tables/invoices.md) - billing line items per invoice
```

Exception: the root `index.md` may carry frontmatter solely to declare the target spec version:

```markdown
---
okf_version: "0.1"
---
```

`log.md` - optional chronological update history, newest first, grouped by ISO 8601 date. Bold
prefixes follow convention:

```markdown
## 2026-07-14
* **Creation**: Added customers table concept.
* **Update**: Documented billing_status column.
```

Add an `index.md` when a directory holds enough concepts that a listing aids navigation. Add a
`log.md` when history and attribution matter.
