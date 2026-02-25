import { useState } from "react";
import { getGallery } from "@/api/mockApi";
import { useFetch } from "@/hooks/useFetch";
import Lightbox from "@/components/Lightbox";
import { ShimmerGallery } from "@/components/Shimmer";

const GalleryPage = () => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const { data: galleryImages, loading } = useFetch(getGallery);

  return (
    <main className="pb-20 md:pb-8 px-4 pt-4">
      <h1 className="text-2xl font-bold text-foreground mb-4">Our Gallery</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {loading
          ? Array.from({ length: 8 }).map((_, i) => <ShimmerGallery key={i} />)
          : galleryImages?.map((img, i) => (
            <button
              key={i}
              onClick={() => setLightboxIndex(i)}
              className="aspect-square rounded-2xl overflow-hidden bg-secondary group"
            >
              <img
                src={img}
                alt={`Gallery ${i + 1}`}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </button>
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
