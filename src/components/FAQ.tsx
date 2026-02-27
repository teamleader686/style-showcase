import { faqs } from "@/data/mock";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

const FAQ = () => {
    return (
        <section className="px-4 pt-10 md:pt-14">
            <div className="mb-6">
                <h2 className="text-xl md:text-2xl font-extrabold text-foreground tracking-tight flex items-center gap-2">
                    <HelpCircle className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                    Frequently Asked Questions
                </h2>
                <p className="text-sm text-muted-foreground mt-1">Quick answers to common queries</p>
            </div>
            <div className="bg-card rounded-2xl premium-shadow border border-border/30 overflow-hidden">
                <Accordion type="single" collapsible className="w-full">
                    {faqs.map((faq, index) => (
                        <AccordionItem
                            key={faq.id}
                            value={faq.id}
                            className="border-border/30 px-5 md:px-6 animate-fade-up opacity-0"
                            style={{ animationDelay: `${index * 60}ms`, animationFillMode: 'forwards' }}
                        >
                            <AccordionTrigger className="text-sm md:text-base font-bold text-foreground hover:text-primary transition-colors py-4 md:py-5 text-left">
                                {faq.question}
                            </AccordionTrigger>
                            <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-4 md:pb-5">
                                {faq.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </section>
    );
};

export default FAQ;
