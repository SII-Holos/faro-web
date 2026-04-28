# Faro Web

Faro 搜索引擎的前端界面。灯塔海洋主题，扁平插画风格，暗色/亮色双主题。

## 快速开始

```bash
# 安装依赖
npm install

# 开发模式（默认连接 localhost:8000 的 Faro API）
npm run dev

# 生产构建
npm run build
```

## 环境变量

| 变量 | 默认值 | 说明 |
|------|--------|------|
| `VITE_FARO_API_URL` | `""` (同源) | Faro API 地址，如 `http://localhost:8000` |

示例：

```bash
VITE_FARO_API_URL=http://localhost:8000 npm run dev
```

## 后端 CORS 配置

前端开发服务器运行在 `http://localhost:5173`，需要在 Faro 后端配置 CORS 允许跨域访问：

```bash
# 在 Faro 后端的 .env 或环境变量中设置
FARO_CORS_ORIGINS=http://localhost:5173
```

多个域名用逗号分隔。不配置则前端无法调用 API（浏览器会拦截跨域请求）。

## 技术栈

- React 18 + TypeScript
- Vite
- TailwindCSS v4
- Framer Motion（弹簧动画）
- Lucide React（图标）
