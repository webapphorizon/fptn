import FAQSection from "~/components/sections/faq-section";
import Footer from "~/components/sections/footer";
import Header from "~/components/sections/header";
import HeroSection from "~/components/sections/hero-section";
import StepsSection from "~/components/sections/steps-section";

export const dynamic = "force-static";

export async function generateStaticParams() {
  const locales = ["en", "ru", "es", "de", "fr", "it", "pt", "cn", "jp", "kr"];
  return locales.map((locale) => ({ locale }));
}

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="mx-auto flex max-w-[94rem] flex-col gap-20 px-4 pt-5 pb-30 md:pt-10 md:pb-40 lg:gap-10 lg:px-8">
        <HeroSection />
        <StepsSection />
        <FAQSection />
      </main>
      <Footer />
    </>
  );
}
