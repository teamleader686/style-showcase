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
            className="fixed bottom-20 md:bottom-8 right-4 md:right-8 z-50 flex items-center justify-center p-4 bg-success text-success-foreground rounded-full shadow-lg hover:scale-110 transition-transform duration-300 animate-in fade-in slide-in-from-bottom flex-shrink-0"
            aria-label="Chat on WhatsApp"
        >
            <MessageCircle className="h-7 w-7" />
            <span className="absolute flex h-full w-full">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-20"></span>
            </span>
        </a>
    );
};

export default WhatsAppFloat;
