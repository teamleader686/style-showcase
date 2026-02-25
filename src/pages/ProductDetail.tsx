import { useSearchParams, Link } from "react-router-dom";
import { products, formatPrice, settings } from "@/data/mock";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Share2, MessageCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const ProductDetail = () => {
  const [searchParams] = useSearchParams();
  const id = Number(searchParams.get("id"));
  const product = products.find((p) => p.id === id);
  const [currentImage, setCurrentImage] = useState(0);
  const { toast } = useToast();

  if (!product) {
    return (
      <main className="pb-20 md:pb-8 px-4 pt-8 text-center">
        <p className="text-lg text-muted-foreground">Product not found</p>
        <Link to="/" className="text-primary hover:underline text-sm mt-2 inline-block">
          Go back home
        </Link>
      </main>
    );
  }

  const whatsappUrl = `https://wa.me/${settings.whatsapp}?text=${encodeURIComponent(
    `Hi! I'm interested in ${product.name} (${formatPrice(product.price)}). ${window.location.href}`
  )}`;

  const handleShare = async () => {
    const shareData = {
      title: product.name,
      text: `Check out ${product.name} at ${formatPrice(product.price)}!`,
      url: window.location.href,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toast({ title: "Link copied!", description: "Product link copied to clipboard" });
      }
    } catch {
      // User cancelled share
    }
  };

  return (
    <main className="pb-20 md:pb-8">
      {/* Back button */}
      <div className="px-4 pt-4">
        <Link
          to="/"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </Link>
      </div>

      {/* Image Gallery */}
      <div className="relative mt-2">
        <div className="aspect-square overflow-hidden bg-secondary mx-4 rounded-2xl relative">
          <img
            src={product.images[currentImage]}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          {product.discount > 0 && (
            <Badge className="absolute top-3 left-3 bg-accent text-accent-foreground font-bold border-0">
              {product.discount}% OFF
            </Badge>
          )}
          {product.images.length > 1 && (
            <>
              <button
                onClick={() => setCurrentImage((prev) => (prev - 1 + product.images.length) % product.images.length)}
                className="absolute left-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={() => setCurrentImage((prev) => (prev + 1) % product.images.length)}
                className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </>
          )}
        </div>
        {/* Thumbnails */}
        <div className="flex gap-2 px-4 mt-3 justify-center">
          {product.images.map((img, i) => (
            <button
              key={i}
              onClick={() => setCurrentImage(i)}
              className={cn(
                "w-14 h-14 rounded-xl overflow-hidden border-2 transition-all",
                i === currentImage ? "border-primary" : "border-transparent opacity-60"
              )}
            >
              <img src={img} alt="" className="w-full h-full object-cover" loading="lazy" />
            </button>
          ))}
        </div>
      </div>

      {/* Details */}
      <div className="px-4 pt-4 space-y-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">{product.name}</h1>
          <p className="text-sm text-muted-foreground mt-1">{product.subtitle}</p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-2xl font-bold text-foreground">{formatPrice(product.price)}</span>
          {product.originalPrice > product.price && (
            <>
              <span className="text-base text-muted-foreground line-through">
                {formatPrice(product.originalPrice)}
              </span>
              <Badge variant="secondary" className="text-xs font-semibold text-green-600 bg-green-50 border-0">
                Save {formatPrice(product.originalPrice - product.price)}
              </Badge>
            </>
          )}
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed">{product.description}</p>

        {/* Specs */}
        <div>
          <h3 className="font-semibold text-foreground mb-2">Specifications</h3>
          <div className="flex flex-wrap gap-2">
            {product.specs.map((spec) => (
              <span
                key={spec}
                className="text-xs bg-secondary text-foreground px-3 py-1.5 rounded-full font-medium"
              >
                {spec}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-2">
          <Button asChild className="flex-1 h-12 rounded-xl bg-success hover:bg-success/90 text-success-foreground font-semibold">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="h-5 w-5 mr-2" /> Order via WhatsApp
            </a>
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-12 w-12 rounded-xl"
            onClick={handleShare}
          >
            <Share2 className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </main>
  );
};

export default ProductDetail;
