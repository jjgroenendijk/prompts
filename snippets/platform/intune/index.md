# Intune

* [Intune App Packaging](app-packaging.md) - Build the .intunewin with IntuneWinAppUtil from package.cmd.
* [Intune App README](app-readme.md) - info/README.md gives Intune admins the portal text and app config.
* [Detection Runs 64-Bit](detection-64bit-context.md) - Detection scripts run 64-bit by default, so they need no Sysnative relaunch.
* [Detection Output Contract](detection-output-contract.md) - A detection script reports installed by exiting 0 with STDOUT, and prints nothing else.
* [Intune Event Logging](event-logging.md) - Write to the IME log path and a custom event log, creating folder and source first.
* [Evidence Based Detection](evidence-based-detection.md) - Detect on evidence the app itself leaves, not a marker the install script wrote.
* [Invoke As Logged-On User](invoke-as-logged-on-user.md) - Run a script block as the logged-on user via a self-cleaning scheduled task.
* [Ask For Organisation Name](organisation-name.md) - Ask the user for the organisation name instead of guessing or inventing one.
* [Intune Project Structure](project-directory-structure.md) - Every Intune Win32 app package has input/, output/, and info/ directories.
* [PsExec System Testing](psexec-system-testing.md) - Test in 32-bit system context with PsExec, since admin context is not representative.
* [Return Installer Exit Codes](return-codes.md) - Install scripts exit with the installer's own code so Intune can retry or reboot.
* [Silent Install](silent-install.md) - Installs run silently and unattended; nobody sees a prompt in SYSTEM context.
* [Sysnative Relaunch](sysnative-relaunch.md) - Relaunch 32-bit IME scripts through Sysnative and return the child's exit code.
* [Uninstall Parity](uninstall-parity.md) - Every install script has an uninstall script that removes what the install added.
* [Winget Binary Locator](winget-binary-locator.md) - Locate the newest winget.exe explicitly, since system context has no winget in PATH.
