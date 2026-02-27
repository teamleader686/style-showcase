import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "@/components/ProductCard";
import { getProducts, getCategories } from "@/api/mockApi";
import { useFetch } from "@/hooks/useFetch";
import { ShimmerCard } from "@/components/Shimmer";
import { cn } from "@/lib/utils";
import { Search, SlidersHorizontal } from "lucide-react";

const CategoryPage = () => {
  const [searchParams] = useSearchParams();
  const initialCat = searchParams.get("cat") || "all";
  const initialSearch = searchParams.get("search") || "";

  const [selectedCategory, setSelectedCategory] = useState(initialCat);
  const [search, setSearch] = useState(initialSearch);
  const [sortBy, setSortBy] = useState("default");
  const [searchFocused, setSearchFocused] = useState(false);

  const { data: products, loading: productsLoading } = useFetch(getProducts);
  const { data: categories, loading: categoriesLoading } = useFetch(getCategories);

  const filtered = useMemo(() => {
    let result = products || [];

    if (selectedCategory !== "all") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.subtitle.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    if (sortBy === "price-low") result = [...result].sort((a, b) => a.price - b.price);
    else if (sortBy === "price-high") result = [...result].sort((a, b) => b.price - a.price);
    else if (sortBy === "discount") result = [...result].sort((a, b) => b.discount - a.discount);

    return result;
  }, [selectedCategory, search, sortBy, products]);

  return (
    <main className="pb-24 md:pb-12">
      {/* Search */}
      <div className="px-4 pt-5">
        <div className={cn(
          "flex items-center rounded-2xl px-4 py-3.5 transition-all duration-300 border",
          searchFocused
            ? "bg-card border-primary/30 premium-shadow shadow-[0_0_0_3px_rgba(59,130,246,0.08)]"
            : "bg-card border-border/50 shadow-sm"
        )}>
          <Search className={cn(
            "h-5 w-5 mr-3 shrink-0 transition-colors",
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
        </div>
      </div>

      {/* Filter Chips */}
      <div className="px-4 pt-5">
        <div className="flex gap-2.5 overflow-x-auto scrollbar-hide pb-2">
          <button
            onClick={() => setSelectedCategory("all")}
            className={cn(
              "shrink-0 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 border",
              selectedCategory === "all"
                ? "bg-gradient-to-r from-primary to-blue-600 text-primary-foreground border-transparent shadow-md shadow-primary/25"
                : "bg-card text-muted-foreground border-border/50 hover:border-primary/30 hover:text-foreground premium-shadow"
            )}
          >
            All
          </button>
          {!categoriesLoading && categories?.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={cn(
                "shrink-0 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 border",
                selectedCategory === cat.id
                  ? "bg-gradient-to-r from-primary to-blue-600 text-primary-foreground border-transparent shadow-md shadow-primary/25"
                  : "bg-card text-muted-foreground border-border/50 hover:border-primary/30 hover:text-foreground premium-shadow"
              )}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Sort */}
      <div className="px-4 pt-4 flex justify-between items-center">
        <p className="text-sm text-muted-foreground font-medium">
          <span className="font-bold text-foreground">{filtered.length}</span> product{filtered.length !== 1 ? "s" : ""} found
        </p>
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="text-sm bg-card border border-border/50 rounded-xl px-3 py-2 text-foreground outline-none premium-shadow cursor-pointer focus:border-primary/30"
          >
            <option value="default">Sort by</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="discount">Best Discount</option>
          </select>
        </div>
      </div>

      {/* Product Grid */}
      <div className="px-4 pt-5">
        {productsLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
            {Array.from({ length: 8 }).map((_, i) => (
              <ShimmerCard key={i} />
            ))}
          </div>
        ) : filtered.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
            {filtered.map((product, index) => (
              <div key={product.id} className="animate-fade-up opacity-0" style={{ animationDelay: `${index * 50}ms`, animationFillMode: 'forwards' }}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-secondary flex items-center justify-center">
              <Search className="h-7 w-7 text-muted-foreground" />
            </div>
            <p className="text-lg font-bold text-foreground">No products found</p>
            <p className="text-sm text-muted-foreground mt-1.5">Try a different search or category</p>
          </div>
        )}
      </div>
    </main>
  );
};

export default CategoryPage;
