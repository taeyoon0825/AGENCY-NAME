import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { resolvePublicSite } from './src/config/publicSite.js';
import { siteConfig } from './src/data/siteContent.js';

const escape = (value) =>
  value.replace(
    /[&<>"']/g,
    (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char],
  );

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_');
  // Netlify supplies the real issued address; never invent a hostname.
  env.VITE_SITE_URL ||=
    process.env.CONTEXT === 'production' ? process.env.URL : process.env.DEPLOY_PRIME_URL;
  // Netlify previews must never inherit production search visibility.
  if (process.env.CONTEXT && process.env.CONTEXT !== 'production') env.VITE_SITE_STAGE = 'review';
  const settings = resolvePublicSite(env);
  return {
    define: {
      'import.meta.env.VITE_SITE_STAGE': JSON.stringify(env.VITE_SITE_STAGE || 'review'),
      'import.meta.env.VITE_SITE_URL': JSON.stringify(env.VITE_SITE_URL || ''),
    },
    plugins: [
      react(),
      {
        name: 'public-site-metadata',
        transformIndexHtml(html) {
          const title = `${siteConfig.companyName} | 인플루언서 마케팅 에이전시${settings.review ? ' · 검토용' : ''}`;
          const tags = [
            {
              tag: 'meta',
              attrs: {
                name: 'robots',
                content: settings.indexable ? 'index, follow' : 'noindex, nofollow',
              },
              injectTo: 'head',
            },
            { tag: 'meta', attrs: { property: 'og:title', content: title }, injectTo: 'head' },
            {
              tag: 'meta',
              attrs: { property: 'og:description', content: siteConfig.shortDescription },
              injectTo: 'head',
            },
            {
              tag: 'meta',
              attrs: { name: 'description', content: siteConfig.shortDescription },
              injectTo: 'head',
            },
            {
              tag: 'meta',
              attrs: { property: 'og:image', content: `${settings.siteUrl}/og-image.png` },
              injectTo: 'head',
            },
            {
              tag: 'meta',
              attrs: { property: 'og:image:width', content: '1200' },
              injectTo: 'head',
            },
            {
              tag: 'meta',
              attrs: { property: 'og:image:height', content: '630' },
              injectTo: 'head',
            },
            { tag: 'meta', attrs: { property: 'og:locale', content: 'ko_KR' }, injectTo: 'head' },
          ];
          if (settings.indexable) {
            tags.push({
              tag: 'link',
              attrs: { rel: 'canonical', href: `${settings.siteUrl}/` },
              injectTo: 'head',
            });
            tags.push({
              tag: 'meta',
              attrs: { property: 'og:url', content: `${settings.siteUrl}/` },
              injectTo: 'head',
            });
          }
          return {
            html: html.replace(/<title>.*?<\/title>/, `<title>${escape(title)}</title>`),
            tags,
          };
        },
        generateBundle() {
          this.emitFile({
            type: 'asset',
            fileName: 'robots.txt',
            source: [
              'User-agent: *',
              'Allow: /',
              settings.indexable ? `Sitemap: ${settings.siteUrl}/sitemap.xml` : '',
              '',
            ].join('\n'),
          });
          // Allow crawling so crawlers can see noindex; noindex is not access control.
          this.emitFile({
            type: 'asset',
            fileName: '_headers',
            source: settings.indexable ? '' : '/*\n  X-Robots-Tag: noindex, nofollow\n',
          });
          if (settings.indexable)
            this.emitFile({
              type: 'asset',
              fileName: 'sitemap.xml',
              source: [
                '<?xml version="1.0" encoding="UTF-8"?>',
                '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
                '  <url>',
                `    <loc>${escape(settings.siteUrl)}/</loc>`,
                '  </url>',
                '</urlset>',
              ].join('\n'),
            });
        },
      },
    ],
  };
});
