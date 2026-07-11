'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from './theme-context';
import { motion } from 'framer-motion';

export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className="relative p-1.5 rounded-md hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
    >
      <motion.div
        key={theme}
        initial={{ rotate: -90, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        {theme === 'dark' ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5" />}
      </motion.div>
    </button>
  );
}
