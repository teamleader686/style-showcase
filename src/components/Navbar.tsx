import { Link, useLocation } from "react-router-dom";
import { Search, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";
import { settings } from "@/data/mock";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const navLinks = [
  { path: "/", label: "Home" },
  { path: "/categories", label: "Categories" },
  { path: "/gallery", label: "Gallery" },
  { path: "/contact", label: "Contact" },
];

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/categories?search=${encodeURIComponent(search.trim())}`);
      setSearch("");
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <ShoppingBag className="h-7 w-7 text-primary" />
          <span className="text-xl font-bold text-foreground tracking-tight">
            {settings.siteName}
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
      </div>
    </header>
  );
};

export default Navbar;
