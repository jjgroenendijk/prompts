# Intune

* [Intune App Packaging](app-packaging.md) - Build the .intunewin with IntuneWinAppUtil from package.cmd.
* [Intune App README](app-readme.md) - The package README.md gives Intune admins the portal text and app config.
* [Detection Bitness](detection-64bit-context.md) - Check OS and process bitness with .NET in detection scripts.
* [Detection Output Contract](detection-output-contract.md) - Detection exits 0 and writes STDOUT only when the app is found.
* [Intune Event Logging](event-logging.md) - Log install and uninstall runs to a file and a Windows event log.
* [Evidence Based Detection](evidence-based-detection.md) - Detect what the app leaves behind, not a marker the script wrote.
* [Invoke As Logged-On User](invoke-as-logged-on-user.md) - Run user-context code from SYSTEM with a self-removing scheduled task.
* [Ask For Organisation Name](organisation-name.md) - Ask for the organisation name; never guess it.
* [Intune Project Structure](project-directory-structure.md) - Each Intune package has input/, output/, a logo, a README.md, and package.cmd.
* [PsExec System Testing](psexec-system-testing.md) - Test scripts as SYSTEM in 32-bit PowerShell with PsExec.
* [Return Installer Exit Codes](return-codes.md) - Exit with the installer's exit code so Intune can retry or reboot.
* [Silent Install](silent-install.md) - Installs run silent and unattended; nobody sees a prompt.
* [Sysnative Relaunch](sysnative-relaunch.md) - Relaunch install scripts in 64-bit PowerShell and return its exit code.
* [Uninstall Parity](uninstall-parity.md) - Each install script has an uninstall script that removes what it added.
* [Winget Binary Locator](winget-binary-locator.md) - Find winget.exe by path, since SYSTEM has no winget on PATH.
