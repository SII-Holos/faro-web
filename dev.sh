#!/usr/bin/env bash
# Faro Web 开发启动脚本
# 用法:
#   ./dev.sh                                    # 不加 NAT，本地直接访问
#   ./dev.sh "https://nat2-.../proxy/5173/"     # SII NAT 代理

set -euo pipefail

if [ $# -gt 0 ]; then
  export VITE_NAT_ORIGIN="$1"
  echo "🌐 NAT mode: $VITE_NAT_ORIGIN"
else
  echo "💻 Local mode: http://localhost:5173"
fi

exec npx vite --host 0.0.0.0
