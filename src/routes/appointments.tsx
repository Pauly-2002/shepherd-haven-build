import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useScrollFade } from "@/hooks/use-scroll-fade";
import { ChevronDown, Check, PawPrint, Stethoscope, User, CalendarDays, Clock, FileText } from "lucide-react";

export const Route = createFileRoute("/appointments")({
  head: () => ({
    meta: [
      { title: "Book an Appointment — OurShepherds" },
      { name: "description", content: "Book your pet's visit in minutes. Easy online scheduling for all veterinary services." },
    ],
  }),
  component: AppointmentsPage,
});

interface FormData {
  petName: string;
  petType: string;
  breed: string;
  age: string;
  weight: string;
  gender: string;
  medicalHistory: string;
  allergies: string;
  isSpayedNeutered: string;
  vaccinationStatus: string;
  service: string;
  urgency: string;
  preferredVet: string;
  date: string;
  time: string;
  ownerName: string;
  phone: string;
  email: string;
  notes: string;
}

const initialForm: FormData = {
  petName: "", petType: "Dog", breed: "", age: "", weight: "", gender: "Male",
  medicalHistory: "", allergies: "", isSpayedNeutered: "No", vaccinationStatus: "Up to date",
  service: "", urgency: "Routine", preferredVet: "", date: "", time: "",
  ownerName: "", phone: "", email: "", notes: "",
};

const providers = [
  { name: "Dr. Elena Marsh", specialty: "General Wellness & Surgery", avatar: "🩺" },
  { name: "Dr. James Okafor", specialty: "Orthopedics & Emergency", avatar: "🦴" },
  { name: "Dr. Priya Nair", specialty: "Dermatology & Dental", avatar: "🦷" },
  { name: "Dr. Carlos Vega", specialty: "Exotic Animals & Avian", avatar: "🐦" },
];

const services = [
  "Wellness Checkup", "Vaccination", "Surgery Consult", "Dental Cleaning",
  "Grooming", "Emergency Care", "X-Ray & Diagnostics", "Behavioral Consult",
  "Nutritional Counseling", "Spay/Neuter Consult",
];

const timeSlots = [
  "8:00 AM", "8:30 AM", "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM",
  "11:00 AM", "11:30 AM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM",
  "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM",
];

const inputClass = "h-12 w-full rounded-2xl border border-border bg-background px-4 text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-shadow";
const labelClass = "block text-sm font-medium text-foreground mb-1.5";

function AppointmentsPage() {
  const scrollRef = useScrollFade();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormData>(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [confirmationStatus, setConfirmationStatus] = useState<"pending" | "confirmed">("pending");
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  const set = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((p) => ({ ...p, [field]: e.target.value }));

  const validateStep = (s: number): boolean => {
    const errs: Partial<Record<keyof FormData, string>> = {};
    if (s === 1) {
      if (!form.petName.trim()) errs.petName = "Pet name is required";
      if (!form.breed.trim()) errs.breed = "Breed is required";
      if (!form.age.trim()) errs.age = "Age is required";
    } else if (s === 2) {
      if (!form.service) errs.service = "Please select a service";
      if (!form.date) errs.date = "Please select a date";
      if (!form.time) errs.time = "Please select a time";
    } else if (s === 3) {
      if (!form.ownerName.trim()) errs.ownerName = "Name is required";
      if (!form.phone.trim()) errs.phone = "Phone is required";
      if (!form.email.trim()) errs.email = "Email is required";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Invalid email";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const goNext = () => { if (validateStep(step)) setStep(step + 1); };
  const goBack = () => setStep(step - 1);

  const handleSubmit = () => {
    setConfirmationStatus("pending");
    setSubmitted(true);
    setTimeout(() => setConfirmationStatus("confirmed"), 2000);
  };

  const stepLabels = [
    { label: "Pet Details", icon: PawPrint },
    { label: "Service & Provider", icon: Stethoscope },
    { label: "Owner Info", icon: User },
    { label: "Review & Confirm", icon: FileText },
  ];

  if (submitted) {
    return (
      <div ref={scrollRef} className="flex min-h-screen items-center justify-center px-4 pt-24">
        <div className="max-w-lg w-full text-center animate-fade-in-up">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            {confirmationStatus === "confirmed" ? (
              <Check className="h-10 w-10 text-primary" />
            ) : (
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            )}
          </div>
          <h1 className="mt-6 font-display text-3xl font-bold text-foreground">
            {confirmationStatus === "confirmed" ? "Booking Confirmed!" : "Processing..."}
          </h1>
          <p className="mt-3 text-muted-foreground">
            {confirmationStatus === "confirmed"
              ? "We'll send a confirmation email and a reminder 24 hours before your appointment."
              : "Please wait while we confirm your appointment..."}
          </p>

          {confirmationStatus === "confirmed" && (
            <div className="mt-8 rounded-3xl bg-card p-6 text-left shadow-md space-y-3">
              <h3 className="font-display text-lg font-semibold text-foreground border-b border-border pb-3">Appointment Summary</h3>
              <div className="grid gap-2 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Pet</span><span className="font-medium text-foreground">{form.petName} ({form.petType})</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Service</span><span className="font-medium text-foreground">{form.service}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Provider</span><span className="font-medium text-foreground">{form.preferredVet || "Any Available"}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Date & Time</span><span className="font-medium text-foreground">{form.date} at {form.time}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Status</span><span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-0.5 text-xs font-semibold text-primary"><Check className="h-3 w-3" /> Confirmed</span></div>
              </div>
            </div>
          )}

          <Button variant="default" className="mt-8" onClick={() => { setSubmitted(false); setStep(1); setForm(initialForm); }}>
            Book Another Appointment
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div ref={scrollRef} className="pt-24">
      <div className="mx-auto max-w-3xl px-4 py-12 lg:px-8">
        <h1 className="font-display text-4xl font-bold text-foreground md:text-5xl">Book Your Pet's Visit</h1>
        <p className="mt-3 text-muted-foreground">Complete the form below — it only takes a few minutes</p>

        {/* Progress Bar */}
        <div className="mt-10 flex items-center gap-1">
          {stepLabels.map((s, i) => {
            const StepIcon = s.icon;
            const num = i + 1;
            const active = step >= num;
            return (
              <div key={num} className="flex flex-1 items-center gap-1.5">
                <button
                  onClick={() => { if (num < step) setStep(num); }}
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold transition-all ${
                    active ? "bg-primary text-primary-foreground shadow-md" : "bg-muted text-muted-foreground"
                  } ${num < step ? "cursor-pointer hover:opacity-80" : "cursor-default"}`}
                >
                  {step > num ? <Check className="h-4 w-4" /> : <StepIcon className="h-4 w-4" />}
                </button>
                <span className={`hidden text-xs font-medium lg:block ${active ? "text-foreground" : "text-muted-foreground"}`}>
                  {s.label}
                </span>
                {num < 4 && <div className={`mx-1 h-0.5 flex-1 rounded transition-colors ${step > num ? "bg-primary" : "bg-muted"}`} />}
              </div>
            );
          })}
        </div>

        {/* Form Steps */}
        <div className="mt-10 rounded-3xl bg-card p-6 shadow-md animate-fade-in sm:p-8">

          {/* Step 1: Pet Details */}
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="font-display text-xl font-semibold flex items-center gap-2"><PawPrint className="h-5 w-5 text-primary" /> Pet Information</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className={labelClass}>Pet Name *</label>
                  <input value={form.petName} onChange={set("petName")} placeholder="e.g. Max" className={inputClass} />
                  {errors.petName && <p className="mt-1 text-xs text-destructive">{errors.petName}</p>}
                </div>
                <div>
                  <label className={labelClass}>Species</label>
                  <select value={form.petType} onChange={set("petType")} className={inputClass}>
                    <option>Dog</option><option>Cat</option><option>Rabbit</option><option>Bird</option><option>Reptile</option><option>Other</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Breed *</label>
                  <input value={form.breed} onChange={set("breed")} placeholder="e.g. German Shepherd" className={inputClass} />
                  {errors.breed && <p className="mt-1 text-xs text-destructive">{errors.breed}</p>}
                </div>
                <div>
                  <label className={labelClass}>Age *</label>
                  <input value={form.age} onChange={set("age")} placeholder="e.g. 3 years" className={inputClass} />
                  {errors.age && <p className="mt-1 text-xs text-destructive">{errors.age}</p>}
                </div>
                <div>
                  <label className={labelClass}>Weight (lbs)</label>
                  <input value={form.weight} onChange={set("weight")} placeholder="e.g. 65" type="number" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Gender</label>
                  <select value={form.gender} onChange={set("gender")} className={inputClass}>
                    <option>Male</option><option>Female</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Spayed/Neutered</label>
                  <select value={form.isSpayedNeutered} onChange={set("isSpayedNeutered")} className={inputClass}>
                    <option>Yes</option><option>No</option><option>Unknown</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Vaccination Status</label>
                  <select value={form.vaccinationStatus} onChange={set("vaccinationStatus")} className={inputClass}>
                    <option>Up to date</option><option>Partially vaccinated</option><option>Not vaccinated</option><option>Unknown</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className={labelClass}>Known Allergies</label>
                  <input value={form.allergies} onChange={set("allergies")} placeholder="e.g. Chicken, certain medications..." className={inputClass} />
                </div>
                <div className="sm:col-span-2">
                  <label className={labelClass}>Medical History / Current Medications</label>
                  <textarea value={form.medicalHistory} onChange={set("medicalHistory")} placeholder="Any ongoing conditions, medications, or past surgeries..." className="w-full min-h-[80px] rounded-2xl border border-border bg-background p-4 text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-shadow" />
                </div>
              </div>
              <div className="flex justify-end">
                <Button variant="amber" size="lg" onClick={goNext}>Continue to Service</Button>
              </div>
            </div>
          )}

          {/* Step 2: Service & Provider */}
          {step === 2 && (
            <div className="space-y-6">
              <h2 className="font-display text-xl font-semibold flex items-center gap-2"><Stethoscope className="h-5 w-5 text-primary" /> Service & Provider</h2>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className={labelClass}>Service Needed *</label>
                  <select value={form.service} onChange={set("service")} className={inputClass}>
                    <option value="">Select a service...</option>
                    {services.map((s) => <option key={s}>{s}</option>)}
                  </select>
                  {errors.service && <p className="mt-1 text-xs text-destructive">{errors.service}</p>}
                </div>
                <div>
                  <label className={labelClass}>Urgency</label>
                  <select value={form.urgency} onChange={set("urgency")} className={inputClass}>
                    <option>Routine</option><option>Soon (within 48h)</option><option>Urgent</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Preferred Date *</label>
                  <input type="date" value={form.date} onChange={set("date")} min={new Date().toISOString().split("T")[0]} className={inputClass} />
                  {errors.date && <p className="mt-1 text-xs text-destructive">{errors.date}</p>}
                </div>
                <div>
                  <label className={labelClass}>Preferred Time *</label>
                  <select value={form.time} onChange={set("time")} className={inputClass}>
                    <option value="">Select a time...</option>
                    {timeSlots.map((t) => <option key={t}>{t}</option>)}
                  </select>
                  {errors.time && <p className="mt-1 text-xs text-destructive">{errors.time}</p>}
                </div>
              </div>

              {/* Provider Cards */}
              <div>
                <label className={labelClass}>Preferred Provider (optional)</label>
                <div className="mt-2 grid gap-3 sm:grid-cols-2">
                  <button
                    type="button"
                    onClick={() => setForm((p) => ({ ...p, preferredVet: "" }))}
                    className={`flex items-center gap-3 rounded-2xl border-2 p-4 text-left transition-all ${
                      form.preferredVet === "" ? "border-primary bg-primary/5 shadow-md" : "border-border hover:border-primary/40"
                    }`}
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-lg">🏥</div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">Any Available</p>
                      <p className="text-xs text-muted-foreground">First available provider</p>
                    </div>
                  </button>
                  {providers.map((p) => (
                    <button
                      key={p.name}
                      type="button"
                      onClick={() => setForm((prev) => ({ ...prev, preferredVet: p.name }))}
                      className={`flex items-center gap-3 rounded-2xl border-2 p-4 text-left transition-all ${
                        form.preferredVet === p.name ? "border-primary bg-primary/5 shadow-md" : "border-border hover:border-primary/40"
                      }`}
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-lg">{p.avatar}</div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">{p.name}</p>
                        <p className="text-xs text-muted-foreground">{p.specialty}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" size="lg" onClick={goBack}>Back</Button>
                <Button variant="amber" size="lg" onClick={goNext}>Continue</Button>
              </div>
            </div>
          )}

          {/* Step 3: Owner Info */}
          {step === 3 && (
            <div className="space-y-6">
              <h2 className="font-display text-xl font-semibold flex items-center gap-2"><User className="h-5 w-5 text-primary" /> Owner Information</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className={labelClass}>Full Name *</label>
                  <input value={form.ownerName} onChange={set("ownerName")} placeholder="Your full name" className={inputClass} />
                  {errors.ownerName && <p className="mt-1 text-xs text-destructive">{errors.ownerName}</p>}
                </div>
                <div>
                  <label className={labelClass}>Phone Number *</label>
                  <input value={form.phone} onChange={set("phone")} placeholder="(555) 123-4567" type="tel" className={inputClass} />
                  {errors.phone && <p className="mt-1 text-xs text-destructive">{errors.phone}</p>}
                </div>
                <div className="sm:col-span-2">
                  <label className={labelClass}>Email Address *</label>
                  <input value={form.email} onChange={set("email")} placeholder="you@example.com" type="email" className={inputClass} />
                  {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
                </div>
                <div className="sm:col-span-2">
                  <label className={labelClass}>Additional Notes</label>
                  <textarea value={form.notes} onChange={set("notes")} placeholder="Anything else we should know — behavioral notes, special requests..." className="w-full min-h-[100px] rounded-2xl border border-border bg-background p-4 text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-shadow" />
                </div>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" size="lg" onClick={goBack}>Back</Button>
                <Button variant="amber" size="lg" onClick={goNext}>Review Booking</Button>
              </div>
            </div>
          )}

          {/* Step 4: Review & Confirm */}
          {step === 4 && (
            <div className="space-y-6">
              <h2 className="font-display text-xl font-semibold flex items-center gap-2"><FileText className="h-5 w-5 text-primary" /> Review & Confirm</h2>
              <p className="text-sm text-muted-foreground">Please review your appointment details before confirming.</p>

              <div className="space-y-4">
                {/* Pet Summary */}
                <div className="rounded-2xl border border-border p-5 space-y-2">
                  <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground"><PawPrint className="h-4 w-4 text-primary" /> Pet Details</h3>
                  <div className="grid gap-1.5 text-sm sm:grid-cols-2">
                    <div><span className="text-muted-foreground">Name:</span> <span className="font-medium">{form.petName}</span></div>
                    <div><span className="text-muted-foreground">Species:</span> <span className="font-medium">{form.petType}</span></div>
                    <div><span className="text-muted-foreground">Breed:</span> <span className="font-medium">{form.breed}</span></div>
                    <div><span className="text-muted-foreground">Age:</span> <span className="font-medium">{form.age}</span></div>
                    <div><span className="text-muted-foreground">Weight:</span> <span className="font-medium">{form.weight || "—"} lbs</span></div>
                    <div><span className="text-muted-foreground">Gender:</span> <span className="font-medium">{form.gender}</span></div>
                    {form.allergies && <div className="sm:col-span-2"><span className="text-muted-foreground">Allergies:</span> <span className="font-medium">{form.allergies}</span></div>}
                  </div>
                </div>

                {/* Service Summary */}
                <div className="rounded-2xl border border-border p-5 space-y-2">
                  <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground"><Stethoscope className="h-4 w-4 text-primary" /> Appointment</h3>
                  <div className="grid gap-1.5 text-sm sm:grid-cols-2">
                    <div><span className="text-muted-foreground">Service:</span> <span className="font-medium">{form.service}</span></div>
                    <div><span className="text-muted-foreground">Urgency:</span> <span className="font-medium">{form.urgency}</span></div>
                    <div className="flex items-center gap-1"><CalendarDays className="h-3.5 w-3.5 text-muted-foreground" /><span className="text-muted-foreground">Date:</span> <span className="font-medium">{form.date}</span></div>
                    <div className="flex items-center gap-1"><Clock className="h-3.5 w-3.5 text-muted-foreground" /><span className="text-muted-foreground">Time:</span> <span className="font-medium">{form.time}</span></div>
                    <div className="sm:col-span-2"><span className="text-muted-foreground">Provider:</span> <span className="font-medium">{form.preferredVet || "Any Available"}</span></div>
                  </div>
                </div>

                {/* Owner Summary */}
                <div className="rounded-2xl border border-border p-5 space-y-2">
                  <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground"><User className="h-4 w-4 text-primary" /> Owner</h3>
                  <div className="grid gap-1.5 text-sm sm:grid-cols-2">
                    <div><span className="text-muted-foreground">Name:</span> <span className="font-medium">{form.ownerName}</span></div>
                    <div><span className="text-muted-foreground">Phone:</span> <span className="font-medium">{form.phone}</span></div>
                    <div className="sm:col-span-2"><span className="text-muted-foreground">Email:</span> <span className="font-medium">{form.email}</span></div>
                    {form.notes && <div className="sm:col-span-2"><span className="text-muted-foreground">Notes:</span> <span className="font-medium">{form.notes}</span></div>}
                  </div>
                </div>
              </div>

              {/* Confirmation Status */}
              <div className="rounded-2xl bg-secondary/10 border border-secondary/30 p-4 flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary/20">
                  <CalendarDays className="h-4 w-4 text-secondary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Status: Pending Confirmation</p>
                  <p className="text-xs text-muted-foreground">Your appointment will be confirmed via email once submitted.</p>
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" size="lg" onClick={goBack}>Back</Button>
                <Button variant="amber" size="lg" onClick={handleSubmit}>✅ Confirm Booking</Button>
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
              { q: "What is your cancellation policy?", a: "We ask for at least 24 hours notice for cancellations. Late cancellations may incur a small fee." },
              { q: "Do you offer telehealth consultations?", a: "Yes! For follow-ups and non-emergency questions, we offer video consultations with our veterinarians." },
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
