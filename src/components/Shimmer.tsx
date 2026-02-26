import { cn } from "@/lib/utils";

export const ShimmerCard = ({ className }: { className?: string }) => {
    return (
        <div className={cn("bg-card rounded-2xl overflow-hidden shadow-sm border border-border/50 animate-pulse", className)}>
            <div className="aspect-square bg-muted"></div>
            <div className="p-3 space-y-2">
                <div className="h-4 bg-muted rounded w-3/4"></div>
                <div className="h-3 bg-muted rounded w-1/2"></div>
                <div className="h-5 bg-muted rounded w-1/3 mt-3"></div>
            </div>
        </div>
    );
};

export const ShimmerBanner = () => {
    return (
        <div className="w-full rounded-2xl aspect-[2.4/1] bg-muted animate-pulse border border-border/50" />
    );
};

export const ShimmerChip = () => {
    return (
        <div className="flex flex-col items-center gap-2 shrink-0 animate-pulse w-full">
            <div className="w-16 h-16 rounded-full bg-muted shadow-sm"></div>
            <div className="h-3 bg-muted rounded w-12"></div>
        </div>
    );
};

export const ShimmerGallery = () => {
    return (
        <div className="aspect-square rounded-2xl overflow-hidden bg-muted animate-pulse" />
    );
};
