"use client";
import { type ReactElement } from "react";
import Step from "~/components/patterns/step";
import { usePlatform } from "~/context/platform-selector-context";
import { contentData } from "~/lib/content-data";

// Define the expected shape
interface StepItem {
  number: number;
  title: string;
  description: string[];
  image?: string;
  reverse?: boolean;
}

const StepsCardBlock = (): ReactElement => {
  const { selectedPlatform } = usePlatform();
  const platformSteps =
    contentData.steps?.[selectedPlatform as keyof typeof contentData.steps]
      ?.items ?? [];

  return (
    <div className="flex flex-col gap-3 md:gap-5">
      {platformSteps.map((stepData: unknown) => {
        // Type guard to ensure we have the right shape
        const step = stepData as StepItem;

        return (
          <Step
            key={step.number}
            image={step.image ?? undefined}
            title={step.title}
            description={
              <span className="flex flex-col gap-2">
                {step.description.map((paragraph, pIndex) => (
                  <p key={pIndex}>{paragraph}</p>
                ))}
              </span>
            }
            number={step.number}
            reverse={step.reverse ?? false}
          />
        );
      })}
    </div>
  );
};

export default StepsCardBlock;
