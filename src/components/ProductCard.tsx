import { Link } from "react-router-dom";
import { Product } from "@/data/types";
import { formatPrice } from "@/data/mock";
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Link
      to={`/product/${product.id}`}
      className="group block bg-card rounded-2xl overflow-hidden premium-shadow hover:premium-shadow-hover transition-all duration-500 border border-border/30 hover:border-primary/20 hover:-translate-y-1"
    >
      <div className="relative aspect-square overflow-hidden bg-secondary/50">
        <img
          src={product.images[0]}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        {product.discount > 0 && (
          <Badge className="absolute top-2.5 left-2.5 bg-gradient-to-r from-accent to-pink-500 text-white text-[10px] px-2.5 py-1 font-bold border-0 shadow-lg shadow-accent/30 rounded-lg">
            {product.discount}% OFF
          </Badge>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <div className="p-3.5">
        <h3 className="font-bold text-sm text-foreground line-clamp-1 group-hover:text-primary transition-colors duration-300">
          {product.name}
        </h3>
        <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
          {product.subtitle}
        </p>
        <div className="mt-2.5 flex items-center gap-2">
          <span className="text-base font-extrabold text-foreground">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice > product.price && (
            <span className="text-xs text-muted-foreground/70 line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
