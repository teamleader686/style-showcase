import { MessageCircle, ArrowRight } from "lucide-react";
import { getSettings } from "@/api/mockApi";
import { useFetch } from "@/hooks/useFetch";

const CTABanner = () => {
    const { data: settings } = useFetch(getSettings);
    const whatsappUrl = `https://wa.me/${settings?.whatsapp || "919876543210"}?text=${encodeURIComponent("Hi! I visited your website and have a question.")}`;

    return (
        <section className="px-4 pt-10 md:pt-14">
            <div className="relative rounded-3xl overflow-hidden premium-shadow-lg">
                {/* Gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary via-blue-600 to-indigo-700" />

                {/* Decorative circles */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-accent/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />

                <div className="relative px-6 py-10 md:px-12 md:py-14 text-center">
                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center mx-auto mb-5 shadow-lg">
                        <MessageCircle className="h-7 w-7 md:h-8 md:w-8 text-white" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight mb-3 drop-shadow-md">
                        Have Questions? Let's Chat!
                    </h2>
                    <p className="text-white/75 text-sm md:text-base max-w-md mx-auto leading-relaxed mb-6">
                        Our team is available 24/7 on WhatsApp. Get instant answers about products, pricing, availability, or anything else.
                    </p>
                    <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2.5 px-8 py-3.5 bg-white hover:bg-white/95 text-foreground rounded-2xl font-bold text-sm md:text-base shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98] group"
                    >
                        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[#25D366]" aria-hidden="true">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                        Chat on WhatsApp
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </a>
                </div>
            </div>
        </section>
    );
};

export default CTABanner;
