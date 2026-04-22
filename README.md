# Legacy Co — legacycreative.co

Plain HTML static site. No build step, no dependencies. Deployed to GitHub Pages via the `main` branch.

---

## Opening the project

1. Open **VS Code**
2. File → Open Folder → select `legacy-co-site`
3. Open the **Claude Code** panel (sidebar icon or `Cmd+Shift+P` → "Claude Code")
4. Start a new conversation — Claude has memory of this project and will pick up where you left off

---

## Running locally

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000` in your browser. You need a local server (not `file://`) because the blog listing page fetches `posts.json` via JavaScript.

---

## Site structure

```
index.html              Homepage
about/                  About KC
services/               Services overview
framework/              The Imprint Framework
brand-coaching/         1:1 Coaching page
assessment/             Imprint Assessment
our-work/               Portfolio / case studies
consultation/           Book a Call
blueprint/              Blog — The Blueprint
  index.html            Listing page (renders dynamically from posts.json)
  posts.json            ← Single source of truth for all blog posts
  post-template.html    ← Copy this to create a new post
  [slug]/index.html     Individual post pages
brand/                  Design system reference (not linked in nav)
```

---

## Adding a new blog post

1. **Add an entry to `blueprint/posts.json`** — copy an existing entry and fill in:
   - `slug` — matches the folder name (e.g. `my-new-post`)
   - `title`, `excerpt`, `category`, `publishDate`, `readTime`
   - `featured: false` (set to `true` to make it the hero card on the listing page)
   - `href: "/blueprint/my-new-post"`
   - `draft: false` (set `true` to hide from the listing until ready)

2. **Create the post folder and file:**
   ```
   blueprint/my-new-post/index.html
   ```
   Copy `blueprint/post-template.html` and replace all `{{PLACEHOLDERS}}`.

3. **Commit and push** — the listing page updates automatically.

---

## Deploying

```bash
git add .
git commit -m "your message"
git push
```

GitHub Pages deploys from `main` automatically. Live in ~60 seconds at [legacycreative.co](https://legacycreative.co).

---

## Key details

- **Colors:** Gold `#C9A84C`, Black `#080808`, Cream `#F5E6C8`
- **Fonts:** Archivo Black (headings), Lora (article body), Helvetica Neue (UI)
- **Chat widget:** GoHighLevel — location ID `oCtKBYieVtVlbqJBLjft`
- **Analytics:** Not currently installed
- **Domain:** Managed via CNAME file → GitHub Pages
