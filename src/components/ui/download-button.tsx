"use client";

import {
  Apple,
  ChevronDown,
  Download,
  Monitor,
  Smartphone,
} from "lucide-react";
import { useTranslations } from "next-intl";
import type React from "react";
import { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import { ButtonGroup } from "~/components/ui/button-group";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { Separator } from "~/components/ui/separator";

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
    id: "linux-x64",
    icon: <Monitor className="h-4 w-4" />,
    url: "https://github.com/batchar2/fptn/releases/download/0.3.23/fptn-client-0.3.23-ubuntu22.04-amd64.deb",
  },
  {
    id: "linux-arm",
    icon: <Monitor className="h-4 w-4" />,
    url: "https://github.com/batchar2/fptn/releases/download/0.3.23/fptn-client-0.3.23-ubuntu22.04-arm64.deb",
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
      window.open(option.url, "_blank", "noopener,noreferrer");
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
    <ButtonGroup>
      <Button
        size="lg"
        className="w-full max-w-[17.8rem] overflow-hidden bg-white text-black hover:bg-white/90 md:w-[27.5rem] md:max-w-none"
        onClick={() => handleDownload(selectedOption)}
      >
        <Download className="h-8 w-8" />
        <p className="max-w-[20rem] truncate md:max-w-none">
          {t("button.text", { platform: t(`platforms.${selectedOption.id}.text`) })}
        </p>
      </Button>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            size="lg"
            className="bg-white px-3 text-black hover:bg-white/90"
            aria-label={t("button.selectPlatform")}
          >
            <ChevronDown className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent align="end" className="w-80 rounded-xl p-0">
          <div className="space-y-2 p-4">
            {downloadOptionsConfig.map((option) => (
              <button
                key={option.id}
                onClick={() => handleDownload(option)}
                className="hover:bg-muted flex w-full cursor-pointer items-center gap-3 rounded-md p-2 transition-colors"
              >
                {option.icon}
                <span className="text-sm">{t(`platforms.${option.id}.text`)}</span>
              </button>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </ButtonGroup>
  );
}
