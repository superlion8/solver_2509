# Solver browser extension

Highlight any AI-generated answer inside ChatGPT, Gemini, or another web page and the Solver extension will show quick
actions:

- **double check the answer with an expert** opens the Solver request form with your selection prefilled so our team can
  route it to a vetted operator.
- **find an expert for consultancy** lets you request a deeper engagement with the right specialist.

## Loading the extension locally

1. Run `npm run package-extension` from the project root to create `public/downloads/solver-extension.zip` (or use the
   `extension/` folder directly).
2. Visit `chrome://extensions`, enable **Developer mode**, then choose **Load unpacked** and select the folder or upload
   the generated zip.
3. Pin the extension so the action buttons can appear near highlighted content.

### Optional: point to a local Solver environment

By default the extension opens `https://solver.chat`. When developing locally you can override that behaviour from the
browser console on any page where the extension runs:

```js
localStorage.setItem('solverBaseUrl', 'http://localhost:5173/');
```

Reload the page to apply the new setting. Remove the key to restore the production URL:

```js
localStorage.removeItem('solverBaseUrl');
```
