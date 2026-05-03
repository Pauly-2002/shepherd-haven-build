import { Link, useRouterState } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Menu, X, ShoppingCart, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Shop", to: "/shop" },
  { label: "Book Appointment", to: "/appointments" },
  { label: "Blog", to: "/blog" },
  { label: "Contact", to: "/contact" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const currentPath = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "header-glass py-2 shadow-md" : "bg-transparent py-4"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 lg:px-8">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl">🐾</span>
            <span className="font-display text-xl font-bold text-primary lg:text-2xl">
              OurShepherds
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`rounded-xl px-3 py-2 text-sm font-medium transition-colors ${
                  currentPath === link.to
                    ? "bg-primary/10 text-primary"
                    : "text-foreground/70 hover:text-primary"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2">
            <button className="relative rounded-xl p-2 text-foreground/70 transition-colors hover:text-primary">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-amber text-xs font-bold text-amber-foreground">
                0
              </span>
            </button>

            <Button variant="emergency" size="sm" className="hidden gap-1 md:inline-flex">
              <Phone className="h-4 w-4" />
              Emergency
            </Button>

            <button
              className="rounded-xl p-2 text-foreground/70 lg:hidden"
              onClick={() => setMobileOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60]">
          <div
            className="absolute inset-0 bg-foreground/30 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute right-0 top-0 h-full w-80 bg-card p-6 shadow-2xl animate-slide-in-right">
            <div className="mb-8 flex items-center justify-between">
              <span className="font-display text-xl font-bold text-primary">OurShepherds</span>
              <button onClick={() => setMobileOpen(false)}>
                <X className="h-6 w-6 text-foreground/70" />
              </button>
            </div>
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`rounded-xl px-4 py-3 text-base font-medium transition-colors ${
                    currentPath === link.to
                      ? "bg-primary/10 text-primary"
                      : "text-foreground/70 hover:bg-muted"
                  }`}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="mt-6">
              <Button variant="emergency" className="w-full gap-2">
                <Phone className="h-4 w-4" />
                1-800-OUR-PAWS
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
