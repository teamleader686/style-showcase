import { useRef, useState } from "react";
import { testimonials } from "@/data/mock";
import { Star, Quote, MapPin, Phone, ChevronLeft, ChevronRight } from "lucide-react";

const maskPhone = (phone: string) => {
    if (phone.length < 6) return phone;
    return phone.slice(0, 2) + "XXXX" + phone.slice(-4);
};

const Testimonials = () => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const checkScroll = () => {
        if (!scrollRef.current) return;
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        setCanScrollLeft(scrollLeft > 10);
        setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    };

    const scroll = (dir: "left" | "right") => {
        if (!scrollRef.current) return;
        const cardWidth = scrollRef.current.querySelector("div")?.offsetWidth || 300;
        scrollRef.current.scrollBy({
            left: dir === "left" ? -cardWidth - 16 : cardWidth + 16,
            behavior: "smooth",
        });
        setTimeout(checkScroll, 350);
    };

    return (
        <section className="pt-10 md:pt-14">
            {/* Header */}
            <div className="px-4 mb-6 flex items-end justify-between">
                <div>
                    <h2 className="text-xl md:text-2xl font-extrabold text-foreground tracking-tight flex items-center gap-2">
                        <Star className="h-5 w-5 md:h-6 md:w-6 text-yellow-500 fill-yellow-500" />
                        What Our Customers Say
                    </h2>
                    <p className="text-sm text-muted-foreground mt-1">Real reviews from happy customers</p>
                </div>
                {/* Desktop nav arrows */}
                <div className="hidden md:flex items-center gap-2">
                    <button
                        onClick={() => scroll("left")}
                        disabled={!canScrollLeft}
                        className="p-2 rounded-xl border border-border/50 hover:bg-secondary disabled:opacity-30 disabled:cursor-not-allowed transition-all premium-shadow"
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button
                        onClick={() => scroll("right")}
                        disabled={!canScrollRight}
                        className="p-2 rounded-xl border border-border/50 hover:bg-secondary disabled:opacity-30 disabled:cursor-not-allowed transition-all premium-shadow"
                    >
                        <ChevronRight className="h-4 w-4" />
                    </button>
                </div>
            </div>

            {/* Scrollable cards */}
            <div
                ref={scrollRef}
                onScroll={checkScroll}
                className="flex gap-4 md:gap-5 overflow-x-auto scrollbar-hide snap-x snap-mandatory scroll-smooth px-4 pb-2"
            >
                {testimonials.map((t, index) => (
                    <div
                        key={t.id}
                        className="flex-shrink-0 w-[85vw] sm:w-[340px] md:w-[320px] lg:w-[300px] snap-start bg-card rounded-2xl p-5 md:p-6 premium-shadow border border-border/30 hover:premium-shadow-hover transition-all duration-300 hover:-translate-y-1 relative group animate-fade-up opacity-0"
                        style={{ animationDelay: `${index * 100}ms`, animationFillMode: "forwards" }}
                    >
                        {/* Quote watermark */}
                        <Quote className="absolute top-4 right-4 h-7 w-7 text-primary/[0.06] group-hover:text-primary/[0.12] transition-colors duration-300 rotate-180" />

                        {/* Stars */}
                        <div className="flex gap-0.5 mb-4">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                    key={i}
                                    className={`h-4 w-4 ${i < t.rating ? "text-yellow-500 fill-yellow-500" : "text-muted-foreground/20"}`}
                                />
                            ))}
                        </div>

                        {/* Review */}
                        <p className="text-sm text-foreground/80 leading-relaxed mb-5 line-clamp-4 min-h-[4.5rem]">
                            "{t.review}"
                        </p>

                        {/* Divider */}
                        <div className="w-full h-px bg-border/40 mb-4" />

                        {/* Customer info */}
                        <div className="flex items-start gap-3.5">
                            {/* Photo */}
                            <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-primary/20 ring-offset-2 ring-offset-card shrink-0">
                                <img
                                    src={t.image}
                                    alt={t.name}
                                    className="w-full h-full object-cover"
                                    loading="lazy"
                                />
                            </div>

                            <div className="flex-1 min-w-0">
                                <p className="font-bold text-sm text-foreground leading-tight truncate">{t.name}</p>
                                <div className="flex items-center gap-1 mt-1">
                                    <MapPin className="h-3 w-3 text-muted-foreground/60 shrink-0" />
                                    <span className="text-[11px] text-muted-foreground truncate">{t.location}</span>
                                </div>
                                <div className="flex items-center gap-1 mt-0.5">
                                    <Phone className="h-3 w-3 text-muted-foreground/60 shrink-0" />
                                    <span className="text-[11px] text-muted-foreground font-mono">+91 {maskPhone(t.phone)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Testimonials;
