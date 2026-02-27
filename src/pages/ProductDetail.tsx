import { useParams, Link } from "react-router-dom";
import { formatPrice } from "@/data/mock";
import { getProducts, getSettings } from "@/api/mockApi";
import { useFetch } from "@/hooks/useFetch";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Share2, ChevronLeft, ChevronRight, ShieldCheck, Truck, Headphones, MessageCircle } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { ShimmerCard } from "@/components/Shimmer";
import ProductCard from "@/components/ProductCard";
import OrderFormModal from "@/components/OrderFormModal";
import ShareModal from "@/components/ShareModal";

const ProductDetail = () => {
  const { id } = useParams();
  const productId = Number(id);
  const { data: products, loading: productsLoading } = useFetch(getProducts);
  const { data: settings } = useFetch(getSettings);
  const product = products?.find((p) => p.id === productId);
  const [currentImage, setCurrentImage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setCurrentImage(0);
  }, [productId]);

  const handleProductInquiry = () => {
    const phone = settings?.whatsapp || "919876543210";
    const message = `Hello, I want to inquire about this product:
Product: ${product?.name}
Price: ₹${product?.price}
Link: ${window.location.href}`;
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  const relatedProducts = useMemo(() => {
    if (!products || !product) return [];
    return products
      .filter((p) => p.category === product.category && p.id !== product.id)
      .slice(0, 4);
  }, [products, product]);

  if (productsLoading) {
    return (
      <main className="pb-24 md:pb-12 px-4 pt-8">
        <ShimmerCard className="mb-4" />
        <div className="h-6 w-1/3 bg-muted animate-pulse rounded-lg my-2" />
        <div className="h-4 w-1/2 bg-muted animate-pulse rounded-lg my-2" />
      </main>
    );
  }

  if (!product) {
    return (
      <main className="pb-24 md:pb-12 px-4 pt-8 text-center">
        <p className="text-lg text-muted-foreground">Product not found</p>
        <Link to="/" className="text-primary hover:underline text-sm mt-2 inline-block font-semibold">
          Go back home
        </Link>
      </main>
    );
  }

  const shareData = {
    title: product?.name || "Amazing Product",
    text: `Check out ${product?.name} at ${product ? formatPrice(product.price) : ''}!`,
    url: window.location.href,
  };

  return (
    <main className="pb-24 md:pb-12">
      {/* Back button */}
      <div className="px-4 pt-5">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors font-medium px-3 py-1.5 rounded-xl hover:bg-secondary"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </Link>
      </div>

      {/* Image Gallery */}
      <div className="relative mt-3 animate-fade-up">
        <div className="aspect-square overflow-hidden bg-secondary/50 mx-4 rounded-2xl relative premium-shadow-lg">
          <img
            src={product.images[currentImage]}
            alt={product.name}
            className="w-full h-full object-cover transition-opacity duration-300"
          />
          {product.discount > 0 && (
            <Badge className="absolute top-3.5 left-3.5 bg-gradient-to-r from-accent to-pink-500 text-white font-bold border-0 shadow-lg shadow-accent/30 px-3 py-1.5 rounded-xl text-xs">
              {product.discount}% OFF
            </Badge>
          )}
          {product.images.length > 1 && (
            <>
              <button
                onClick={() => setCurrentImage((prev) => (prev - 1 + product.images.length) % product.images.length)}
                className="absolute left-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-xl glass-strong flex items-center justify-center shadow-lg hover:scale-105 transition-all"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={() => setCurrentImage((prev) => (prev + 1) % product.images.length)}
                className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-xl glass-strong flex items-center justify-center shadow-lg hover:scale-105 transition-all"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}
        </div>
        {/* Thumbnails */}
        <div className="flex gap-2.5 px-4 mt-4 justify-center">
          {product.images.map((img, i) => (
            <button
              key={i}
              onClick={() => setCurrentImage(i)}
              className={cn(
                "w-16 h-16 rounded-xl overflow-hidden border-2 transition-all duration-300 premium-shadow",
                i === currentImage ? "border-primary scale-105 shadow-md shadow-primary/20" : "border-transparent opacity-50 hover:opacity-80"
              )}
            >
              <img src={img} alt="" className="w-full h-full object-cover" loading="lazy" />
            </button>
          ))}
        </div>
      </div>

      {/* Details */}
      <div className="px-4 pt-6 space-y-5 animate-fade-up" style={{ animationDelay: '100ms' }}>
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-foreground tracking-tight">{product.name}</h1>
          <p className="text-sm text-muted-foreground mt-1.5 font-medium">{product.subtitle}</p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-3xl font-extrabold text-foreground">{formatPrice(product.price)}</span>
          {product.originalPrice > product.price && (
            <>
              <span className="text-base text-muted-foreground/60 line-through">
                {formatPrice(product.originalPrice)}
              </span>
              <Badge variant="secondary" className="text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-200/50 rounded-lg px-2.5 py-1">
                Save {formatPrice(product.originalPrice - product.price)}
              </Badge>
            </>
          )}
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed">{product.description}</p>

        {/* Trust badges */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { icon: ShieldCheck, label: "Genuine Product" },
            { icon: Truck, label: "Fast Delivery" },
            { icon: Headphones, label: "24/7 Support" },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-secondary/50 border border-border/30">
              <Icon className="h-4 w-4 text-primary" />
              <span className="text-[10px] font-semibold text-muted-foreground text-center">{label}</span>
            </div>
          ))}
        </div>

        {/* Specs */}
        <div>
          <h3 className="font-bold text-foreground mb-3 text-base">Specifications</h3>
          <div className="flex flex-wrap gap-2">
            {product.specs.map((spec) => (
              <span
                key={spec}
                className="text-xs bg-gradient-to-r from-secondary to-secondary/80 text-foreground px-3.5 py-2 rounded-xl font-semibold border border-border/30"
              >
                {spec}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Button
            className="flex-1 h-14 rounded-2xl bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-500 text-primary-foreground font-bold text-base shadow-lg shadow-primary/25 transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98]"
            onClick={() => setIsModalOpen(true)}
          >
            Order Now
          </Button>
          <div className="flex gap-3 flex-1">
            <Button
              variant="outline"
              className="flex-1 h-14 rounded-2xl border-2 border-border/50 hover:border-primary/30 hover:bg-primary/5 text-foreground font-bold text-base premium-shadow transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98] flex items-center justify-center gap-2"
              onClick={handleProductInquiry}
            >
              <MessageCircle className="h-5 w-5 text-[#25D366]" />
              Inquiry
            </Button>
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="h-14 w-14 rounded-2xl flex items-center justify-center shrink-0 z-10 border-2 border-border/50 hover:border-primary/30 premium-shadow hover:premium-shadow-hover transition-all duration-300"
              onClick={() => setIsShareModalOpen(true)}
              aria-label="Share Product"
            >
              <Share2 className="h-5 w-5 pointer-events-none" />
            </Button>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="pt-10 pb-4 border-t mt-6 border-border/30">
            <h2 className="text-xl font-extrabold text-foreground mb-5 tracking-tight">Related Products</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
              {relatedProducts.map((relatedProduct, index) => (
                <div key={relatedProduct.id} className="animate-fade-up opacity-0" style={{ animationDelay: `${index * 80}ms`, animationFillMode: 'forwards' }}>
                  <ProductCard product={relatedProduct} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <OrderFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={{ name: product.name, price: product.price }}
        whatsappNumber={settings?.whatsapp || "919876543210"}
      />

      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        shareData={shareData}
      />
    </main>
  );
};

export default ProductDetail;
