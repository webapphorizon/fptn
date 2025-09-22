"use client";

import { useTranslations } from "next-intl";
import { FaGithub, FaTelegram } from "react-icons/fa6";
import CustomLink from "./custom-link";

const SocialIcons = () => {
  const t = useTranslations("links");

  return (
    <div className="flex gap-4">
      <CustomLink
        href={t("socials.githubUrl")}
        className="text-muted-foreground hover:text-foreground transition-colors"
      >
        <FaGithub className="size-5" />
      </CustomLink>
      <CustomLink
        href={t("socials.telegramUrl")}
        className="text-muted-foreground hover:text-foreground transition-colors"
      >
        <FaTelegram className="size-5" />
      </CustomLink>
    </div>
  );
};

export default SocialIcons;
