import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Star, ArrowRight, Mail } from "lucide-react";
import { useScrollFade } from "@/hooks/use-scroll-fade";
import heroImage from "@/assets/hero-home.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "OurShepherds — Where Every Pet is Family" },
      { name: "description", content: "Premium veterinary care and handpicked pet products. Trusted by 5,000+ pet families." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const scrollRef = useScrollFade();

  return (
    <div ref={scrollRef}>
      {/* Hero */}
      <section className="relative flex min-h-screen items-center overflow-hidden">
        <img
          src={heroImage}
          alt="Happy German Shepherd with owner in golden sunlight"
          className="absolute inset-0 h-full w-full object-cover"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-dark-green/90 via-dark-green/60 to-transparent" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-32 lg:px-8">
          <div className="max-w-2xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-amber/20 px-4 py-2 text-sm font-medium text-amber backdrop-blur-sm animate-fade-in">
              🐾 Trusted by 5,000+ Pet Families
            </div>
            <h1 className="font-display text-5xl font-bold leading-tight text-dark-green-foreground md:text-7xl animate-fade-in-up">
              Where Every Pet is Family
            </h1>
            <p className="mt-6 text-lg text-dark-green-foreground/80 md:text-xl animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              Premium veterinary care and handpicked products for your beloved companions.
            </p>
            <div className="mt-8 flex flex-wrap gap-4 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
              <Button variant="amber" size="xl" asChild>
                <Link to="/appointments">Book an Appointment</Link>
              </Button>
              <Button variant="outline-white" size="xl" asChild>
                <Link to="/shop">Shop Products</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="relative -mt-12 z-20 mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-2 gap-4 rounded-3xl bg-card p-6 shadow-xl md:grid-cols-4 md:p-8">
          {[
            { icon: "🏥", label: "Years of Care", value: "15+" },
            { icon: "🐾", label: "Happy Pets", value: "5,000+" },
            { icon: "🩺", label: "Expert Vets", value: "12" },
            { icon: "⭐", label: "Rating", value: "4.9/5" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl">{stat.icon}</div>
              <div className="mt-2 font-display text-2xl font-bold text-primary">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Services Preview */}
      <section className="scroll-fade mx-auto max-w-7xl px-4 py-20 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">Our Services</h2>
          <p className="mt-3 text-muted-foreground">Comprehensive care for every member of your family</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { icon: "🚨", title: "Emergency Care", desc: "24/7 emergency services for when your pet needs urgent help. Our team is always ready." },
            { icon: "💉", title: "Wellness Checkups", desc: "Preventive care, vaccinations, and regular health screenings to keep pets happy." },
            { icon: "🛁", title: "Grooming & Spa", desc: "Full grooming services, breed-specific cuts, and relaxing spa treatments." },
          ].map((service) => (
            <Link
              key={service.title}
              to="/services"
              className="hover-lift group rounded-3xl bg-card p-8 shadow-md"
            >
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-sage text-3xl">
                {service.icon}
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground">{service.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{service.desc}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors group-hover:text-amber">
                Learn More <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="scroll-fade bg-warm-bg py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mb-12 text-center">
            <p className="font-accent text-xl text-amber">Vet Recommended</p>
            <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">
              Handpicked For Your Shepherd
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { name: "ShepherdFuel Pro Kibble", price: "₦45,000", rating: 4.9 },
              { name: "Hip & Joint Chews", price: "₦25,000", rating: 4.8 },
              { name: "De-shedding Shampoo", price: "₦13,500", rating: 4.7 },
              { name: "Orthopedic Memory Bed", price: "₦65,000", rating: 4.9 },
            ].map((product) => (
              <div key={product.name} className="hover-lift rounded-3xl bg-card p-5 shadow-md">
                <div className="mb-4 flex h-40 items-center justify-center rounded-2xl bg-sage text-4xl">
                  🦴
                </div>
                <div className="flex items-center gap-1 text-amber">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-current" />
                  ))}
                  <span className="ml-1 text-xs text-muted-foreground">{product.rating}</span>
                </div>
                <h3 className="mt-2 font-semibold text-foreground">{product.name}</h3>
                <div className="mt-2 flex items-center justify-between">
                  <span className="font-display text-lg font-bold text-primary">{product.price}</span>
                  <Button variant="amber" size="sm">Add to Cart</Button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Button variant="outline" asChild>
              <Link to="/shop">View All Products <ArrowRight className="h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="scroll-fade paw-pattern bg-sage py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">
              What Pet Parents Say
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { text: "Dr. Sarah saved our shepherd Max's life. We'll never go anywhere else.", name: "Jamie L.", pet: "Max, German Shepherd" },
              { text: "The grooming team is incredible. Bella always comes home looking like a show dog!", name: "Carlos R.", pet: "Bella, Golden Retriever" },
              { text: "Their supplements have changed our senior dog's mobility completely. Highly recommend!", name: "Priya K.", pet: "Rocky, Labrador" },
            ].map((t) => (
              <div key={t.name} className="rounded-3xl bg-card p-8 shadow-md">
                <div className="mb-4 flex gap-1 text-amber">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="italic text-foreground/80">"{t.text}"</p>
                <div className="mt-6">
                  <p className="font-semibold text-foreground">{t.name}</p>
                  <p className="text-sm text-muted-foreground">{t.pet}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Preview */}
      <section className="scroll-fade mx-auto max-w-7xl px-4 py-20 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">
            Pet Care Tips & Insights
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { title: "10 Signs Your German Shepherd Needs a Vet Visit", category: "Health", time: "5 min" },
            { title: "The Best Diet for Large Breed Dogs in 2025", category: "Nutrition", time: "7 min" },
            { title: "Hip Dysplasia Prevention & Treatment Guide", category: "Health", time: "6 min" },
          ].map((post) => (
            <Link key={post.title} to="/blog" className="hover-lift group rounded-3xl bg-card shadow-md overflow-hidden">
              <div className="flex h-48 items-center justify-center bg-sage text-5xl">🐕</div>
              <div className="p-6">
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">{post.category}</span>
                  <span className="text-xs text-muted-foreground">{post.time} read</span>
                </div>
                <h3 className="mt-3 font-display text-lg font-semibold text-foreground group-hover:text-primary transition-colors">{post.title}</h3>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary">
                  Read Article <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="scroll-fade bg-amber py-16">
        <div className="mx-auto max-w-2xl px-4 text-center">
          <h2 className="font-display text-3xl font-bold text-amber-foreground">
            Get Free Pet Care Tips Weekly 🐾
          </h2>
          <p className="mt-3 text-amber-foreground/80">
            Join thousands of pet parents who receive our expert advice straight to their inbox.
          </p>
          <form className="mt-8 flex gap-3 sm:mx-auto sm:max-w-md" onSubmit={(e) => e.preventDefault()}>
            <div className="relative flex-1">
              <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <input
                type="email"
                placeholder="Enter your email"
                className="h-12 w-full rounded-2xl border-0 bg-card pl-10 pr-4 text-foreground shadow-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <Button variant="default" size="lg">Subscribe</Button>
          </form>
        </div>
      </section>
    </div>
  );
}
