Intune detection scripts always run in 64-bit context, unlike install and
uninstall scripts which run in the 32-bit IME host. Detection scripts therefore
do not need a Sysnative relaunch to reach native 64-bit file system and registry
locations.
