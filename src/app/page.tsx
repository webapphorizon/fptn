import FAQSection from "~/components/sections/faq-section";
import Footer from "~/components/sections/footer";
import Header from "~/components/sections/header";
import HeroSection from "~/components/sections/hero-section";
import StepsSection from "~/components/sections/steps-section";

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="mx-auto flex max-w-[94rem] flex-col gap-20 px-4 pt-5 pb-30 md:pt-10 md:pb-40 lg:gap-10 lg:px-8">
        <HeroSection variant="gradient" />
        <StepsSection />
        <FAQSection />
      </main>
      <Footer />
    </>
  );
}
