import { useState, useEffect, useCallback } from "react";
import { banners } from "@/data/mock";
import { cn } from "@/lib/utils";

const HeroBanner = () => {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % banners.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(next, 4000);
    return () => clearInterval(interval);
  }, [next]);

  return (
    <div className="relative w-full overflow-hidden rounded-2xl aspect-[2.4/1]">
      {banners.map((banner, i) => (
        <div
          key={banner.id}
          className={cn(
            "absolute inset-0 transition-all duration-700 ease-in-out",
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
      <div className="absolute bottom-2 right-4 flex gap-1.5">
        {banners.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={cn(
              "h-1.5 rounded-full transition-all duration-300",
              i === current ? "w-6 bg-white" : "w-1.5 bg-white/50"
            )}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroBanner;
