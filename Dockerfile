FROM node:26 AS build
ARG NPM_REGISTRY=https://registry.npmmirror.com
ENV npm_config_registry=${NPM_REGISTRY}
WORKDIR /src
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build:site
FROM caddy:2.11.9
COPY Caddyfile /etc/caddy/Caddyfile
COPY --from=build /src/dist /srv
