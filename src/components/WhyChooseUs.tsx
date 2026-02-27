import { ShieldCheck, Truck, RotateCcw, Headphones } from "lucide-react";

const usps = [
    {
        icon: ShieldCheck,
        title: "Genuine Products",
        description: "100% authentic products with manufacturer warranty and original invoice.",
        color: "from-emerald-500/20 to-emerald-500/5",
        iconColor: "text-emerald-600",
    },
    {
        icon: Truck,
        title: "Fast Delivery",
        description: "Same-day local delivery within 2-4 hours. Quick nationwide shipping.",
        color: "from-blue-500/20 to-blue-500/5",
        iconColor: "text-blue-600",
    },
    {
        icon: RotateCcw,
        title: "Easy Returns",
        description: "Hassle-free 7-day return policy. Free replacement for defective items.",
        color: "from-amber-500/20 to-amber-500/5",
        iconColor: "text-amber-600",
    },
    {
        icon: Headphones,
        title: "Expert Support",
        description: "24/7 WhatsApp support from our tech experts. We're always here to help.",
        color: "from-purple-500/20 to-purple-500/5",
        iconColor: "text-purple-600",
    },
];

const WhyChooseUs = () => {
    return (
        <section className="px-4 pt-10 md:pt-14">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl md:text-2xl font-extrabold text-foreground tracking-tight">
                    Why Choose Us
                </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                {usps.map((usp, index) => (
                    <div
                        key={usp.title}
                        className="bg-card rounded-2xl p-4 md:p-5 premium-shadow border border-border/30 hover:premium-shadow-hover transition-all duration-300 hover:-translate-y-1 group animate-fade-up opacity-0"
                        style={{ animationDelay: `${index * 80}ms`, animationFillMode: 'forwards' }}
                    >
                        <div className={`w-11 h-11 md:w-12 md:h-12 rounded-2xl bg-gradient-to-br ${usp.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}>
                            <usp.icon className={`h-5 w-5 md:h-6 md:w-6 ${usp.iconColor}`} />
                        </div>
                        <h3 className="font-bold text-sm text-foreground mb-1">{usp.title}</h3>
                        <p className="text-[11px] md:text-xs text-muted-foreground leading-relaxed">{usp.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default WhyChooseUs;
