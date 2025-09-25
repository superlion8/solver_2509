# Solver

Solver pairs Gemini 2.5 Pro with vetted operators so teams can validate AI answers and convert them into accountable
execution.

## Getting started

```bash
npm install
npm run dev
```

Vite will boot on [http://localhost:5173](http://localhost:5173) and automatically reload on changes. The app uses a
HashRouter so the direct URLs work when hosted statically.

### Gemini API key

A demo key is bundled for convenience. In production you should provide your own key either at runtime or through
environment variables:

- Set `window.GEMINI_API_KEY = 'your-key'` from the browser console before sending a message; or
- Create a `.env` file with `VITE_GEMINI_API_KEY=your-key` and restart the dev server.

## Project structure

- `src/` – React views for the landing page, chat workspace, expert request flow, and expert onboarding form.
- `public/` – Static assets served as-is, including the Solver icon. Generated downloads (like the extension zip) live
  under `public/downloads/` but are not checked into git.
- `extension/` – Source for the Chrome-compatible helper extension.

## Browser extension

Create a fresh package with:

```bash
npm run package-extension
```

The command zips the `extension/` directory into `public/downloads/solver-extension.zip`. Load that archive (or the
folder itself) as an unpacked extension in any Chromium-based browser to surface Solver actions when highlighting
answers in ChatGPT or Gemini. You can point the extension at a local Solver instance via:

```js
localStorage.setItem('solverBaseUrl', 'http://localhost:5173/');
```

Remove that key to restore the production endpoint.

## Available scripts

- `npm run dev` – start the Vite development server.
- `npm run build` – bundle the site for production deployment.
- `npm run preview` – locally preview the production build.
- `npm test` – placeholder script, no automated tests yet.
