import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { useScrollFade } from "@/hooks/use-scroll-fade";
import { Facebook, Instagram, Youtube, MapPin, Phone, Mail, Clock } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — OurShepherds" },
      { name: "description", content: "Get in touch with OurShepherds. Visit us, call, or send a message." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const scrollRef = useScrollFade();

  return (
    <div ref={scrollRef} className="pt-24">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <h1 className="font-display text-4xl font-bold text-foreground md:text-5xl">Contact Us</h1>
        <p className="mt-3 text-muted-foreground">We'd love to hear from you</p>

        <div className="mt-12 grid gap-10 lg:grid-cols-5">
          {/* Form */}
          <div className="lg:col-span-3">
            <form className="rounded-3xl bg-card p-8 shadow-md" onSubmit={(e) => e.preventDefault()}>
              <h2 className="mb-6 font-display text-xl font-semibold">Send a Message</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <input placeholder="Name" className="h-12 rounded-2xl border border-border bg-background px-4 focus:outline-none focus:ring-2 focus:ring-primary" />
                <input placeholder="Email" type="email" className="h-12 rounded-2xl border border-border bg-background px-4 focus:outline-none focus:ring-2 focus:ring-primary" />
                <input placeholder="Phone" className="h-12 rounded-2xl border border-border bg-background px-4 focus:outline-none focus:ring-2 focus:ring-primary" />
                <select className="h-12 rounded-2xl border border-border bg-background px-4 focus:outline-none focus:ring-2 focus:ring-primary">
                  <option>General Inquiry</option>
                  <option>Appointment</option>
                  <option>Product Question</option>
                  <option>Emergency</option>
                  <option>Feedback</option>
                </select>
                <textarea placeholder="Your message..." className="col-span-full min-h-[150px] rounded-2xl border border-border bg-background p-4 focus:outline-none focus:ring-2 focus:ring-primary sm:col-span-2" />
              </div>
              <Button variant="amber" size="lg" className="mt-6">Send Message</Button>
            </form>
          </div>

          {/* Info Panel */}
          <div className="lg:col-span-2">
            <div className="rounded-3xl bg-primary p-8 text-primary-foreground shadow-md">
              <h2 className="font-display text-xl font-semibold">Get in Touch</h2>
              <div className="mt-6 space-y-5">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-amber" />
                  <p className="text-sm">Agagu Road, Off Ilesha Garage, Akure</p>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-5 w-5 shrink-0 text-amber" />
                  <div className="text-sm">
                    <p>Main: +234 803 000 0000</p>
                    <p className="mt-1 font-semibold text-amber">Emergency: +234 800 OUR PAWS (24/7)</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-5 w-5 shrink-0 text-amber" />
                  <p className="text-sm">hello@ourshepherds.com</p>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="mt-0.5 h-5 w-5 shrink-0 text-amber" />
                  <div className="text-sm">
                    <p>Mon–Fri: 7AM–8PM</p>
                    <p>Saturday: 8AM–6PM</p>
                    <p>Sunday: 9AM–4PM</p>
                    <p className="mt-1 font-semibold text-amber">Emergency: 24/7</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 border-t border-primary-foreground/20 pt-6">
                <p className="mb-3 text-sm font-semibold">Follow Us</p>
                <div className="flex gap-3">
                  {[Facebook, Instagram, Youtube].map((Icon, i) => (
                    <a key={i} href="#" className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-foreground/10 transition-colors hover:bg-amber">
                      <Icon className="h-5 w-5" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="mt-6 flex h-48 items-center justify-center rounded-3xl bg-sage text-center shadow-md">
              <div>
                <MapPin className="mx-auto h-8 w-8 text-primary" />
                <p className="mt-2 text-sm text-muted-foreground">Map placeholder</p>
                <p className="text-xs text-muted-foreground">Agagu Road, Off Ilesha Garage, Akure</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
