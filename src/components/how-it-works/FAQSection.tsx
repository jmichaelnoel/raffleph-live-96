
import React from 'react';
import { GradientText } from '@/components/ui/gradient-text';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const FAQSection: React.FC = () => {
  const faqs = [
    {
      question: "How do I join a raffle?",
      answer: "Just click 'Join Now' on the raffle details — we'll redirect you to the organizer's channel."
    },
    {
      question: "Is using this site free?",
      answer: "Yes! You can explore and join raffles without any fees from us."
    },
    {
      question: "Do you organize the raffles?",
      answer: "No, we only list raffles from external organizers. Always check before joining."
    },
    {
      question: "How do I know if it's legit?",
      answer: "We show as much info as possible — but you should always verify on your own."
    },
    {
      question: "How can I post my own raffle?",
      answer: "Go to the Submit Raffle page, fill out the form, and we'll review it fast!"
    },
    {
      question: "Can I make an account?",
      answer: "Soon! You'll be able to log in, save raffles, and get alerts."
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-white/50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Frequently Asked <GradientText>Questions</GradientText> ❓
            </h2>
            <p className="text-lg text-gray-600">Get answers to common questions about joining raffles</p>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border-2 border-purple-100/50 p-8 shadow-lg">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="border border-purple-100 rounded-lg px-6 bg-gradient-to-r from-white to-purple-50/30 hover:shadow-md transition-all duration-300"
                >
                  <AccordionTrigger className="text-left text-lg font-semibold text-gray-800 hover:text-purple-600">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 pt-2 pb-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
