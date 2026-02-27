import { useState, useEffect, useCallback } from "react";
import { getBanners } from "@/api/mockApi";
import { useFetch } from "@/hooks/useFetch";
import { cn } from "@/lib/utils";
import { ShimmerBanner } from "@/components/Shimmer";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HeroBanner = () => {
  const { data: banners, loading } = useFetch(getBanners);
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  const next = useCallback(() => {
    if (!banners) return;
    setCurrent((prev) => (prev + 1) % banners.length);
  }, [banners]);

  useEffect(() => {
    if (!banners || banners.length === 0) return;
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, [next, banners]);

  if (loading) return <ShimmerBanner />;
  if (!banners || banners.length === 0) return null;

  return (
    <div className="relative w-full overflow-hidden rounded-3xl h-[220px] md:h-[340px] lg:h-[440px] premium-shadow-lg group">
      {banners.map((banner, i) => (
        <div
          key={banner.id}
          className={cn(
            "absolute inset-0 transition-all duration-1000 ease-in-out h-full w-full",
            i === current ? "opacity-100 scale-100" : "opacity-0 scale-105"
          )}
        >
          <img
            src={banner.image}
            alt={banner.title}
            className="w-full h-full object-cover"
            loading={i === 0 ? "eager" : "lazy"}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />
          <div
            className={cn(
              "absolute bottom-6 left-6 md:bottom-10 md:left-10 max-w-lg transition-all duration-700",
              i === current ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
          >
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-extrabold text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)] leading-tight">
              {banner.title}
            </h2>
            <p className="text-sm md:text-lg text-white/85 mt-2 font-medium drop-shadow-md">
              {banner.subtitle}
            </p>
            <button
              onClick={() => navigate("/category")}
              className="mt-4 md:mt-6 inline-flex items-center gap-2 px-6 py-2.5 md:px-8 md:py-3 bg-white/95 hover:bg-white text-foreground rounded-2xl font-bold text-sm md:text-base shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98] group/btn"
            >
              Shop Now
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
            </button>
          </div>
        </div>
      ))}
      {/* Pagination dots */}
      <div className="absolute bottom-4 right-6 md:bottom-6 md:right-10 flex gap-2 z-10">
        {banners.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={cn(
              "rounded-full transition-all duration-500",
              i === current
                ? "w-8 h-2.5 bg-white shadow-md"
                : "w-2.5 h-2.5 bg-white/40 hover:bg-white/60"
            )}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroBanner;
