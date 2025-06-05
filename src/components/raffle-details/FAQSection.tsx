
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
    answer: "This depends on the specific raffle's mechanics set by the organizer. Please check the 'Raffle Mechanics' section or the organizer's official page for details."
  },
  {
    question: "How will I know if I win?",
    answer: "Winners are typically announced by the organizer on their specified drawing date and platform (e.g., Facebook Live, official website). You will also be contacted directly by the organizer."
  },
  {
    question: "How do I join this raffle?",
    answer: "Click the 'Join Raffle Now' button to go to the official raffle post, or use the 'Buy Slots via Messenger' button to contact the organizer directly."
  },
  {
    question: "Is this raffle legitimate?",
    answer: "All raffles listed on RafflePH go through our verification process. Look for the verification badges and always verify the organizer's official social media presence."
  }
];

const FAQSection: React.FC = () => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md border border-gray-200">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800 flex items-center">
        <HelpCircle className="mr-2 h-6 w-6 text-ph-blue" /> 
        Frequently Asked Questions
      </h2>
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem value={`item-${index}`} key={index} className="border-b border-gray-200 last:border-b-0">
            <AccordionTrigger className="text-left hover:no-underline text-base font-medium py-4 text-gray-800 hover:text-ph-blue transition-colors">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-sm text-gray-600 pb-4 leading-relaxed">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default FAQSection;
