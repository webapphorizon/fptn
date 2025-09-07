import StepsCardBlock from "~/components/block/steps-card-block";
import { contentData } from "~/lib/content-data";
import PlatformSelectorToggle from "../block/platform-selector-toggle";

const StepsSection = () => {
  return (
    <section className="flex flex-col" id="steps">
      <div className="pb-6" />
      <div className="flex flex-col items-center justify-center gap-2 pb-8">
        <h2>{contentData.steps.android.title}</h2>
        {/* <p className="text-muted-foreground text-center">
          {contentData.steps.android.description}
        </p> */}
        <PlatformSelectorToggle />
      </div>
      <StepsCardBlock />
    </section>
  );
};

export default StepsSection;
