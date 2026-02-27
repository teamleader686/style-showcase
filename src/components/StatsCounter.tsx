import { useState, useEffect, useRef } from "react";
import { stats } from "@/data/mock";
import { Users, ShoppingBag, Star, Clock } from "lucide-react";

const iconMap = [Users, ShoppingBag, Star, Clock];

const AnimatedCounter = ({ target, suffix, isVisible }: { target: number; suffix: string; isVisible: boolean }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!isVisible) return;
        const duration = 2000;
        const steps = 60;
        const increment = target / steps;
        let current = 0;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                setCount(target);
                clearInterval(timer);
            } else {
                setCount(Math.floor(current * 10) / 10);
            }
        }, duration / steps);
        return () => clearInterval(timer);
    }, [isVisible, target]);

    const display = target % 1 !== 0 ? count.toFixed(1) : Math.floor(count).toString();

    return (
        <span className="text-3xl md:text-4xl font-extrabold text-primary tabular-nums">
            {display}{suffix}
        </span>
    );
};

const StatsCounter = () => {
    const ref = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.3 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section ref={ref} className="px-4 pt-10 md:pt-14">
            <div className="bg-gradient-to-br from-secondary/80 to-secondary/30 rounded-3xl p-6 md:p-10 premium-shadow border border-border/30 relative overflow-hidden">
                {/* decorative blob */}
                <div className="absolute -top-16 -right-16 w-40 h-40 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-16 -left-16 w-40 h-40 bg-gradient-to-br from-accent/10 to-primary/10 rounded-full blur-3xl pointer-events-none" />

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 relative">
                    {stats.map((stat, index) => {
                        const Icon = iconMap[index];
                        return (
                            <div
                                key={stat.id}
                                className="flex flex-col items-center text-center gap-2 animate-fade-up opacity-0"
                                style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
                            >
                                <div className="p-3 rounded-2xl bg-primary/10 mb-1">
                                    <Icon className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                                </div>
                                <AnimatedCounter target={stat.value} suffix={stat.suffix} isVisible={isVisible} />
                                <span className="text-xs md:text-sm font-semibold text-muted-foreground">{stat.label}</span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default StatsCounter;
