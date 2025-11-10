import { getTranslations, setRequestLocale } from "next-intl/server";
import { PiCurrencyBtcFill } from "react-icons/pi";
import QrCode from "~/components/icons/qrcode";
import Footer from "~/components/sections/footer";
import Header from "~/components/sections/header";
import CustomBreadcrumb from "~/components/ui/custom-breadcrumb";

export const dynamic = "force-static";

export async function generateStaticParams() {
  const locales = ["en", "ru", "es", "de", "fr", "it", "pt", "cn", "jp", "kr"];
  return locales.map((locale) => ({ locale }));
}

export default async function ContributePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "" });

  return (
    <>
      <Header />
      <main className="mx-auto flex w-full max-w-[1504px] flex-1 flex-col gap-6 px-4 pt-5 pb-30 md:pt-10 md:pb-40 lg:gap-10 lg:px-8">
        <CustomBreadcrumb
          items={[{ label: t("breadcrumb.home"), href: "/" }]}
          currentPage={t("contributePage.title")}
        />
        <h1 className="text-4xl font-bold">{t("contributePage.title")}</h1>
        <div className="flex flex-col gap-12 xl:flex-row">
          <div className="flex flex-col justify-between gap-10">
            <div className="max-w-2xl">
              <p>{t("contributePage.description1")}</p>
              <br />
              <p>{t("contributePage.description2")}</p>
            </div>
            <div className="flex gap-14">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <PiCurrencyBtcFill className="size-4" />
                  <p className="max-w-[20rem] truncate xl:max-w-[13.75rem]">
                    <small>
                      9a1f3a322ff119def6f220fe2bb37297b4d87e09fb93905d70dc0cf049684789b
                    </small>
                  </p>
                </div>
                <QrCode />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
