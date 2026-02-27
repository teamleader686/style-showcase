import { Link, useLocation, useNavigate } from "react-router-dom";
import { Search, ShoppingBag, Tag, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { getSettings } from "@/api/mockApi";
import { useFetch } from "@/hooks/useFetch";
import { useState } from "react";

const navLinks = [
  { path: "/", label: "Home" },
  { path: "/category", label: "Categories" },
  { path: "/gallery", label: "Gallery" },
  { path: "/contact", label: "Contact" },
];

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const { data: settings } = useFetch(getSettings);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/category?search=${encodeURIComponent(search.trim())}`);
      setSearch("");
    }
  };

  return (
    <header className="sticky top-0 z-50 glass-strong border-b border-white/20 shadow-[0_1px_3px_rgba(0,0,0,0.05),0_4px_12px_rgba(0,0,0,0.03)]">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
          <div className="relative">
            <ShoppingBag className="h-7 w-7 text-primary transition-transform duration-300 group-hover:scale-110" />
            <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-accent rounded-full border-2 border-white" />
          </div>
          <span className="text-xl font-extrabold tracking-tight gradient-text">
            {settings?.siteName || "Store"}
          </span>
        </Link>

        <form
          onSubmit={handleSearch}
          className={cn(
            "hidden md:flex items-center flex-1 max-w-md mx-4 rounded-2xl px-4 py-2.5 transition-all duration-300 border",
            searchFocused
              ? "bg-card border-primary/30 shadow-[0_0_0_3px_rgba(59,130,246,0.1)] premium-shadow"
              : "bg-secondary/80 border-transparent hover:bg-secondary"
          )}
        >
          <Search className={cn(
            "h-4 w-4 mr-2.5 shrink-0 transition-colors duration-200",
            searchFocused ? "text-primary" : "text-muted-foreground"
          )} />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            className="bg-transparent border-none outline-none text-sm w-full text-foreground placeholder:text-muted-foreground"
          />
        </form>

        <div className="flex items-center gap-2">
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    "relative px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-md shadow-primary/25"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/80"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
          <Link
            to="/offers"
            className="relative p-2.5 rounded-xl bg-gradient-to-br from-accent/10 to-primary/10 hover:from-accent/20 hover:to-primary/20 transition-all duration-300 text-primary group"
            title="Special Offers"
          >
            <Tag className="h-5 w-5 transition-transform duration-300 group-hover:rotate-12" />
            <span className="absolute top-1.5 right-1.5 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
