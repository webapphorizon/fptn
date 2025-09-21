"use client";

import type React from "react";

import {
  Apple,
  ChevronDown,
  Download,
  Monitor,
  Smartphone,
} from "lucide-react";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

interface DownloadOption {
  id: string;
  label: string;
  icon: React.ReactNode;
  url: string;
}

const downloadOptions: DownloadOption[] = [
  {
    id: "android-play",
    label: "Android из Google Play",
    icon: <Smartphone className="h-4 w-4" />,
    url: "https://play.google.com/store/apps/details?id=your.app.id",
  },
  {
    id: "android-direct",
    label: "Android напрямую с сайта",
    icon: <Smartphone className="h-4 w-4" />,
    url: "/downloads/app-android.apk",
  },
  {
    id: "windows",
    label: "Windows (Windows 10/11 x86_64)",
    icon: <Monitor className="h-4 w-4" />,
    url: "/downloads/app-windows-x64.exe",
  },
  {
    id: "macos-silicon",
    label: "macOS (Apple Silicon)",
    icon: <Apple className="h-4 w-4" />,
    url: "/downloads/app-macos-arm64.dmg",
  },
  {
    id: "macos-intel",
    label: "macOS (Intel)",
    icon: <Apple className="h-4 w-4" />,
    url: "/downloads/app-macos-x64.dmg",
  },
  {
    id: "linux-x64",
    label: "Linux (Ubuntu x86_64)",
    icon: <Monitor className="h-4 w-4" />,
    url: "/downloads/app-linux-x64.AppImage",
  },
  {
    id: "linux-arm",
    label: "Linux (Ubuntu ARM64)",
    icon: <Monitor className="h-4 w-4" />,
    url: "/downloads/app-linux-arm64.AppImage",
  },
];

export function DownloadButton() {
  // Safe initialization with fallback
  const [selectedOption, setSelectedOption] = useState<DownloadOption>(() => {
    return (
      downloadOptions[0] ?? {
        id: "default",
        label: "Скачать",
        icon: <Download className="h-4 w-4" />,
        url: "#",
      }
    );
  });

  const handleDownload = (option: DownloadOption) => {
    setSelectedOption(option);

    // For external links (like Play Store), open in new tab
    if (option.url.startsWith("http")) {
      window.open(option.url, "_blank", "noopener,noreferrer");
    } else {
      // For direct file downloads, trigger download
      const link = document.createElement("a");
      link.href = option.url;
      link.download = "";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="flex items-center gap-0">
      {/* Основная кнопка скачивания */}
      <Button
        size="lg"
        className="w-full max-w-[15rem] overflow-hidden rounded-r-none border-r border-indigo-200 bg-white text-black hover:bg-white/90 md:w-[23.125rem] md:max-w-none"
        onClick={() => handleDownload(selectedOption)}
      >
        <Download className="h-8 w-8" />
        <p className="max-w-[12.5rem] truncate md:max-w-none">
          Скачать для {selectedOption.label}
        </p>
      </Button>

      {/* Выпадающее меню для выбора платформы */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            size="lg"
            className="rounded-l-none bg-white px-3 text-black hover:bg-white/90"
            aria-label="Выбрать другую платформу для скачивания"
          >
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-80">
          {downloadOptions.map((option) => (
            <DropdownMenuItem
              key={option.id}
              onClick={() => handleDownload(option)}
              className="flex cursor-pointer items-center gap-3 p-3"
            >
              {option.icon}
              <span>{option.label}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
