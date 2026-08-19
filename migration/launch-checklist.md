# Launch Checklist

## Before Rebuild Content Is Final

- Keep the Wix plan active until the replacement site is live and verified.
- In Wix, duplicate the current site as an internal restore point.
- Download key media from Wix Media Manager, especially tattoo portfolio images, painting images, shop images, and Agnes's headshot.
- Copy exact FAQ, booking policy, deposit policy, cancellation policy, and aftercare copy from Wix.
- Choose the booking platform and confirm whether it supports embeds, direct links, payments, deposits, intake forms, and email notifications.

## SEO Preservation

- Use `migration/url-inventory.csv` as the source list of current indexed URLs.
- Keep these replacement URLs live: `/`, `/tattoos`, `/cover-ups`, `/booking`, `/shop`, `/about`, `/upcoming-events`, `/faq`, `/paintings`.
- Use `dist/_redirects` or the host equivalent for 301 redirects.
- Do not delete old blog URLs without checking Google Search Console traffic first. The current default is to redirect old `/single-post/...` URLs to `/upcoming-events`.
- Preserve current page titles and meta descriptions where they are still accurate.
- Add Google Search Console and submit the new sitemap after launch.

## Domain Cutover

- Confirm where `agneshamilton.com` is registered.
- If the domain is registered at Wix, either point records to the new host or transfer the domain away from Wix before changing name servers.
- Lower DNS TTL before launch if the registrar allows it.
- Launch on a temporary preview URL first and click through every route.
- Switch DNS only after redirects, sitemap, booking, contact links, and mobile layout are verified.

## After Launch

- Check `https://agneshamilton.com` and `https://www.agneshamilton.com` both resolve correctly.
- Test `/booking`, form submission or booking link, email links, and Instagram link.
- Crawl the old URL list and confirm every URL returns either `200` or a correct `301`.
- Watch Google Search Console for indexing, redirect, and 404 issues for at least two weeks.
