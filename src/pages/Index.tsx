import { useNavigate } from "react-router-dom";
import SearchBar from "@/components/SearchBar";
import HeroBanner from "@/components/HeroBanner";
import CategoryChip from "@/components/CategoryChip";
import ProductCard from "@/components/ProductCard";
import HotDealCard from "@/components/HotDealCard";
import { useFetch } from "@/hooks/useFetch";
import { getProducts, getCategories, getHotDeals, getSettings } from "@/api/mockApi";
import { ShimmerCard, ShimmerChip } from "@/components/Shimmer";
import { ArrowRight, Flame, TrendingUp } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const { data: products, loading: productsLoading } = useFetch(getProducts);
  const { data: categories, loading: categoriesLoading } = useFetch(getCategories);
  const { data: hotDeals, loading: dealsLoading } = useFetch(getHotDeals);
  const { data: settings } = useFetch(getSettings);

  const topProducts = products?.slice(0, 8) || [];

  return (
    <main className="pb-24 md:pb-12">
      {/* Mobile Search */}
      <div className="px-4 pt-4 md:hidden">
        <SearchBar />
      </div>

      {/* Hero Banner */}
      <section className="px-4 pt-4 md:pt-6">
        <HeroBanner />
      </section>

      {/* Categories */}
      <section className="px-4 pt-10 md:pt-14">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl md:text-2xl font-extrabold text-foreground tracking-tight">
            Shop by Category
          </h2>
        </div>
        <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3 md:gap-4">
          {categoriesLoading
            ? Array.from({ length: 8 }).map((_, i) => <ShimmerChip key={i} />)
            : categories?.map((cat, index) => (
              <div key={cat.id} className="animate-fade-up opacity-0" style={{ animationDelay: `${index * 60}ms`, animationFillMode: 'forwards' }}>
                <CategoryChip
                  category={cat}
                  onClick={() => navigate(`/category?cat=${cat.id}`)}
                />
              </div>
            ))}
        </div>
      </section>

      {/* Hot Deals */}
      <section className="px-4 pt-10 md:pt-14">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl md:text-2xl font-extrabold text-foreground tracking-tight flex items-center gap-2">
            <Flame className="h-5 w-5 md:h-6 md:w-6 text-accent" />
            Hot Deals
          </h2>
          <button
            onClick={() => navigate("/category")}
            className="flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary/80 transition-colors px-3 py-1.5 rounded-xl hover:bg-primary/5"
          >
            View All <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
          {dealsLoading
            ? Array.from({ length: 4 }).map((_, i) => <ShimmerCard key={i} />)
            : hotDeals?.map((deal, index) => (
              <div key={deal.id} className="animate-fade-up opacity-0" style={{ animationDelay: `${index * 80}ms`, animationFillMode: 'forwards' }}>
                <HotDealCard deal={deal} />
              </div>
            ))}
        </div>
      </section>

      {/* Top Products */}
      <section className="px-4 pt-10 md:pt-14">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl md:text-2xl font-extrabold text-foreground tracking-tight flex items-center gap-2">
            <TrendingUp className="h-5 w-5 md:h-6 md:w-6 text-primary" />
            Top Products
          </h2>
          <button
            onClick={() => navigate("/category")}
            className="flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary/80 transition-colors px-3 py-1.5 rounded-xl hover:bg-primary/5"
          >
            View All <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
          {productsLoading
            ? Array.from({ length: 8 }).map((_, i) => <ShimmerCard key={i} />)
            : topProducts.map((product, index) => (
              <div key={product.id} className="animate-fade-up opacity-0" style={{ animationDelay: `${index * 60}ms`, animationFillMode: 'forwards' }}>
                <ProductCard product={product} />
              </div>
            ))}
        </div>
      </section>
    </main>
  );
};

export default Index;
