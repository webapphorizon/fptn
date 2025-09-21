"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { contentData } from "~/lib/content-data";

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="size-9">
        <Sun className="size-[1.2rem]" />
        <span className="sr-only">{contentData.theme.toggle.title}</span>
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="size-9">
          <Sun className="size-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
          <Moon className="absolute size-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
          <span className="sr-only">{contentData.theme.toggle.title}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="z-150">
        <DropdownMenuItem
          onClick={() => setTheme(`light`)}
          className="cursor-pointer"
        >
          <Sun className="mr-2 size-4" />
          <span>{contentData.theme.toggle.light}</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme(`dark`)}
          className="cursor-pointer"
        >
          <Moon className="mr-2 size-4" />
          <span>{contentData.theme.toggle.dark}</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme(`system`)}
          className="cursor-pointer"
        >
          <Monitor className="mr-2 size-4" />
          <span>{contentData.theme.toggle.system}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
