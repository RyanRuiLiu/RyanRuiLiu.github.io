import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import vue from "@astrojs/vue";
import tailwindcss from "@tailwindcss/vite";
import { loadEnv } from "vite";

const { SITE_URL = "https://ryanliu.cn" } = loadEnv(
  process.env.NODE_ENV ?? "production",
  process.cwd(),
  "SITE_URL",
);
const site = new URL(SITE_URL);
if (
  !["http:", "https:"].includes(site.protocol) ||
  site.pathname !== "/" ||
  site.search ||
  site.hash ||
  site.username ||
  site.password
) {
  throw new Error(
    "SITE_URL must be an HTTP(S) origin, such as https://example.com, without a path, credentials, query, or fragment.",
  );
}

// https://astro.build/config
export default defineConfig({
  site: site.href,
  output: "static",
  trailingSlash: "always",
  compressHTML: true,
  integrations: [
    vue(),
    sitemap({
      filter: (page) =>
        !["/404/", "/404.html", "/articles/", "/comments/"].includes(
          new URL(page).pathname,
        ),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
