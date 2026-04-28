# Faro Web

Faro 搜索引擎的前端界面。灯塔海洋主题，扁平插画风格，暗色/亮色双主题。

## 快速开始

```bash
# 安装依赖
npm install

# 开发模式（Vite 自动代理 API 到 localhost:8000，无需 CORS 配置）
npm run dev

# 生产构建
npm run build
```

## 环境变量

| 变量 | 默认值 | 说明 |
|------|--------|------|
| `VITE_FARO_API_URL` | `""` (同源) | Faro API 地址。开发时留空，由 Vite proxy 处理 |
| `VITE_NAT_ORIGIN` | `""` | SII NAT 代理完整 URL（HMR WebSocket 需要） |

## SII 平台开发

在 SII Notebook 上开发时，Vite 走 NAT 代理，需要两个配置：

**1. 设置 NAT origin（让 HMR 正常工作）**

```bash
VITE_NAT_ORIGIN=https://nat2-notebook-inspire.sii.edu.cn/.../proxy/5173 npm run dev
```

`VITE_NAT_ORIGIN` 就是你浏览器地址栏里 5173 前面的那段完整 URL。

**2. API 代理（已内置，无需额外配置）**

Vite 开发服务器自动将 `/search`、`/health`、`/stats` 代理到 `localhost:8000`，前端请求走同源，无需 CORS。

## 生产部署

生产环境不经过 Vite proxy，需要配置 Faro 后端 CORS：

```bash
# Faro 后端 .env
FARO_CORS_ORIGINS=https://your-faro-web-domain.com
```

或通过 `VITE_FARO_API_URL` 指向后端地址（需要后端开启 CORS）。

## 技术栈

- React 18 + TypeScript
- Vite（内置 API proxy）
- TailwindCSS v4
- Framer Motion（弹簧动画）
- Lucide React（图标）
