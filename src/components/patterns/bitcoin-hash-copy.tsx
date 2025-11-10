"use client";

import { PiCurrencyBtcFill } from "react-icons/pi";
import QrCode from "~/components/icons/qrcode";
import { toast } from "sonner";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "~/components/ui/tooltip";
import { useTranslations } from "next-intl";

const BtcAddress = () => {
  const t = useTranslations("contributePage");
  const address =
    "0x9a1f3a322ff119def6f220fe2bb37297b4d87e09fb93905d70dc0cf049684789b";

  const handleCopy = async () => {
    await navigator.clipboard.writeText(address);
    toast.success(`${t("copied")}!`);
  };

  return (
    <div className="flex flex-col gap-2">
      <div
        onClick={handleCopy}
        className="flex cursor-pointer items-center gap-2 transition hover:opacity-80"
      >
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex gap-2 items-center">
                {" "}
                <PiCurrencyBtcFill className="size-4" />
                <p className="max-w-[20rem] truncate xl:max-w-[13.75rem]">
                  <small>{address}</small>
                </p>
              </div>
            </TooltipTrigger>
            <TooltipContent>{t("copy-to-clipboard")}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <QrCode />
    </div>
  );
};

export default BtcAddress;