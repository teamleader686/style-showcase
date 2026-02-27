import { getSettings } from "@/api/mockApi";
import { useFetch } from "@/hooks/useFetch";
import { MessageCircle } from "lucide-react";

const WhatsAppFloat = () => {
    const { data: settings } = useFetch(getSettings);

    if (!settings?.whatsapp) return null;

    const whatsappUrl = `https://wa.me/${settings.whatsapp}?text=${encodeURIComponent(
        "Hi! I visited your website and have a query."
    )}`;

    return (
        <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-[88px] md:bottom-8 right-4 md:right-8 z-50 flex items-center justify-center p-4 bg-[#25D366] text-white rounded-2xl shadow-[0_4px_20px_rgba(37,211,102,0.4)] hover:shadow-[0_6px_30px_rgba(37,211,102,0.5)] hover:scale-110 active:scale-100 transition-all duration-300 animate-in fade-in slide-in-from-bottom flex-shrink-0"
            aria-label="Chat on WhatsApp"
        >
            <MessageCircle className="h-7 w-7" />
            <span className="absolute flex h-full w-full pointer-events-none">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-2xl bg-[#25D366] opacity-20" />
            </span>
        </a>
    );
};

export default WhatsAppFloat;
