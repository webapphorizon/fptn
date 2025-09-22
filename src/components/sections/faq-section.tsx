"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import FAQAccordionBlock from "~/components/block/faq-accordion-block";
import { Button } from "~/components/ui/button";

const FAQSection = () => {
  const t = useTranslations("faq");

  return (
    <section className="mx-auto flex max-w-2xl flex-col items-center" id="faq">
      <div className="flex flex-col items-center gap-2 pb-8 text-center">
        <h2>{t("title")}</h2>
        <p className="text-muted-foreground">{t("description")}</p>
      </div>
      <FAQAccordionBlock />
      <div className="flex flex-col items-center gap-5 pt-10">
        <h3 className="text-center">{t("callToAction.text")}</h3>
        <Button asChild variant="cta" size="lg" className="shadow-lg ">
          <Link href={t("callToAction.button.url")}>
            {t("callToAction.button.text")}
          </Link>
        </Button>
      </div>
    </section>
  );
};

export default FAQSection;
