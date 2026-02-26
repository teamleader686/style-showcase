import { useFetch } from "@/hooks/useFetch";
import { getOffers } from "@/api/mockApi";
import { ShimmerCard } from "@/components/Shimmer";
import { Tag, Clock, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

const OfferPage = () => {
    const { data: offers, loading } = useFetch(getOffers);
    const navigate = useNavigate();

    return (
        <main className="pb-20 md:pb-8 min-h-screen bg-secondary/20">
            {/* Header Banner */}
            <section className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-8 px-4 rounded-b-3xl shadow-sm mb-6">
                <div className="container mx-auto max-w-5xl flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2 mb-2">
                            <Tag className="h-6 w-6 md:h-8 md:w-8" />
                            Exclusive Offers
                        </h1>
                        <p className="text-primary-foreground/80 text-sm md:text-base max-w-md">
                            Discover our latest deals, discounts, and combo offers handpicked just for you.
                        </p>
                    </div>
                </div>
            </section>

            {/* Main Container */}
            <div className="container mx-auto px-4 max-w-5xl">
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {Array.from({ length: 3 }).map((_, i) => (
                            <ShimmerCard key={i} />
                        ))}
                    </div>
                ) : !offers || offers.length === 0 ? (
                    <div className="text-center py-20 bg-card rounded-2xl shadow-sm border border-border">
                        <Tag className="h-12 w-12 mx-auto text-muted-foreground mb-4 opacity-50" />
                        <h3 className="text-lg font-medium text-foreground">No active offers</h3>
                        <p className="text-muted-foreground mt-1">Check back later for incredible deals!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {offers.map((offer) => (
                            <div
                                key={offer.id}
                                onClick={() => navigate(`/offer/${offer.id}`)}
                                className="group relative bg-card rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-border/60 overflow-hidden flex flex-col cursor-pointer"
                            >
                                {/* Discount Badge */}
                                <div className="absolute top-3 right-3 z-10 bg-destructive text-destructive-foreground text-[10px] md:text-xs font-bold px-3 py-1.5 rounded-full shadow-sm shadow-destructive/20 transform group-hover:scale-105 transition-transform">
                                    {offer.discount}
                                </div>

                                {/* Offer Image */}
                                <div className="relative h-48 w-full overflow-hidden bg-muted">
                                    <img
                                        src={offer.image}
                                        alt={offer.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                </div>

                                {/* Offer Details */}
                                <div className="p-4 md:p-5 flex flex-col flex-grow">
                                    <h3 className="text-base md:text-lg font-bold text-foreground mb-1.5 md:mb-2 line-clamp-1 group-hover:text-primary transition-colors">
                                        {offer.title}
                                    </h3>
                                    <p className="text-xs md:text-sm text-muted-foreground line-clamp-2 mb-3 md:mb-4 flex-grow">
                                        {offer.description}
                                    </p>

                                    <div className="flex items-center gap-1.5 text-[10px] md:text-xs font-medium text-amber-600 bg-amber-500/10 w-fit px-2 py-1 md:px-2.5 md:py-1 rounded-md mb-3 md:mb-4 border border-amber-500/20">
                                        <Clock className="h-3 w-3 md:h-3.5 md:w-3.5" />
                                        <span>{offer.validity}</span>
                                    </div>

                                    <button
                                        className={cn(
                                            "w-full flex items-center justify-center gap-2 bg-primary/10 text-primary font-medium text-sm md:text-base px-3 md:px-4 py-2 md:py-2.5 rounded-xl transition-colors",
                                            "hover:bg-primary hover:text-primary-foreground group-active:scale-[0.98]"
                                        )}
                                    >
                                        View Details
                                        <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
};

export default OfferPage;
