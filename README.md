# personal-website

Ryan Liu 的个人网站，部署于 [ryanliu.cn](https://ryanliu.cn)，基于 Astro 构建的静态站点，包含文章、分类与标签筛选、全站搜索、关于、友链与本地留言墙。

## 技术栈

| 类别 | 选型                                      |
| ---- | ----------------------------------------- |
| 框架 | Astro 7（静态输出）                       |
| 交互 | Vue 3                                     |
| 样式 | Tailwind CSS 4、自定义 CSS 变量           |
| 内容 | Astro Content Collections（Markdown）     |
| 图标 | Iconify（按需本地图标集）                 |
| 字体 | 系统字体，不加载网络字体                  |
| 检查 | ESLint、Stylelint、markdownlint、Prettier |
| 测试 | Playwright                                |

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
| `pnpm lint`         | 使用 ESLint 检查脚本与组件               |
| `pnpm lint:fix`     | 自动修复 ESLint 问题                     |
| `pnpm lint:css`     | 使用 Stylelint 检查样式                  |
| `pnpm lint:md`      | 使用 markdownlint 检查 Markdown          |
| `pnpm verify:quick` | 快速验证：格式、检查与构建，不跑测试     |
| `pnpm verify`       | 全量验证：快速验证加 Playwright 测试     |
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
├── public/                  # 图片、站点图标、备案图标
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
├── astro.config.ts          # Astro 配置
├── eslint.config.ts         # ESLint 配置
├── stylelint.config.ts      # Stylelint 配置
├── .prettierrc.json         # Prettier 配置
├── .markdownlint-cli2.jsonc # markdownlint 配置
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

## 代码检查

- `pnpm lint`：ESLint 检查脚本、Vue 组件与 Astro 页面。
- `pnpm lint:css`：Stylelint 检查 CSS、Vue 与 Astro 的样式块。
- `pnpm lint:md`：markdownlint 检查 Markdown。
- `pnpm format`：Prettier 统一格式，并负责 Astro 文件与 Tailwind 类名排序。

Prettier 与 ESLint 的格式规则冲突由 `eslint-config-prettier` 关闭；Stylelint 使用 `stylelint-config-recommended`，不含格式规则；Markdown 关闭行长度规则以匹配 Prettier 的 `proseWrap: preserve`。

日常改动运行 `pnpm verify:quick`；交付前运行 `pnpm verify`。类型检查由 `build` 执行一次。

## 测试

Playwright 在桌面与移动两个视口中并行运行，覆盖首页分页与筛选、搜索、主题切换、留言墙存储、文章结构、SEO 元数据、sitemap 与 RSS 一致性等场景。

本地默认使用 8 个 worker，CI 使用 3 个。若本地终端设置了 `CI=true`，Playwright 会按 CI 配置运行；此时可先清除该变量再执行本地验证。

```bash
pnpm exec playwright install chromium
pnpm test
```

## 部署

推送 `main` 触发两条独立链路：

- **GitHub Pages**：`.github/workflows/deploy.yml` 使用 `withastro/action` 构建并发布，作为镜像站点。
- **自建服务器**：`.github/workflows/docker.yml` 调用共享工作流构建镜像并推送至阿里云
  ACR，成功后以 HMAC 签名的请求调用
  `https://ryanliu.cn/hooks/deploy-personal-website`
  完成部署。服务器侧由 Caddy 反向代理至容器。

镜像构建使用 `pnpm fetch` 与离线安装，构建阶段写入 `SITE_URL`，并开启 `PUBLIC_SHOW_ICP`，因此备案信息只在自建域名部署中显示。

CI 位于 `.github/workflows/ci.yml`，执行格式检查、脚本与组件检查、样式检查、Markdown 检查、依赖审计、类型检查、构建与 Playwright 测试。
