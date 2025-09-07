"use client";

import { type ReactElement } from "react";
import Step from "~/components/patterns/step";
import { PlatformProvider, usePlatform } from "~/context/platform-selector-context";
import { contentData } from "~/lib/content-data";

const StepsCardBlock = (): ReactElement => {
  const { selectedPlatform } = usePlatform();

  const platformSteps =
    contentData.steps[selectedPlatform as keyof typeof contentData.steps]
      ?.items ?? [];

  return (
    <div className="flex flex-col gap-3 md:gap-5">
      {platformSteps.map((step) => (
        <Step
          key={step.number}
          image={step.image}
          title={step.title}
          description={
            <span className="flex flex-col gap-2">
              {step.description.map((paragraph, pIndex) => (
                <p key={pIndex}>{paragraph}</p>
              ))}
            </span>
          }
          number={step.number}
          reverse={step.reverse}
        />
      ))}
    </div>
  );
};

export default StepsCardBlock;
