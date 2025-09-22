import { createNavigation } from "next-intl/navigation";
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ["en", "ru"],

  // Used when no locale matches
  defaultLocale: "en",

  // Используем префиксы только когда нужно (для английского не будет префикса)
  localePrefix: "as-needed",
});

// Экспортируем типы и функции для навигации
export type Locale = (typeof routing.locales)[number];
export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);
