"use client";
import { useTranslations } from "next-intl";
import { type ReactElement } from "react";
import Step from "~/components/patterns/step";
import CustomLink from "~/components/ui/custom-link";
import { usePlatform } from "~/context/platform-selector-context";

interface StepItem {
  number: number;
  title: string;
  description: string[];
  image?: string;
  reverse?: boolean;
}

const StepsCardBlock = (): ReactElement => {
  const { selectedPlatform } = usePlatform();
  const t = useTranslations("steps");
  const tLinks = useTranslations("links");

  const platformSteps =
    (t.raw(`${selectedPlatform}.items`) as StepItem[]) ?? [];

  return (
    <div className="flex flex-col gap-3 md:gap-5">
      {platformSteps.map((step) => (
        <Step
          key={step.number}
          image={step.image ?? undefined}
          title={step.title}
          description={
            <span className="flex flex-col gap-2">
              {step.description.map((paragraph, pIndex) => (
                <p key={pIndex}>
                  {t.rich(
                    `${selectedPlatform}.items.${step.number - 1}.description.${pIndex}`,
                    {
                      telegramBot: (chunks) => (
                        <CustomLink
                          href={tLinks("socials.telegramBotUrl")}
                          className="text-blue-400 underline"
                        >
                          {chunks}
                        </CustomLink>
                      ),
                      detailedGuide: (chunks) => (
                        <CustomLink
                          href={
                            " https://github.com/batchar2/fptn/blob/master/docs/macos/README.md"
                          }
                          className="text-blue-400 underline"
                        >
                          {chunks}
                        </CustomLink>
                      ),
                      raspberryPiSetupGuide: (chunks) => (
                        <CustomLink
                          href={
                            "https://github.com/batchar2/fptn?tab=readme-ov-file#fptn-client-installation-and-configuration"
                          }
                          className="text-blue-400 underline"
                        >
                          {chunks}
                        </CustomLink>
                      ),
                    },
                  )}
                </p>
              ))}
            </span>
          }
          number={step.number}
          reverse={step.reverse ?? false}
        />
      ))}
    </div>
  );
};

export default StepsCardBlock;
