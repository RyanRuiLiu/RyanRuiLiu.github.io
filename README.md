# personal-website

Ryan Liu 的个人网站，部署于 [ryanliu.cn](https://ryanliu.cn)，基于 Astro 构建的静态站点，包含文章、分类与标签筛选、全站搜索、关于、友链与本地留言墙。

## 技术栈

| 类别 | 选型                                  |
| ---- | ------------------------------------- |
| 框架 | Astro 7（静态输出）                   |
| 交互 | Vue 3                                 |
| 样式 | Tailwind CSS 4、自定义 CSS 变量       |
| 内容 | Astro Content Collections（Markdown） |
| 图标 | Iconify（按需本地图标集）             |
| 字体 | 本地 woff2（见「字体与许可」）        |
| 测试 | Playwright                            |

## 环境要求

- Node.js 26
- pnpm 12.23.0

`package.json` 已声明 `packageManager`，启用 Corepack 时会自动使用对应版本。

## 快速开始

```bash
pnpm install
pnpm dev
```

开发服务器默认运行在 `http://localhost:4321`。

## 常用命令

| 命令                | 说明                                     |
| ------------------- | ---------------------------------------- |
| `pnpm dev`          | 启动开发服务器                           |
| `pnpm build`        | 类型检查后构建至 `dist/`                 |
| `pnpm preview`      | 预览构建产物                             |
| `pnpm check`        | 生成内容类型并执行 Astro 与 Vue 类型检查 |
| `pnpm format`       | 使用 Prettier 格式化                     |
| `pnpm format:check` | 检查格式                                 |
| `pnpm test`         | 构建后运行全部 Playwright 测试           |
| `pnpm test:e2e`     | 在已有 `dist/` 上运行 Playwright 测试    |

## 环境变量

| 变量                   | 默认值               | 说明                                                                |
| ---------------------- | -------------------- | ------------------------------------------------------------------- |
| `SITE_URL`             | `https://ryanliu.cn` | 站点规范地址，用于 canonical、RSS 与 sitemap，必须是纯 HTTP(S) 源   |
| `PUBLIC_SHOW_ICP`      | 未设置               | 值为 `true` 时在页脚显示 ICP 备案与公安备案信息；容器镜像中默认开启 |
| `PUBLIC_SITE_LANGUAGE` | `zh-CN`              | 站点语言，目前仅支持 `zh-CN`                                        |

## 目录结构

```text
.
├── .github/workflows/       # Pages 部署、镜像构建、CI
├── public/                  # 字体、图片、站点图标、备案图标
├── src/
│   ├── components/          # 页头、搜索、侧栏、文章列表、留言墙等组件
│   ├── content/posts/       # Markdown 文章
│   ├── data/                # 分类、封面等选项
│   ├── i18n/                # 文案字典与翻译函数
│   ├── layouts/             # 页面布局
│   ├── lib/                 # 文章读取与摘要
│   ├── pages/               # 路由（首页、文章、关于、友链、留言、RSS、sitemap）
│   ├── styles/              # 全局样式与主题变量
│   ├── config.ts            # 站点信息聚合
│   └── site.config.json     # 站点名称、作者、导航、社交链接、备案信息
├── tests/                   # Playwright 测试
├── Caddyfile                # 容器内静态文件服务配置
├── compose.yaml             # 服务器部署编排
└── Dockerfile               # 镜像构建
```

## 内容写作

文章位于 `src/content/posts/`，新增 Markdown 文件即可发布。文件头字段由 `src/content.config.ts` 校验：

```yaml
---
title: "文章标题"
description: "用一两句话概括这篇文章。"
date: 2026-10-01
category: "开发笔记"
tags: ["Astro"]
cover: "notes"
featured: false
---
```

- `category` 与 `cover` 的可用值见 `src/data/post-options.ts`。
- `lang` 默认 `zh-CN`，当前站点只发布该语言的内容。
- `draft: true` 的文章不会出现在列表、搜索与 RSS 中。

## 测试

Playwright 在桌面与移动两个视口中并行运行，覆盖首页分页与筛选、搜索、主题切换、留言墙存储、文章结构、SEO 元数据、sitemap 与 RSS 一致性等场景。

```bash
pnpm exec playwright install chromium
pnpm test
```

## 部署

推送 `main` 触发两条独立链路：

- **GitHub Pages**：`.github/workflows/deploy.yml` 使用 `withastro/action` 构建并发布，作为镜像站点。
- **自建服务器**：`.github/workflows/docker.yml` 调用共享工作流构建镜像并推送至阿里云 ACR，成功后以 HMAC 签名的请求调用 `https://ryanliu.cn/hooks/deploy-personal-website` 完成部署。服务器侧由 Caddy 反向代理至容器。

镜像构建使用 `pnpm fetch` 与离线安装，构建阶段写入 `SITE_URL`，并开启 `PUBLIC_SHOW_ICP`，因此备案信息只在自建域名部署中显示。

CI 位于 `.github/workflows/ci.yml`，执行格式检查、依赖审计、类型检查、构建与 Playwright 测试。

## 字体与许可

站点字体以本地文件提供，位于 `public/fonts/`：

- Oxanium（`Oxanium-Medium.woff2`）
- ZaoZiGongFangYueYuan（`ZaoZiGongFangYueYuan.woff2`）
- JetBrains Mono、Noto Sans、Noto Sans SC（通过 Fontsource 引入）

JetBrains Mono 与 Noto Sans 系列的授权文本见 `public/fonts/licenses/`。
