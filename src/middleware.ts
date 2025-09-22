import createMiddleware from "next-intl/middleware";
import type { NextRequest } from "next/server";

// Создаем middleware для интернационализации с настройками для корневого пути
const intlMiddleware = createMiddleware({
  // Поддерживаемые локали
  locales: ["en", "ru", "es", "de", "fr", "it", "pt", "cn", "jp", "kr"],

  // Локаль по умолчанию
  defaultLocale: "en",

  // Используем префиксы только когда нужно (для английского не будет префикса)
  localePrefix: "as-needed",
});

// Экспортируем middleware
export default function middleware(request: NextRequest) {
  // Просто используем стандартный next-intl middleware
  // Убираем кастомную логику, которая мешает переключению языков
  return intlMiddleware(request);
}

// Конфигурация для middleware
export const config = {
  // Применяем middleware ко всем путям, кроме статических файлов и API
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
