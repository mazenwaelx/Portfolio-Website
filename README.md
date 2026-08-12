# Mazen Wael — Portfolio Website

A single-page personal portfolio (HTML/CSS/JS) for Mazen Wael — Software Engineer
specialising in backend, full-stack, and AI/ML (RAG, LangChain, Gemini).

## Files
| File | Purpose |
|---|---|
| `index.html` | Main portfolio page |
| `styles.css` | Styling (dark/light glassmorphism theme) |
| `script.js` | Nav, scroll reveals, count-ups, typing effect |
| `MazenWael_CV.pdf` | Downloadable CV (nav / hero / footer buttons) |
| `assets/og-image.png` | Social link-preview image (1200×630) |
| `apply-tracker.csv` | Job-application pipeline (priority, status, links) |
| `apply-messages.md` | Tailored outreach messages per company |
| `job-alerts.md` | Saved-search queries + weekly cadence |
| `make-og.js` | Regenerates `assets/og-image.png` (run `node make-og.js`) |

> `apply-tracker.csv`, `apply-messages.md`, and `job-alerts.md` are job-search
> helpers — you can delete them from the public site if you only want the portfolio.

---

## 🚀 Deploy to GitHub Pages (free, public, HTTPS, never expires)

**Goal:** site lives at `https://mazenwaelx.github.io/Portfolio-Website`

### One-time setup
1. **Create a GitHub repo** named `Portfolio-Website` under your account
   (`github.com/mazenwaelx`).
2. **Push this folder** (the `deploy.bat` script does it for you — see below),
   or manually:
   ```bash
   git init
   git add .
   git commit -m "Portfolio site"
   git branch -M main
   git remote add origin https://github.com/mazenwaelx/Portfolio-Website.git
   git push -u origin main
   ```
3. On GitHub: **Settings → Pages → Build and deployment → Source: Deploy from a
   branch → Branch: `main` / `(root)` → Save**.

### Publish / update
- Run **`deploy.bat`** (Windows) to commit + push changes, OR
- Use the git commands above.

The site goes live ~1 minute after the first push.

---

## 🔧 Optional: custom domain (e.g. `mazenwael.dev`)
1. Buy a domain (~$10–15/yr) and add a `CNAME` file here containing just the domain.
2. In your registrar's DNS: add `A` records to GitHub Pages IPs
   (`185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`)
   and/or a `CNAME` for `www` → `mazenwaelx.github.io`.
3. In GitHub Pages settings, set the custom domain and enable "Enforce HTTPS".

---

## 🖥️ Local preview
Open `index.html` directly in a browser, or serve it:
```bash
npx serve .        # or: python3 -m http.server 8000
```

---
© 2026 Mazen Wael
