import { useState } from "react";
import { getGallery } from "@/api/mockApi";
import { useFetch } from "@/hooks/useFetch";
import Lightbox from "@/components/Lightbox";
import { ShimmerGallery } from "@/components/Shimmer";
import { Camera, ZoomIn } from "lucide-react";

const GalleryPage = () => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const { data: galleryImages, loading } = useFetch(getGallery);

  return (
    <main className="pb-24 md:pb-12 px-4 pt-5">
      {/* Header */}
      <div className="mb-7">
        <h1 className="text-2xl md:text-3xl font-extrabold text-foreground flex items-center gap-2.5 tracking-tight">
          <Camera className="h-6 w-6 md:h-7 md:w-7 text-primary" />
          Our Gallery
        </h1>
        <p className="text-sm text-muted-foreground mt-1.5">Explore our store and products in detail</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
        {loading
          ? Array.from({ length: 8 }).map((_, i) => <ShimmerGallery key={i} />)
          : galleryImages?.map((img, i) => (
            <div
              key={i}
              className="animate-fade-up opacity-0"
              style={{ animationDelay: `${i * 60}ms`, animationFillMode: 'forwards' }}
            >
              <button
                onClick={() => setLightboxIndex(i)}
                className="aspect-square rounded-2xl overflow-hidden bg-secondary group relative premium-shadow hover:premium-shadow-hover transition-all duration-500 hover:-translate-y-1 w-full"
              >
                <img
                  src={img}
                  alt={`Gallery ${i + 1}`}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                  <div className="p-3 rounded-2xl bg-white/90 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100 shadow-lg">
                    <ZoomIn className="h-5 w-5 text-foreground" />
                  </div>
                </div>
              </button>
            </div>
          ))}
      </div>

      {lightboxIndex !== null && galleryImages && (
        <Lightbox
          images={galleryImages}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onPrev={() =>
            setLightboxIndex((prev) =>
              prev !== null ? (prev - 1 + galleryImages.length) % galleryImages.length : 0
            )
          }
          onNext={() =>
            setLightboxIndex((prev) =>
              prev !== null ? (prev + 1) % galleryImages.length : 0
            )
          }
        />
      )}
    </main>
  );
};

export default GalleryPage;
