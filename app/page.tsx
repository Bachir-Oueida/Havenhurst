"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import image1 from "@/public/images/2.jpg";
import image2 from "@/public/images/3.jpg";
import image3 from "@/public/images/4.jpg";
import image4 from "@/public/images/5.jpg";
import image5 from "@/public/images/6.jpg";
import image6 from "@/public/images/1.jpg";
import about from "@/public/images/about.jpg";
import neighbourhood from "@/public/images/neighbourhood.jpg";

/* ─────────────────────── Homepage Gallery ───────────────────────────────── */

const ROW_1 = [
  { src: image1.src,        alt: "Havenhurst interior" },
  { src: about.src,         alt: "1283 Havenhurst exterior" },
  { src: image3.src,        alt: "Havenhurst living space" },
  { src: image5.src,        alt: "Havenhurst residence" },
  { src: neighbourhood.src, alt: "West Hollywood neighborhood" },
];

const ROW_2 = [
  { src: image2.src,        alt: "Havenhurst kitchen" },
  { src: image4.src,        alt: "Havenhurst bedroom" },
  { src: neighbourhood.src, alt: "Sunset Strip proximity" },
  { src: image6.src,        alt: "Havenhurst building" },
  { src: about.src,         alt: "1283 Havenhurst" },
];

function GalleryLightbox({
  items,
  index,
  onClose,
  onPrev,
  onNext,
}: {
  items: { src: string; alt: string }[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const touchRef = useRef<number | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, onPrev, onNext]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95"
      onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}
      onTouchStart={(e) => { touchRef.current = e.touches[0].clientX; }}
      onTouchEnd={(e) => {
        if (touchRef.current === null) return;
        const d = e.changedTouches[0].clientX - touchRef.current;
        touchRef.current = null;
        if (Math.abs(d) < 40) return;
        d < 0 ? onNext() : onPrev();
      }}
      role="dialog"
      aria-modal="true"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center border border-white/20 bg-white/5 text-white/70 transition hover:bg-white/15 hover:text-white sm:right-6 sm:top-6"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" className="h-5 w-5">
          <path d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <button
        type="button"
        onClick={onPrev}
        aria-label="Previous"
        className="absolute left-3 top-1/2 z-10 -translate-y-1/2 flex h-11 w-11 items-center justify-center border border-white/20 bg-white/5 text-white/70 transition hover:bg-white/15 hover:text-white sm:left-6"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>

      <img
        key={index}
        src={items[index].src}
        alt={items[index].alt}
        className="max-h-[88vh] max-w-[88vw] select-none object-contain shadow-2xl"
        draggable={false}
      />

      <button
        type="button"
        onClick={onNext}
        aria-label="Next"
        className="absolute right-3 top-1/2 z-10 -translate-y-1/2 flex h-11 w-11 items-center justify-center border border-white/20 bg-white/5 text-white/70 transition hover:bg-white/15 hover:text-white sm:right-6"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>

      <p className="absolute bottom-5 left-1/2 -translate-x-1/2 text-xs uppercase tracking-[0.28em] tabular-nums text-white/40">
        {index + 1} / {items.length}
      </p>
    </div>
  );
}

function MarqueeRow({
  items,
  direction,
  paused,
  indexOffset,
  onOpen,
}: {
  items: { src: string; alt: string }[];
  direction: "left" | "right";
  paused: boolean;
  indexOffset: number;
  onOpen: (i: number) => void;
}) {
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden">
      <div
        className={`flex gap-2 will-change-transform ${
          direction === "left" ? "marquee-left" : "marquee-right"
        } ${paused ? "marquee-paused" : ""}`}
        style={{ width: "max-content" }}
      >
        {doubled.map((item, i) => (
          <button
            key={i}
            type="button"
            onClick={() => onOpen(indexOffset + (i % items.length))}
            aria-label={`View ${item.alt}`}
            className="group relative h-[200px] w-[280px] shrink-0 overflow-hidden sm:h-[260px] sm:w-[360px] lg:h-[300px] lg:w-[420px]"
          >
            <img
              src={item.src}
              alt={item.alt}
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all duration-300 group-hover:bg-black/35">
              <span className="flex h-11 w-11 scale-75 items-center justify-center border border-white/60 bg-black/20 text-white/0 opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:scale-100 group-hover:text-white/90 group-hover:opacity-100">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden>
                  <circle cx="11" cy="11" r="7" />
                  <line x1="11" y1="8" x2="11" y2="14" />
                  <line x1="8" y1="11" x2="14" y2="11" />
                  <line x1="16.5" y1="16.5" x2="21" y2="21" />
                </svg>
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

const ALL_GALLERY = [...ROW_1, ...ROW_2];

function HomeGallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);

  const open  = useCallback((i: number) => setLightboxIndex(i), []);
  const close = useCallback(() => setLightboxIndex(null), []);
  const prev  = useCallback(
    () => setLightboxIndex((i) => i !== null ? (i - 1 + ALL_GALLERY.length) % ALL_GALLERY.length : null),
    [],
  );
  const next  = useCallback(
    () => setLightboxIndex((i) => i !== null ? (i + 1) % ALL_GALLERY.length : null),
    [],
  );

  return (
    <section
      className="overflow-hidden bg-[#1A1916] py-16 lg:py-20"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="mx-auto mb-10 w-full max-w-[1280px] px-6 sm:px-10 lg:px-12">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.42em] text-[color:rgba(240,236,230,0.45)]">A LOOK INSIDE</p>
            <h2 className="font-display mt-3 text-3xl leading-tight text-[#F0ECE6] sm:text-4xl">
              The building, in detail.
            </h2>
          </div>
          <p className="hidden text-sm font-light text-[color:rgba(240,236,230,0.4)] sm:block">
            Hover to pause · click to expand
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <MarqueeRow items={ROW_1} direction="left"  paused={paused} indexOffset={0}           onOpen={open} />
        <MarqueeRow items={ROW_2} direction="right" paused={paused} indexOffset={ROW_1.length} onOpen={open} />
      </div>

      {lightboxIndex !== null && (
        <GalleryLightbox
          items={ALL_GALLERY}
          index={lightboxIndex}
          onClose={close}
          onPrev={prev}
          onNext={next}
        />
      )}
    </section>
  );
}

const heroImages = [
  image1,
  image2,
  image3,
  image4,
];

const HERO_INTERVAL_MS = 5000;
const SWIPE_THRESHOLD = 40;

const featureGroups = [
  {
    label: "IN-RESIDENCE",
    items: [
      "Hardwood flooring",
      "Full kitchens",
      "In-unit laundry",
      "Central heat & air",
      "Soundproof windows",
      "Private balconies",
      "Generous layouts",
    ],
  },
  {
    label: "BUILDING AMENITIES",
    items: [
      "360° rooftop deck",
      "BBQ & fire pit lounge",
      "Landscaped courtyard",
      "Secured gated parking",
      "On-site private storage",
      "Intercom building access",
    ],
  },
  {
    label: "LOCATION",
    items: [
      "Walkable West Hollywood block",
      "Minutes to the Sunset Strip",
      "Minutes to The Grove",
      "10 minutes to Beverly Hills",
      "Minutes to Runyon Canyon",
    ],
  },
  {
    label: "LEASING",
    items: [
      "Flexible lease terms",
      "Showings by appointment",
      "Two & three bedroom homes",
      "1,300 – 2,040 sq ft",
      "Professional on-site management",
    ],
  },
];

const distances = [
  ["The Sunset Strip", "0.2 mi"],
  ["Chateau Marmont", "0.3 mi"],
  ["The Comedy Store", "0.4 mi"],
  ["TCL Chinese Theatre / Walk of Fame", "1.7 mi"],
  ["The Grove & Farmers Market", "1.7 mi"],
  ["Runyon Canyon Park", "2.0 mi"],
  ["LACMA & Academy Museum", "2.3 mi"],
  ["Rodeo Drive / Beverly Hills", "2.7 mi"],
  ["Paramount Studios", "3.0 mi"],
  ["Westfield Century City", "4.0 mi"],
  ["Griffith Observatory", "6.5 mi"],
  ["Downtown Los Angeles", "9.0 mi"],
  ["LAX", "12.3 mi"],
];

const buttonPrimaryClass =
  "inline-flex items-center justify-center rounded-none bg-[#1A1A1A] px-8 py-3 text-sm font-medium tracking-[0.08em] text-white transition hover:bg-[#1A1A1A]/90";

const buttonSecondaryClass =
  "inline-flex items-center justify-center rounded-none border border-[#1A1A1A] bg-transparent px-8 py-3 text-sm font-medium tracking-[0.08em] text-[#1A1A1A] transition hover:bg-[#1A1A1A]/5";

export default function Home() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const prev = useCallback(() => {
    setActiveSlide((c) => (c - 1 + heroImages.length) % heroImages.length);
    setPaused(true);
  }, []);

  const next = useCallback(() => {
    setActiveSlide((c) => (c + 1) % heroImages.length);
    setPaused(true);
  }, []);

  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroImages.length);
    }, HERO_INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [paused]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(delta) < SWIPE_THRESHOLD) return;
    delta < 0 ? next() : prev();
  };

  return (
    <main className="bg-[#F5F2ED] text-[#1A1A1A]">
      <section
        className="relative min-h-screen overflow-hidden"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="absolute inset-0">
          {heroImages.map((image, index) => (
            <img
              key={index}
              src={image.src}
              alt={`Havenhurst hero slide ${index + 1}`}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
                index === activeSlide ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
          <div className="absolute inset-0 bg-black/35" />
        </div>

        {/* Prev arrow */}
        <button
          type="button"
          onClick={prev}
          aria-label="Previous slide"
          className="absolute left-4 top-1/2 z-10 -translate-y-1/2 flex h-10 w-10 items-center justify-center border border-[#F5F2ED]/30 bg-black/20 text-[#F5F2ED] transition hover:bg-black/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F5F2ED] sm:left-6 sm:h-11 sm:w-11"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        {/* Next arrow */}
        <button
          type="button"
          onClick={next}
          aria-label="Next slide"
          className="absolute right-4 top-1/2 z-10 -translate-y-1/2 flex h-10 w-10 items-center justify-center border border-[#F5F2ED]/30 bg-black/20 text-[#F5F2ED] transition hover:bg-black/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F5F2ED] sm:right-6 sm:h-11 sm:w-11"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>

        <div className="relative mx-auto flex min-h-screen w-full max-w-[1280px] flex-col justify-between px-6 pb-10 pt-28 sm:px-10 lg:px-12 lg:pt-32">
          <div className="max-w-3xl" />

          <div className="flex items-center justify-center gap-3 pb-2" role="tablist" aria-label="Slide navigation">
            {heroImages.map((_, index) => (
              <button
                key={`indicator-${index}`}
                type="button"
                role="tab"
                aria-selected={index === activeSlide}
                aria-label={`Go to slide ${index + 1}`}
                onClick={() => { setActiveSlide(index); setPaused(true); }}
                className={`h-1.5 w-8 transition-opacity focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F5F2ED] ${
                  index === activeSlide ? "bg-[#F5F2ED]" : "bg-[#F5F2ED]/45 hover:bg-[#F5F2ED]/70"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="border-t border-[color:rgba(154,143,133,0.22)] bg-[#F5F2ED] py-24 lg:py-32">
        <div className="mx-auto w-full max-w-[1280px] px-6 sm:px-10 lg:px-12">
          <div className="grid gap-14 lg:grid-cols-2 lg:items-stretch">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-[#9A8F85]">ABOUT</p>
              <h2 className="font-display mt-6 text-4xl leading-tight sm:text-5xl">
                Discover 1283 Havenhurst
              </h2>
              <p className="mt-8 max-w-xl text-base leading-relaxed text-[#3B3733] sm:text-lg">
                Experience contemporary West Hollywood living in an intimate eight-residence
                community tucked into one of the city&apos;s most storied tree-lined streets.
                1283 Havenhurst delivers the privacy of a single-family home with the feel of a
                modern luxury residence — a rare combination in the heart of WeHo. Each residence
                is generously scaled from roughly 1,300 to over 2,000 square feet, with hardwood
                flooring, full kitchens, in-unit laundry, and central heat and air. Private
                balconies extend the living space outward, while a shared 360-degree rooftop deck
                with BBQ, fire pits, and lounge seating offers an unmatched vantage point over the
                Hollywood Hills, the Sunset Strip skyline, and the city beyond.
              </p>
            </div>

            <div className="min-h-[360px] lg:min-h-[540px]">
              <img
                src={about.src}
                alt="1283 Havenhurst exterior"
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          <div className="mt-14 border-t border-[color:rgba(154,143,133,0.3)] pt-8">
            <div className="grid gap-8 text-center sm:grid-cols-3 sm:text-left">
              <div>
                <h3 className="font-display text-2xl">Eight residences</h3>
                <p className="mt-2 text-sm text-[#9A8F85]">Intimate scale with curated privacy.</p>
              </div>
              <div>
                <h3 className="font-display text-2xl">Rooftop living</h3>
                <p className="mt-2 text-sm text-[#9A8F85]">Panoramic views and evening lounge spaces.</p>
              </div>
              <div>
                <h3 className="font-display text-2xl">Walkable WeHo</h3>
                <p className="mt-2 text-sm text-[#9A8F85]">Steps from the Strip and neighborhood icons.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="bg-[#111111] py-24 text-[#F5F2ED] lg:py-32">
        <div className="mx-auto w-full max-w-[1280px] px-6 sm:px-10 lg:px-12">
          <div className="grid gap-14 sm:grid-cols-2">
            {featureGroups.map((group) => (
              <div key={group.label}>
                <p className="text-xs uppercase tracking-[0.38em] text-[#C7BBB0]">{group.label}</p>
                <div className="mt-5 h-px w-full bg-[color:rgba(245,242,237,0.25)]" />
                <ul className="mt-6 space-y-2 text-sm leading-relaxed text-[#EEE7DF] sm:text-base">
                  {group.items.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Homepage Gallery ── */}
      <HomeGallery />

      <section id="neighborhood" className="border-t border-[color:rgba(154,143,133,0.22)] bg-[#F5F2ED] py-24 lg:py-32">
        <div className="mx-auto w-full max-w-[1280px] px-6 sm:px-10 lg:px-12">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-xs uppercase tracking-[0.4em] text-[#9A8F85]">NEIGHBORHOOD</p>
            <h2 className="font-display mt-6 text-4xl leading-tight sm:text-5xl">The Neighborhood</h2>
            <p className="mt-7 text-base leading-relaxed text-[#3B3733] sm:text-lg">
              1283 Havenhurst sits on a quiet residential block just south of the Sunset Strip —
              walking distance to Chateau Marmont, The Comedy Store, and some of the most
              recognizable dining and nightlife in the country. The Grove and Original Farmers
              Market sit minutes south. Beverly Hills, Rodeo Drive, and the Westfield Century City
              shopping corridor are a short drive west. For green space, Runyon Canyon, Laurel
              Canyon, and Plummer Park are all close to home. Paramount Pictures and the studios of
              Hollywood are minutes east — this is the entertainment industry&apos;s front yard.
            </p>
          </div>

          <div className="mt-14 grid gap-12 lg:grid-cols-2 lg:items-start">
            <img
              src={neighbourhood.src}
              alt="Neighborhood near 1283 Havenhurst"
              className="h-full min-h-[360px] w-full object-cover lg:min-h-[620px]"
            />

            <div className="pt-1">
              <ul className="space-y-3">
                {distances.map(([destination, distance]) => (
                  <li
                    key={destination}
                    className="border-b border-[color:rgba(154,143,133,0.28)] pb-3"
                  >
                    <div className="flex items-baseline gap-3 text-sm sm:text-base">
                      <span className="shrink-0 text-[#1A1A1A]">{destination}</span>
                      <span className="h-px flex-1 border-b border-dashed border-[color:rgba(154,143,133,0.55)]" />
                      <span className="shrink-0 text-[#9A8F85]">{distance}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="closing" className="border-t border-[color:rgba(245,242,237,0.2)] bg-[#111111] py-24 text-[#F5F2ED] lg:py-32">
        <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-12 px-6 sm:px-10 lg:flex-row lg:items-center lg:justify-between lg:px-12">
          <div className="max-w-3xl">
            <h2 className="font-display text-4xl leading-tight sm:text-5xl">
              1283 Havenhurst Drive · West Hollywood, CA 90046
            </h2>
            <p className="mt-5 text-base leading-relaxed text-[#E2D9D0] sm:text-lg">
              A modern hideaway in a legendary neighborhood. Schedule a private tour or check
              current availability.
            </p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row lg:flex-col">
            <a href="/contact" className={buttonPrimaryClass}>
              Schedule a Visit
            </a>
            <a
              href="/availability"
              className={buttonSecondaryClass + " border-[#F5F2ED] text-[#F5F2ED] hover:bg-white/10"}
            >
              View Availability
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
