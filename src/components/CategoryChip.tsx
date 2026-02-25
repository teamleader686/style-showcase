import { cn } from "@/lib/utils";
import { Smartphone, Shield, Zap, Headphones } from "lucide-react";
import { Category } from "@/data/types";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Smartphone,
  Shield,
  Zap,
  Headphones,
};

interface CategoryChipProps {
  category: Category;
  isActive?: boolean;
  onClick?: () => void;
}

const CategoryChip = ({ category, isActive, onClick }: CategoryChipProps) => {
  const Icon = iconMap[category.icon] || Smartphone;

  return (
    <button
      onClick={onClick}
      className={cn(
        "flex flex-col items-center gap-2 shrink-0 transition-all",
      )}
    >
      <div
        className={cn(
          "w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm",
          isActive
            ? "bg-primary text-primary-foreground shadow-md scale-105"
            : "bg-secondary text-muted-foreground hover:bg-primary/10 hover:text-primary"
        )}
      >
        <Icon className="h-6 w-6" />
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
