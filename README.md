# fptn

**FPTN Project** — a website for a non-profit VPN. The site is the main source for downloading VPN clients on various platforms (Android, Windows, macOS, Linux) and contains detailed installation instructions in **10 languages**.

Redesigned from the original site hosted at fptn.org. Added support for 10 languages and themes.

## Requirements

- Node.js 20+
- npm

## How to run

### 1. Install dependencies

```bash
npm install
```

### 2. Environment variables (optional)

The `.env` file is not required for local development. If you need a custom base URL for sitemap/robots:

```bash
cp .env.example .env
# Edit .env as needed (NEXT_PUBLIC_BASE_URL, etc.)
```

To build without env validation (e.g. in Docker):

```bash
SKIP_ENV_VALIDATION=1 npm run build
```

### 3. Development mode

```bash
npm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000). Supported locales: en, ru, es, de, fr, it, pt, cn, jp, kr.

### 4. Production build and run

```bash
npm run build
npm run start
```

Or in one command (build + start):

```bash
npm run preview
```

## Useful commands

| Command             | Description                          |
|---------------------|-------------------------------------|
| `npm run dev`       | Development server with hot reload  |
| `npm run build`     | Production build                    |
| `npm run start`     | Run the built application           |
| `npm run lint`      | ESLint check                        |
| `npm run typecheck` | TypeScript type check               |
| `npm run check`     | lint + typecheck                    |
