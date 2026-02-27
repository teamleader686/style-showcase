import { Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

const SearchBar = () => {
  const [search, setSearch] = useState("");
  const [focused, setFocused] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/category?search=${encodeURIComponent(search.trim())}`);
      setSearch("");
    }
  };

  return (
    <form
      onSubmit={handleSearch}
      className={cn(
        "flex items-center w-full rounded-2xl px-4 py-3.5 md:hidden transition-all duration-300 border",
        focused
          ? "bg-card border-primary/30 premium-shadow shadow-[0_0_0_3px_rgba(59,130,246,0.08)]"
          : "bg-card border-border/50 shadow-sm hover:shadow-md"
      )}
    >
      <Search className={cn(
        "h-5 w-5 mr-3 shrink-0 transition-colors duration-200",
        focused ? "text-primary" : "text-muted-foreground"
      )} />
      <input
        type="text"
        placeholder="Search phones, cases, chargers..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="bg-transparent border-none outline-none text-sm w-full text-foreground placeholder:text-muted-foreground"
      />
    </form>
  );
};

export default SearchBar;
