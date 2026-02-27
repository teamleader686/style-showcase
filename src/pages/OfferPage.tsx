import { useFetch } from "@/hooks/useFetch";
import { getOffers } from "@/api/mockApi";
import { ShimmerCard } from "@/components/Shimmer";
import { Tag, Clock, ArrowRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

const OfferPage = () => {
    const { data: offers, loading } = useFetch(getOffers);
    const navigate = useNavigate();

    return (
        <main className="pb-24 md:pb-12 min-h-screen">
            {/* Header Banner */}
            <section className="bg-gradient-to-br from-primary via-blue-600 to-indigo-700 text-primary-foreground py-10 md:py-14 px-4 rounded-b-[2rem] shadow-xl shadow-primary/15 mb-8 relative overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

                <div className="container mx-auto max-w-5xl relative">
                    <div className="flex items-center gap-2 mb-3">
                        <Sparkles className="h-5 w-5 text-yellow-300" />
                        <span className="text-sm font-semibold text-white/80 uppercase tracking-wider">Limited Time</span>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-extrabold flex items-center gap-3 mb-3 tracking-tight">
                        <Tag className="h-7 w-7 md:h-9 md:w-9" />
                        Exclusive Offers
                    </h1>
                    <p className="text-primary-foreground/75 text-sm md:text-base max-w-md leading-relaxed">
                        Discover our latest deals, discounts, and combo offers handpicked just for you.
                    </p>
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
                    <div className="text-center py-24 bg-card rounded-2xl premium-shadow border border-border/30">
                        <Tag className="h-14 w-14 mx-auto text-muted-foreground mb-5 opacity-40" />
                        <h3 className="text-lg font-bold text-foreground">No active offers</h3>
                        <p className="text-muted-foreground mt-1.5">Check back later for incredible deals!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7">
                        {offers.map((offer, index) => (
                            <div
                                key={offer.id}
                                className="animate-fade-up opacity-0"
                                style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
                            >
                                <div
                                    onClick={() => navigate(`/offer/${offer.id}`)}
                                    className="group relative bg-card rounded-2xl premium-shadow hover:premium-shadow-hover transition-all duration-500 border border-border/30 hover:border-primary/20 overflow-hidden flex flex-col cursor-pointer hover:-translate-y-1.5"
                                >
                                    {/* Discount Badge */}
                                    <div className="absolute top-3.5 right-3.5 z-10 bg-gradient-to-r from-accent to-pink-500 text-white text-[10px] md:text-xs font-bold px-3.5 py-1.5 rounded-xl shadow-lg shadow-accent/30 transform group-hover:scale-105 transition-transform">
                                        {offer.discount}
                                    </div>

                                    {/* Offer Image */}
                                    <div className="relative h-52 w-full overflow-hidden bg-muted">
                                        <img
                                            src={offer.image}
                                            alt={offer.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            loading="lazy"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    </div>

                                    {/* Offer Details */}
                                    <div className="p-5 md:p-6 flex flex-col flex-grow">
                                        <h3 className="text-base md:text-lg font-extrabold text-foreground mb-2 line-clamp-1 group-hover:text-primary transition-colors duration-300">
                                            {offer.title}
                                        </h3>
                                        <p className="text-xs md:text-sm text-muted-foreground line-clamp-2 mb-4 flex-grow leading-relaxed">
                                            {offer.description}
                                        </p>

                                        <div className="flex items-center gap-1.5 text-[10px] md:text-xs font-semibold text-amber-600 bg-amber-500/10 w-fit px-3 py-1.5 rounded-lg mb-4 border border-amber-500/20">
                                            <Clock className="h-3 w-3 md:h-3.5 md:w-3.5" />
                                            <span>{offer.validity}</span>
                                        </div>

                                        <button
                                            className={cn(
                                                "w-full flex items-center justify-center gap-2 bg-gradient-to-r from-primary/10 to-blue-500/10 text-primary font-bold text-sm md:text-base px-4 py-3 rounded-xl transition-all duration-300",
                                                "hover:from-primary hover:to-blue-600 hover:text-primary-foreground hover:shadow-md hover:shadow-primary/20 group-active:scale-[0.98]"
                                            )}
                                        >
                                            View Details
                                            <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                                        </button>
                                    </div>
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
