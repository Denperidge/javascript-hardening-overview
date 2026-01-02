#!/usr/bin/env bash

# Usage: ./entry.sh packagename

# Currently limited to install
NPQ_PKG_MGR=pnpm pnpm exec deno run -A npm:npq install $1