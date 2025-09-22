"use client";
import { useTranslations } from "next-intl";
import { type ReactElement } from "react";
import Step from "~/components/patterns/step";
import { usePlatform } from "~/context/platform-selector-context";
import CustomLink from "~/components/ui/custom-link";

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
                      telegram: (chunks) => (
                        <CustomLink
                          href="https://t.me/fptn_project"
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
