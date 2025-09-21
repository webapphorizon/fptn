import "~/styles/globals.css";

import { type Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Roboto, Noto_Sans, Ubuntu  } from "next/font/google";
import { PlatformProvider } from "~/context/platform-selector-context";

export const metadata: Metadata = {
  title: "webapphorizon",
  description: "webapphorizon",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

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

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${roboto.variable} ${notoSans.variable} ${ubuntu.variable}`} suppressHydrationWarning>
      <body className="mt-[4.5rem]">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <PlatformProvider>{children}</PlatformProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
