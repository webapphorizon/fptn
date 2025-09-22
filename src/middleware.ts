import createMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";

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
  // Обработка корневого пути для определения языка по кукам или геолокации
  if (request.nextUrl.pathname === "/") {
    const locale = request.cookies.get("NEXT_LOCALE")?.value;

    // Если в куки установлен русский язык, перенаправляем на /ru
    if (locale === "ru") {
      return NextResponse.redirect(new URL("/ru", request.url));
    }
  }

  // Для всех остальных путей используем next-intl
  return intlMiddleware(request);
}

// Конфигурация для middleware
export const config = {
  // Применяем middleware ко всем путям, кроме статических файлов и API
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
