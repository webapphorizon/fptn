import Wrapper from "~/components/block/wrapper";
import FAQSection from "~/components/sections/faq-section";
import Footer from "~/components/sections/footer";
import Header from "~/components/sections/header";
import HeroSection from "~/components/sections/hero-section";
import StepsSection from "~/components/sections/steps-section";

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="gap-6 pt-5 pb-30 md:pt-10 md:pb-40 lg:gap-10">
        <Wrapper>
          <HeroSection />
          <StepsSection />
          <FAQSection />
        </Wrapper>
      </main>
      <Footer />
    </>
  );
}
