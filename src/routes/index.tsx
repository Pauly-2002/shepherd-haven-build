import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Star, ArrowRight, Mail } from "lucide-react";
import heroImage from "@/assets/hero-home.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "OurShepherds — Where Every Pet is Family" },
      {
        name: "description",
        content:
          "Premium veterinary care and handpicked pet products. Trusted by 5,000+ pet families.",
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  // SAFE: removed custom hook that was likely crashing the app
  const scrollRef = null;

  return (
    <div>
      {/* HERO */}
      <section className="relative flex min-h-screen items-center overflow-hidden">
        <img
          src={heroImage}
          alt="Happy dog with owner"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 py-24 lg:px-8">
          <div className="max-w-2xl text-white">
            <div className="mb-6 inline-flex rounded-full bg-white/20 px-4 py-2 text-sm">
              🐾 Trusted by 5,000+ Pet Families
            </div>

            <h1 className="text-5xl font-bold md:text-7xl">
              Where Every Pet is Family
            </h1>

            <p className="mt-6 text-lg text-white/80 md:text-xl">
              Premium veterinary care and handpicked products for your beloved companions.
            </p>

            <div className="mt-8 flex gap-4">
              <Button variant="default" size="lg" asChild>
                <Link to="/appointments">Book Appointment</Link>
              </Button>

              <Button variant="outline" size="lg" asChild>
                <Link to="/shop">Shop Products</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="mx-auto max-w-6xl px-4 -mt-10">
        <div className="grid grid-cols-2 gap-4 rounded-2xl bg-white p-6 shadow md:grid-cols-4">
          {[
            { icon: "🏥", label: "Years", value: "15+" },
            { icon: "🐾", label: "Pets", value: "5,000+" },
            { icon: "🩺", label: "Vets", value: "12" },
            { icon: "⭐", label: "Rating", value: "4.9" },
          ].map((item) => (
            <div key={item.label} className="text-center">
              <div className="text-2xl">{item.icon}</div>
              <div className="text-xl font-bold">{item.value}</div>
              <div className="text-sm text-gray-500">{item.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section className="mx-auto max-w-7xl px-4 py-20">
        <h2 className="text-center text-3xl font-bold">Our Services</h2>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            {
              icon: "🚨",
              title: "Emergency Care",
              desc: "24/7 emergency veterinary support.",
            },
            {
              icon: "💉",
              title: "Checkups",
              desc: "Routine health and vaccinations.",
            },
            {
              icon: "🛁",
              title: "Grooming",
              desc: "Professional grooming & spa care.",
            },
          ].map((s) => (
            <Link
              key={s.title}
              to="/services"
              className="rounded-2xl bg-white p-6 shadow hover:shadow-lg"
            >
              <div className="text-3xl">{s.icon}</div>
              <h3 className="mt-3 font-semibold">{s.title}</h3>
              <p className="mt-1 text-sm text-gray-500">{s.desc}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm text-blue-600">
                Learn more <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="text-center text-3xl font-bold">
            Vet Recommended Products
          </h2>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { name: "Dog Food", price: "$64.99" },
              { name: "Joint Chews", price: "$34.99" },
              { name: "Shampoo", price: "$18.99" },
              { name: "Dog Bed", price: "$89.99" },
            ].map((p) => (
              <div key={p.name} className="rounded-2xl bg-white p-5 shadow">
                <div className="h-32 bg-gray-200 rounded-xl mb-4" />
                <h3 className="font-semibold">{p.name}</h3>
                <p className="text-blue-600 font-bold">{p.price}</p>
                <Button className="mt-3 w-full">Add to Cart</Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="bg-yellow-400 py-16">
        <div className="mx-auto max-w-xl text-center px-4">
          <h2 className="text-2xl font-bold">Get Pet Tips Weekly</h2>
          <p className="mt-2 text-sm">
            Join thousands of pet parents.
          </p>

          <form
            className="mt-6 flex gap-2"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="Enter email"
              className="flex-1 rounded-xl px-4 py-3"
            />
            <Button>Subscribe</Button>
          </form>
        </div>
      </section>
    </div>
  );
}
