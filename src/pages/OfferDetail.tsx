import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Clock, Share2, Tag, CheckCircle2, ShieldAlert } from "lucide-react";
import { getOfferById } from "@/api/mockApi";
import { OfferItem } from "@/data/types";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const OfferDetail = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [offer, setOffer] = useState<OfferItem | null>(null);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

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

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: offer?.title,
                text: offer?.description,
                url: window.location.href,
            }).catch(console.error);
        } else {
            navigator.clipboard.writeText(window.location.href);
            toast.success("Offer link copied to clipboard");
        }
    };

    const handleWhatsAppOrder = () => {
        if (!offer) return;

        const phoneNumber = "919876543210"; // Typical mock number or pull from settings
        const message = `Hi! I'm interested in the "${offer.title}" offer.\n\nDiscount: ${offer.discount}\nDetails: ${window.location.href}`;
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

        window.open(whatsappUrl, '_blank');
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
                    <div className="flex gap-3">
                        <button
                            onClick={handleShare}
                            className="p-2 backdrop-blur-md bg-white/20 hover:bg-white/30 rounded-full text-white transition-colors shadow-sm"
                        >
                            <Share2 className="h-5 w-5" />
                        </button>
                    </div>
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
                <div className="mb-6">
                    <h1 className="text-2xl md:text-3xl font-extrabold text-foreground mb-3 leading-tight pr-8">
                        {offer.title}
                    </h1>
                    <div className="flex items-center gap-2 text-amber-600 bg-amber-500/10 w-fit px-3 py-1.5 rounded-lg border border-amber-500/20 text-sm font-medium">
                        <Clock className="h-4 w-4" />
                        <span>{offer.validity}</span>
                    </div>
                </div>

                <div className="w-full h-px bg-border/60 my-6"></div>

                {/* Description */}
                <div className="mb-6">
                    <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                        About the Offer
                    </h2>
                    <p className="text-foreground/90 leading-relaxed text-[15px]">
                        {offer.description}
                    </p>
                </div>

                {/* Countdown Timer */}
                {timeLeft && (
                    <div className="bg-secondary/50 rounded-2xl p-4 mb-6 border border-border/50">
                        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 text-center">
                            Offer Ends In
                        </h3>
                        <div className="flex justify-center gap-3">
                            {[
                                { label: 'Days', value: timeLeft.d },
                                { label: 'Hours', value: timeLeft.h },
                                { label: 'Mins', value: timeLeft.m },
                                { label: 'Secs', value: timeLeft.s }
                            ].map((item, i) => (
                                <div key={i} className="flex flex-col items-center">
                                    <div className="bg-background shadow-sm border border-border rounded-xl w-14 h-14 flex items-center justify-center text-xl font-bold text-primary">
                                        {item.value.toString().padStart(2, '0')}
                                    </div>
                                    <span className="text-[10px] uppercase font-medium text-muted-foreground mt-1">
                                        {item.label}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Terms and Conditions */}
                {offer.terms && offer.terms.length > 0 && (
                    <div className="bg-secondary/30 rounded-2xl p-5 mb-8 border border-border/50">
                        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                            Terms & Conditions
                        </h2>
                        <ul className="space-y-3">
                            {offer.terms.map((term, index) => (
                                <li key={index} className="flex items-start gap-3 text-[14px] text-foreground/80">
                                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5 opacity-80" />
                                    <span>{term}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            {/* Sticky Bottom Action */}
            <div className="fixed bottom-16 md:bottom-0 left-0 right-0 p-3 bg-background/90 backdrop-blur-xl border-t border-border z-40">
                <div className="max-w-2xl mx-auto px-2">
                    <button
                        onClick={handleWhatsAppOrder}
                        className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold text-base py-3.5 rounded-full shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                    >
                        {/* We use an SVG path for the WhatsApp icon as lucide does not have official WhatsApp */}
                        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                        Order on WhatsApp
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OfferDetail;
