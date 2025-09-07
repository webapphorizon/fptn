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
    url: "#google-play",
  },
  {
    id: "android-direct",
    label: "Android напрямую с сайта",
    icon: <Smartphone className="h-4 w-4" />,
    url: "#android-direct",
  },
  {
    id: "windows",
    label: "Windows (Windows 10/11 x86_64)",
    icon: <Monitor className="h-4 w-4" />,
    url: "#windows",
  },
  {
    id: "macos-silicon",
    label: "macOS (Apple Silicon)",
    icon: <Apple className="h-4 w-4" />,
    url: "#macos-silicon",
  },
  {
    id: "macos-intel",
    label: "macOS (Intel)",
    icon: <Apple className="h-4 w-4" />,
    url: "#macos-intel",
  },
  {
    id: "linux-x64",
    label: "Linux (Ubuntu x86_64)",
    icon: <Monitor className="h-4 w-4" />,
    url: "#linux-x64",
  },
  {
    id: "linux-arm",
    label: "Linux (Ubuntu ARM64)",
    icon: <Monitor className="h-4 w-4" />,
    url: "#linux-arm",
  },
];

export function DownloadButton() {
  const [selectedOption, setSelectedOption] = useState<DownloadOption>(
    downloadOptions[0]!,
  );

  const handleDownload = (option: DownloadOption) => {
    setSelectedOption(option);
    // Здесь можно добавить логику для фактического скачивания
    window.open(option.url, "_blank");
  };

  return (
    <div className="flex items-center gap-0">
      {/* Основная кнопка скачивания */}
      <Button
        size="lg"
        className="rounded-r-none border-r border-indigo-200 bg-white text-indigo-600 hover:bg-white/90"
        onClick={() => handleDownload(selectedOption)}
      >
        <Download className="mr-2 h-4 w-4" />
        Скачать для {selectedOption.label}
      </Button>

      {/* Выпадающее меню для выбора платформы */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            size="lg"
            className="rounded-l-none bg-white px-3 text-indigo-600 hover:bg-white/90"
          >
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-80">
          {downloadOptions.map((option) => (
            <DropdownMenuItem
              key={option.id}
              onClick={() => setSelectedOption(option)}
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
