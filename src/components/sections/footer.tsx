"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import CustomLink from "~/components/ui/custom-link";
import Logo from "~/components/ui/logo";
import { Separator } from "~/components/ui/separator";
import SocialIcons from "~/components/ui/social-icons";
import madeby from "~/madeby.json";

const Footer = () => {
  const t = useTranslations("footer");
  return (
    <footer
      className="mx-auto flex max-w-[94rem] flex-col px-4 md:px-8"
      id="footer"
    >
      <div className="flex flex-col justify-between gap-8 md:flex-row md:flex-wrap">
        <div className="flex max-w-sm flex-col-reverse gap-8">
          <div className="flex flex-col gap-4">
            <h3 className="w-fit text-sm">{t("contactInfo.title")}</h3>
            {/* <div className="flex flex-col gap-3">
              <Link
                href={contentData.links.phone.url}
                className="text-muted-foreground"
              >
                {contentData.links.phone.text}
              </Link>
              <Link
                href={contentData.links.email.url}
                className="text-muted-foreground"
              >
                {contentData.links.email.text}
              </Link>
              <Link
                href={contentData.links.address.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground"
              >
                {contentData.links.address.text}
              </Link>
            </div> */}
            <div className="flex flex-col gap-2">
              <SocialIcons />
              <Link
                href={madeby.url}
                className="text-muted-foreground gap-4 text-[.6rem] uppercase md:text-[.8rem]"
                style={{ fontFamily: "Roboto, sans-serif" }}
              >
                <span>{madeby.phrase}</span>
              </Link>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Logo />
          </div>
        </div>
        <nav className="flex flex-col gap-4">
          <h3 className="w-fit text-sm">{t("quickLinks.title")}</h3>
          <div className="flex flex-col gap-3">
            {/* <CustomLink className="text-muted-foreground" href="/">
              {t("quickLinks.items.0.text")}
            </CustomLink> */}
            <CustomLink className="text-muted-foreground" href={t("quickLinks.items.1.url")}>
              {t("quickLinks.items.1.text")}
            </CustomLink>
            <CustomLink className="text-muted-foreground" href={t("quickLinks.items.4.url")}>
              {t("quickLinks.items.4.text")}
            </CustomLink>
            <CustomLink className="text-muted-foreground" href={t("quickLinks.items.5.url")}>
              {t("quickLinks.items.5.text")}
            </CustomLink>
          </div>
        </nav>
        {/* <nav className="flex flex-col gap-4">
          <h3 className="w-fit text-sm">{contentData.footer.services.title}</h3>
          <div className="flex flex-col gap-3">
            <CustomLink className="text-muted-foreground" href="/#services">
              {contentData.footer.services.items?.[0]?.text}
            </CustomLink>
            <CustomLink className="text-muted-foreground" href="/#services">
              {contentData.footer.services.items?.[1]?.text}
            </CustomLink>
            <CustomLink className="text-muted-foreground" href="/#services">
              {contentData.footer.services.items?.[2]?.text}
            </CustomLink>
            <CustomLink className="text-muted-foreground" href="/#services">
              {contentData.footer.services.items?.[3]?.text}
            </CustomLink>
          </div>
        </nav> */}

        {/* <div className="flex flex-col gap-4">
          <h3 className="w-fit text-sm">
            {contentData.footer.newsletter.title}
          </h3>
          <div className="flex flex-col gap-3">
            <p className="text-muted-foreground max-w-sm">
              {contentData.footer.newsletter.description}
            </p>
            <NewsletterForm />
          </div>
        </div> */}
      </div>
      <Separator className="my-8" />
      <div className="border-border flex flex-col-reverse justify-center pb-5 md:pb-7 xl:flex-row">
        <p className="text-muted-foreground pt-8 xl:pt-0">{t("copyright")}</p>
        {/* <div className="flex flex-col gap-3 xl:flex-row xl:gap-8">
          <CustomLink href="/privacy-policy" className="text-muted-foreground">
            {contentData.footer.legalLinks?.[1]?.text}
          </CustomLink>
          <CustomLink
            href="/terms-of-service"
            className="text-muted-foreground"
          >
            {contentData.footer.legalLinks?.[0]?.text}
          </CustomLink>
          <CustomLink href="/cookie-policy" className="text-muted-foreground">
            {contentData.footer.legalLinks?.[2]?.text}
          </CustomLink>
        </div> */}
      </div>
    </footer>
  );
};

export default Footer;
