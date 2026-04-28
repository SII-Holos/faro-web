#!/usr/bin/env bash
# Start the Faro Web dev server, proxying /search to the SII backend.
#
# Usage:
#   ./web-dev.sh                    # default: SII backend
#   VITE_FARO_API_PROXY=http://localhost:8000 ./web-dev.sh  # local backend

set -euo pipefail
cd "$(dirname "$0")"

# SII NAT proxy address for the Faro backend (port 8000)
SII_BACKEND="https://nat2-notebook-inspire.sii.edu.cn/ws-6e6ba362-e98e-45b2-9c5a-311998e93d65/project-034ec99f-f57a-4c71-9f7e-1654d2c430c8/user-7d61a78a-dcb1-4e29-a7e0-c1ba941dfaaa/vscode/433d8394-f4b9-41fc-9bf0-21b892455b7e/f1fff8a5-3a29-49d3-874b-217b9b64fc5d/proxy/8000"

export VITE_FARO_API_PROXY="${VITE_FARO_API_PROXY:-$SII_BACKEND}"

echo "→ Backend proxy: $VITE_FARO_API_PROXY"

# Install deps if needed
if [ ! -d "node_modules" ]; then
  echo "→ Installing dependencies..."
  npm install
fi

exec npx vite
