"use client";

import {
  NotFoundProvider,
  useNotFoundContext,
} from "~/context/not-found-context";
import CustomLink from "~/components/ui/custom-link";

// Внутренний компонент страницы not-found
const NotFoundContent = () => {
  const { errors } = useNotFoundContext();

  return (
    <div className="bg-background -mt-[4.5rem] flex min-h-screen flex-col items-center justify-center gap-12">
      <div className="flex flex-col items-center gap-4 text-center">
        <h1 className="text-primary font-bold">
          {errors("notFoundPage.errorCode")}
        </h1>
        <p className="text-muted-foreground">
          {errors("notFoundPage.message")}
        </p>
      </div>
      <CustomLink href="/">{errors("notFoundPage.returnText")}</CustomLink>
    </div>
  );
};

// Основной компонент страницы not-found
export default function NotFound() {
  return (
    <NotFoundProvider>
      <NotFoundContent />
    </NotFoundProvider>
  );
}
