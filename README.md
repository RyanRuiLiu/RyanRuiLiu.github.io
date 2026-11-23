# personal-website

Ryan Liu 的个人网站（ryanliu.cn）。

## 结构

| 路径 | 说明 |
| --- | --- |
| src/pages/ | 页面路由（首页、博客列表、文章页、关于、RSS） |
| src/layouts/ | 页面布局 |
| src/components/ | 公共组件（页头、页脚、日期、元信息） |
| src/content/blog/ | 博客文章（Markdown，frontmatter 经 schema 校验） |
| src/content.config.ts | 内容集合定义 |
| src/styles/ | 全局样式 |

## 命令

| 命令 | 说明 |
| --- | --- |
| `npm run dev` | 本地开发服务器 |
| `npm run build` | 构建产物至 dist/ |
| `npm run preview` | 本地预览构建产物 |

## 发布

推送 main 触发双通道自动部署：GitHub Pages（Actions 构建）与 ACR 镜像（服务器拉取部署）。
