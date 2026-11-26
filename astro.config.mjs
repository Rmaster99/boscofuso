// @ts-check
import { defineConfig } from "astro/config";
import { writeFile } from "node:fs/promises";

// Sitemap generata automaticamente a ogni build, senza dipendenze aggiuntive.
// Il file public/sitemap.xml è la versione iniziale di riferimento;
// quello in dist/sitemap.xml viene rigenerato dopo ogni compilazione.
function boscofusoSitemap() {
  const origin = "https://www.boscofuso.com";
  const translatedSlugs = new Map([
    ["/it/libri/", "/en/books/"],
    ["/it/stampa-e-gioca/", "/en/print-and-play/"],
    ["/it/tana-delle-astuzie/", "/en/clever-den/"],
  ]);
  const reversedSlugs = new Map(
    [...translatedSlugs].map(([italian, english]) => [english, italian]),
  );
  // URL che non devono comparire nell'indice: privacy, vecchi redirect.
  const excluded = new Set([
    "/it/privacy/", "/en/privacy/",
    "/it/gioca-e-stampa/", "/en/gioca-e-stampa/",
  ]);

  const toPath = (pathname) => {
    const raw = `/${String(pathname).replace(/^\/+/, "")}`;
    return raw.endsWith("/") ? raw : `${raw}/`;
  };

  const otherLanguage = (path) => {
    if (translatedSlugs.has(path)) return translatedSlugs.get(path);
    if (reversedSlugs.has(path)) return reversedSlugs.get(path);
    if (path.startsWith("/it/")) return `/en/${path.slice(4)}`;
    if (path.startsWith("/en/")) return `/it/${path.slice(4)}`;
    return null;
  };

  const esc = (value) => String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

  return {
    name: "boscofuso-sitemap",
    hooks: {
      "astro:build:done": async ({ pages, dir, logger }) => {
        // Usa solo gli URL effettivamente generati da Astro nella build.
        const paths = new Set(
          pages.map((page) => toPath(page.pathname)).filter((path) =>
            /^\/(it|en)\//.test(path) && !excluded.has(path)
          ),
        );
        const records = [];
        for (const path of [...paths].sort()) {
          const url = origin + path;
          const alt = otherLanguage(path);
          const hasPair = alt && paths.has(alt);
          const it = path.startsWith("/it/") ? path : alt;
          const en = path.startsWith("/en/") ? path : alt;
          const links = hasPair ? [
            ["it", origin + it],
            ["en", origin + en],
            ["x-default", origin + it],
          ].map(([lang, href]) =>
            `    <xhtml:link rel="alternate" hreflang="${lang}" href="${esc(href)}" />`
          ).join("\n") : "";
          records.push(`  <url>\n    <loc>${esc(url)}</loc>${links ? "\n" + links : ""}\n  </url>`);
        }
        const xml = [
          '<?xml version="1.0" encoding="UTF-8"?>',
          '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
          ...records,
          '</urlset>',
          '',
        ].join("\n");
        await writeFile(new URL("./sitemap.xml", dir), xml, "utf8");
        logger.info(`sitemap.xml generata con ${records.length} URL`);
      },
    },
  };
}

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
  integrations: [boscofusoSitemap()],
});
