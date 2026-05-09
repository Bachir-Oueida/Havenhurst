"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/availability", label: "Availability" },
  { href: "/contact", label: "Contact" },
];

type NavbarProps = {
  onOpenPopup?: () => void;
};

export function Navbar({ onOpenPopup }: NavbarProps) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 6);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const isHome = pathname === "/";
  const solidBar = !isHome || scrolled || menuOpen;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 w-full border-b transition-[background-color,backdrop-filter,border-color,color] duration-300 ${
          solidBar
            ? "border-[color:rgba(31,26,23,0.08)] bg-[color:rgba(253,251,247,0.95)] backdrop-blur-md"
            : "border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 items-center justify-between gap-4 px-5 sm:h-[4.25rem] sm:px-8 lg:max-w-7xl">
          <Link
            href="/"
            className={`text-sm font-semibold tracking-[0.32em] sm:text-base ${
              solidBar ? "text-[#1F1A17]" : "text-[#FDFBF7]"
            }`}
          >
            1283 HAVENHURST
          </Link>

          <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
            {navLinks.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative text-sm transition ${
                    solidBar
                      ? "text-[#332B25] hover:text-[#8D7A66]"
                      : "text-[#FDFBF7] hover:text-[color:rgba(253,251,247,0.82)]"
                  } ${isActive ? (solidBar ? "text-[#8D7A66]" : "text-[#FDFBF7]") : ""}`}
                >
                  {item.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-[1.5px] w-full origin-left rounded-full bg-[#8D7A66] transition-transform ${
                      isActive ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onOpenPopup}
              className={`hidden h-9 items-center justify-center border px-4 text-xs font-semibold tracking-[0.08em] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8D7A66] md:inline-flex ${
                solidBar
                  ? "border-[#8D7A66] bg-[#8D7A66] text-white hover:bg-[#7A6958]"
                  : "border-[color:rgba(253,251,247,0.86)] bg-[color:rgba(141,122,102,0.92)] text-white hover:bg-[color:rgba(122,105,88,0.96)]"
              }`}
            >
              Schedule a Visit
            </button>

            <button
              type="button"
              aria-expanded={menuOpen}
              aria-controls="nav-drawer"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen((current) => !current)}
              className={`inline-flex h-10 w-10 items-center justify-center transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8D7A66] md:hidden ${
                solidBar
                  ? "text-[#1F1A17] hover:bg-[color:rgba(141,122,102,0.14)]"
                  : "text-[#FDFBF7] hover:bg-[color:rgba(253,251,247,0.16)]"
              }`}
            >
              <span className="sr-only">Menu</span>
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
              >
                {menuOpen ? <path d="M6 18L18 6M6 6l12 12" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
              </svg>
            </button>
          </div>
        </div>
      </header>

      <div
        id="nav-drawer"
        role="dialog"
        aria-modal="true"
        aria-hidden={!menuOpen}
        className={`fixed inset-0 z-40 md:hidden ${menuOpen ? "pointer-events-auto" : "pointer-events-none"}`}
      >
        <button
          type="button"
          aria-label="Close menu"
          className={`absolute inset-0 bg-[#3f5660]/45 backdrop-blur-sm transition-opacity duration-300 ${
            menuOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setMenuOpen(false)}
        />

        <div className="absolute inset-y-0 right-0 w-full max-w-sm">
          <div
            className={`flex h-full flex-col border-l border-[color:rgba(31,26,23,0.08)] bg-[#FDFBF7] shadow-2xl transition-all duration-300 ease-out ${
              menuOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-90"
            }`}
          >
            <div className="flex items-center justify-between px-6 py-5">
              <p className="text-xs font-semibold tracking-[0.28em] text-[#1F1A17]">1283 HAVENHURST</p>
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setMenuOpen(false)}
                className="inline-flex h-9 w-9 items-center justify-center text-[#1F1A17] transition hover:bg-[color:rgba(141,122,102,0.14)]"
              >
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                >
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <nav className="flex flex-1 flex-col gap-1 px-6 pt-3" aria-label="Mobile primary">
              {navLinks.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className={`px-3 py-3 text-base transition ${
                      isActive
                        ? "bg-[color:rgba(141,122,102,0.12)] text-[#8D7A66]"
                        : "text-[#332B25] hover:bg-[color:rgba(141,122,102,0.1)]"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="border-t border-[color:rgba(31,26,23,0.08)] p-6">
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  onOpenPopup?.();
                }}
                className="h-11 w-full border border-[#8D7A66] bg-[#8D7A66] text-sm font-semibold text-white transition hover:bg-[#7A6958]"
              >
                Schedule a Visit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export function SiteHeader() {
  return <Navbar />;
}
