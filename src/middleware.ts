import createMiddleware from "next-intl/middleware";
import { type NextRequest } from "next/server";

// Создаем middleware для интернационализации с настройками для корневого пути
const intlMiddleware = createMiddleware({
  // Поддерживаемые локали
  locales: ["en", "ru"],

  // Локаль по умолчанию
  defaultLocale: "en",

  // Используем префиксы только когда нужно (для английского не будет префикса)
  localePrefix: "as-needed",
});

// Экспортируем middleware
export default function middleware(request: NextRequest) {
  // Используем стандартный next-intl middleware для всех путей
  return intlMiddleware(request);
}

// Конфигурация для middleware
export const config = {
  // Применяем middleware ко всем путям, кроме статических файлов и API
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
