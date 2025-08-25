# HTML Email Templates

A small React 19 + Vite 7 app that previews a collection of email templates. The templates live in `src/components/templates` and are imported as raw strings using Vite's `?raw` query inside `TemplateDemo.jsx`.

## Requirements

- Node.js 18+ (recommended 20+)
- Your choice of package manager (Yarn, npm, pnpm)

## Quick start

Using Yarn:

```bash
yarn install
yarn dev
```

Using npm:

```bash
npm install
npm run dev
```

## Build and preview

Yarn:

```bash
yarn build
yarn preview
```

npm:

```bash
npm run build
npm run preview
```

## Where things are

- `src/components/TemplateDemo.jsx` — the preview UI that loads templates via `?raw` and renders them in a sandboxed iframe
- `src/components/templates/` — email HTML templates and a shared `default_style.css`

Notes:

- There is no `public/templates` directory; templates are bundled at build time via raw imports.
- To add a new template, drop an `email_*.html` file into `src/components/templates/` and add an entry/import in `TemplateDemo.jsx`.

## Deployment

This is a standard Vite static build. Any static host works (Netlify, GitHub Pages, etc.).

- Ensure the base path matches your hosting path:
	- For GitHub Pages project sites (e.g., `https://<user>.github.io/<repo>`), the base is `/<repo>/`.
	- For user/organization sites (e.g., `https://<user>.github.io`), the base is `/`.
- Build with `yarn build` (or `npm run build`), then deploy the `dist/` folder.

### GitHub Pages via Actions (configured)

This repo includes a workflow at `.github/workflows/deploy-pages.yml` that:

- Installs with Yarn and builds the app
- Uploads the `dist/` folder as a Pages artifact
- Deploys to GitHub Pages on pushes to `main`

Notes:

- The workflow passes `--base=/email-templates/` at build time for this repository. If you convert this to a user/org site, change it to `--base=/`.
- In repo Settings → Pages, select "GitHub Actions" as the source.

If you want, I can run the dev server in this workspace and confirm it starts.
