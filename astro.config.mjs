// @ts-check
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://www.boscofuso.com",
  trailingSlash: "always",

  i18n: {
    defaultLocale: "it",
    locales: ["it", "en"],
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: false,
    },
  },
});
