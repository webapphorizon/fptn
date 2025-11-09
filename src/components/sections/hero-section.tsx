"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import CustomLink from "../ui/custom-link";
import { DownloadButton } from "../ui/download-button";
import { Button } from "../ui/button";
import Link from "next/link";
import { BubbleBackground } from "~/components/backgrounds/bubble";

type BubbleBackgroundProps = {
  interactive: boolean;
};

const BubbleBackgroundDemo = ({ interactive }: BubbleBackgroundProps) => {
  return (
    <BubbleBackground
      interactive={interactive}
      className="absolute inset-0 flex items-center justify-center rounded-xl"
    />
  );
};

const HeroSection = () => {
  const t = useTranslations();

  return (
    <section className="mx-auto w-full" id="hero">
      <div className="relative overflow-hidden rounded-xl p-8 md:p-12 lg:p-16">
        {/* Фон */}
        <BubbleBackgroundDemo interactive={false} />
        <Image
          src="/images/background.webp"
          alt="Background"
          fill
          className="absolute inset-0 -z-10 object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 -z-10 bg-black/80 backdrop-blur-xl" />

        <div className="relative z-10 flex flex-col items-center gap-8 text-white lg:flex-row lg:justify-between">
          <div className="flex max-w-2xl flex-col gap-6">
            <div className="flex items-center gap-8">
              <Image
                src={t("hero.gradientImage.src")}
                alt={t("hero.gradientImage.alt")}
                className="block rounded-full object-cover opacity-90 lg:hidden"
                width={100}
                height={100}
                quality={90}
                priority
              />
              <h1>{t("hero.gradientTitle")}</h1>
            </div>
            <p>
              {t.rich("hero.gradientDescription", {
                br: () => <br />,
                telegramBot: (chunks) => (
                  <CustomLink
                    href={t("links.socials.telegramBotUrl")}
                    className="text-blue-400 underline"
                  >
                    {chunks}
                  </CustomLink>
                ),

                github: (chunks) => (
                  <CustomLink
                    href={t("links.socials.githubUrl")}
                    className="text-blue-400 underline"
                  >
                    {chunks}
                  </CustomLink>
                ),
              })}
            </p>
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-4 xl:flex-row">
                <DownloadButton />
                <Link href={t("download.secondaryButton.url")}>
                  {" "}
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white bg-transparent text-white hover:bg-white/20 hover:text-white max-md:w-full dark:border-white"
                  >
                    <p>{t("download.secondaryButton.text")}</p>
                  </Button>
                </Link>
              </div>
              <div className="flex flex-col">
                <span>Version: 0.3.23</span>
                <CustomLink
                  href={t("hero.releaseNotes.url")}
                  className="text-blue-400 underline"
                >
                  {t("hero.releaseNotes.text")}
                </CustomLink>
              </div>
            </div>
          </div>
          <div className="relative hidden aspect-square w-full max-w-md shrink-0 overflow-hidden rounded-full backdrop-blur-2xl lg:block">
            <Image
              src={t("hero.gradientImage.src")}
              alt={t("hero.gradientImage.alt")}
              fill
              className="object-cover opacity-90"
              sizes="(max-width: 768px) 100vw, 40vw"
              quality={90}
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
