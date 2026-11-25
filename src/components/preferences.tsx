"use client";

import { createContext, useCallback, useContext, useMemo, useSyncExternalStore } from "react";
import type { Localized } from "@/lib/content";

import type { Language } from "@/lib/locale";
type Theme = "dark" | "light";

type Preferences = {
  language: Language;
  theme: Theme;
  toggleTheme: () => void;
};

const PreferencesContext = createContext<Preferences | null>(null);

const preferenceEvent = "frey-preference-change";

function subscribeToPreferences(onStoreChange: () => void) {
  window.addEventListener(preferenceEvent, onStoreChange);
  return () => window.removeEventListener(preferenceEvent, onStoreChange);
}

function getThemeSnapshot(): Theme {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

function getServerThemeSnapshot(): Theme {
  return "dark";
}

export function PreferencesProvider({ children, language }: { children: React.ReactNode; language: Language }) {
  const theme = useSyncExternalStore(
    subscribeToPreferences,
    getThemeSnapshot,
    getServerThemeSnapshot,
  );
  const toggleTheme = useCallback(() => {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    window.dispatchEvent(new Event(preferenceEvent));
    try {
      localStorage.setItem("frey-theme", next);
    } catch {
      // The theme still works when browser storage is unavailable.
    }
  }, [theme]);

  const value = useMemo(
    () => ({ language, theme, toggleTheme }),
    [language, theme, toggleTheme]
  );

  return <PreferencesContext.Provider value={value}>{children}</PreferencesContext.Provider>;
}

export function usePreferences() {
  const context = useContext(PreferencesContext);
  if (!context) throw new Error("usePreferences must be used inside PreferencesProvider");
  return context;
}

export function T({ value }: { value: Localized }) {
  const { language } = usePreferences();
  return <>{value[language]}</>;
}

export function useLocalized() {
  const { language } = usePreferences();
  return (value: Localized) => value[language];
}
