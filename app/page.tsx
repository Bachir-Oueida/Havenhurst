"use client";

import { useEffect, useState } from "react";
import image1 from "@/public/images/2.jpg";
import image2 from "@/public/images/3.jpg";
import image3 from "@/public/images/4.jpg";
import image4 from "@/public/images/5.jpg";
import about from "@/public/images/about.jpg";
import neighbourhood from "@/public/images/neighbourhood.jpg";

const heroImages = [
  image1,
  image2,
  image3,
  image4,
];

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

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <main className="bg-[#F5F2ED] text-[#1A1A1A]">
      <section className="relative min-h-screen overflow-hidden">
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

        <div className="relative mx-auto flex min-h-screen w-full max-w-[1280px] flex-col justify-between px-6 pb-10 pt-28 sm:px-10 lg:px-12 lg:pt-32">
          <div className="max-w-3xl">
            {/* <p className="text-xs uppercase tracking-[0.4em] text-[#F5F2ED]">RETREAT</p>
            <h1 className="font-display mt-8 text-5xl leading-[0.95] text-[#F5F2ED] sm:text-6xl lg:text-7xl">
              Where nature meets refinement.
            </h1>
            <p className="mt-8 max-w-xl text-base leading-relaxed text-[#E8E1D9] sm:text-lg">
              Mornings with soft light, evenings with deep calm — every corner of Havenhurst
              is crafted for rest.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a href="#closing" className={buttonPrimaryClass}>
                Plan your stay
              </a>
              <a href="#about" className={buttonSecondaryClass + " border-[#F5F2ED] text-[#F5F2ED] hover:bg-white/10"}>
                Discover more
              </a>
            </div> */}
          </div>

          <div className="flex items-center justify-center gap-3 pb-2">
            {heroImages.map((_, index) => (
              <span
                key={`indicator-${index}`}
                className={`h-1.5 w-8 ${
                  index === activeSlide ? "bg-[#F5F2ED]" : "bg-[#F5F2ED]/45"
                }`}
                aria-hidden="true"
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
