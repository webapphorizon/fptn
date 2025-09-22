"use client";

import { useTranslations } from "next-intl";
import StepsCardBlock from "~/components/block/steps-card-block";
import PlatformSelectorToggle from "../block/platform-selector-toggle";

const StepsSection = () => {
  const t = useTranslations("steps");
  return (
    <section className="flex flex-col" id="steps">
      <div className="pb-6" />
      <div className="flex flex-col items-center justify-center gap-2 pb-8">
        <h2>{t("android.title")}</h2>
        {/* <p className="text-muted-foreground text-center">
          {t("android.description")}
        </p> */}
        <PlatformSelectorToggle />
      </div>
      <StepsCardBlock />
    </section>
  );
};

export default StepsSection;
