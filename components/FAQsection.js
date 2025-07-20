import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How does this actually work?",
    answer:
      "Simply enter a dish name or paste a YouTube recipe link. Our AI figures out the ingredients, compares prices across top grocery apps, and lets you place the order directly—either all from one app or split across multiple apps for maximum savings.",
  },
  {
    question: "Do I need to have accounts on Blinkit, Zepto, etc.?",
    answer:
      "Nope! You don't need separate accounts. We handle everything behind the scenes and ensure your groceries reach you without the hassle.",
  },
  {
    question: "Is it really cheaper than ordering myself?",
    answer:
      "Yes! We automatically find the lowest prices across apps and even split orders when it saves you more. On average, users save both money and time every time they shop.",
  },
  {
    question: "Who handles the delivery?",
    answer:
      "The actual delivery is done by trusted partners like Blinkit, Zepto, Amazon Fresh, etc. We just make the ordering smarter and simpler for you.",
  },
  {
    question: "Is my payment and data safe?",
    answer:
      "Absolutely. We use secure payment systems and never share your personal data with third parties. Your privacy and security are our priority.",
  },
];

const FAQsection = () => (
  <section className="py-20 bg-zinc-100 dark:bg-zinc-950 px-4 text-center">
    <h2 className="text-3xl md:text-5xl font-extrabold mb-4 text-zinc-900 dark:text-white">
      Frequently Asked Questions
    </h2>
    <p className="text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto mb-10">
      Got questions? We’ve got answers to help you shop smarter and stress-free.
    </p>
    <div className="max-w-4xl mx-auto text-left space-y-8">
      {faqs.map((faq, index) => (
        <div key={index}>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-xl">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-lg">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      ))}
    </div>
  </section>
);

export default FAQsection;
