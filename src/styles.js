export const css = `
:root {
  color-scheme: light;
  --ink: #181416;
  --muted: #665c61;
  --paper: #fffaf7;
  --surface: #ffffff;
  --line: #eadfd9;
  --red: #bb2c36;
  --teal: #0d8077;
  --gold: #d89b35;
  --shadow: 0 18px 45px rgba(24, 20, 22, 0.12);
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  background: var(--paper);
  color: var(--ink);
}

a {
  color: inherit;
}

img {
  display: block;
  max-width: 100%;
}

.site-header {
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding: 18px clamp(20px, 4vw, 56px);
  background: rgba(255, 250, 247, 0.92);
  border-bottom: 1px solid var(--line);
  backdrop-filter: blur(14px);
}

.brand {
  display: grid;
  gap: 2px;
  text-decoration: none;
  min-width: 180px;
}

.brand span {
  font-family: Georgia, "Times New Roman", serif;
  font-size: 24px;
  line-height: 1;
}

.brand small {
  color: var(--muted);
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

nav {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 8px 18px;
  font-size: 13px;
  font-weight: 800;
  text-transform: uppercase;
}

nav a {
  padding: 8px 0;
  color: var(--muted);
  text-decoration: none;
}

nav a[aria-current="page"],
nav a:hover {
  color: var(--red);
}

.hero {
  display: grid;
  grid-template-columns: minmax(0, 0.95fr) minmax(320px, 0.72fr);
  gap: clamp(28px, 5vw, 72px);
  align-items: center;
  min-height: calc(100vh - 82px);
  padding: clamp(42px, 7vw, 92px) clamp(20px, 5vw, 78px);
  border-bottom: 1px solid var(--line);
}

.hero-copy {
  max-width: 780px;
}

h1,
h2 {
  margin: 0;
  font-family: Georgia, "Times New Roman", serif;
  font-weight: 700;
  letter-spacing: 0;
}

h1 {
  max-width: 760px;
  font-size: clamp(52px, 8vw, 112px);
  line-height: 0.9;
}

h2 {
  font-size: clamp(34px, 5vw, 64px);
  line-height: 0.96;
}

p {
  color: var(--muted);
  font-size: 18px;
  line-height: 1.75;
}

.hero p {
  max-width: 600px;
  margin: 26px 0 0;
  font-size: clamp(20px, 2vw, 27px);
  line-height: 1.45;
}

.hero-media {
  margin: 0;
  aspect-ratio: 4 / 5;
  overflow: hidden;
  border: 1px solid var(--ink);
  border-radius: 8px;
  box-shadow: var(--shadow);
  transform: rotate(1.5deg);
  background: var(--surface);
}

.hero-media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 30px;
}

.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 48px;
  padding: 0 18px;
  border: 2px solid var(--ink);
  border-radius: 6px;
  background: var(--surface);
  color: var(--ink);
  font-size: 13px;
  font-weight: 900;
  text-decoration: none;
  text-transform: uppercase;
}

.button.primary {
  background: var(--red);
  color: white;
  border-color: var(--red);
}

.section,
.booking-panel {
  display: grid;
  grid-template-columns: minmax(0, 0.62fr) minmax(280px, 0.38fr);
  gap: clamp(24px, 5vw, 70px);
  padding: clamp(58px, 8vw, 108px) clamp(20px, 5vw, 78px);
  border-bottom: 1px solid var(--line);
}

.section-copy {
  max-width: 820px;
}

.booking-panel {
  background: var(--ink);
  color: white;
}

.booking-panel p {
  color: #e5d9d2;
}

.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 18px;
  align-content: start;
}

.gallery figure {
  margin: 0;
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 8px;
  overflow: hidden;
}

.gallery img {
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
}

figcaption {
  padding: 12px;
  color: var(--muted);
  font-size: 13px;
  font-weight: 700;
}

.site-footer {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 14px 24px;
  padding: 28px clamp(20px, 5vw, 78px);
  background: var(--surface);
  border-top: 1px solid var(--line);
}

.site-footer p,
.site-footer a {
  margin: 0;
  color: var(--muted);
  font-size: 14px;
}

@media (max-width: 860px) {
  .site-header {
    position: static;
    align-items: flex-start;
    flex-direction: column;
  }

  nav {
    justify-content: flex-start;
  }

  .hero,
  .section,
  .booking-panel {
    grid-template-columns: 1fr;
  }

  .hero {
    min-height: auto;
  }

  .hero-media {
    max-height: 520px;
    transform: none;
  }
}
`;
