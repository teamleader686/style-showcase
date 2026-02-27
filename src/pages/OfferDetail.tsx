import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Clock, Share2, Tag, CheckCircle2, ShieldAlert, MessageCircle } from "lucide-react";
import { getOfferById, getSettings } from "@/api/mockApi";
import { OfferItem } from "@/data/types";
import { useFetch } from "@/hooks/useFetch";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import OrderFormModal from "@/components/OrderFormModal";
import ShareModal from "@/components/ShareModal";

const OfferDetail = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { data: settings } = useFetch(getSettings);
    const [offer, setOffer] = useState<OfferItem | null>(null);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);

    // Timer state
    const [timeLeft, setTimeLeft] = useState<{ d: number; h: number; m: number; s: number } | null>(null);

    useEffect(() => {
        const fetchOffer = async () => {
            if (!id) return;
            setLoading(true);
            const data = await getOfferById(id);
            if (data) {
                setOffer(data);
                setSelectedImage(data.images?.[0] || data.image);
            }
            setLoading(false);
        };
        fetchOffer();
    }, [id]);

    useEffect(() => {
        if (!offer?.expiryDate) return;

        const timer = setInterval(() => {
            const difference = new Date(offer.expiryDate!).getTime() - new Date().getTime();

            if (difference > 0) {
                setTimeLeft({
                    d: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    h: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    m: Math.floor((difference / 1000 / 60) % 60),
                    s: Math.floor((difference / 1000) % 60)
                });
            } else {
                setTimeLeft(null);
                clearInterval(timer);
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [offer]);

    const shareData = {
        title: offer?.title || "Check this out!",
        text: offer?.description || "Here's an amazing offer for you.",
        url: window.location.href,
    };

    const handleProductInquiry = () => {
        const phone = settings?.whatsapp || "919876543210";
        const message = `Hello, I want to inquire about this product:
Product: ${offer?.title}
Price: Special Offer
Link: ${window.location.href}`;
        const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
        window.open(url, "_blank");
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-background flex flex-col">
                <div className="w-full h-72 md:h-96 bg-muted relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" style={{ backgroundSize: '200% 100%' }} />
                </div>
                <div className="p-5 space-y-4 flex-1">
                    <div className="h-4 w-24 bg-muted rounded-lg relative overflow-hidden"><div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" style={{ backgroundSize: '200% 100%' }} /></div>
                    <div className="h-8 w-3/4 bg-muted rounded-lg relative overflow-hidden"><div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" style={{ backgroundSize: '200% 100%' }} /></div>
                    <div className="h-20 w-full bg-muted rounded-lg relative overflow-hidden"><div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" style={{ backgroundSize: '200% 100%' }} /></div>
                    <div className="h-32 w-full bg-muted rounded-xl relative overflow-hidden"><div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" style={{ backgroundSize: '200% 100%' }} /></div>
                </div>
            </div>
        );
    }

    if (!offer) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-4">
                <div className="p-5 rounded-2xl bg-secondary/50 mb-5">
                    <ShieldAlert className="h-12 w-12 text-muted-foreground opacity-50" />
                </div>
                <h2 className="text-xl font-extrabold">Offer Not Found</h2>
                <p className="text-muted-foreground mt-2 mb-6 text-center">The offer you are looking for has expired or does not exist.</p>
                <button
                    onClick={() => navigate("/offers")}
                    className="px-8 py-3 bg-gradient-to-r from-primary to-blue-600 text-primary-foreground rounded-2xl font-bold shadow-lg shadow-primary/25 hover:-translate-y-0.5 transition-all duration-300"
                >
                    View All Offers
                </button>
            </div>
        );
    }

    return (
        <div className="pb-32 max-w-2xl mx-auto bg-background min-h-screen relative">
            {/* Hero Banner Image */}
            <div className="w-full h-72 md:h-96 relative bg-muted overflow-hidden">
                {/* Top Navigation */}
                <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between p-4 bg-gradient-to-b from-black/60 to-transparent">
                    <button
                        onClick={() => navigate(-1)}
                        className="p-2.5 glass rounded-xl text-white transition-all duration-300 hover:scale-105 shadow-lg"
                    >
                        <ArrowLeft className="h-5 w-5" />
                    </button>
                </div>
                <img
                    src={selectedImage || offer.image}
                    alt={offer.title}
                    className="w-full h-full object-cover transition-opacity duration-300"
                />
                <div className={cn(
                    "absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t to-transparent",
                    offer.backgroundColor ? offer.backgroundColor.split(' ')[0] : "from-black/80"
                )} />

                {/* Discount Floating Badge */}
                <div className="absolute -bottom-4 right-6">
                    <div className="bg-gradient-to-r from-accent to-pink-500 text-white font-extrabold text-sm md:text-base px-7 py-3.5 rounded-2xl shadow-xl shadow-accent/30 border-2 border-background flex items-center gap-2.5 transform rotate-2">
                        <Tag className="h-5 w-5" />
                        {offer.discount}
                    </div>
                </div>
            </div>

            {/* Thumbnails Section */}
            {offer.images && offer.images.length > 1 && (
                <div className="w-full overflow-x-auto scrollbar-hide bg-card border-b border-border/30 premium-shadow">
                    <div className="flex gap-3 px-5 py-4 min-w-max mx-auto max-w-2xl justify-start md:justify-center">
                        {offer.images.map((img, idx) => (
                            <button
                                key={idx}
                                onClick={() => setSelectedImage(img)}
                                className={cn(
                                    "relative w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden transition-all duration-300 flex-shrink-0 border-2 premium-shadow",
                                    selectedImage === img
                                        ? "border-primary scale-105 shadow-md shadow-primary/20"
                                        : "border-transparent opacity-60 hover:opacity-100"
                                )}
                            >
                                <img src={img} alt={`${offer.title} view ${idx + 1}`} className="w-full h-full object-cover bg-muted" />
                                {selectedImage === img && (
                                    <div className="absolute inset-0 bg-primary/10" />
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            <div className="px-5 pt-8 pb-4">
                {/* Title & Validity */}
                <div className="mb-6 animate-fade-up">
                    <h1 className="text-2xl md:text-3xl font-extrabold text-foreground mb-3 leading-tight pr-8 tracking-tight">
                        {offer.title}
                    </h1>
                    <div className="flex items-center gap-2 text-amber-600 bg-amber-500/10 w-fit px-3 py-1.5 rounded-xl border border-amber-500/20 text-xs md:text-sm font-semibold">
                        <Clock className="h-3.5 w-3.5 md:h-4 md:w-4" />
                        <span>{offer.validity}</span>
                    </div>
                </div>

                <div className="w-full h-px bg-border/40 my-6" />

                {/* Description */}
                <div className="mb-6 animate-fade-up" style={{ animationDelay: '100ms' }}>
                    <h2 className="text-xs md:text-sm font-bold text-muted-foreground uppercase tracking-wider mb-3">
                        About the Offer
                    </h2>
                    <p className="text-foreground/90 leading-relaxed text-sm md:text-[15px]">
                        {offer.description}
                    </p>
                </div>

                {/* Countdown Timer */}
                {timeLeft && (
                    <div className="bg-gradient-to-br from-secondary/80 to-secondary/40 rounded-2xl p-4 md:p-5 mb-6 border border-border/30 premium-shadow animate-fade-up" style={{ animationDelay: '150ms' }}>
                        <h3 className="text-[10px] md:text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3 text-center">
                            Offer Ends In
                        </h3>
                        <div className="flex justify-center gap-3 md:gap-4">
                            {[
                                { label: 'Days', value: timeLeft.d },
                                { label: 'Hours', value: timeLeft.h },
                                { label: 'Mins', value: timeLeft.m },
                                { label: 'Secs', value: timeLeft.s }
                            ].map((item, i) => (
                                <div key={i} className="flex flex-col items-center">
                                    <div className="bg-card premium-shadow border border-border/30 rounded-xl w-14 h-14 md:w-16 md:h-16 flex items-center justify-center text-xl md:text-2xl font-extrabold text-primary">
                                        {item.value.toString().padStart(2, '0')}
                                    </div>
                                    <span className="text-[9px] md:text-[10px] uppercase font-bold text-muted-foreground mt-1.5 tracking-wide">
                                        {item.label}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 mb-6 md:mb-8 mt-3 animate-fade-up" style={{ animationDelay: '200ms' }}>
                    <Button
                        className="flex-1 h-14 rounded-2xl bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-500 text-primary-foreground font-bold text-base shadow-lg shadow-primary/25 transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98]"
                        onClick={() => setIsOrderModalOpen(true)}
                    >
                        Order Now
                    </Button>
                    <div className="flex gap-3 flex-1">
                        <Button
                            variant="outline"
                            className="flex-1 h-14 rounded-2xl border-2 border-border/50 hover:border-primary/30 hover:bg-primary/5 text-foreground font-bold text-base premium-shadow transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98] flex items-center justify-center gap-2"
                            onClick={handleProductInquiry}
                        >
                            <MessageCircle className="h-5 w-5 text-[#25D366]" />
                            Inquiry
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            className="h-14 w-14 rounded-2xl flex items-center justify-center shrink-0 z-10 border-2 border-border/50 hover:border-primary/30 premium-shadow hover:premium-shadow-hover transition-all duration-300"
                            onClick={() => setIsShareModalOpen(true)}
                            aria-label="Share Offer"
                        >
                            <Share2 className="h-5 w-5 pointer-events-none" />
                        </Button>
                    </div>
                </div>

                {/* Terms and Conditions */}
                {offer.terms && offer.terms.length > 0 && (
                    <div className="bg-secondary/30 rounded-2xl p-5 md:p-6 mb-6 md:mb-8 border border-border/30 animate-fade-up" style={{ animationDelay: '250ms' }}>
                        <h2 className="text-xs md:text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4">
                            Terms & Conditions
                        </h2>
                        <ul className="space-y-3 md:space-y-3.5">
                            {offer.terms.map((term, index) => (
                                <li key={index} className="flex items-start gap-3 text-xs md:text-sm text-foreground/80 leading-relaxed">
                                    <CheckCircle2 className="h-4 w-4 md:h-5 md:w-5 text-primary shrink-0 mt-0.5 opacity-80" />
                                    <span>{term}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            <OrderFormModal
                isOpen={isOrderModalOpen}
                onClose={() => setIsOrderModalOpen(false)}
                product={{ name: offer.title, price: 0 }}
                whatsappNumber={settings?.whatsapp || "919876543210"}
            />

            <ShareModal
                isOpen={isShareModalOpen}
                onClose={() => setIsShareModalOpen(false)}
                shareData={shareData}
            />
        </div>
    );
};

export default OfferDetail;
