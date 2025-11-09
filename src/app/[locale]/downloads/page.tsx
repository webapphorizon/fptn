import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Link from "next/link";
import Footer from "~/components/sections/footer";
import Header from "~/components/sections/header";
import CustomBreadcrumb from "~/components/ui/custom-breadcrumb";

export default async function ClientDownloadsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "" });

  // Define platform keys that match your translation file
  const platformKeys = [
    "android-play",
    "android-direct",
    "windows",
    "macos-silicon",
    "macos-intel",
    "linux-x64",
    "linux-arm",
    "command-line-tools",
  ] as const;

  return (
    <>
      <Header />
      <main className="mx-auto flex w-full max-w-[94rem] flex-1 flex-col px-4 gap-6 pb-30 pt-5 md:pt-10 md:pb-40 lg:gap-10 lg:px-8">
        <CustomBreadcrumb
          items={[{ label: t("breadcrumb.home"), href: "/" }]}
          currentPage={t("downloadPage.title")}
        />
        <h1 className="text-4xl font-bold">{t("downloadPage.title")}</h1>

        <div className="grid grid-cols-1 gap-4 xl:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {platformKeys.map((key) => (
            <Link
              key={key}
              href={t(`download.platforms.${key}.url`)}
              className="border-border bg-transparent rounded-lg border p-6  duration-300 ease-in transition-all hover:border-border/105 "
            >
              <span className="text-card-foreground text-xl">
                {t(`download.platforms.${key}.text`)}
              </span>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
