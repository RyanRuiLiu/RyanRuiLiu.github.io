FROM node:26 AS build
ARG NPM_REGISTRY=https://registry.npmmirror.com
ENV npm_config_registry=${NPM_REGISTRY}
WORKDIR /app
RUN npm install --global pnpm@12.23.0
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm fetch
COPY . .
RUN pnpm install --offline --frozen-lockfile
ENV SITE_URL=https://ryanliu.cn
ENV PUBLIC_SHOW_ICP=true
RUN pnpm build

FROM caddy:2.11.9
COPY Caddyfile /etc/caddy/Caddyfile
COPY --from=build /app/dist /srv
