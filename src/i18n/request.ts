import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

// Define types for the messages structure
type NestedMessages = { [key: string]: string | NestedMessages };
type LocaleMessages = Record<string, NestedMessages>;

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  try {
    // Динамически импортируем JSON файлы напрямую
    const messages = await Promise.resolve<{ default: LocaleMessages }>(
      import(`../messages/${locale}.json`),
    );
    return {
      locale,
      messages: messages.default,
    };
  } catch (error) {
    console.warn(`⚠️ Warning: Messages for locale '${locale}' not found.`);
    return {
      locale,
      messages: {},
    };
  }
});
