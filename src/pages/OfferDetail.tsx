import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Clock, Share2, Tag, CheckCircle2, ShieldAlert } from "lucide-react";
import { getOfferById } from "@/api/mockApi";
import { OfferItem } from "@/data/types";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import OrderFormModal from "@/components/OrderFormModal";
import ShareModal from "@/components/ShareModal";

const OfferDetail = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
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
        url: window.location.href, // Always grab fresh URL
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-background animate-pulse flex flex-col">
                <div className="w-full h-64 md:h-96 bg-muted"></div>
                <div className="p-4 space-y-4 flex-1">
                    <div className="h-4 w-24 bg-muted rounded"></div>
                    <div className="h-8 w-3/4 bg-muted rounded"></div>
                    <div className="h-20 w-full bg-muted rounded"></div>
                    <div className="h-32 w-full bg-muted rounded"></div>
                </div>
            </div>
        );
    }

    if (!offer) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-4">
                <ShieldAlert className="h-16 w-16 text-muted-foreground mb-4 opacity-50" />
                <h2 className="text-xl font-bold">Offer Not Found</h2>
                <p className="text-muted-foreground mt-2 mb-6">The offer you are looking for has expired or does not exist.</p>
                <button
                    onClick={() => navigate("/offers")}
                    className="px-6 py-2 bg-primary text-primary-foreground rounded-full font-medium"
                >
                    View All Offers
                </button>
            </div>
        );
    }

    return (
        <div className="pb-32 max-w-2xl mx-auto bg-background min-h-screen relative">
            {/* Hero Banner Image */}
            <div className="w-full h-72 md:h-96 relative bg-muted">
                {/* Top Navigation */}
                <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between p-4 bg-gradient-to-b from-black/60 to-transparent">
                    <button
                        onClick={() => navigate(-1)}
                        className="p-2 backdrop-blur-md bg-white/20 hover:bg-white/30 rounded-full text-white transition-colors shadow-sm"
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
                )}></div>

                {/* Discount Floating Badge */}
                <div className="absolute -bottom-3 right-6">
                    <div className="bg-destructive text-destructive-foreground font-extrabold text-sm md:text-base px-6 py-3 rounded-2xl shadow-xl shadow-destructive/30 border-2 border-background flex items-center gap-2 transform rotate-2">
                        <Tag className="h-5 w-5" />
                        {offer.discount}
                    </div>
                </div>
            </div>

            {/* Thumbnails Section */}
            {offer.images && offer.images.length > 1 && (
                <div className="w-full overflow-x-auto scrollbar-hide bg-card border-b border-border/50 shadow-sm">
                    <div className="flex gap-3 px-4 py-4 min-w-max mx-auto max-w-2xl justify-start md:justify-center">
                        {offer.images.map((img, idx) => (
                            <button
                                key={idx}
                                onClick={() => setSelectedImage(img)}
                                className={cn(
                                    "relative w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden shadow-sm transition-all duration-300 flex-shrink-0 border-2",
                                    selectedImage === img
                                        ? "border-primary scale-105 shadow-md shadow-primary/20"
                                        : "border-transparent opacity-70 hover:opacity-100"
                                )}
                            >
                                <img src={img} alt={`${offer.title} view ${idx + 1}`} className="w-full h-full object-cover bg-muted" />
                                {selectedImage === img && (
                                    <div className="absolute inset-0 bg-primary/10"></div>
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            <div className="px-5 pt-8 pb-4">
                {/* Title & Validity */}
                <div className="mb-5 md:mb-6">
                    <h1 className="text-xl md:text-3xl font-extrabold text-foreground mb-2 md:mb-3 leading-tight pr-8">
                        {offer.title}
                    </h1>
                    <div className="flex items-center gap-1.5 md:gap-2 text-amber-600 bg-amber-500/10 w-fit px-2.5 py-1 md:px-3 md:py-1.5 rounded-lg border border-amber-500/20 text-xs md:text-sm font-medium">
                        <Clock className="h-3.5 w-3.5 md:h-4 md:w-4" />
                        <span>{offer.validity}</span>
                    </div>
                </div>

                <div className="w-full h-px bg-border/60 my-6"></div>

                {/* Description */}
                <div className="mb-5 md:mb-6">
                    <h2 className="text-xs md:text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2 md:mb-3">
                        About the Offer
                    </h2>
                    <p className="text-foreground/90 leading-relaxed text-sm md:text-[15px]">
                        {offer.description}
                    </p>
                </div>

                {/* Countdown Timer */}
                {timeLeft && (
                    <div className="bg-secondary/50 rounded-xl md:rounded-2xl p-3 md:p-4 mb-5 md:mb-6 border border-border/50">
                        <h3 className="text-[10px] md:text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 md:mb-3 text-center">
                            Offer Ends In
                        </h3>
                        <div className="flex justify-center gap-2 md:gap-3">
                            {[
                                { label: 'Days', value: timeLeft.d },
                                { label: 'Hours', value: timeLeft.h },
                                { label: 'Mins', value: timeLeft.m },
                                { label: 'Secs', value: timeLeft.s }
                            ].map((item, i) => (
                                <div key={i} className="flex flex-col items-center">
                                    <div className="bg-background shadow-sm border border-border rounded-lg md:rounded-xl w-12 h-12 md:w-14 md:h-14 flex items-center justify-center text-lg md:text-xl font-bold text-primary">
                                        {item.value.toString().padStart(2, '0')}
                                    </div>
                                    <span className="text-[9px] md:text-[10px] uppercase font-medium text-muted-foreground mt-1">
                                        {item.label}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-3 mb-6 md:mb-8 mt-2">
                    <Button
                        className="flex-1 h-14 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-base shadow-lg transition-transform active:scale-[0.98]"
                        onClick={() => setIsOrderModalOpen(true)}
                    >
                        Order Now
                    </Button>
                    <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        className="h-14 w-14 rounded-xl flex items-center justify-center shrink-0 z-10 border-2"
                        onClick={() => setIsShareModalOpen(true)}
                        aria-label="Share Offer"
                    >
                        <Share2 className="h-5 w-5 pointer-events-none" />
                    </Button>
                </div>

                {/* Terms and Conditions */}
                {offer.terms && offer.terms.length > 0 && (
                    <div className="bg-secondary/30 rounded-xl md:rounded-2xl p-4 md:p-5 mb-6 md:mb-8 border border-border/50">
                        <h2 className="text-xs md:text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3 md:mb-4">
                            Terms & Conditions
                        </h2>
                        <ul className="space-y-2.5 md:space-y-3">
                            {offer.terms.map((term, index) => (
                                <li key={index} className="flex items-start gap-2 md:gap-3 text-xs md:text-[14px] text-foreground/80 leading-relaxed">
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
                product={{ name: offer.title, price: 0 }} // Offers don't specifically have a mock price mapped in mock data, use title.
                whatsappNumber="919876543210"
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
