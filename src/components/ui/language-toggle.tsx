"use client";

import { Languages } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { usePathname, useRouter } from "~/i18n/routing";

const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "ru", name: "Русский", flag: "🇷🇺" },
];

export function LanguageToggle() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const redirectedRef = useRef(false);
  const t = useTranslations("ui");

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
        (savedLocale === "ru" || savedLocale === "en")
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

      if (locale === "ru") {
        // Если мы сейчас на русской странице, нужно удалить /ru из пути
        basePath = pathname.replace(/^\/ru/, "");
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
        // Для русского добавляем префикс /ru
        newUrl = `/ru${basePath === "/" ? "" : basePath}`;
      }

      // Полное обновление страницы по новому URL
      window.location.href = newUrl;
    } catch (error) {
      console.error("Ошибка при смене языка:", error);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label={t("language.toggle")}>
          <Languages className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">{t("language.toggle")}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="z-150">
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
