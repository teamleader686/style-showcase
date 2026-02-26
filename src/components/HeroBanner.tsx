import { useState, useEffect, useCallback } from "react";
import { getBanners } from "@/api/mockApi";
import { useFetch } from "@/hooks/useFetch";
import { cn } from "@/lib/utils";
import { ShimmerBanner } from "@/components/Shimmer";

const HeroBanner = () => {
  const { data: banners, loading } = useFetch(getBanners);
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    if (!banners) return;
    setCurrent((prev) => (prev + 1) % banners.length);
  }, [banners]);

  useEffect(() => {
    if (!banners || banners.length === 0) return;
    const interval = setInterval(next, 4000);
    return () => clearInterval(interval);
  }, [next, banners]);

  if (loading) return <ShimmerBanner />;
  if (!banners || banners.length === 0) return null;

  return (
    <div className="relative w-full overflow-hidden rounded-2xl h-[200px] md:h-[300px] lg:h-[400px]">
      {banners.map((banner, i) => (
        <div
          key={banner.id}
          className={cn(
            "absolute inset-0 transition-all duration-700 ease-in-out h-full w-full",
            i === current ? "opacity-100 scale-100" : "opacity-0 scale-105"
          )}
        >
          <img
            src={banner.image}
            alt={banner.title}
            className="w-full h-full object-cover"
            loading={i === 0 ? "eager" : "lazy"}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
          <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8">
            <h2 className="text-xl md:text-3xl font-bold text-white drop-shadow-lg">
              {banner.title}
            </h2>
            <p className="text-sm md:text-base text-white/90 mt-1">
              {banner.subtitle}
            </p>
          </div>
        </div>
      ))}
      <div className="absolute bottom-4 right-4 flex gap-1.5 z-10">
        {banners.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={cn(
              "h-1.5 rounded-full transition-all duration-300",
              i === current ? "w-6 bg-white" : "w-1.5 bg-white/50"
            )}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroBanner;
