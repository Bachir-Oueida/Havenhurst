"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Image1 from "@/public/images/2.jpg";
import Image2 from "@/public/images/3.jpg";
import Image3 from "@/public/images/4.jpg";
import Image4 from "@/public/images/5.jpg";

const slides = [
  {
    image: Image1,
    label: "Welcome",
    title: "Quiet luxury in every detail.",
    subtitle:
      "Havenhurst pairs natural tones with calm spaces—designed to feel timeless on any screen, and effortless in real life.",
  },
  {
    image: Image2 ,
    label: "Retreat",
    title: "Where nature meets refinement.",
    subtitle:
      "Mornings with soft light, evenings with deep calm—every corner of Havenhurst is crafted for rest.",
  },
  {
    image: Image3 ,
    label: "Escape",
    title: "A place apart from the world.",
    subtitle:
      "Step into spaces designed to restore—where every detail invites you to slow down and simply be.",
  },
];

const isSlider = slides.length > 1;
const INTERVAL_MS = 5500;

export function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (!isSlider || paused) return;
    const id = setInterval(
      () => setCurrent((c) => (c + 1) % slides.length),
      INTERVAL_MS,
    );
    return () => clearInterval(id);
  }, [paused]);

  const slide = slides[current];

  return (
    <section
      className="relative min-h-[100vh] overflow-hidden border-b border-[var(--border)]"
      onMouseEnter={() => isSlider && setPaused(true)}
      onMouseLeave={() => isSlider && setPaused(false)}
    >
      {slides.map((s, i) => (
        <div
          key={i}
          aria-hidden={i !== current}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            i === current ? "opacity-100" : "opacity-0"
          }`}
          style={{
            backgroundImage: `url(${s.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-[#3f5660]/62" />
        </div>
      ))}

      <div className="relative mx-auto flex max-w-6xl flex-col gap-10 px-4 pb-24 pt-40 sm:px-6 sm:pb-32 sm:pt-44 lg:px-8 lg:pb-40 lg:pt-48">
        <div key={current} className="hero-content-in flex flex-col gap-8">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#f3f1ed]/85">
            {slide.label}
          </p>
          <h1 className="max-w-3xl font-display text-4xl font-semibold leading-tight tracking-tight text-[var(--strong-white)] sm:text-5xl lg:text-6xl">
            {slide.title}
          </h1>
          <p className="max-w-xl text-lg leading-relaxed text-[#f3f1ed]/90 sm:text-xl">
            {slide.subtitle}
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <Link
              href="#contact"
              className="inline-flex h-12 items-center justify-center border border-[#f3f1ed]/80 bg-[#f3f1ed]/10 px-8 text-sm font-semibold text-[#f3f1ed] transition hover:bg-[#f3f1ed]/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f3f1ed]"
            >
              Plan your stay
            </Link>
            <Link
              href="#about"
              className="inline-flex h-12 items-center justify-center border border-[#b7a899]/75 bg-[#b7a899]/15 px-8 text-sm font-semibold text-[#f3f1ed] transition hover:border-[#b7a899] hover:bg-[#b7a899]/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f3f1ed]"
            >
              Discover more
            </Link>
          </div>
        </div>
      </div>

      {isSlider && (
        <div
          className="relative flex items-center justify-center gap-2 pb-10"
          role="tablist"
          aria-label="Slide navigation"
        >
          {slides.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === current}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => setCurrent(i)}
              className={`h-[3px] transition-all duration-500 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f3f1ed] ${
                i === current
                  ? "w-8 bg-[#f3f1ed]"
                  : "w-4 bg-[#f3f1ed]/35 hover:bg-[#f3f1ed]/60"
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
