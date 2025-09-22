"use client";

import { Languages } from "lucide-react";
import { useLocale } from "next-intl";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { usePathname, useRouter } from "~/i18n/navigation";

const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "ru", name: "Русский", flag: "🇷🇺" },
];

export function LanguageToggle() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleLanguageChange = (newLocale: string) => {
    // Используем встроенную навигацию next-intl для переключения языка
    // pathname уже содержит путь без локали, router.push автоматически добавит нужную локаль
    router.push(pathname, { locale: newLocale });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Переключить язык">
          <Languages className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Переключить язык</span>
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
