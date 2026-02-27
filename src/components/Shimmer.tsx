import { cn } from "@/lib/utils";

export const ShimmerCard = ({ className }: { className?: string }) => {
    return (
        <div className={cn("bg-card rounded-2xl overflow-hidden premium-shadow border border-border/30", className)}>
            <div className="aspect-square relative overflow-hidden bg-muted">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" style={{ backgroundSize: '200% 100%' }} />
            </div>
            <div className="p-3.5 space-y-2.5">
                <div className="h-4 bg-muted rounded-lg w-3/4 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" style={{ backgroundSize: '200% 100%' }} />
                </div>
                <div className="h-3 bg-muted rounded-lg w-1/2 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" style={{ backgroundSize: '200% 100%', animationDelay: '0.2s' }} />
                </div>
                <div className="h-5 bg-muted rounded-lg w-1/3 mt-3 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" style={{ backgroundSize: '200% 100%', animationDelay: '0.4s' }} />
                </div>
            </div>
        </div>
    );
};

export const ShimmerBanner = () => {
    return (
        <div className="w-full rounded-3xl border border-border/30 h-[220px] md:h-[340px] lg:h-[440px] relative overflow-hidden bg-muted premium-shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" style={{ backgroundSize: '200% 100%' }} />
        </div>
    );
};

export const ShimmerChip = () => {
    return (
        <div className="flex flex-col items-center gap-2.5 shrink-0 w-full">
            <div className="w-[72px] h-[72px] md:w-20 md:h-20 rounded-2xl bg-muted premium-shadow relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" style={{ backgroundSize: '200% 100%' }} />
            </div>
            <div className="h-3 bg-muted rounded-lg w-12 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" style={{ backgroundSize: '200% 100%' }} />
            </div>
        </div>
    );
};

export const ShimmerGallery = () => {
    return (
        <div className="aspect-square rounded-2xl overflow-hidden bg-muted premium-shadow relative">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" style={{ backgroundSize: '200% 100%' }} />
        </div>
    );
};
