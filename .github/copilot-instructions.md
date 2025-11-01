## Purpose

Short, actionable guidance for AI coding agents working on this repo. Focus on the app's structure, developer workflows, and project-specific gotchas so an agent can be productive immediately.

## Big picture (what this app is)

- Vite + React + TypeScript single-page app. Entry points: `index.tsx` -> `App.tsx`.
- UI is small and componentized under `components/` (e.g., `PromptInput.tsx`, `ResultDisplay.tsx`).
- Business logic and external integration live in `services/geminiService.ts` — this calls the `@google/genai` client and returns a `Promise<string>`.
- Data flow: user types in `PromptInput` -> `App.handleGenerate` calls `generateParagraph(prompt)` -> Gemini API -> response.text -> `ResultDisplay`.

## Key files to inspect (quick links)

- `App.tsx` — central orchestrator (state: prompt, isLoading, error, generatedParagraph). Shows how UI components are wired and how errors/states are surfaced.
- `services/geminiService.ts` — canonical integration with the Google GenAI SDK. Important: it expects an environment variable for the API key and returns trimmed text from `response.text`.
- `components/PromptInput.tsx` — keyboard UX convention: Enter (without Shift) submits. Buttons are disabled when `isLoading` or prompt empty.
- `components/ResultDisplay.tsx` — read this to see how the UI expects the paragraph shape (plain string) and error handling.
- `package.json` — scripts: `npm run dev`, `npm run build`, `npm run preview`.
- `README.md` — local run instructions; also mentions an env var name (see gotchas below).

## Developer workflows / commands

- Install: `npm install`
- Run dev server: `npm run dev` (Vite)
- Build: `npm run build`
- Preview build: `npm run preview`

Note: `README.md` instructs creating `.env.local` and setting `GEMINI_API_KEY`. The code in `services/geminiService.ts` reads `process.env.API_KEY`. Confirm and standardize the env var before changing behavior.

## Project-specific patterns & conventions

- Functional React components with TypeScript generics (`React.FC`). Keep props strictly typed.
- Loading and error handling are managed in `App.tsx` (local state). Service methods should throw `Error` objects with a user-friendly message for the UI to display.
- `generateParagraph(prompt: string): Promise<string>` is the public contract of the service — preserve its signature and error semantics.
- Keyboard behavior: `PromptInput` treats Enter (no Shift) as submit — preserve or mirror this when adding input components.
- Styling uses Tailwind-like utility classes in the JSX. No Tailwind package is present in `package.json` — double-check styling pipeline before changing classes.

## Integration points & external dependencies

- `@google/genai` is the primary external API client. `services/geminiService.ts` constructs `new GoogleGenAI({ apiKey })` and calls `models.generateContent({ model: 'gemini-2.5-flash', contents })`.
- The code expects `response.text` to contain the generated text. If you change the SDK call, update the service to preserve the returned string (trimmed) or update callers.
- Environment secrets: DO NOT hardcode API keys. Use env vars and ensure `.env*.local` files are ignored by git.

## Notable gotchas discovered

- Env var name mismatch: `README.md` recommends `GEMINI_API_KEY` but `services/geminiService.ts` reads `process.env.API_KEY`. Before renaming, update both places and confirm in CI/dev environment.
- Styling classes (Tailwind-like) are used in components but there is no Tailwind package in `package.json`. If styles look broken locally, verify whether a global stylesheet or CDN is expected.
- `services/geminiService.ts` throws on missing API key at module load time. That will crash imports in test runners or serverless environments if env is absent — prefer delaying the throw or mocking the client in tests.

## When modifying code, prefer these small contracts

- Services: keep `generateParagraph(prompt: string): Promise<string>` and throw `Error` for user-facing failures.
- UI: treat empty strings or whitespace-only prompts as no-op; preserve `isLoading` boolean behavior to prevent duplicate requests.

## Examples (where to look)

- Call site: `App.tsx` -> handleGenerate: `const result = await generateParagraph(prompt); setGeneratedParagraph(result);`
- Service shape: `const ai = new GoogleGenAI({ apiKey: API_KEY }); const response = await ai.models.generateContent({...}); return response.text.trim();`

## Quick edit rules for agents

1. Do not commit secrets. If adding environment variables, update `README.md` and the service consistently.
2. Preserve the public function signatures used by `App.tsx` and tests (`generateParagraph` returns `Promise<string>`).
3. When changing UX (Enter-to-submit), update `PromptInput.tsx` and ensure no regressions in keyboard accessibility.
4. If you add Tailwind or change styling, update `package.json` and README with the build steps.

## If you need more context

- Open `App.tsx`, `services/geminiService.ts`, `components/PromptInput.tsx`, and `README.md`. Those files contain the majority of app behavior.

---

If anything here is unclear or you want more examples (tests, expected API response shape, or CI details), tell me which area to expand and I will update this file.
