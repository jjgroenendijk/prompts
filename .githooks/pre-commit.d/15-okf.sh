#!/bin/sh
set -eu

cd app
node scripts/check-okf.mjs
