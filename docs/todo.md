# To Do

- Standardize config loading: switch `app/lib/config.js` to ESM + `fs/promises`, validate with a schema library (e.g., `zod`) instead of manual checks, and export a getter to avoid eager CJS side effects before Next loads.
- Align lib modules with async/ESM patterns: move `app/lib/github.js` and `app/lib/snippets.js` off sync `fs`/`globSync` to async `fs/promises` + `fast-glob`, keeping everything in ESM to match Next 16 defaults.
- Prefer proven utilities: drop the custom `debounce` helper in favor of `use-debounce` (already installed) or `lodash-es/debounce`; consider replacing `formatTitle` logic with `lodash-es/startCase` to reduce edge cases.
- Modernize clipboard handling: replace `copy-to-clipboard` with `navigator.clipboard.writeText` plus a small fallback so we rely on the platform API instead of an extra dependency.
- Use a standard test runner: migrate `app/lib/utils.test.js` off the ad-hoc harness to `vitest` (or `jest`), add an `npm test` script, and structure tests alongside helpers for consistent reporting and coverage.
- Choose one package manager: remove the redundant lockfile (`package-lock.json` vs `pnpm-lock.yaml`) after deciding on npm or pnpm to prevent dependency drift.

## Standardization & Refactoring Opportunities

### 1. Testing Infrastructure
- **Current Status**: `lib/utils.test.js` is a manual script using console assertions.
- **Recommendation**: Migrate to a standard test runner like **Vitest** or **Jest**.
  - Install `vitest` (compatible with Vite/Next.js ecosystem).
  - Rename `utils.test.js` to `utils.spec.js` or keep naming but run via runner.
  - Add `npm run test:unit` script.

### 2. Module System Consistency
- **Current Status**: Mixed CommonJS and ESM.
  - `lib/snippets.js`, `lib/config.js` use CommonJS (`require`, `module.exports`).
  - `lib/utils.js`, `components/*` use ESM (`import`, `export`).
- **Recommendation**: Convert all local files to **ESM** (`import`/`export`).
  - Update `lib/snippets.js` and `lib/config.js` to use `import fs from 'fs'`, `export function ...`.
  - Ensure `package.json` has `"type": "module"` or relies on Next.js compilation for all files.

### 3. Markdown Processing
- **Current Status**: `lib/snippets.js` reads raw file content. No parsing logic.
- **Recommendation**: Integrate a standard markdown processor.
  - Use **gray-matter** for parsing frontmatter (metadata).
  - Use **remark** / **rehype** or **react-markdown** for rendering if HTML output is needed, or just for safer content processing.
  - This allows adding metadata (author, tags, date) to snippets in the future.

### 4. Utility Standardization
- **Current Status**: Custom implementations for `debounce`, `truncateText` in `lib/utils.js`.
- **Recommendation**: Leverage standard libraries where appropriate.
  - `debounce`: The project already depends on `use-debounce`. Ensure consistent usage. For non-React debounce, consider `lodash.debounce`.
  - `truncateText`: Consider `lodash.truncate` for robust handling, though current custom implementation is lightweight.

### 5. Configuration Management
- **Current Status**: `lib/config.js` manually resolves `../config.yml` relative to the script execution or CWD.
- **Recommendation**: Make configuration loading more robust.
  - Use a constant for the config path derived from `process.cwd()`.
  - Validate config structure using a schema library (like `zod`) instead of manual checks in `validateConfig`.

### 6. Directory Structure
- **Current Status**: Project root contains an `app` folder which contains the Next.js `app` router. Structure is `/app/app/`.
- **Recommendation**: Flatten the structure if possible, or rename the root `app` directory to `web` or `client` to avoid confusion with Next.js `app` router directory.
✅ COMPLETE: Standardize config loading (ESM + fs/promises + zod validation)
✅ COMPLETE: Remove custom debounce utility (using use-debounce)
✅ COMPLETE: Align lib modules with async/ESM patterns (github.js + snippets.js)
✅ COMPLETE: Modernize clipboard handling (native Clipboard API with fallback)
✅ COMPLETE: Migrate tests to Vitest with npm test script
✅ COMPLETE: Remove redundant package-lock.json (pnpm is chosen package manager)
