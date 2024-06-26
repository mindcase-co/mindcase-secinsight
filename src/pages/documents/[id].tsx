import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { PdfFocusProvider } from "~/context/pdf";

import type { ChangeEvent } from "react";
import DisplayMultiplePdfs from "~/components/pdf-viewer/DisplayMultiplePdfs";
import { RenderConversations as RenderConversations } from "~/components/conversations/RenderConversations";
import { BiArrowBack } from "react-icons/bi";
import { SecDocument } from "~/types/document";
// import { useIntercom } from "react-use-intercom";
import useIsMobile from "~/hooks/utils/useIsMobile";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../components/ui/accordion";

export default function Conversation() {
  const router = useRouter();
  const { id } = router.query;

  // const { shutdown } = useIntercom();
  // useEffect(() => {
  //   shutdown();
  // }, []);

  const { isMobile } = useIsMobile();

  const [conversationId, setConversationId] = useState<string | null>(null);
  const [userMessage, setUserMessage] = useState("");

  const textFocusRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (id && typeof id === "string") {
      setConversationId(id);
    }
  }, [id]);

  const pdfData = [
    {
      ticker: "sacadc",
      fullName: "ankit",
      id: "kcsdc",
      url: "https://d687lz8k56fia.cloudfront.net/sec-edgar-filings/0000320193/10-K/0000320193-23-000106/primary-document.pdf",
      year: "2012",
      quarter: "2",
    },
    {
      ticker: "dscnjsbdv",
      fullName: "ankit-2",
      id: "sdcuydvdv",
      url: "https://d687lz8k56fia.cloudfront.net/sec-edgar-filings/0000200406/10-Q/0000200406-23-000082/filing-details.pdf",
      year: "2012",
      quarter: "2",
    },
  ];

  const setSuggestedMessage = (text: string) => {
    setUserMessage(text);
    if (textFocusRef.current) {
      textFocusRef.current.focus();
    }
  };

  if (isMobile) {
    return (
      <div className="landing-page-gradient-1 relative flex h-screen w-screen items-center justify-center">
        <div className="flex h-min w-3/4 flex-col items-center justify-center rounded border bg-white p-4">
          <div className="text-center text-xl ">
            Sorry, the mobile view of this page is currently a work in progress.
            Please switch to desktop!
          </div>
          <button
            onClick={() => {
              router
                .push(`/`)
                .catch(() => console.log("error navigating to conversation"));
            }}
            className="bg-llama-indigo m-4 rounded border px-8 py-2 font-bold text-white hover:bg-[#3B3775]"
          >
            Back Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <PdfFocusProvider>
      <div className="flex h-[100vh] w-full items-center">
        <div className="flex h-[100vh] w-[44vw] flex-col items-center border-r-2 bg-white">
          <div className="flex h-[44px] w-full items-center justify-between border-b-2 ">
            <div className="flex w-full items-center justify-between">
              <button
                onClick={() => {
                  router
                    .push("/")
                    .catch(() => console.error("error navigating home"));
                }}
                className="hover:text-gray-900 ml-4 flex items-center justify-center rounded px-2 font-light text-[#9EA2B0]"
              >
                <BiArrowBack className="mr-1" /> Back to Document Selection
              </button>
            </div>
          </div>
          <div className="flex h-full w-[44vw] flex-grow flex-col overflow-scroll ">
            <div className="w-[80%] mt-5 mx-auto">
              <Accordion type="single" collapsible className="flex flex-col gap-5">
                <AccordionItem value="item-1" className="border rounded-md p-2">
                  <AccordionTrigger>Is it accessible?</AccordionTrigger>
                  <AccordionContent>
                    Yes. It adheres to the WAI-ARIA design pattern.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2" className="border rounded-md p-2">
                  <AccordionTrigger>Is it accessible?</AccordionTrigger>
                  <AccordionContent>
                    Yes. It adheres to the WAI-ARIA design pattern.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
        <div className="h-[100vh] w-max">
          <DisplayMultiplePdfs pdfs={pdfData} />
        </div>
      </div>
    </PdfFocusProvider>
  );
}
