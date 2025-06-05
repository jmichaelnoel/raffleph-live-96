
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
  },
  {
    question: "How do I claim my prize if I win?",
    answer: "Prize claiming procedures are outlined by each organizer. Winners are contacted directly with specific instructions for prize collection or delivery arrangements."
  },
  {
    question: "Can I get a refund if I change my mind?",
    answer: "Refund policies vary by organizer. Please contact the raffle organizer directly through their official channels to inquire about their specific refund policy."
  },
  {
    question: "Are there any additional fees?",
    answer: "RafflePH does not charge any fees. However, payment processing fees may apply depending on the organizer's chosen payment method. Check with the organizer for details."
  }
];

const FAQSection: React.FC = () => {
  return (
    <div className="p-8 bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 rounded-2xl shadow-lg border border-gray-200 mb-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4 text-gray-800 flex items-center justify-center">
          <HelpCircle className="mr-3 h-8 w-8 text-ph-blue animate-pulse" /> 
          Frequently Asked Questions
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Get quick answers to common questions about raffles, payments, and prizes. 
          Still have questions? Contact the organizer directly!
        </p>
      </div>
      
      <div className="max-w-4xl mx-auto">
        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem 
              value={`item-${index}`} 
              key={index} 
              className="bg-white rounded-xl border-2 border-gray-100 hover:border-ph-blue/30 transition-all duration-300 shadow-sm hover:shadow-md px-6 py-2"
            >
              <AccordionTrigger className="text-left hover:no-underline text-lg font-semibold py-6 text-gray-800 hover:text-ph-blue transition-colors group">
                <div className="flex items-center">
                  <span className="mr-3 text-2xl group-hover:scale-110 transition-transform duration-300">
                    {index === 0 ? '💳' : index === 1 ? '🎫' : index === 2 ? '🏆' : index === 3 ? '📱' : index === 4 ? '✅' : index === 5 ? '🎁' : index === 6 ? '💰' : '💡'}
                  </span>
                  {faq.question}
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-base text-gray-700 pb-6 leading-relaxed pl-12">
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg border-l-4 border-ph-blue">
                  {faq.answer}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
      
      <div className="text-center mt-8 p-6 bg-gradient-to-r from-ph-blue/10 to-purple-100/50 rounded-xl border border-ph-blue/20">
        <h3 className="text-xl font-semibold text-gray-800 mb-2 flex items-center justify-center">
          <span className="mr-2 text-2xl">💬</span>
          Still Have Questions?
        </h3>
        <p className="text-gray-600">
          Contact the raffle organizer directly through their official Facebook page or messenger link for personalized assistance!
        </p>
      </div>
    </div>
  );
};

export default FAQSection;
