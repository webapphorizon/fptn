import { getTranslations, setRequestLocale } from "next-intl/server";
import { PiCurrencyBtcFill } from "react-icons/pi";
import Footer from "~/components/sections/footer";
import Header from "~/components/sections/header";
import CustomBreadcrumb from "~/components/ui/custom-breadcrumb";
import ImgSphere, { type ImageData } from "~/components/ui/img-sphere";
import { TbCoinMoneroFilled } from "react-icons/tb";
import QrCode from "~/components/icons/qrcode";

// Image data using project assets - duplicated to fill sphere better
const BASE_IMAGES: Omit<ImageData, "id">[] = [
  {
    src: "/images/avatar.jpg",
    alt: "Image 1",
    title: "Mountain Landscape",
    description:
      "A beautiful landscape captured at golden hour with mountains in the background.",
  },
  {
    src: "/images/avatar.jpg",
    alt: "Image 2",
    title: "Portrait Photography",
    description:
      "Stunning portrait photography showcasing natural lighting and composition.",
  },
  {
    src: "/images/avatar.jpg",
    alt: "Image 3",
    title: "Urban Architecture",
    description:
      "Modern architectural design featuring clean lines and geometric patterns.",
  },
  {
    src: "/images/avatar.jpg",
    alt: "Image 4",
    title: "Nature Scene",
    description:
      "Peaceful nature scene with vibrant colors and natural beauty.",
  },
  {
    src: "/images/avatar.jpg",
    alt: "Image 5",
    title: "Abstract Art",
    description:
      "Creative abstract composition with bold colors and unique patterns.",
  },
  {
    src: "/images/avatar.jpg",
    alt: "Image 6",
    title: "Mountain Landscape",
    description:
      "A beautiful landscape captured at golden hour with mountains in the background.",
  },
  {
    src: "/images/avatar.jpg",
    alt: "Image 7",
    title: "Portrait Photography",
    description:
      "Stunning portrait photography showcasing natural lighting and composition.",
  },
  {
    src: "/images/avatar.jpg",
    alt: "Image 8",
    title: "Urban Architecture",
    description:
      "Modern architectural design featuring clean lines and geometric patterns.",
  },
  {
    src: "/images/avatar.jpg",
    alt: "Image 9",
    title: "Nature Scene",
    description:
      "Peaceful nature scene with vibrant colors and natural beauty.",
  },
  {
    src: "/images/avatar.jpg",
    alt: "Image 10",
    title: "Abstract Art",
    description:
      "Creative abstract composition with bold colors and unique patterns.",
  },
  {
    src: "/images/avatar.jpg",
    alt: "Image 11",
    title: "Abstract Art",
    description:
      "Creative abstract composition with bold colors and unique patterns.",
  },
  {
    src: "/images/avatar.jpg",
    alt: "Image 12",
    title: "Abstract Art",
    description:
      "Creative abstract composition with bold colors and unique patterns.",
  },
];

// Generate more images by repeating the base set
const IMAGES: ImageData[] = [];
for (let i = 0; i < 60; i++) {
  const baseIndex = i % BASE_IMAGES.length;
  const baseImage = BASE_IMAGES[baseIndex];
  if (baseImage) {
    IMAGES.push({
      id: `img-${i + 1}`,
      ...baseImage,
      alt: `${baseImage.alt} (${Math.floor(i / BASE_IMAGES.length) + 1})`,
    });
  }
}

// Component configuration - easily adjustable
interface SphereConfig {
  containerSize: number;
  sphereRadius: number;
  dragSensitivity: number;
  momentumDecay: number;
  maxRotationSpeed: number;
  baseImageScale: number;
  hoverScale: number;
  perspective: number;
  autoRotate: boolean;
  autoRotateSpeed: number;
}

const CONFIG: SphereConfig = {
  containerSize: 640, // Container size in pixels
  sphereRadius: 300, // Virtual sphere radius (increased for better spacing)
  dragSensitivity: 0.3, // Mouse drag sensitivity (0.1 - 2.0)
  momentumDecay: 0.8, // How fast momentum fades (0.8 - 0.99)
  maxRotationSpeed: 6, // Maximum rotation speed (1 - 10)
  baseImageScale: 0.15, // Base image size (reduced to minimize overlap)
  hoverScale: 1.7, // Hover scale multiplier (1.0 - 2.0)
  perspective: 1400, // CSS perspective value (500 - 2000)
  autoRotate: true, // Enable/disable auto rotation
  autoRotateSpeed: 0.2, // Auto rotation speed (0.1 - 2.0, higher = faster)
};

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
              {/* <br /> */}
              <br />
              <p>{t("contributePage.description2")}</p>
            </div>{" "}
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
                {/* <img src="/svg/qrcode.svg" alt="QR Code" className="xl:w-60 xl:h-60  object-cover" /> */}
              </div>
              {/* <div className="flex  gap-2 flex-col">
                <div className="flex items-center  gap-2">
                  <TbCoinMoneroFilled className="size-4" />
                  <p className="truncate max-w-[20rem] xl:max-w-[220px]">
                    <small>
                      3a5f9d8b7c3ea14f1e5b9eaf2d4c87f2a8b6d5c1fca3b2974e9d1a6b7c2f5843
                    </small>
                  </p>
                </div>
                <QrCode />
              </div> */}
            </div>
          </div>
          <div className="max-xl:hidden">
            <ImgSphere images={IMAGES} {...CONFIG} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
