import { Link, useLocation } from "react-router-dom";
import { Home, Grid3X3, Image, Phone, Tag } from "lucide-react";
import { cn } from "@/lib/utils";

const tabs = [
  { path: "/", icon: Home, label: "Home" },
  { path: "/category", icon: Grid3X3, label: "Categories" },
  { path: "/offers", icon: Tag, label: "Offers" },
  { path: "/gallery", icon: Image, label: "Gallery" },
  { path: "/contact", icon: Phone, label: "Contact" },
];

const BottomNav = () => {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass-strong border-t border-white/20 md:hidden shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
      <div className="flex items-center justify-around h-[68px] px-1">
        {tabs.map((tab) => {
          const isActive = location.pathname === tab.path;
          return (
            <Link
              key={tab.path}
              to={tab.path}
              className={cn(
                "flex flex-col items-center justify-center gap-1 flex-1 h-full transition-all duration-300 relative",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {isActive && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-primary rounded-full" />
              )}
              <div className={cn(
                "p-1.5 rounded-xl transition-all duration-300",
                isActive ? "bg-primary/10" : ""
              )}>
                <tab.icon className={cn("h-5 w-5 transition-all duration-200", isActive && "stroke-[2.5]")} />
              </div>
              <span className={cn(
                "text-[10px] transition-all duration-200",
                isActive ? "font-bold" : "font-medium"
              )}>{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
