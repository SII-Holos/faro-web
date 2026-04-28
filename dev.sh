#!/usr/bin/env bash
# Faro Web 开发启动脚本
# 一行启动，NAT URL 已内置

set -euo pipefail

NAT_URL="https://nat2-notebook-inspire.sii.edu.cn/ws-6e6ba362-e98e-45b2-9c5a-311998e93d65/project-034ec99f-f57a-4c71-9f7e-1654d2c430c8/user-7d61a78a-dcb1-4e29-a7e0-c1ba941dfaaa/vscode/433d8394-f4b9-41fc-9bf0-21b892455b7e/f1fff8a5-3a29-49d3-874b-217b9b64fc5d/proxy/5173"

if [ "${1:-}" = "--local" ]; then
  echo "💻 Local mode: http://localhost:5173"
  exec npx vite --host 0.0.0.0
else
  export VITE_NAT_ORIGIN="$NAT_URL"
  echo "🌐 NAT mode: $NAT_URL"
  exec npx vite --host 0.0.0.0
fi
