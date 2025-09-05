import Image from "next/image";
import type { ReactNode } from "react";
import { Separator } from "~/components/ui/separator";
import { cn } from "~/lib/utils";

interface StepProps {
  image: string;
  title: string;
  description: ReactNode;
  number: number;
  reverse?: boolean;
}

const Step = ({
  image,
  title,
  description,
  number,
  reverse = false,
}: StepProps) => {
  return (
    <div
      className={cn(
        "flex gap-2 md:gap-8 xl:gap-10",
        reverse && "md:flex-row-reverse",
      )}
    >
      <div className={cn("flex w-full flex-1 flex-col gap-2 max-md:hidden")}>
        <div className="relative mt-1 mb-10 flex aspect-video w-full justify-end">
          <Image
            src={image}
            className="rounded-lg object-contain"
            alt="Step"
            width={300}
            height={300}
          />
        </div>
      </div>
      <div className="flex w-fit">
        <div className="flex h-full flex-col items-center gap-3 md:gap-5">
          <div className="flex h-7 w-7 items-center justify-center rounded-full border bg-transparent md:h-12 md:w-12">
            <h3>{number}</h3>
          </div>
          <Separator className="flex-1" orientation="vertical" />
        </div>
      </div>
      <div
        className={cn(
          "mb-5 flex flex-1 flex-col gap-5 md:gap-5",
          reverse && "md:text-right",
        )}
      >
        <div className="flex flex-col gap-5">
          <h3>{title}</h3>
          <div className="text-muted-foreground">{description}</div>
        </div>
        <div className="relative aspect-video w-full md:hidden">
          <Image
            src={image}
            className="rounded-lg object-contain"
            alt="Step"
            width={300}
            height={300}
          />
        </div>
      </div>
    </div>
  );
};

export default Step;
