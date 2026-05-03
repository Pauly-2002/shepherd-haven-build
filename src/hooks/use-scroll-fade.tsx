import { useEffect, useRef } from "react";

export function useScrollFade() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    const children = el.querySelectorAll(".scroll-fade");
    children.forEach((child) => observer.observe(child));
    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  return ref;
}
