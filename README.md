# HTML Email Templates

![MIT License](https://img.shields.io/badge/License-MIT-green.svg)
![Build](https://github.com/zkm/email-templates/actions/workflows/deploy-pages.yml/badge.svg)
![Node Version](https://img.shields.io/badge/node-%3E=18-blue.svg)

# HTML Email Templates

## Demo

[Live Preview](https://zkm.github.io/email-templates/)

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


## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
