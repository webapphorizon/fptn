"use client";

import { Languages } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { usePathname, useRouter } from "~/i18n/routing";

// Поддерживаемые локали (должны соответствовать настройкам в routing.ts)
const supportedLocales = ["en", "ru", "es", "de", "fr", "it", "pt", "cn", "jp", "kr"];

const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "ru", name: "Русский", flag: "🇷🇺" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "it", name: "Italiano", flag: "🇮🇹" },
  { code: "pt", name: "Português", flag: "🇵🇹" },
  { code: "cn", name: "中文", flag: "🇨🇳" },
  { code: "jp", name: "日本語", flag: "🇯🇵" },
  { code: "kr", name: "한국어", flag: "🇰🇷" },
];

export function LanguageToggle() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const redirectedRef = useRef(false);
  const t = useTranslations("ui");
  const [isMobile, setIsMobile] = useState(false);

  // Определяем размер экрана для условного modal поведения
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 1280); // xl breakpoint
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);

    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  // При монтировании компонента проверяем, соответствует ли текущий язык сохраненному в cookie
  useEffect(() => {
    // Если уже было перенаправление, не делаем это снова
    if (redirectedRef.current) return;

    // Флаг для предотвращения повторных перенаправлений
    redirectedRef.current = true;

    try {
      const savedLocale = document.cookie
        .split("; ")
        .find((row) => row.startsWith("NEXT_LOCALE="))
        ?.split("=")[1];

      // Если есть сохраненный язык и он отличается от текущего, перенаправляем
      if (
        savedLocale &&
        savedLocale !== locale &&
        supportedLocales.includes(savedLocale)
      ) {
        // Устанавливаем флаг перенаправления
        router.replace(
          // @ts-expect-error -- TypeScript issue with routing types
          { pathname, params },
          { locale: savedLocale },
        );
      }
    } catch (error) {
      console.error("Ошибка при проверке языка:", error);
    }
  }, [locale, params, pathname, router]); // Запускаем при изменении локали или маршрута

  const handleLanguageChange = (nextLocale: string) => {
    // Если пытаемся переключиться на текущий язык, ничего не делаем
    if (nextLocale === locale) return;

    try {
      // Сохраняем в cookie на 1 год
      document.cookie = `NEXT_LOCALE=${nextLocale};path=/;max-age=31536000;SameSite=Strict`;

      // Получаем текущий URL и трансформируем его в соответствии с новой локалью
      let newUrl: string;

      // Определяем базовый путь (без локали)
      let basePath = pathname;

      // Удаляем префикс текущей локали из пути (если он есть)
      for (const supportedLocale of supportedLocales) {
        if (
          supportedLocale !== "en" &&
          pathname.startsWith(`/${supportedLocale}`)
        ) {
          basePath = pathname.replace(`/${supportedLocale}`, "");
          break;
        }
      }

      // Если получился пустой путь, делаем его корневым
      if (basePath === "") {
        basePath = "/";
      }

      // Формируем URL в зависимости от целевого языка
      if (nextLocale === "en") {
        // Для английского используем путь без префикса
        newUrl = basePath;
      } else {
        // Для остальных языков добавляем префикс
        newUrl = `/${nextLocale}${basePath === "/" ? "" : basePath}`;
      }

      // Полное обновление страницы по новому URL
      window.location.href = newUrl;
    } catch (error) {
      console.error("Ошибка при смене языка:", error);
    }
  };

  return (
    <DropdownMenu modal={isMobile}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label={t("language.toggle")}>
          <Languages className="h-[19.2px] w-[19.2px]" />
          <span className="sr-only">{t("language.toggle")}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="z-200">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => handleLanguageChange(language.code)}
            className={
              locale === language.code ? "bg-accent text-accent-foreground" : ""
            }
          >
            <span className="mr-2">{language.flag}</span>
            {language.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
