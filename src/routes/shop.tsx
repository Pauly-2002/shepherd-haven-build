import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Star, Heart, Search } from "lucide-react";
import { useScrollFade } from "@/hooks/use-scroll-fade";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Pet Products Shop — OurShepherds" },
      { name: "description", content: "Vet-recommended pet products: food, supplements, grooming, toys, and more." },
    ],
  }),
  component: ShopPage,
});

type Product = {
  name: string;
  price: string;
  rating: number;
  category: string;
  vetRecommended: boolean;
  emoji: string;
};

const products: Product[] = [
  { name: "ShepherdFuel Pro Grain-Free Kibble", price: "$64.99", rating: 4.9, category: "Food & Nutrition", vetRecommended: true, emoji: "🦴" },
  { name: "PureBalance Raw Freeze-Dried Meals", price: "$49.99", rating: 4.8, category: "Food & Nutrition", vetRecommended: true, emoji: "🥩" },
  { name: "Organic Sweet Potato & Salmon Treats", price: "$12.99", rating: 4.7, category: "Food & Nutrition", vetRecommended: false, emoji: "🍠" },
  { name: "Puppy Starter Nutrition Kit", price: "$39.99", rating: 4.8, category: "Food & Nutrition", vetRecommended: true, emoji: "🐶" },
  { name: "Hip & Joint Support Chews", price: "$34.99", rating: 4.8, category: "Health & Supplements", vetRecommended: true, emoji: "💊" },
  { name: "Omega-3 Wild Fish Oil Softgels", price: "$24.99", rating: 4.7, category: "Health & Supplements", vetRecommended: true, emoji: "🐟" },
  { name: "Probiotic Digestive Blend", price: "$22.99", rating: 4.6, category: "Health & Supplements", vetRecommended: false, emoji: "🧬" },
  { name: "Calming CBD Drops (Vet-Approved)", price: "$44.99", rating: 4.9, category: "Health & Supplements", vetRecommended: true, emoji: "🌿" },
  { name: "Dental Water Additive", price: "$14.99", rating: 4.5, category: "Health & Supplements", vetRecommended: false, emoji: "🦷" },
  { name: "ShepherdSilk De-shedding Shampoo", price: "$18.99", rating: 4.7, category: "Grooming", vetRecommended: false, emoji: "🛁" },
  { name: "Professional Slicker Brush Set", price: "$26.99", rating: 4.8, category: "Grooming", vetRecommended: false, emoji: "🪮" },
  { name: "Nail Grinder (quiet motor)", price: "$32.99", rating: 4.6, category: "Grooming", vetRecommended: false, emoji: "✂️" },
  { name: "Ultra-Durable Rubber Kong XL", price: "$19.99", rating: 4.9, category: "Toys & Enrichment", vetRecommended: false, emoji: "🎾" },
  { name: "Snuffle Mat (mental enrichment)", price: "$28.99", rating: 4.7, category: "Toys & Enrichment", vetRecommended: false, emoji: "🧩" },
  { name: "Interactive Puzzle Feeder", price: "$22.99", rating: 4.8, category: "Toys & Enrichment", vetRecommended: false, emoji: "🧠" },
  { name: "Tactical Padded Harness (no-pull)", price: "$54.99", rating: 4.9, category: "Collars & Leashes", vetRecommended: true, emoji: "🐕" },
  { name: "Reflective Night-Safety Leash", price: "$24.99", rating: 4.6, category: "Collars & Leashes", vetRecommended: false, emoji: "🔦" },
  { name: "Personalized Leather Collar", price: "$38.99", rating: 4.8, category: "Collars & Leashes", vetRecommended: false, emoji: "📿" },
  { name: "GPS Smart Tag Tracker", price: "$79.99", rating: 4.7, category: "Collars & Leashes", vetRecommended: false, emoji: "📡" },
  { name: "Orthopedic Memory Foam Dog Bed", price: "$89.99", rating: 4.9, category: "Beds & Comfort", vetRecommended: true, emoji: "🛏️" },
  { name: "Waterproof Cooling Mat", price: "$42.99", rating: 4.7, category: "Beds & Comfort", vetRecommended: false, emoji: "❄️" },
  { name: "Collapsible Travel Water Bowl", price: "$9.99", rating: 4.5, category: "Travel Gear", vetRecommended: false, emoji: "🥣" },
  { name: "Airline-Approved Soft Carrier", price: "$69.99", rating: 4.8, category: "Travel Gear", vetRecommended: false, emoji: "✈️" },
  { name: "Car Seat Cover & Hammock", price: "$44.99", rating: 4.7, category: "Travel Gear", vetRecommended: false, emoji: "🚗" },
];

const categories = ["All", "Food & Nutrition", "Health & Supplements", "Grooming", "Toys & Enrichment", "Collars & Leashes", "Beds & Comfort", "Travel Gear"];

function ShopPage() {
  const scrollRef = useScrollFade();
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const filtered = products.filter((p) => {
    const matchCat = activeCategory === "All" || p.category === activeCategory;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const toggleFavorite = (name: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  };

  return (
    <div ref={scrollRef} className="pt-24">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <h1 className="font-display text-4xl font-bold text-foreground md:text-5xl">Pet Products Shop</h1>
        <p className="mt-3 text-muted-foreground">Vet-recommended products for happy, healthy pets</p>

        {/* Search */}
        <div className="relative mt-8 max-w-md">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-12 w-full rounded-2xl border border-border bg-card pl-12 pr-4 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Category Pills */}
        <div className="mt-6 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                activeCategory === cat
                  ? "bg-primary text-primary-foreground"
                  : "bg-card text-muted-foreground hover:bg-muted shadow-sm"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((product) => (
            <div key={product.name} className="hover-lift group rounded-3xl bg-card p-5 shadow-md">
              <div className="relative mb-4 flex h-40 items-center justify-center rounded-2xl bg-sage text-5xl">
                {product.emoji}
                {product.vetRecommended && (
                  <span className="absolute left-3 top-3 rounded-full bg-primary px-2 py-1 text-[10px] font-semibold text-primary-foreground">
                    🩺 Vet Recommended
                  </span>
                )}
                <button
                  onClick={() => toggleFavorite(product.name)}
                  className="absolute right-3 top-3 rounded-full bg-card/80 p-1.5 backdrop-blur-sm transition-colors hover:bg-card"
                >
                  <Heart className={`h-4 w-4 ${favorites.has(product.name) ? "fill-destructive text-destructive" : "text-muted-foreground"}`} />
                </button>
              </div>
              <div className="flex items-center gap-1 text-amber">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3 w-3 fill-current" />
                ))}
                <span className="ml-1 text-xs text-muted-foreground">{product.rating}</span>
              </div>
              <h3 className="mt-2 text-sm font-semibold text-foreground leading-tight">{product.name}</h3>
              <div className="mt-3 flex items-center justify-between">
                <span className="font-display text-lg font-bold text-primary">{product.price}</span>
                <Button variant="amber" size="sm">Add to Cart</Button>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-3xl">🔍</p>
            <p className="mt-4 text-muted-foreground">No products found. Try a different search or category.</p>
          </div>
        )}
      </div>
    </div>
  );
}
