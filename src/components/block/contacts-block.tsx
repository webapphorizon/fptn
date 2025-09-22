"use client";

import { Mail, MapPin, Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";

const ContactsInfoBlockText = () => {
  const tContacts = useTranslations("contacts");
  const tLinks = useTranslations("links");

  return (
    <div>
      <h3 className="mb-4">{tContacts("title")}</h3>
      <div className="flex flex-col gap-6">
        <div className="flex items-start gap-4">
          <Phone className="mt-1 h-6 w-6" />
          <div className="flex flex-col">
            <p className="font-medium">
              {tContacts("contactInfo.items.0.label")}
            </p>
            <Link href={tLinks("phone.url")} className="text-muted-foreground">
              {tLinks("phone.text")}
            </Link>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <Mail className="mt-1 h-6 w-6" />
          <div className="flex flex-col">
            <p className="font-medium">
              {tContacts("contactInfo.items.1.label")}
            </p>
            <Link href={tLinks("email.url")} className="text-muted-foreground">
              {tLinks("email.text")}
            </Link>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <MapPin className="mt-1 h-6 w-6" />
          <div className="flex flex-col">
            <p className="font-medium">
              {tContacts("contactInfo.items.2.label")}
            </p>
            <Link
              href={tLinks("address.mapUrl")}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground"
            >
              {tLinks("address.text")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const ContactsInfoBlock = () => {
  return (
    <div>
      <ContactsInfoBlockText />
    </div>
  );
};

const ContactsBlock = () => {
  return (
    <div className="flex w-full flex-col gap-8 lg:flex-row">
      <div className="w-full lg:w-1/2">
        <ContactsInfoBlock />
      </div>
    </div>
  );
};

export default ContactsBlock;
