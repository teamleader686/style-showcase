import { useNavigate } from "react-router-dom";
import SearchBar from "@/components/SearchBar";
import HeroBanner from "@/components/HeroBanner";
import CategoryChip from "@/components/CategoryChip";
import ProductCard from "@/components/ProductCard";
import HotDealCard from "@/components/HotDealCard";
import { useFetch } from "@/hooks/useFetch";
import { getProducts, getCategories, getHotDeals, getSettings } from "@/api/mockApi";
import { ShimmerCard, ShimmerChip } from "@/components/Shimmer";
import { ArrowRight, Info } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const { data: products, loading: productsLoading } = useFetch(getProducts);
  const { data: categories, loading: categoriesLoading } = useFetch(getCategories);
  const { data: hotDeals, loading: dealsLoading } = useFetch(getHotDeals);
  const { data: settings } = useFetch(getSettings);

  const topProducts = products?.slice(0, 8) || [];

  return (
    <main className="pb-20 md:pb-8">
      {/* Mobile Search */}
      <div className="px-4 pt-4 md:hidden">
        <SearchBar />
      </div>

      {/* Hero Banner */}
      <section className="px-4 pt-4">
        <HeroBanner />
      </section>

      {/* About Us / Tagline */}
      {settings?.tagline && (
        <section className="px-4 pt-6">
          <div className="bg-primary/5 rounded-2xl p-5 md:p-6 border border-primary/10 flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="bg-primary/10 p-3 rounded-2xl shrink-0 hidden md:flex">
              <Info className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="text-lg md:text-xl font-bold text-foreground mb-1.5">{settings.tagline}</h2>
              <p className="text-sm text-muted-foreground leading-relaxed md:max-w-2xl">{settings.description}</p>
            </div>
          </div>
        </section>
      )}

      {/* Categories */}
      <section className="px-4 pt-8">
        <h2 className="text-lg font-bold text-foreground mb-3">Categories</h2>
        <div className="flex gap-5 overflow-x-auto scrollbar-hide pb-2">
          {categoriesLoading
            ? Array.from({ length: 4 }).map((_, i) => <ShimmerChip key={i} />)
            : categories?.map((cat) => (
              <CategoryChip
                key={cat.id}
                category={cat}
                onClick={() => navigate(`/category?cat=${cat.id}`)}
              />
            ))}
        </div>
      </section>

      {/* Offer Section */}
      <section className="px-4 pt-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold text-foreground">🔥 Hot Deals</h2>
          <button
            onClick={() => navigate("/category")}
            className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
          >
            View All <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {dealsLoading
            ? Array.from({ length: 4 }).map((_, i) => <ShimmerCard key={i} />)
            : hotDeals?.map((deal) => (
              <HotDealCard key={deal.id} deal={deal} />
            ))}
        </div>
      </section>

      {/* Top Products */}
      <section className="px-4 pt-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold text-foreground">Top Products</h2>
          <button
            onClick={() => navigate("/category")}
            className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
          >
            View All <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {productsLoading
            ? Array.from({ length: 8 }).map((_, i) => <ShimmerCard key={i} />)
            : topProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </div>
      </section>
    </main>
  );
};

export default Index;
