# Intune

* [Intune App Packaging](app-packaging.md) - Package Win32 apps into .intunewin with IntuneWinAppUtil via a package.cmd script.
* [Detection Runs 64-Bit](detection-64bit-context.md) - Detection scripts already run 64-bit, so they need no Sysnative relaunch.
* [Intune Event Logging](event-logging.md) - Write to the IME log path and a custom event log, creating folder and source first.
* [Evidence Based Detection](evidence-based-detection.md) - Detect on evidence the app itself leaves, not a marker the install script wrote.
* [Intune Command Format](intune-command-format.md) - Run install and uninstall commands with ExecutionPolicy Bypass and NoProfile.
* [Invoke As Logged-On User](invoke-as-logged-on-user.md) - Run a script block as the logged-on user via a self-cleaning scheduled task.
* [Ask For Organisation Name](organisation-name.md) - Ask the user for the organisation name instead of guessing or inventing one.
* [Intune Project Structure](project-directory-structure.md) - Separate input, output, and information directories in an Intune Win32 app package.
* [PSExec System Testing](psexec-system-testing.md) - Test in 32-bit system context with PSExec, since admin context is not representative.
* [PSExec Tool Source](psexec-tool-source.md) - PSExec ships in the Sysinternals PSTools suite.
* [Silent Install](silent-install.md) - Installs run silently and unattended; nobody sees a prompt in SYSTEM context.
* [Sysnative Relaunch](sysnative-relaunch.md) - Relaunch 32-bit IME scripts through Sysnative to avoid WOW64 redirection.
* [Wait And Propagate Exit Code](wait-and-propagate-exit.md) - The 32-bit parent waits for the 64-bit child and returns its exit code to Intune.
* [Win32 Prep Tool Source](win32-prep-tool-source.md) - IntuneWinAppUtil comes from the official Microsoft Win32 Content Prep Tool repo.
* [Winget Binary Locator](winget-binary-locator.md) - Locate the newest winget.exe explicitly, since system context has no winget in PATH.
