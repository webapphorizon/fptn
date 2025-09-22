"use client";

import {
  Apple,
  ChevronDown,
  Download,
  Monitor,
  Smartphone,
  Terminal,
} from "lucide-react";
import { useTranslations } from "next-intl";
import type React from "react";
import { useEffect, useState } from "react";
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

function detectPlatform(): DownloadOption {
  if (typeof navigator === "undefined") return downloadOptionsConfig[0]!;

  const ua = navigator.userAgent;

  if (/android/i.test(ua)) {
    return (
      downloadOptionsConfig.find((o) => o.id === "android-play") ??
      downloadOptionsConfig[0]!
    );
  }
  if (/iPad|iPhone|iPod/i.test(ua)) {
    return (
      downloadOptionsConfig.find((o) => o.id === "android-play") ??
      downloadOptionsConfig[0]!
    );
  }
  if (/Win/i.test(ua)) {
    return (
      downloadOptionsConfig.find((o) => o.id === "windows") ??
      downloadOptionsConfig[0]!
    );
  }
  if (/Mac/i.test(ua)) {
    if (
      navigator.userAgent.includes("ARM") ||
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)
    ) {
      return (
        downloadOptionsConfig.find((o) => o.id === "macos-silicon") ??
        downloadOptionsConfig[0]!
      );
    }
    return (
      downloadOptionsConfig.find((o) => o.id === "macos-intel") ??
      downloadOptionsConfig[0]!
    );
  }
  if (/Linux/i.test(ua)) {
    return (
      downloadOptionsConfig.find((o) => o.id === "linux-x64") ??
      downloadOptionsConfig[0]!
    );
  }

  return downloadOptionsConfig[0]!;
}

export function DownloadButton() {
  const t = useTranslations("download");

  const [selectedOption, setSelectedOption] = useState<DownloadOption>(() => ({
    id: "android-play",
    icon: <Download className="h-4 w-4" />,
    url: "#",
  }));

  useEffect(() => {
    setSelectedOption(detectPlatform());
  }, []);

  const handleDownload = (option: DownloadOption) => {
    setSelectedOption(option);

    if (option.url.startsWith("http")) {
      window.open(option.url, "_self", "noopener,noreferrer");
    } else {
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
      <Button
        size="lg"
        className="w-full max-w-[15rem] overflow-hidden rounded-r-none border-r border-indigo-200 bg-white text-black hover:bg-white/90 md:w-[26.25rem] md:max-w-none"
        onClick={() => handleDownload(selectedOption)}
      >
        <Download className="h-8 w-8" />
        <p className="max-w-[12.5rem] truncate md:max-w-none">
          {t("button.text", { platform: t(`platforms.${selectedOption.id}`) })}
        </p>
      </Button>

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
