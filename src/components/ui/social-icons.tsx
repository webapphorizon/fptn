import { FaGithub, FaTelegram } from "react-icons/fa6";
import { contentData } from "~/lib/content-data";
import CustomLink from "./custom-link";

const SocialIcons = () => {
  return (
    <div className="flex gap-4">
      <CustomLink
        href={contentData.links.socials.githubUrl}
        className="text-muted-foreground hover:text-foreground transition-colors"
      >
        <FaGithub className="size-5" />
      </CustomLink>
      <CustomLink
        href={contentData.links.socials.telegramUrl}
        className="text-muted-foreground hover:text-foreground transition-colors"
      >
        <FaTelegram className="size-5" />
      </CustomLink>
    </div>
  );
};

export default SocialIcons;
