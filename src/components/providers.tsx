'use client';

import * as React from 'react';
import { ThemeProvider as NextThemesProvider } from './theme-context';
import { I18nProvider } from './i18n';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <I18nProvider>
      <NextThemesProvider>{children}</NextThemesProvider>
    </I18nProvider>
  );
}
