# Contributing to Tensor Lab

First off, thank you for considering contributing to Tensor Lab! 🎉

This project is a community effort to make tensor decomposition accessible to everyone — students, researchers, and engineers.

## 📋 Code of conduct

Be kind, respectful, and inclusive. We're all here to learn.

## 🐛 Reporting bugs

Found a bug? Please open an [issue](https://github.com/haotong-Duan/tensor-lab/issues) with:

- A clear, descriptive title
- Steps to reproduce
- Expected vs actual behavior
- Screenshots (if applicable)
- Browser / OS info

## 💡 Suggesting features

We love feature suggestions! Please open an issue with the `enhancement` label.

## 🔧 Submitting a pull request

### Setup

1. **Fork** the repository on GitHub
2. **Clone** your fork:
   ```bash
   git clone https://github.com/YOUR-USERNAME/tensor-lab.git
   cd tensor-lab
   ```
3. **Install** dependencies:
   ```bash
   npm install
   ```
4. **Create** a feature branch:
   ```bash
   git checkout -b feature/AmazingFeature
   ```
5. **Start** the dev server:
   ```bash
   npm run dev
   ```

### Development workflow

1. Make your changes
2. Add tests if applicable
3. Update translations in `src/components/i18n.tsx` for both English AND Chinese
4. Make sure the build passes:
   ```bash
   npm run build
   ```
5. Verify there are no TypeScript errors:
   ```bash
   npx tsc --noEmit
   ```
6. **Commit** your changes with a clear message:
   ```bash
   git commit -m "feat: add TT decomposition visualization"
   ```
7. **Push** to your fork:
   ```bash
   git push origin feature/AmazingFeature
   ```
8. **Open** a Pull Request on GitHub

### Commit message format

We follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` — a new feature
- `fix:` — a bug fix
- `docs:` — documentation only changes
- `style:` — formatting, missing semicolons, etc.
- `refactor:` — code change that neither fixes a bug nor adds a feature
- `perf:` — performance improvement
- `test:` — adding or updating tests
- `chore:` — updating build tasks, package manager configs, etc.
- `i18n:` — translation changes

## 🌍 Adding translations

We currently support **English** and **简体中文** (Simplified Chinese). To add a new language:

1. Open `src/components/i18n.tsx`
2. Add a new `<Locale>` value in the `Locale` type:
   ```ts
   export type Locale = 'en' | 'zh' | 'ja';  // add 'ja'
   ```
3. Add a new dictionary with all the keys:
   ```ts
   const ja: Dict = {
     'brand.name': 'テンソルラボ',
     // ... translate every key
   };
   ```
4. Register it in `dictionaries`:
   ```ts
   const dictionaries: Record<Locale, Dict> = { en, zh, ja };
   ```
5. Update the `LanguageSwitcher` component to include the new option
6. Update `useI18n` to set the `<html lang>` attribute correctly

## 📚 Adding new content

To add a new decomposition method or topic:

1. Create a new page under the appropriate directory (e.g., `src/app/decompositions/mynewdecomp/page.tsx`)
2. Use the `ContentPage` component as the wrapper
3. Use the `Math` and `BlockMath` components for LaTeX
4. Use the `CPDiagram`, `TuckerDiagram`, `TTDiagram`, etc. for tensor network visualizations
5. Add the page to the navigation in `src/lib/navigation.ts`
6. Add translations for all UI strings in `src/components/i18n.tsx`

## 🎨 Style guide

- Use **TypeScript** with strict types
- Use **Tailwind** utility classes (no inline styles)
- Components in `src/components/`
- Pages in `src/app/<route>/page.tsx`
- Use the glass-morphism design language (`glass-card`, `glass-button`)
- Always include both English and Chinese translations for new strings
- Format code with Prettier (auto-formats on save)

## 🐛 Debugging tips

- Use `npm run build` to catch TypeScript errors
- Check the browser console for client-side errors
- Use React DevTools for component debugging
- Test in both light and dark mode

## 📞 Questions?

Open an issue or reach out to the author:

- **GitHub**: [haotong-Duan](https://github.com/haotong-Duan)
- **Email**: 15102633721@163.com
- **X (Twitter)**: dht768279750

Thank you for contributing! 🙏
