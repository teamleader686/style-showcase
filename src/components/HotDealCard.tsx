import { Link } from "react-router-dom";
import { HotDeal } from "@/data/types";
import { formatPrice } from "@/data/mock";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface HotDealCardProps {
    deal: HotDeal;
}

const HotDealCard = ({ deal }: HotDealCardProps) => {
    return (
        <div className="group block bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-border/50 flex flex-col h-full">
            <div className="relative aspect-square overflow-hidden bg-secondary">
                <img
                    src={deal.image}
                    alt={deal.name}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <Badge className="absolute top-2 left-2 bg-accent text-accent-foreground text-[10px] px-2 py-0.5 font-bold border-0 animate-pulse">
                    {deal.discount}
                </Badge>
            </div>
            <div className="p-3 flex flex-col flex-1">
                <h3 className="font-semibold text-sm text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                    {deal.name}
                </h3>
                <div className="mt-2 flex items-center gap-2">
                    <span className="text-base font-bold text-foreground">
                        {formatPrice(deal.price)}
                    </span>
                    {deal.originalPrice > deal.price && (
                        <span className="text-xs text-muted-foreground line-through">
                            {formatPrice(deal.originalPrice)}
                        </span>
                    )}
                </div>
                <div className="mt-auto pt-3">
                    <Button asChild className="w-full h-8 text-xs font-semibold rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-colors border-none shadow-none">
                        <Link to={`/product/${deal.id}`}>View Details</Link>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default HotDealCard;
