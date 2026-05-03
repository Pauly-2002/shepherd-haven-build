import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-dark-green text-dark-green-foreground">
      <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Col 1: Brand */}
          <div>
            <div className="mb-4 flex items-center gap-2">
              <span className="text-2xl">🐾</span>
              <span className="font-display text-xl font-bold">OurShepherds</span>
            </div>
            <p className="mb-6 text-sm text-dark-green-foreground/70">
              Premium veterinary care and handpicked products for your beloved companions since 2009.
            </p>
            <div className="flex gap-3">
              {[Facebook, Instagram, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-dark-green-foreground/10 transition-colors hover:bg-amber"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h3 className="mb-4 font-display text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm text-dark-green-foreground/70">
              {[
                { label: "Home", to: "/" },
                { label: "About Us", to: "/about" },
                { label: "Services", to: "/services" },
                { label: "Shop", to: "/shop" },
                { label: "Blog", to: "/blog" },
                { label: "Contact", to: "/contact" },
              ].map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="transition-colors hover:text-amber">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Services */}
          <div>
            <h3 className="mb-4 font-display text-lg font-semibold">Our Services</h3>
            <ul className="space-y-2 text-sm text-dark-green-foreground/70">
              {["Emergency Care", "Wellness Checkups", "Surgery", "Diagnostics", "Grooming & Spa", "Boarding & Daycare"].map(
                (s) => (
                  <li key={s}>
                    <Link to="/services" className="transition-colors hover:text-amber">
                      {s}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Col 4: Contact */}
          <div>
            <h3 className="mb-4 font-display text-lg font-semibold">Contact Us</h3>
            <ul className="space-y-3 text-sm text-dark-green-foreground/70">
              <li>📍 4820 Shepherd Lane, Green Valley, TX 78701</li>
              <li>📞 (512) 555-0198</li>
              <li>🚨 Emergency: 1-800-OUR-PAWS</li>
              <li>📧 hello@ourshepherds.com</li>
              <li className="pt-2">
                <span className="font-semibold text-dark-green-foreground">Hours:</span>
                <br />Mon–Fri: 7AM–8PM
                <br />Sat: 8AM–6PM
                <br />Sun: 9AM–4PM
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-dark-green-foreground/10">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-6 text-xs text-dark-green-foreground/50 lg:px-8">
          <p>© 2025 OurShepherds. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-amber">Privacy Policy</a>
            <a href="#" className="hover:text-amber">Terms of Service</a>
            <span>AAHA Accredited ✅</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
