import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    question: 'What areas in Washington do you service?',
    answer: 'We proudly serve the greater Washington area including Seattle, Bellevue, Tacoma, Redmond, Kirkland, Everett, and surrounding communities. Contact us to confirm service availability in your specific location.',
  },
  {
    question: 'Are your cleaning products safe for children and pets?',
    answer: 'Absolutely! We use high-quality cleaning products that are safe for families with children and pets.',
  },
  {
    question: 'How do I schedule a cleaning appointment?',
    answer: 'Scheduling is easy! Simply fill out our free estimate form, call us directly, or use our online booking system. We\'ll work with you to find a time that fits your schedule.',
  },
  {
    question: 'Do I need to be home during the cleaning?',
    answer: 'Not at all! Many of our clients provide us with a spare key or entry code. Our cleaners are fully background-checked and insured, so you can trust us in your home.',
  },
  {
    question: 'What is your satisfaction guarantee?',
    answer: 'We stand behind our work 100%. If you\'re not completely satisfied with any aspect of our cleaning, let us know within 24 hours and we\'ll re-clean the area at no additional cost.',
  },
  {
    question: 'How much does your cleaning service cost?',
    answer: 'Pricing varies based on the size of your home, the type of cleaning needed, and frequency of service. Contact us for a free, no-obligation estimate tailored to your specific needs.',
  },
];

const FAQSection = () => {
  return (
    <section id="faq" className="py-24 bg-muted">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full bg-gold/10 text-gold text-sm font-semibold mb-4">
              FAQ
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Frequently Asked{' '}
              <span className="text-gradient-gold">Questions</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Find answers to common questions about our cleaning services.
            </p>
          </div>

          {/* FAQ Accordion */}
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card rounded-xl border border-border shadow-sm px-6 data-[state=open]:shadow-card transition-shadow"
              >
                <AccordionTrigger className="text-left font-serif text-lg font-semibold text-foreground hover:text-gold transition-colors py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {/* CTA */}
          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-4">
              Still have questions? We're here to help!
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 text-gold font-semibold hover:underline"
            >
              Contact Our Team
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
