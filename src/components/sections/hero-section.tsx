import Image from "next/image";
import { contentData } from "~/lib/content-data";
import CustomLink from "../ui/custom-link";
import { DownloadButton } from "../ui/download-button";

interface HeroData {
  gradientTitle: string;
  gradientDescription: string;
  gradientImage: {
    src: string;
    alt: string;
  };
}

const HeroSection = () => {
  const heroData = contentData.hero as unknown as HeroData;

  return (
    <section className="mx-auto w-full">
      <div className="relative overflow-hidden rounded-xl p-8 md:p-12 lg:p-16">
        {/* Фон-картинка */}
        <Image
          src="/images/background.webp"
          alt="Background"
          fill
          className="absolute inset-0 -z-10 object-cover"
          sizes="100vw"
          priority
        />
        {/* Полупрозрачный оверлей, чтобы текст был читаемым */}
        <div className="absolute inset-0 -z-10 bg-black/80 backdrop-blur-xl" />

        <div className="relative z-10 flex flex-col items-center gap-8 text-white lg:flex-row lg:justify-between">
          <div className="flex max-w-2xl flex-col gap-6">
            <h1>{heroData.gradientTitle}</h1>
            <p>{heroData.gradientDescription}</p>
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-4 sm:flex-row">
                <DownloadButton />
              </div>
              <div className="flex flex-col">
                <span>Version: 0.3.23</span>
                <CustomLink
                  href="https://github.com/FPTN-Project/FPTN/releases/tag/v0.3.23"
                  className=""
                >
                  Читать описание релиза
                </CustomLink>
              </div>
            </div>
          </div>
          <div className="relative hidden aspect-square w-full max-w-md shrink-0 overflow-hidden rounded-full backdrop-blur-2xl lg:block">
            <Image
              src={heroData.gradientImage.src}
              alt={heroData.gradientImage.alt}
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
