"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import CustomLink from "~/components/ui/custom-link";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionBlockProps {
  questions?: FAQItem[];
}

const FAQAccordionBlock = ({ questions }: FAQAccordionBlockProps) => {
  const t = useTranslations("faq");
  const tLinks = useTranslations("links");
  const faqItems = questions ?? (t.raw("questions") as FAQItem[]);
  const [openItem, setOpenItem] = useState<string | undefined>(undefined);

  if (!faqItems?.length) {
    return null;
  }

  return (
    <div className="flex w-full flex-col gap-5 lg:min-w-2xl xl:min-w-3xl">
      {faqItems.map((item, index) => (
        <Accordion
          key={`faq-${index}`}
          type="single"
          value={openItem}
          onValueChange={setOpenItem}
          collapsible
          className="border-b"
        >
          <AccordionItem value={`item-${index}`}>
            <AccordionTrigger>
              <p>{item.question}</p>
            </AccordionTrigger>
            <AccordionContent>
              <p className="text-muted-foreground">
                {t.rich(`questions.${index}.answer`, {
                  telegramBot: (chunks) => (
                    <CustomLink
                      href={tLinks("socials.telegramBotUrl")}
                      className="text-blue-400 underline"
                    >
                      {chunks}
                    </CustomLink>
                  ),
                  telegramChannel: (chunks) => (
                    <CustomLink
                      href={tLinks("socials.telegramChannelUrl")}
                      className="text-blue-400 underline"
                    >
                      {chunks}
                    </CustomLink>
                  ),
                  github: (chunks) => (
                    <CustomLink
                      href={tLinks("socials.githubUrl")}
                      className="text-blue-400 underline"
                    >
                      {chunks}
                    </CustomLink>
                  ),
                })}
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}
    </div>
  );
};

export default FAQAccordionBlock;
