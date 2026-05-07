import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useScrollFade } from "@/hooks/use-scroll-fade";
import heroServices from "@/assets/hero-services.jpg";
import { ChevronDown } from "lucide-react";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Veterinary Services — OurShepherds" },
      { name: "description", content: "Expert veterinary care with compassionate hands. Emergency care, wellness, surgery, grooming and more." },
    ],
  }),
  component: ServicesPage,
});

const services = [
  { icon: "🚨", title: "Emergency & Urgent Care", desc: "24/7 emergency line, trauma care, poison ingestion, difficulty breathing. Our emergency team is always standing by." },
  { icon: "💉", title: "Preventive Wellness", desc: "Annual exams, vaccinations (rabies, distemper, parvovirus, bordetella), flea/tick/heartworm prevention, dental cleanings." },
  { icon: "🔬", title: "Diagnostics & Imaging", desc: "In-house lab, digital X-rays, ultrasound, blood panels, urinalysis for fast and accurate diagnosis." },
  { icon: "🏥", title: "Surgery", desc: "Spay & neuter, soft tissue surgery, orthopedic procedures, tumor removal performed by board-certified surgeons." },
  { icon: "🧠", title: "Specialized Care", desc: "Dermatology (skin & allergies — especially common in Shepherds), cardiology, ophthalmology, oncology consultations." },
  { icon: "🛁", title: "Grooming & Spa", desc: "Full grooming, breed-specific cuts, de-shedding treatments, nail trims, teeth brushing, aromatherapy baths." },
  { icon: "🐕", title: "Behavioral Training Referrals", desc: "Partner trainers for anxiety, aggression, separation issues, and general obedience training programs." },
  { icon: "🏠", title: "Boarding & Daycare", desc: "Climate-controlled suites, daily exercise, webcam access for owners. Your pet's home away from home." },
];

function ServicesPage() {
  const scrollRef = useScrollFade();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div ref={scrollRef}>
      {/* Hero */}
      <section className="relative flex min-h-[50vh] items-center overflow-hidden">
        <img src={heroServices} alt="Veterinarian caring for a German Shepherd" className="absolute inset-0 h-full w-full object-cover" loading="lazy" width={1920} height={800} />
        <div className="absolute inset-0 bg-gradient-to-r from-dark-green/90 via-dark-green/70 to-dark-green/40" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-32 lg:px-8">
          <h1 className="font-display text-4xl font-bold text-dark-green-foreground md:text-6xl animate-fade-in-up">
            Expert Care,<br />Compassionate Hands
          </h1>
        </div>
      </section>

      {/* Services Accordion */}
      <section className="scroll-fade mx-auto max-w-4xl px-4 py-20 lg:px-8">
        <div className="space-y-4">
          {services.map((service, i) => (
            <div key={service.title} className="overflow-hidden rounded-3xl bg-card shadow-md transition-all">
              <button
                className="flex w-full items-center justify-between p-6 text-left"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                <div className="flex items-center gap-4">
                  <span className="text-3xl">{service.icon}</span>
                  <h3 className="font-display text-xl font-semibold text-foreground">{service.title}</h3>
                </div>
                <ChevronDown className={`h-5 w-5 text-muted-foreground transition-transform ${openIndex === i ? "rotate-180" : ""}`} />
              </button>
              {openIndex === i && (
                <div className="animate-fade-in border-t border-border px-6 pb-6 pt-4">
                  <p className="text-muted-foreground leading-relaxed">{service.desc}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="scroll-fade bg-warm-bg py-20">
        <div className="mx-auto max-w-5xl px-4 lg:px-8">
          <h2 className="mb-12 text-center font-display text-3xl font-bold">Care Plans</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { name: "Basic Wellness", price: "₦15,000", period: "/visit", features: ["Annual exam", "Core vaccinations", "Health consultation"], highlight: false },
              { name: "Comprehensive Care", price: "₦45,000", period: "/month", features: ["All Basic features", "Dental cleaning", "Lab work included", "Priority booking"], highlight: true },
              { name: "Premium VIP", price: "₦85,000", period: "/month", features: ["All Comprehensive features", "Grooming included", "20% product discount", "24/7 telehealth"], highlight: false },
            ].map((plan) => (
              <div key={plan.name} className={`hover-lift rounded-3xl p-8 shadow-md ${plan.highlight ? "bg-primary text-primary-foreground ring-4 ring-amber" : "bg-card"}`}>
                <h3 className="font-display text-xl font-semibold">{plan.name}</h3>
                <div className="mt-4">
                  <span className="font-display text-4xl font-bold">{plan.price}</span>
                  <span className={`text-sm ${plan.highlight ? "text-primary-foreground/70" : "text-muted-foreground"}`}>{plan.period}</span>
                </div>
                <ul className="mt-6 space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className={`flex items-center gap-2 text-sm ${plan.highlight ? "text-primary-foreground/90" : "text-muted-foreground"}`}>
                      <span>✓</span> {f}
                    </li>
                  ))}
                </ul>
                <Button variant={plan.highlight ? "amber" : "outline"} className="mt-8 w-full" asChild>
                  <Link to="/appointments">Get Started</Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-amber py-16 text-center">
        <div className="mx-auto max-w-2xl px-4">
          <h2 className="font-display text-3xl font-bold text-amber-foreground">Ready to Book?</h2>
          <p className="mt-3 text-amber-foreground/80">Your pet deserves the best care possible.</p>
          <Button variant="default" size="xl" className="mt-8" asChild>
            <Link to="/appointments">Book Your Visit</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
