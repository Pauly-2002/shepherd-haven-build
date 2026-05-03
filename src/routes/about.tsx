import { createFileRoute } from "@tanstack/react-router";
import { useScrollFade } from "@/hooks/use-scroll-fade";
import heroAbout from "@/assets/hero-about.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — OurShepherds Pet Hospital" },
      { name: "description", content: "Born from a love of Shepherds, built for every pet. Meet the team behind OurShepherds." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const scrollRef = useScrollFade();

  return (
    <div ref={scrollRef}>
      {/* Hero */}
      <section className="relative flex min-h-[60vh] items-center overflow-hidden">
        <img src={heroAbout} alt="OurShepherds veterinary team" className="absolute inset-0 h-full w-full object-cover" loading="lazy" width={1920} height={800} />
        <div className="absolute inset-0 bg-gradient-to-r from-dark-green/90 via-dark-green/70 to-dark-green/40" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-32 lg:px-8">
          <h1 className="font-display text-4xl font-bold text-dark-green-foreground md:text-6xl animate-fade-in-up">
            Born From a Love of Shepherds,<br />Built for Every Pet
          </h1>
        </div>
      </section>

      {/* Our Story */}
      <section className="scroll-fade mx-auto max-w-7xl px-4 py-20 lg:px-8">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div>
            <p className="font-accent text-xl text-amber">Our Story</p>
            <h2 className="mt-2 font-display text-3xl font-bold text-foreground">A Legacy of Compassion</h2>
            <p className="mt-6 leading-relaxed text-muted-foreground">
              OurShepherds was founded in 2009 by Dr. Elena Marsh, a lifelong German Shepherd owner and veterinary surgeon. What started as a small neighborhood clinic has grown into a full-service pet hospital and product line trusted by thousands of families.
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Our name reflects our origin — a deep love for German Shepherds — but our doors and hearts are open to every pet that walks through them.
            </p>
          </div>
          <div className="rounded-3xl bg-sage p-8 text-center text-6xl">🏥</div>
        </div>
      </section>

      {/* Values */}
      <section className="scroll-fade bg-warm-bg py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h2 className="mb-12 text-center font-display text-3xl font-bold">Our Values</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: "❤️", title: "Compassion First", desc: "Every pet deserves gentle, loving care. We treat your pet like our own." },
              { icon: "🔬", title: "Science-Backed Care", desc: "Evidence-based medicine combined with the latest veterinary technologies." },
              { icon: "🌿", title: "Natural Products", desc: "Carefully curated, vet-approved products with natural ingredients." },
              { icon: "🤝", title: "Community", desc: "Building a supportive community of pet parents and animal lovers." },
            ].map((v) => (
              <div key={v.title} className="hover-lift rounded-3xl bg-card p-8 text-center shadow-md">
                <div className="mb-4 text-4xl">{v.icon}</div>
                <h3 className="font-display text-lg font-semibold">{v.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="scroll-fade mx-auto max-w-7xl px-4 py-20 lg:px-8">
        <h2 className="mb-12 text-center font-display text-3xl font-bold">Meet the Team</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { name: "Dr. Elena Marsh", title: "Founder & Head Surgeon", pet: "2 Shepherds: Apollo & Luna", emoji: "👩‍⚕️" },
            { name: "Dr. James Okafor", title: "Internal Medicine", pet: "Cat dad 🐱", emoji: "👨‍⚕️" },
            { name: "Dr. Priya Nair", title: "Dermatology & Allergies", pet: "Rabbit owner 🐰", emoji: "👩‍⚕️" },
            { name: "Nurse Maya Torres", title: "Head Nurse", pet: "Golden retriever mom 🐕", emoji: "👩‍⚕️" },
          ].map((member) => (
            <div key={member.name} className="hover-lift rounded-3xl bg-card p-6 text-center shadow-md">
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-sage text-4xl">
                {member.emoji}
              </div>
              <h3 className="font-display text-lg font-semibold">{member.name}</h3>
              <p className="text-sm text-primary">{member.title}</p>
              <p className="mt-2 text-xs text-muted-foreground">{member.pet}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Awards */}
      <section className="scroll-fade bg-primary py-12">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-8 px-4 text-center text-primary-foreground">
          {["AAHA Accredited", "Best Pet Hospital 2024", "Certified Veterinary Practice"].map((a) => (
            <div key={a} className="flex items-center gap-2 text-lg font-semibold">
              <span>✅</span> {a}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
