import { useNavigate } from "react-router-dom";
import SearchBar from "@/components/SearchBar";
import HeroBanner from "@/components/HeroBanner";
import CategoryChip from "@/components/CategoryChip";
import ProductCard from "@/components/ProductCard";
import { products, categories } from "@/data/mock";
import { ArrowRight } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const offerProducts = products.filter((p) => p.isOffer);
  const topProducts = products.slice(0, 8);

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

      {/* Categories */}
      <section className="px-4 pt-6">
        <h2 className="text-lg font-bold text-foreground mb-3">Categories</h2>
        <div className="flex gap-5 overflow-x-auto scrollbar-hide pb-2">
          {categories.map((cat) => (
            <CategoryChip
              key={cat.id}
              category={cat}
              onClick={() => navigate(`/categories?cat=${cat.id}`)}
            />
          ))}
        </div>
      </section>

      {/* Offer Section */}
      <section className="px-4 pt-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold text-foreground">🔥 Hot Deals</h2>
          <button
            onClick={() => navigate("/categories")}
            className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
          >
            View All <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {offerProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Top Products */}
      <section className="px-4 pt-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold text-foreground">Top Products</h2>
          <button
            onClick={() => navigate("/categories")}
            className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
          >
            View All <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {topProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default Index;
