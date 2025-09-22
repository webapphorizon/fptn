"use client";

import { useTranslations } from "next-intl";
import ContactsBlock from "~/components/block/contacts-block";

const ContactsSection = () => {
  const t = useTranslations("contacts");
  return (
    <section
      className="mx-auto w-full max-w-[102rem] flex-col gap-8"
      id="contacts"
    >
      <div className="flex flex-col items-center gap-2 pb-8">
        <h2 className="text-center">{t("title")}</h2>
        <p className="text-muted-foreground max-w-2xl text-center">
          {t("description")}
        </p>
      </div>
      <div>
        <ContactsBlock />
      </div>
    </section>
  );
};

export default ContactsSection;
