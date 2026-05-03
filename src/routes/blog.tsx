import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { useScrollFade } from "@/hooks/use-scroll-fade";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog & Pet Care Tips — OurShepherds" },
      { name: "description", content: "Expert pet care tips, health advice, and training guides from our veterinary team." },
    ],
  }),
  component: BlogPage,
});

const posts = [
  { title: "10 Signs Your German Shepherd Needs a Vet Visit Now", category: "Health", time: "5 min", author: "Dr. Elena Marsh", date: "Apr 28, 2025", emoji: "🏥", excerpt: "German Shepherds are stoic dogs. Learn the subtle signs that mean it's time for a checkup." },
  { title: "The Best Diet for Large Breed Dogs in 2025", category: "Nutrition", time: "7 min", author: "Dr. James Okafor", date: "Apr 22, 2025", emoji: "🍖", excerpt: "Proper nutrition is the foundation of your large breed dog's health. Here's what science says." },
  { title: "How to Groom Your Shepherd at Home Between Salon Visits", category: "Grooming", time: "4 min", author: "Maya Torres", date: "Apr 18, 2025", emoji: "🛁", excerpt: "Keep your shepherd looking great between professional grooming sessions with these tips." },
  { title: "Hip Dysplasia in German Shepherds: Prevention & Treatment", category: "Health", time: "6 min", author: "Dr. Priya Nair", date: "Apr 12, 2025", emoji: "🦴", excerpt: "Hip dysplasia is common in shepherds. Learn how to prevent it and treatment options available." },
  { title: "Natural vs. Prescription Flea Treatments: What Works Best?", category: "Health", time: "5 min", author: "Dr. Elena Marsh", date: "Apr 5, 2025", emoji: "🐛", excerpt: "We compare natural and prescription flea treatments to help you make the best choice." },
  { title: "Socializing Your New Puppy: A Step-by-Step Guide", category: "Training", time: "8 min", author: "Maya Torres", date: "Mar 30, 2025", emoji: "🐕", excerpt: "Early socialization is crucial. Follow our step-by-step guide for a well-adjusted puppy." },
  { title: "Understanding Your Dog's Anxiety: Signs & Solutions", category: "Training", time: "6 min", author: "Dr. James Okafor", date: "Mar 24, 2025", emoji: "💭", excerpt: "Anxiety in dogs is more common than you think. Recognize the signs and learn how to help." },
  { title: "Our Top 5 Vet-Approved Supplements for Aging Dogs", category: "Products", time: "4 min", author: "Dr. Priya Nair", date: "Mar 18, 2025", emoji: "💊", excerpt: "As dogs age, supplements can make a big difference. Here are our top vet-approved picks." },
];

const blogCategories = ["All", "Health", "Nutrition", "Grooming", "Training", "Products"];

function BlogPage() {
  const scrollRef = useScrollFade();
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = posts.filter((p) => activeCategory === "All" || p.category === activeCategory);

  return (
    <div ref={scrollRef} className="pt-24">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <h1 className="font-display text-4xl font-bold text-foreground md:text-5xl">Pet Care Tips & Blog</h1>
        <p className="mt-3 text-muted-foreground">Expert advice from our veterinary team</p>

        {/* Category Filter */}
        <div className="mt-8 flex flex-wrap gap-2">
          {blogCategories.map((cat) => (
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

        {/* Blog Grid */}
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((post) => (
            <article key={post.title} className="hover-lift group overflow-hidden rounded-3xl bg-card shadow-md">
              <div className="flex h-48 items-center justify-center bg-sage text-5xl">
                {post.emoji}
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">{post.category}</span>
                  <span className="text-xs text-muted-foreground">{post.time} read</span>
                </div>
                <h2 className="mt-3 font-display text-lg font-semibold text-foreground group-hover:text-primary transition-colors leading-tight">
                  {post.title}
                </h2>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{post.excerpt}</p>
                <div className="mt-4 flex items-center justify-between">
                  <div className="text-xs text-muted-foreground">
                    <span className="font-medium text-foreground">{post.author}</span> · {post.date}
                  </div>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                    Read <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
