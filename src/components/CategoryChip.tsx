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
        "flex flex-col items-center gap-2 shrink-0 transition-all",
      )}
    >
      <div
        className={cn(
          "w-16 h-16 rounded-full overflow-hidden flex items-center justify-center transition-all duration-300 shadow-sm relative bg-secondary",
          isActive
            ? "shadow-md scale-105 ring-2 ring-primary ring-offset-2 ring-offset-background"
            : "hover:ring-2 hover:ring-primary/50 hover:ring-offset-2 hover:ring-offset-background"
        )}
      >
        <img
          src={category.image}
          alt={category.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      <span
        className={cn(
          "text-xs font-medium transition-colors",
          isActive ? "text-primary" : "text-muted-foreground"
        )}
      >
        {category.name}
      </span>
    </button>
  );
};

export default CategoryChip;
