import { getTranslations, setRequestLocale } from "next-intl/server";
import Link from "next/link";
import Wrapper from "~/components/block/wrapper";
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
      <main className="flex-1">
        {/* className="mx-auto flex w-full max-w-[94rem] flex-1 flex-col gap-6 px-4
        pt-5 pb-30 md:pt-10 md:pb-40 lg:gap-10 lg:px-8" */}
        <Wrapper>
          <div className="flex flex-col gap-6 pt-5 max-xl:pb-30 md:pt-10 lg:gap-10 ">
            <CustomBreadcrumb
              items={[{ label: t("breadcrumb.home"), href: "/" }]}
              currentPage={t("downloadPage.title")}
            />
            <h1 className="text-4xl font-bold">{t("downloadPage.title")}</h1>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:gap-6">
              {platformKeys.map((key) => (
                <Link
                  key={key}
                  href={t(`download.platforms.${key}.url`)}
                  target="_blank"
                  className="border-border hover:border-border/105 rounded-lg border bg-transparent p-6 transition-all duration-300 ease-in"
                >
                  <span className="text-card-foreground text-xl">
                    {t(`download.platforms.${key}.text`)}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </Wrapper>
      </main>
      <Footer />
    </>
  );
}
