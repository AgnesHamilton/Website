export const css = `
@font-face { font-family:Aboreto; font-style:normal; font-weight:400; font-display:swap; src:url(https://static.parastorage.com/tag-bundler/api/v1/fonts-cache/googlefont/woff2/s/aboreto/v2/5DCXAKLhwDDQ4N8bpKPUAk6t1Sc.woff2) format("woff2"); }
@font-face { font-family:Raleway; font-style:normal; font-weight:400; font-display:swap; src:url(https://fonts.gstatic.com/s/raleway/v37/1Ptrg8zYS_SKggPNwN4rWqhPANqczVsq4A.woff2) format("woff2"); }
@font-face { font-family:Raleway; font-style:normal; font-weight:600; font-display:swap; src:url(https://fonts.gstatic.com/s/raleway/v37/1Ptrg8zYS_SKggPNwPIsWqhPANqczVsq4A.woff2) format("woff2"); }
:root { color-scheme: light; --ink:#2f2f30; --active:#365f58; font-family: Arial, Helvetica, sans-serif; }
* { box-sizing:border-box; }
html { background:#fff; }
body { margin:0; color:var(--ink); background:#fff; min-width:320px; }
a { color:inherit; }
img { display:block; max-width:100%; }
.site-header { width:min(100%, 980px); margin:0 auto; padding:14px 0 0; }
.site-header--booking { padding:42px 18px 0; }
.brand { display:none; }
nav { display:flex; justify-content:center; align-items:stretch; flex-wrap:nowrap; overflow-x:auto; }
nav a { flex:0 0 auto; display:grid; place-items:center; min-height:58px; padding:0 18px; border-left:1px solid var(--ink); color:var(--ink); font-size:12px; font-weight:400; text-decoration:none; white-space:nowrap; }
.site-header:not(.site-header--booking) nav a { min-height:25px; padding:0 14px; font:400 12px/1 Aboreto,serif; }
nav a:last-child { border-right:1px solid var(--ink); }
nav a[aria-current="page"], nav a:hover { color:#fff; background:var(--active); }
.page-title { width:min(100%, 980px); margin:0 auto; padding:24px 0 6px; }
.page-title h1 { margin:0; font:400 clamp(44px,5vw,52px)/1.1 Arial,sans-serif; letter-spacing:.01em; }
.home-original { width:min(100%,980px); min-height:796px; margin:0 auto; display:grid; grid-template-columns:394px 586px; align-items:center; position:relative; }
.home-original img { width:586px; height:796px; object-fit:cover; }
.home-original h1 { position:relative; z-index:1; margin:0; padding-right:24px; font:400 58px/1.14 Aboreto,serif; letter-spacing:.035em; white-space:normal; }
.home-original h1 span { display:block; margin-bottom:8px; font-size:40px; }
.legacy-gallery { width:min(100%,980px); margin:0 auto; display:grid; grid-template-columns:repeat(4,minmax(0,1fr)); gap:3px; align-items:start; }
.legacy-gallery img { width:100%; height:auto; object-fit:cover; }
.legacy-gallery--tattoos img { aspect-ratio:245/264; object-fit:cover; }
.legacy-gallery--cover-ups img { aspect-ratio:245/190; object-fit:cover; background:#000; }
.legacy-gallery--paintings img { aspect-ratio:1; object-fit:cover; }
.legacy-gallery--paintings img:first-child { object-fit:contain; }
.legacy-gallery--shop { width:min(100%,980px); margin:0 auto; padding:0 18px 70px; grid-template-columns:repeat(3,1fr); gap:18px; }
.about-original { width:min(100%,980px); min-height:790px; margin:40px auto 80px; display:grid; grid-template-columns:523px 457px; align-items:center; background:#3b675f; }
.about-original__copy { min-height:790px; padding:25px 18px; display:flex; flex-direction:column; justify-content:center; background:#3b675f; }
.about-original__copy p { margin:0 0 15px; color:#fff; text-align:center; font:400 15px/1.25 Aboreto,serif; }
.about-original__copy a { color:#fff; }
.about-original img { width:447px; height:755px; margin-right:10px; border:3px solid #fff; border-radius:190px 190px 14px 14px; object-fit:cover; }
.cover-intro { width:min(100%,980px); margin:0 auto; padding:0 0 22px; border-bottom:2px solid #b7b229; font-family:Aboreto,serif; }
.cover-intro p { margin:0 0 15px; font:400 13px/1.25 Aboreto,serif; text-transform:uppercase; }
.shop-original { width:min(100%,980px); margin:0 auto; padding:40px 0 70px; display:grid; grid-template-columns:390px 1fr; gap:24px 36px; }
.shop-original h1 { margin:0 0 2px; font:400 52px/1 Aboreto,serif; white-space:nowrap; }
.gift-copy p { font-size:18px; line-height:1.15; }
.gift-copy>a { display:grid; place-items:center; width:390px; height:120px; margin-top:42px; background:#c5bd3d; box-shadow:8px 8px #82772f; font:400 24px/1 Arial,sans-serif; text-decoration:none; }
.gift-image { width:551px; height:345px; margin-top:58px; object-fit:cover; }
.hoodie-card { grid-column:1/-1; display:grid; grid-template-columns:480px 1fr; padding:4px; border:3px solid #ff8500; background:#626064; color:#fff; box-shadow:0 0 3px #333; }
.hoodie-card img { width:476px; height:438px; object-fit:cover; }
.hoodie-card>div { padding:16px 24px; text-align:center; }
.hoodie-card h2 { margin:0; font-size:28px; font-weight:600; }
.hoodie-card h3 { margin:22px 0; }
.hoodie-card ul { text-align:left; font-size:12px; }
.hoodie-card a { display:block; margin:70px auto 0; padding:12px; max-width:270px; background:#ff8500; box-shadow:8px 8px #7c6621; color:#fff; font-size:24px; text-decoration:none; }
.faq-original { width:min(100%,930px); margin:0 auto; padding:16px 0 70px; }
.faq-original article { margin-bottom:16px; }
.faq-original h2 { margin:0; font:700 18px/1.15 Raleway,Arial,sans-serif; }
.faq-original p { margin:0; font:400 14px/1.15 Raleway,Arial,sans-serif; }
.section, .booking-panel { width:min(100%, 980px); margin:0 auto; padding:30px 18px 70px; }
.section-copy { max-width:720px; }
h2 { margin:0 0 22px; font:400 24px/1.4 Raleway, Arial, sans-serif; }
p { margin:0 0 18px; font:400 14px/1.6 Raleway, Arial, sans-serif; }
.actions { display:flex; flex-wrap:wrap; gap:14px; margin-top:26px; }
.button { padding:11px 18px; border:1px solid var(--ink); background:#fff; color:var(--ink); font-size:12px; text-decoration:none; }
.button:hover, .button.primary { background:var(--active); color:#fff; border-color:var(--active); }
.booking-form-section { width:min(100%,980px); margin:0 auto; padding:0 18px 80px; display:grid; grid-template-columns:minmax(220px,.65fr) minmax(0,1.35fr); gap:70px; }
.booking-intro h2 { margin-bottom:24px; }
.booking-form { border-top:1px solid var(--ink); padding-top:24px; }
.form-grid { display:grid; grid-template-columns:1fr 1fr; gap:24px 18px; }
.booking-form label { display:grid; gap:8px; font-size:11px; line-height:1.3; letter-spacing:.03em; }
.booking-form input:not([type="checkbox"]), .booking-form textarea { width:100%; border:0; border-bottom:1px solid #777; border-radius:0; padding:9px 2px; color:var(--ink); background:#fff; font:400 14px/1.45 Raleway,Arial,sans-serif; }
.booking-form textarea { border:1px solid #777; padding:10px; resize:vertical; }
.booking-form input:focus, .booking-form textarea:focus { outline:2px solid var(--active); outline-offset:2px; }
.form-wide { grid-column:1/-1; }
.form-consent { display:flex!important; grid-template-columns:auto 1fr; align-items:start; margin:26px 0; font-size:12px!important; }
.booking-form button { min-height:46px; padding:0 24px; border:1px solid var(--ink); background:var(--active); color:#fff; font:600 12px/1 Arial,sans-serif; cursor:pointer; }
.booking-form button:hover { background:var(--ink); }
.form-hidden { display:none; }
.confirmation { min-height:70vh; }
.confirmation p { max-width:560px; margin:28px 0; }
.events-section, .event-detail { width:min(100%,980px); margin:0 auto; padding:0 18px 80px; }
.events-legacy-title { width:min(100%,980px); margin:0 auto; padding:52px 118px 35px; }
.events-legacy-title h1 { margin:0; font:400 58px/1.1 Aboreto,serif; }
.events-legacy { width:min(100%,980px); margin:0 auto; }
.events-legacy article { display:grid; grid-template-columns:1fr 490px; gap:44px; align-items:center; padding:12px 18px; border-bottom:1px solid #333; }
.events-legacy article:nth-child(2) { grid-template-columns:490px 1fr; align-items:start; padding-top:18px; }
.events-legacy article img { width:100%; max-height:620px; object-fit:contain; }
.events-legacy article h2 { margin:32px 0 80px; font:400 30px/1.1 Aboreto,serif; }
.events-legacy article:nth-child(2) h2 { margin:32px 0 12px; }
.events-legacy article p { font-size:14px; }
.legacy-event-date { color:#ff3216; font-size:24px!important; }
.cms-events { margin-top:70px; }
.events-list { border-top:1px solid var(--ink); }
.event-card { display:grid; grid-template-columns:minmax(180px,.7fr) minmax(0,1.3fr); gap:36px; padding:34px 0; border-bottom:1px solid #aaa; }
.event-card img { width:100%; aspect-ratio:4/3; object-fit:cover; }
.event-card h2 { margin-bottom:12px; }
.event-card h2 a { text-decoration:none; }
.event-date { font-size:12px; text-transform:uppercase; letter-spacing:.04em; }
.events-empty { padding:50px 0; border-top:1px solid var(--ink); border-bottom:1px solid var(--ink); }
.events-archive { border-top:1px solid var(--ink); padding-top:30px; }
.events-archive ul { list-style:none; padding:0; }
.events-archive li { display:flex; justify-content:space-between; gap:20px; padding:13px 0; border-bottom:1px solid #bbb; font-size:13px; }
.event-detail { padding-top:70px; max-width:820px; }
.event-detail h1 { margin:42px 0 24px; font-size:clamp(48px,8vw,88px); line-height:1; font-weight:300; }
.event-detail>img { width:100%; margin:36px 0; }
.event-body { margin:30px 0; }
.event-back { font-size:12px; }
.legacy-feed { border-top:1px solid var(--ink); padding-top:34px; }
.legacy-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:42px 18px; }
.legacy-card img { width:100%; aspect-ratio:1; object-fit:cover; margin-bottom:16px; }
.legacy-card h3 { margin:8px 0 12px; font:400 22px/1.15 Arial,sans-serif; }
.legacy-card h3 a { text-decoration:none; }
.legacy-card p:last-child { display:-webkit-box; -webkit-line-clamp:4; -webkit-box-orient:vertical; overflow:hidden; }
.gallery { columns:4 150px; column-gap:10px; margin-top:30px; }
.gallery figure { break-inside:avoid; margin:0 0 10px; }
.gallery img { width:100%; height:auto; }
figcaption { display:none; }
.site-footer { width:min(100%, 980px); margin:0 auto; display:flex; flex-wrap:wrap; gap:8px; padding:40px 18px 24px; font:400 12px/1.4 Raleway, Arial, sans-serif; }
.site-footer p { margin:0; }
.site-footer a { text-underline-offset:3px; }
@media (max-width:700px) {
  .site-header { padding-top:18px; }
  nav { justify-content:flex-start; }
  nav a { min-height:48px; padding:0 13px; font-size:11px; }
  .page-title { padding-top:54px; }
  .home-original { min-height:0; padding-top:30px; display:grid; grid-template-columns:1fr; }
  .home-original img { width:100%; height:auto; aspect-ratio:586/796; }
  .home-original h1 { margin:30px 18px 24px; padding:0; font-size:clamp(42px,14vw,80px); line-height:1.08; white-space:normal; }
  .home-original h1 span { font-size:clamp(22px,7vw,40px); }
  .gallery { columns:2; }
  .legacy-gallery { grid-template-columns:repeat(2,minmax(0,1fr)); }
  .legacy-gallery--shop, .about-original { grid-template-columns:1fr; }
  .about-original { padding-top:30px; }
  .about-original__copy { min-height:0; padding:38px 22px; order:2; }
  .about-original__copy p { font-size:15px; }
  .about-original img { width:100%; height:auto; order:1; }
  .cover-intro, .faq-original { padding-left:18px; padding-right:18px; }
  .shop-original { padding:30px 18px 60px; grid-template-columns:1fr; }
  .shop-original h1 { font-size:38px; white-space:normal; }
  .gift-copy>a { width:100%; }
  .gift-image { width:100%; height:auto; margin-top:0; }
  .hoodie-card { grid-column:auto; grid-template-columns:1fr; }
  .hoodie-card img { width:100%; height:auto; }
  .booking-form-section { grid-template-columns:1fr; gap:30px; }
  .form-grid { grid-template-columns:1fr; }
  .form-wide { grid-column:auto; }
  .event-card { grid-template-columns:1fr; }
  .events-legacy-title { padding:40px 18px 24px; }
  .events-legacy-title h1 { font-size:38px; }
  .events-legacy article, .events-legacy article:nth-child(2) { grid-template-columns:1fr; gap:20px; }
  .events-legacy article:nth-child(2) img { order:2; }
  .events-legacy article h2 { margin:20px 0; }
  .legacy-grid { grid-template-columns:1fr; }
}
`;
