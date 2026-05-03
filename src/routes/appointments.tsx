import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useScrollFade } from "@/hooks/use-scroll-fade";
import { ChevronDown } from "lucide-react";

export const Route = createFileRoute("/appointments")({
  head: () => ({
    meta: [
      { title: "Book an Appointment — OurShepherds" },
      { name: "description", content: "Book your pet's visit in minutes. Easy online scheduling for all veterinary services." },
    ],
  }),
  component: AppointmentsPage,
});

function AppointmentsPage() {
  const scrollRef = useScrollFade();
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  if (submitted) {
    return (
      <div ref={scrollRef} className="flex min-h-screen items-center justify-center px-4 pt-24">
        <div className="max-w-md text-center animate-fade-in-up">
          <div className="text-6xl">🐾</div>
          <h1 className="mt-6 font-display text-3xl font-bold text-foreground">You're All Set!</h1>
          <p className="mt-4 text-muted-foreground">
            We'll send a reminder 24 hours before your appointment. See you soon!
          </p>
          <Button variant="default" className="mt-8" onClick={() => { setSubmitted(false); setStep(1); }}>
            Book Another
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div ref={scrollRef} className="pt-24">
      <div className="mx-auto max-w-3xl px-4 py-12 lg:px-8">
        <h1 className="font-display text-4xl font-bold text-foreground md:text-5xl">Book Your Pet's Visit</h1>
        <p className="mt-3 text-muted-foreground">Schedule an appointment in just a few minutes</p>

        {/* Progress Bar */}
        <div className="mt-10 flex items-center gap-2">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex flex-1 items-center gap-2">
              <div className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold transition-colors ${
                step >= s ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              }`}>
                {s}
              </div>
              <span className={`hidden text-sm font-medium sm:block ${step >= s ? "text-foreground" : "text-muted-foreground"}`}>
                {s === 1 ? "Pet Info" : s === 2 ? "Service & Vet" : "Confirm"}
              </span>
              {s < 3 && <div className={`mx-2 h-0.5 flex-1 ${step > s ? "bg-primary" : "bg-muted"}`} />}
            </div>
          ))}
        </div>

        {/* Form Steps */}
        <div className="mt-10 rounded-3xl bg-card p-8 shadow-md animate-fade-in">
          {step === 1 && (
            <div className="space-y-5">
              <h2 className="font-display text-xl font-semibold">Pet Information</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <input placeholder="Pet Name" className="h-12 rounded-2xl border border-border bg-background px-4 focus:outline-none focus:ring-2 focus:ring-primary" />
                <select className="h-12 rounded-2xl border border-border bg-background px-4 focus:outline-none focus:ring-2 focus:ring-primary">
                  <option>Dog</option><option>Cat</option><option>Rabbit</option><option>Bird</option><option>Other</option>
                </select>
                <input placeholder="Breed" className="h-12 rounded-2xl border border-border bg-background px-4 focus:outline-none focus:ring-2 focus:ring-primary" />
                <input placeholder="Age" className="h-12 rounded-2xl border border-border bg-background px-4 focus:outline-none focus:ring-2 focus:ring-primary" />
                <input placeholder="Weight (lbs)" className="h-12 rounded-2xl border border-border bg-background px-4 focus:outline-none focus:ring-2 focus:ring-primary" />
                <select className="h-12 rounded-2xl border border-border bg-background px-4 focus:outline-none focus:ring-2 focus:ring-primary">
                  <option>Male</option><option>Female</option>
                </select>
              </div>
              <Button variant="amber" size="lg" onClick={() => setStep(2)}>Continue</Button>
            </div>
          )}
          {step === 2 && (
            <div className="space-y-5">
              <h2 className="font-display text-xl font-semibold">Service & Vet</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <select className="h-12 rounded-2xl border border-border bg-background px-4 focus:outline-none focus:ring-2 focus:ring-primary">
                  <option>Select Service</option>
                  <option>Wellness Checkup</option><option>Vaccination</option><option>Surgery Consult</option>
                  <option>Dental Cleaning</option><option>Grooming</option><option>Emergency</option>
                </select>
                <select className="h-12 rounded-2xl border border-border bg-background px-4 focus:outline-none focus:ring-2 focus:ring-primary">
                  <option>Any Available Vet</option>
                  <option>Dr. Elena Marsh</option><option>Dr. James Okafor</option><option>Dr. Priya Nair</option>
                </select>
                <input type="date" className="h-12 rounded-2xl border border-border bg-background px-4 focus:outline-none focus:ring-2 focus:ring-primary" />
                <select className="h-12 rounded-2xl border border-border bg-background px-4 focus:outline-none focus:ring-2 focus:ring-primary">
                  <option>9:00 AM</option><option>10:00 AM</option><option>11:00 AM</option>
                  <option>1:00 PM</option><option>2:00 PM</option><option>3:00 PM</option><option>4:00 PM</option>
                </select>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" size="lg" onClick={() => setStep(1)}>Back</Button>
                <Button variant="amber" size="lg" onClick={() => setStep(3)}>Continue</Button>
              </div>
            </div>
          )}
          {step === 3 && (
            <div className="space-y-5">
              <h2 className="font-display text-xl font-semibold">Owner Info & Confirm</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <input placeholder="Your Name" className="h-12 rounded-2xl border border-border bg-background px-4 focus:outline-none focus:ring-2 focus:ring-primary" />
                <input placeholder="Phone" className="h-12 rounded-2xl border border-border bg-background px-4 focus:outline-none focus:ring-2 focus:ring-primary" />
                <input placeholder="Email" className="col-span-full h-12 rounded-2xl border border-border bg-background px-4 focus:outline-none focus:ring-2 focus:ring-primary sm:col-span-2" />
                <textarea placeholder="Additional notes..." className="col-span-full min-h-[100px] rounded-2xl border border-border bg-background p-4 focus:outline-none focus:ring-2 focus:ring-primary sm:col-span-2" />
              </div>
              <div className="flex gap-3">
                <Button variant="outline" size="lg" onClick={() => setStep(2)}>Back</Button>
                <Button variant="amber" size="lg" onClick={() => setSubmitted(true)}>Confirm Booking</Button>
              </div>
            </div>
          )}
        </div>

        {/* Emergency */}
        <div className="mt-10 rounded-3xl bg-destructive/10 border-2 border-destructive/20 p-8 text-center">
          <h3 className="font-display text-xl font-bold text-destructive">Need Emergency Help Now?</h3>
          <p className="mt-2 text-muted-foreground">Our emergency line is available 24/7</p>
          <a href="tel:18006877297" className="mt-4 inline-flex items-center gap-2 font-display text-2xl font-bold text-destructive">
            📞 1-800-OUR-PAWS
          </a>
        </div>

        {/* FAQs */}
        <div className="mt-16">
          <h2 className="mb-6 font-display text-2xl font-bold">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {[
              { q: "What should I bring to my first visit?", a: "Please bring any previous medical records, a list of current medications, and your pet's vaccination history." },
              { q: "Do you accept pet insurance?", a: "Yes! We accept most major pet insurance providers and can help file claims on your behalf." },
              { q: "How early should I arrive?", a: "We recommend arriving 10-15 minutes early to complete any necessary paperwork." },
              { q: "Can I stay with my pet during the exam?", a: "Absolutely! We encourage pet parents to stay during examinations to help keep their pet comfortable." },
            ].map((faq, i) => (
              <div key={i} className="rounded-2xl bg-card shadow-sm overflow-hidden">
                <button
                  className="flex w-full items-center justify-between p-5 text-left"
                  onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                >
                  <span className="font-semibold text-foreground">{faq.q}</span>
                  <ChevronDown className={`h-5 w-5 text-muted-foreground transition-transform ${faqOpen === i ? "rotate-180" : ""}`} />
                </button>
                {faqOpen === i && (
                  <div className="animate-fade-in border-t border-border px-5 pb-5 pt-3">
                    <p className="text-sm text-muted-foreground">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
