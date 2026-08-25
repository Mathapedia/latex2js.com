# latex2js.com

The website for [LaTeX2JS](https://github.com/Mathapedia/LaTeX2JS) — author interactive math equations and diagrams online using LaTeX and PSTricks.

Built with Next.js (static export) on the same architecture as [constructive.io](https://constructive.io) and [danlynch.com](https://danlynch.com):

- **JSON-LD knowledge graph** — `src/data/jsonld/` holds a flat graph of schema.org entities with namespaced `@id`s (`software:latex2js`, `org:constructive`, `person:danlynch`, …) shared across the site family. Pages slice per-page subgraphs via `jsonldjs` and the `<Head>` component injects them as `application/ld+json`.
- **SEO registry** — `src/seo.ts` holds per-route titles/descriptions; canonicals are derived from typed routes.
- **Sitemap + robots.txt** — generated post-build from the exported HTML by `src/seo/seo.ts`.
- **llms.txt + markdown twins** — `scripts/generate-llm-markdown.ts` emits `out/llms.txt` and a `.md` twin for every example and installation page.
- **Content as data** — the interactive PSTricks examples live as `.tex` files in `content/examples/`, registered in `src/data/examples.ts`, and rendered client-side by [`@latex2js/react`](https://www.npmjs.com/package/@latex2js/react).

## Develop

```bash
pnpm install
pnpm dev        # http://localhost:5007
pnpm test       # JSON-LD graph validation + registry tests
```

## Build & deploy

```bash
pnpm build      # next build + llms.txt/md twins + sitemap/robots into out/
pnpm deploy:all # build, sync to s3://latex2js.com, extensionless copies, CloudFront invalidation
```
