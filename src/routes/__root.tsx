import { Outlet, Link, createRootRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div style={{ padding: 40 }}>
      <h1>404 - Page not found</h1>
      <Link to="/">Go home</Link>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootComponent() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <BackToTop />
      <MobileEmergency />
    </div>
  );
}

function BackToTop() {
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      style={{ position: "fixed", bottom: 20, right: 20 }}
    >
      ↑
    </button>
  );
}

function MobileEmergency() {
  return (
    <a
      href="tel:18006877297"
      style={{ position: "fixed", bottom: 70, right: 20 }}
    >
      🚨
    </a>
  );
}
