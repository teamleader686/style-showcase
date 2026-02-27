import { cn } from "@/lib/utils";
import { Category } from "@/data/types";

interface CategoryChipProps {
  category: Category;
  isActive?: boolean;
  onClick?: () => void;
}

const CategoryChip = ({ category, isActive, onClick }: CategoryChipProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex flex-col items-center gap-2.5 shrink-0 transition-all duration-300 w-full group",
      )}
    >
      <div
        className={cn(
          "w-[72px] h-[72px] md:w-20 md:h-20 rounded-2xl overflow-hidden flex items-center justify-center transition-all duration-300 relative bg-secondary",
          isActive
            ? "premium-shadow-lg scale-105 ring-2 ring-primary ring-offset-2 ring-offset-background"
            : "premium-shadow hover:premium-shadow-lg hover:scale-105 hover:-translate-y-1"
        )}
      >
        <img
          src={category.image}
          alt={category.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className={cn(
          "absolute inset-0 transition-opacity duration-300",
          isActive
            ? "bg-primary/10"
            : "bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100"
        )} />
      </div>
      <span
        className={cn(
          "text-xs font-semibold transition-colors text-center line-clamp-2 leading-tight",
          isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
        )}
      >
        {category.name}
      </span>
    </button>
  );
};

export default CategoryChip;
