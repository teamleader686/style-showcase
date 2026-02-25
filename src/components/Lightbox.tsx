import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface LightboxProps {
  images: string[];
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

const Lightbox = ({ images, currentIndex, onClose, onPrev, onNext }: LightboxProps) => {
  return (
    <div className="fixed inset-0 z-[100] bg-foreground/90 flex items-center justify-center" onClick={onClose}>
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white/80 hover:text-white z-10"
      >
        <X className="h-8 w-8" />
      </button>

      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="absolute left-2 md:left-6 text-white/60 hover:text-white z-10"
      >
        <ChevronLeft className="h-10 w-10" />
      </button>

      <img
        src={images[currentIndex]}
        alt={`Image ${currentIndex + 1}`}
        className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg"
        onClick={(e) => e.stopPropagation()}
      />

      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="absolute right-2 md:right-6 text-white/60 hover:text-white z-10"
      >
        <ChevronRight className="h-10 w-10" />
      </button>

      <div className="absolute bottom-4 flex gap-1.5">
        {images.map((_, i) => (
          <div
            key={i}
            className={cn(
              "h-1.5 rounded-full transition-all",
              i === currentIndex ? "w-6 bg-white" : "w-1.5 bg-white/40"
            )}
          />
        ))}
      </div>
    </div>
  );
};

export default Lightbox;
