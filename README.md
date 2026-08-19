# Agnes Hamilton Site Migration

This folder is the migration workspace for moving `agneshamilton.com` away from Wix while preserving SEO value.

## Astro commands

```sh
npm run dev
npm run build
npm run preview
```

Netlify is configured through `netlify.toml` to build the Astro site and publish `dist/`.

## Migration commands

`npm run audit` captures the current Wix sitemap, page HTML, SEO titles/descriptions, and URL inventory into `backup/` and `migration/`.

`npm run build:legacy` creates the earlier static prototype in `dist/`.

## Migration Priorities

- Keep the domain: `agneshamilton.com`.
- Preserve high-value routes such as `/`, `/tattoos`, `/cover-ups`, `/booking`, `/about`, `/faq`, `/paintings`, `/shop`, and `/upcoming-events`.
- Add 301 redirects for old or retired Wix URLs.
- Keep Wix active until the new site is launched, crawled, and verified in Google Search Console.
