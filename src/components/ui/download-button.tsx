"use client";

import type React from "react";

import {
  Apple,
  ChevronDown,
  Download,
  Monitor,
  Smartphone,
  Terminal,
} from "lucide-react";
import { useTranslations } from "next-intl";
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
  icon: React.ReactNode;
  url: string;
}

const downloadOptionsConfig: DownloadOption[] = [
  {
    id: "android-play",
    icon: <Smartphone className="h-4 w-4" />,
    url: "https://play.google.com/store/apps/details?id=org.fptn.vpn&pli=1",
  },
  {
    id: "android-direct",
    icon: <Smartphone className="h-4 w-4" />,
    url: "/downloads/app-android.apk",
  },
  {
    id: "windows",
    icon: <Monitor className="h-4 w-4" />,
    url: "https://github.com/batchar2/fptn/releases/download/0.3.23/FptnClientInstaller-0.3.23-windows-x64_x86.zip",
  },
  {
    id: "macos-silicon",
    icon: <Apple className="h-4 w-4" />,
    url: "https://github.com/batchar2/fptn/releases/download/0.3.23/fptn-client-0.3.23-apple-silicon.pkg",
  },
  {
    id: "macos-intel",
    icon: <Apple className="h-4 w-4" />,
    url: "https://github.com/batchar2/fptn/releases/download/0.3.23/fptn-client-0.3.23-intel.pkg",
  },
  {
    id: "linux-x64",
    icon: <Monitor className="h-4 w-4" />,
    url: "https://github.com/batchar2/fptn/releases/download/0.3.23/fptn-client-0.3.23-ubuntu22.04-amd64.deb",
  },
  {
    id: "linux-arm",
    icon: <Monitor className="h-4 w-4" />,
    url: "https://github.com/batchar2/fptn/releases/download/0.3.23/fptn-client-0.3.23-ubuntu22.04-arm64.deb",
  },
  {
    id: "command-line-tools",
    icon: <Terminal className="h-4 w-4" />,
    url: "https://github.com/batchar2/fptn/releases/download/0.3.23/fptn-client-0.3.23-command-line-tools.zip",
  },
];

export function DownloadButton() {
  const t = useTranslations("download");

  // Safe initialization with fallback
  const [selectedOption, setSelectedOption] = useState<DownloadOption>(() => {
    return (
      downloadOptionsConfig[0] ?? {
        id: "default",
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
      {/* Main download button */}
      <Button
        size="lg"
        className="w-full max-w-[15rem] overflow-hidden rounded-r-none border-r border-indigo-200 bg-white text-black hover:bg-white/90 md:w-[23.125rem] md:max-w-none"
        onClick={() => handleDownload(selectedOption)}
      >
        <Download className="h-8 w-8" />
        <p className="max-w-[12.5rem] truncate md:max-w-none">
          {t("button.text", { platform: t(`platforms.${selectedOption.id}`) })}
        </p>
      </Button>

      {/* Dropdown menu for platform selection */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            size="lg"
            className="rounded-l-none bg-white px-3 text-black hover:bg-white/90"
            aria-label={t("button.selectPlatform")}
          >
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-80">
          {downloadOptionsConfig.map((option) => (
            <DropdownMenuItem
              key={option.id}
              onClick={() => handleDownload(option)}
              className="flex cursor-pointer items-center gap-3 p-3"
            >
              {option.icon}
              <span>{t(`platforms.${option.id}`)}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
