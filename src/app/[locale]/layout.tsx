import "~/styles/globals.css";

import { type Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { ThemeProvider } from "next-themes";
import { Noto_Sans, Roboto, Ubuntu } from "next/font/google";
import { PlatformProvider } from "~/context/platform-selector-context";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const messages = await getMessages({ locale });

  return {
    title: (messages["metadata.title"] as string) || "FPTN Project",
    description: (messages["metadata.description"] as string) || "FPTN Project",
    icons: [{ rel: "icon", url: "/favicon.ico" }],
  };
}

const roboto = Roboto({
  subsets: ["cyrillic", "latin"],
  variable: "--font-roboto-sans",
  weight: ["400", "600", "700", "900"],
});

const notoSans = Noto_Sans({
  subsets: ["cyrillic", "latin"],
  variable: "--font-noto-sans",
  weight: ["400", "600", "700", "900"],
});

const ubuntu = Ubuntu({
  subsets: ["cyrillic", "latin"],
  variable: "--font-ubuntu",
  weight: ["300", "400", "500", "700"],
});

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function RootLayout({ children, params }: Props) {
  const { locale } = await params;
  const messages = await getMessages({ locale });
  return (
    <html
      lang={locale}
      className={`${roboto.variable} ${notoSans.variable} ${ubuntu.variable}`}
      suppressHydrationWarning
    >
      <body className="mt-[4.5rem]">
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <PlatformProvider>{children}</PlatformProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
