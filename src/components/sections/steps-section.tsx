import StepsCardBlock from "~/components/block/steps-card-block";
import { contentData } from "~/lib/content-data";

const StepsSection = () => {
  return (
    <section className="flex flex-col" id="steps">
      <div className="bold mx-auto flex w-full max-w-2xl justify-between text-2xl">
        <div>
          <span>Android</span>
        </div>
        <div>
          <span>Windows</span>
        </div>
        <div>
          <span>Linux</span>
        </div>
        <div>
          <span>macOS</span>
        </div>
      </div>
      <div className="pb-6" />
      <div className="flex flex-col items-center justify-center gap-2 pb-8">
        <h2>{contentData.steps.title}</h2>
        <p className="text-muted-foreground text-center">
          {contentData.steps.description}
        </p>
      </div>
      <StepsCardBlock />
    </section>
  );
};

export default StepsSection;
