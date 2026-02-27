import { useState } from "react";
import { X, Megaphone } from "lucide-react";

const AnnouncementBar = () => {
    const [visible, setVisible] = useState(true);

    if (!visible) return null;

    return (
        <div className="relative bg-gradient-to-r from-primary via-blue-600 to-indigo-700 text-primary-foreground overflow-hidden z-50">
            <div className="flex items-center h-9 md:h-10">
                <div className="flex-1 overflow-hidden">
                    <div className="flex animate-marquee whitespace-nowrap gap-12 text-xs md:text-sm font-medium">
                        <span className="flex items-center gap-1.5">📦 Free Delivery on Orders Above ₹999</span>
                        <span className="flex items-center gap-1.5">🔒 100% Genuine & Original Products</span>
                        <span className="flex items-center gap-1.5">💬 24/7 WhatsApp Support Available</span>
                        <span className="flex items-center gap-1.5">🔄 Easy 7-Day Returns</span>
                        <span className="flex items-center gap-1.5">💳 COD & EMI Options Available</span>
                        {/* Duplicate for seamless marquee */}
                        <span className="flex items-center gap-1.5">📦 Free Delivery on Orders Above ₹999</span>
                        <span className="flex items-center gap-1.5">🔒 100% Genuine & Original Products</span>
                        <span className="flex items-center gap-1.5">💬 24/7 WhatsApp Support Available</span>
                        <span className="flex items-center gap-1.5">🔄 Easy 7-Day Returns</span>
                        <span className="flex items-center gap-1.5">💳 COD & EMI Options Available</span>
                    </div>
                </div>
                <button
                    onClick={() => setVisible(false)}
                    className="p-1.5 mr-2 rounded-lg hover:bg-white/10 transition-colors shrink-0"
                    aria-label="Close announcement"
                >
                    <X className="h-3.5 w-3.5" />
                </button>
            </div>
        </div>
    );
};

export default AnnouncementBar;
