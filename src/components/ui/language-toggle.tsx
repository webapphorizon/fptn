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
import ReactCountryFlag from "react-country-flag"; // ✅ добавляем флаги через react-country-flag

// Соответствие локалей и кодов стран ISO
const localeToCountry: Record<string, string> = {
  en: "US",
  ru: "RU",
  es: "ES",
  de: "DE",
  fr: "FR",
  it: "IT",
  pt: "PT",
  cn: "CN",
  jp: "JP",
  kr: "KR",
};

// Поддерживаемые локали
const supportedLocales = Object.keys(localeToCountry);

// Названия языков
const languages = [
  { code: "en", name: "English" },
  { code: "ru", name: "Русский" },
  { code: "es", name: "Español" },
  { code: "de", name: "Deutsch" },
  { code: "fr", name: "Français" },
  { code: "it", name: "Italiano" },
  { code: "pt", name: "Português" },
  { code: "cn", name: "中文" },
  { code: "jp", name: "日本語" },
  { code: "kr", name: "한국어" },
];

export function LanguageToggle() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const redirectedRef = useRef(false);
  const t = useTranslations("ui");
  const [isMobile, setIsMobile] = useState(false);

  // Проверяем ширину экрана
  useEffect(() => {
    const checkIsMobile = () => setIsMobile(window.innerWidth < 1280);
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  // Проверяем cookie с языком при загрузке
  useEffect(() => {
    if (redirectedRef.current) return;
    redirectedRef.current = true;

    try {
      const savedLocale = document.cookie
        .split("; ")
        .find((row) => row.startsWith("NEXT_LOCALE="))
        ?.split("=")[1];

      if (
        savedLocale &&
        savedLocale !== locale &&
        supportedLocales.includes(savedLocale)
      ) {
        router.replace(
          // @ts-expect-error — несовместимость типов
          { pathname, params },
          { locale: savedLocale },
        );
      }
    } catch (error) {
      console.error("Ошибка при проверке языка:", error);
    }
  }, [locale, params, pathname, router]);

  const handleLanguageChange = (nextLocale: string) => {
    if (nextLocale === locale) return;

    try {
      document.cookie = `NEXT_LOCALE=${nextLocale};path=/;max-age=31536000;SameSite=Strict`;

      let basePath = pathname;
      for (const supportedLocale of supportedLocales) {
        if (
          supportedLocale !== "en" &&
          pathname.startsWith(`/${supportedLocale}`)
        ) {
          basePath = pathname.replace(`/${supportedLocale}`, "");
          break;
        }
      }

      if (basePath === "") basePath = "/";

      const newUrl =
        nextLocale === "en"
          ? basePath
          : `/${nextLocale}${basePath === "/" ? "" : basePath}`;

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
        {languages.map((language) => {
          const countryCode = localeToCountry[language.code];
          return (
            <DropdownMenuItem
              key={language.code}
              onClick={() => handleLanguageChange(language.code)}
              className={
                locale === language.code
                  ? "bg-accent text-accent-foreground"
                  : ""
              }
            >
              <ReactCountryFlag
                countryCode={countryCode ?? "US"}
                svg
                style={{
                  width: "1.25em",
                  height: "1.25em",
                  marginRight: "0.5em",
                  borderRadius: "2px",
                }}
              />
              {language.name}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
