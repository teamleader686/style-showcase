import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { Product } from "@/data/types";
import { formatPrice } from "@/data/mock";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [liked, setLiked] = useState(false);

  return (
    <Link
      to={`/product?id=${product.id}`}
      className="group block bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-border/50"
    >
      <div className="relative aspect-square overflow-hidden bg-secondary">
        <img
          src={product.images[0]}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {product.discount > 0 && (
          <Badge className="absolute top-2 left-2 bg-accent text-accent-foreground text-[10px] px-2 py-0.5 font-bold border-0">
            {product.discount}% OFF
          </Badge>
        )}
        <button
          onClick={(e) => {
            e.preventDefault();
            setLiked(!liked);
          }}
          className="absolute top-2 right-2 h-8 w-8 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center transition-colors hover:bg-card"
        >
          <Heart
            className={cn(
              "h-4 w-4 transition-colors",
              liked ? "fill-accent text-accent" : "text-muted-foreground"
            )}
          />
        </button>
      </div>
      <div className="p-3">
        <h3 className="font-semibold text-sm text-foreground line-clamp-1 group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
          {product.subtitle}
        </p>
        <div className="mt-2 flex items-center gap-2">
          <span className="text-base font-bold text-foreground">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice > product.price && (
            <span className="text-xs text-muted-foreground line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
