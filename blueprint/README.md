# Legacy Co — Blueprint HTML Build

Generated 20 new post HTML files + posts.json + post-template.html.

## Contents

- `posts.json` — metadata array of 24 posts (4 existing + 20 new) ready for the listing-page JS.
- `[slug]/index.html` × 20 — ready to drop into `legacy-co-site/blueprint/` — matches the exact structure of the existing post files.
- `post-template.html` — skeleton with `{{PLACEHOLDER}}` tokens for stamping new posts by hand.

## How to import

1. Copy each `[slug]/` folder into `legacy-co-site/blueprint/` (they slot in alongside `what-is-brand-discipleship/`, etc.).
2. Copy `posts.json` into `legacy-co-site/blueprint/posts.json`.
3. Have Claude Code update `legacy-co-site/blueprint/index.html` to fetch `posts.json` and render the listing dynamically (per your plan).
4. Update `legacy-co-site/sitemap.xml` with the 20 new URLs.

## posts.json schema

```json
{
  "slug": "kebab-case-slug",
  "title": "Post Title",
  "category": "Foundation | Brand Identity | Framework | Deep Dive",
  "excerpt": "1-2 sentences, used for card subtitle and meta description",
  "publishDate": "YYYY-MM-DD",
  "readTime": "X min",
  "featured": true | false,
  "tags": ["...", "..."],
  "metaDescription": "150-160 chars",
  "ogImage": "https://legacycreative.co/og-image.png",
  "href": "/blueprint/[slug]",
  "draft": true | false
}
```

## Things to confirm before shipping

- Publish dates (several original XML dates were placeholder 2019 values — I best-guessed plausible dates)
- OG image URLs (all currently pointing at the generic `/og-image.png`; you may want per-post OG art)
- `canonical` and `href` paths match your actual URL structure
- The 2 drafts (`a-legacy-builders-prayer`, `the-foundation-of-kingdom-community`) are flipped to `"draft": true` in posts.json — the listing JS should filter these out.
