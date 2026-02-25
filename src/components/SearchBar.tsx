import { Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [search, setSearch] = useState("");
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
      className="flex items-center w-full bg-card rounded-2xl px-4 py-3 shadow-sm border border-border/50 md:hidden"
    >
      <Search className="h-5 w-5 text-muted-foreground mr-3 shrink-0" />
      <input
        type="text"
        placeholder="Search phones, cases, chargers..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="bg-transparent border-none outline-none text-sm w-full text-foreground placeholder:text-muted-foreground"
      />
    </form>
  );
};

export default SearchBar;
