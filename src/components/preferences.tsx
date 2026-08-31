"use client";

import { createContext, useCallback, useContext, useMemo, useSyncExternalStore } from "react";
import type { Localized } from "@/lib/content";

type Language = "ar" | "en";
type Theme = "dark" | "light";

type Preferences = {
  language: Language;
  theme: Theme;
  setLanguage: (language: Language) => void;
  toggleTheme: () => void;
};

const PreferencesContext = createContext<Preferences | null>(null);

const preferenceEvent = "frey-preference-change";

function subscribeToPreferences(onStoreChange: () => void) {
  window.addEventListener(preferenceEvent, onStoreChange);
  return () => window.removeEventListener(preferenceEvent, onStoreChange);
}

function getPreferenceSnapshot() {
  const root = document.documentElement;
  const language = root.dataset.lang === "en" ? "en" : "ar";
  const theme = root.dataset.theme === "light" ? "light" : "dark";
  return `${language}:${theme}`;
}

function getServerPreferenceSnapshot() {
  return "ar:dark";
}

export function PreferencesProvider({ children }: { children: React.ReactNode }) {
  const snapshot = useSyncExternalStore(
    subscribeToPreferences,
    getPreferenceSnapshot,
    getServerPreferenceSnapshot
  );
  const [language, theme] = snapshot.split(":") as [Language, Theme];

  const setLanguage = useCallback((next: Language) => {
    const root = document.documentElement;
    root.dataset.lang = next;
    root.lang = next;
    root.dir = next === "ar" ? "rtl" : "ltr";
    localStorage.setItem("frey-language", next);
    window.dispatchEvent(new Event(preferenceEvent));
  }, []);

  const toggleTheme = useCallback(() => {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    localStorage.setItem("frey-theme", next);
    window.dispatchEvent(new Event(preferenceEvent));
  }, [theme]);

  const value = useMemo(
    () => ({ language, theme, setLanguage, toggleTheme }),
    [language, theme, setLanguage, toggleTheme]
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
