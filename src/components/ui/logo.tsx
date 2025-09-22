"use client";

import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useEffect, useState } from "react";
import LogoImage from "~/components/icons/logo";

const Logo = () => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const t = useTranslations("links");

  // Prevent hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  // Determine fill color based on theme
  const fillColor = mounted && resolvedTheme === "dark" ? "white" : "black";

  return (
    <Link href={t("logo.link")} className="flex items-center gap-2">
      {/* <Image
        src={t("logo.src")}
        alt={t("logo.alt")}
        width={32}
        height={32}
      /> */}
      <LogoImage fill={fillColor} />
      <h3>{t("logo.text")}</h3>
    </Link>
  );
};

export default Logo;
