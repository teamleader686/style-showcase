import { Link } from "react-router-dom";
import { HotDeal } from "@/data/types";
import { formatPrice } from "@/data/mock";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface HotDealCardProps {
    deal: HotDeal;
}

const HotDealCard = ({ deal }: HotDealCardProps) => {
    return (
        <div className="group block bg-card rounded-2xl overflow-hidden premium-shadow hover:premium-shadow-hover transition-all duration-500 border border-border/30 hover:border-accent/20 flex flex-col h-full hover:-translate-y-1">
            <div className="relative aspect-square overflow-hidden bg-secondary/50">
                <img
                    src={deal.image}
                    alt={deal.name}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <Badge className="absolute top-2.5 left-2.5 bg-gradient-to-r from-accent to-pink-500 text-white text-[10px] px-2.5 py-1 font-bold border-0 shadow-lg shadow-accent/30 rounded-lg">
                    {deal.discount}
                </Badge>
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div className="p-3.5 flex flex-col flex-1">
                <h3 className="font-bold text-sm text-foreground line-clamp-1 group-hover:text-primary transition-colors duration-300">
                    {deal.name}
                </h3>
                <div className="mt-2.5 flex items-center gap-2">
                    <span className="text-base font-extrabold text-foreground">
                        {formatPrice(deal.price)}
                    </span>
                    {deal.originalPrice > deal.price && (
                        <span className="text-xs text-muted-foreground/70 line-through">
                            {formatPrice(deal.originalPrice)}
                        </span>
                    )}
                </div>
                <div className="mt-auto pt-3">
                    <Button asChild className="w-full h-9 text-xs font-bold rounded-xl bg-gradient-to-r from-primary to-blue-600 text-primary-foreground hover:from-primary/90 hover:to-blue-500 transition-all duration-300 shadow-md shadow-primary/20 border-none group/btn">
                        <Link to={`/product/${deal.id}`} className="flex items-center gap-1.5">
                            View Details
                            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/btn:translate-x-0.5" />
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default HotDealCard;
