---
type: Rule
title: Intune Project Structure
description: Separate input, output, and information directories in an Intune Win32 app package.
tags: [intune, structure]
status: stable
generated: { by: human:jjgroenendijk, at: 2025-12-10T17:25:53+01:00 }
---

Recommended folder structure for Intune Win32 app packages. Separates input files, output packages, and documentation for easier maintenance and updates.

```
📁 Application-Name
├── 📁 input
│   ├── 📄 application-install.ps1
│   ├── 📄 application-uninstall.ps1
│   ├── 📄 application-detect.ps1
│   └── 📄 application-setup.exe
├── 📁 output
│   └── 📄 application-install.intunewin (generated)
├── 📁 information
│   ├── 📄 application-logo.png
│   └── 📄 application-documentation.pdf
├── 📄 package.cmd
```

**Purpose:**
- `input/` - All source files to be packaged (scripts, installers)
- `output/` - Generated .intunewin files
- `information/` - Logo, documentation, notes
- `package.cmd` - Automation script to create .intunewin package
