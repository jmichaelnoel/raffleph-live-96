
import React from 'react';
import { HelpCircle } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "Do I pay here?",
    answer: "No, RafflePH is a directory. Payments are made directly to the raffle organizer through their specified payment channels. We do not handle any transactions."
  },
  {
    question: "Can I buy multiple entries?",
    answer: "This depends on the specific raffle's mechanics set by the organizer. Please check the 'Raffle Mechanics' section or the organizer's official page."
  },
  {
    question: "How will I know if I win?",
    answer: "Winners are typically announced by the organizer on their specified drawing date and platform (e.g., Facebook Live, official website). Refer to the 'Drawing Date' information."
  },
  {
    question: "What if I’m outside Manila?",
    answer: "Many raffles offer nationwide shipping or digital prizes. Check the 'Delivery' details for information on prize fulfillment for your location."
  }
];

const FAQSection: React.FC = () => {
  return (
    <div className="p-6 bg-slate-50 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-3 text-gray-800 flex items-center">
        <HelpCircle className="mr-2 h-6 w-6 text-ph-blue" /> FAQs / How to Join
      </h2>
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem value={`item-${index}`} key={index}>
            <AccordionTrigger className="text-left hover:no-underline text-sm font-medium">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-sm text-gray-600">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default FAQSection;
