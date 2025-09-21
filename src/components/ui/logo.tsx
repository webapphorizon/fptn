"use client";

import { useTheme } from "next-themes";
import Link from "next/link";
import { useEffect, useState } from "react";
import LogoImage from "~/components/icons/logo";
import { contentData } from "~/lib/content-data";

const Logo = () => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  // Determine fill color based on theme
  const fillColor = mounted && resolvedTheme === "dark" ? "white" : "black";

  return (
    <Link
      href={contentData.links.logo.link}
      className="flex items-center gap-2"
    >
      {/* <Image
        src={contentData.links.logo.src}
        alt={contentData.links.logo.alt}
        width={32}
        height={32}
      /> */}
      <LogoImage fill={fillColor} />
      <h3>{contentData.links.logo?.text}</h3>
    </Link>
  );
};

export default Logo;
