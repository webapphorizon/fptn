"use client";

import * as React from "react";
import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

export interface MagicBackButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  backLink?: string;
}

export const MagicBackButton = React.forwardRef<
  HTMLButtonElement,
  MagicBackButtonProps
>(({ className, onClick, children, backLink = "/", ...props }, ref) => {
  const router = useRouter();
  const [isFirstPage, setIsFirstPage] = React.useState(false);

  React.useEffect(() => {
    // Check if there's history to go back to
    setIsFirstPage(window.history.length <= 1);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isFirstPage) {
      router.push(backLink);
    } else {
      router.back();
    }
    onClick?.(e);
  };

  return (
    <Button
      ref={ref}
      className={cn("", className)}
      onClick={handleClick}
      {...props}
    >
      {children ?? <ChevronLeft />}
    </Button>
  );
});

MagicBackButton.displayName = "MagicBackButton";
