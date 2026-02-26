import { Link, useLocation, useNavigate } from "react-router-dom";
import { Search, ShoppingBag, Tag } from "lucide-react";
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
  const { data: settings } = useFetch(getSettings);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/category?search=${encodeURIComponent(search.trim())}`);
      setSearch("");
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <ShoppingBag className="h-7 w-7 text-primary" />
          <span className="text-xl font-bold text-foreground tracking-tight">
            {settings?.siteName || "Store"}
          </span>
        </Link>

        <form
          onSubmit={handleSearch}
          className="hidden md:flex items-center flex-1 max-w-md mx-4 bg-secondary rounded-full px-4 py-2"
        >
          <Search className="h-4 w-4 text-muted-foreground mr-2 shrink-0" />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent border-none outline-none text-sm w-full text-foreground placeholder:text-muted-foreground"
          />
        </form>

        <div className="flex items-center gap-3">
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
          <Link
            to="/offers"
            className="p-2 rounded-full bg-secondary/50 hover:bg-secondary transition-colors relative text-primary"
            title="Special Offers"
          >
            <Tag className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 bg-destructive rounded-full animate-pulse border border-card"></span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
