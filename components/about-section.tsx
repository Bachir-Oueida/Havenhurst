const highlights = [
  {
    title: "Eight residences",
    body: "An intimate community with the privacy of a single-family home.",
  },
  {
    title: "Rooftop living",
    body: "A shared 360° deck with BBQ, fire pits, and lounge seating.",
  },
  {
    title: "Walkable WeHo",
    body: "Sunset, Melrose, Runyon, Beverly Hills & The Grove—minutes away.",
  },
];

export function AboutSection() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative overflow-hidden border-b border-[var(--border)] bg-[var(--strong-white)]"
    >
      {/* subtle grid texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        aria-hidden
        style={{
          backgroundImage: `linear-gradient(to right, rgba(122,133,120,0.15) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(122,133,120,0.15) 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
        <div className="lg:grid lg:grid-cols-12 lg:gap-12 xl:gap-16">
          {/* Left column — intro & headline */}
          <div className="lg:col-span-5">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#7b8578]">
              About
            </p>
            <h2
              id="about-heading"
              className="font-display mt-4 text-4xl font-semibold leading-[1.1] tracking-tight text-[#3f5660] sm:text-5xl"
            >
              Discover 1283 Havenhurst
            </h2>
            <div className="mt-8 hidden lg:block">
              <p
                className="font-display text-[clamp(6rem,12vw,11rem)] font-semibold leading-none tracking-tighter text-[#b7a899]/35 select-none"
                aria-hidden
              >
                1283
              </p>
            </div>
          </div>

          {/* Right column — body */}
          <div className="mt-12 space-y-8 lg:col-span-7 lg:mt-0">
            <p className="text-lg leading-relaxed text-[var(--moles-breath)] sm:text-xl">
              Experience contemporary West Hollywood living in an intimate
              eight-residence community tucked into one of the city&apos;s most
              storied tree-lined streets. 1283 Havenhurst delivers the privacy of
              a single-family home with the feel of a modern luxury residence
              — a rare combination in the heart of WeHo.
            </p>
            <p className="max-w-3xl text-base leading-relaxed text-[var(--moles-breath)] sm:text-lg">
              Each residence is generously scaled from roughly 1,300 to over
              2,000 square feet, with hardwood flooring, full kitchens, in-unit
              laundry, and central heat and air. Private balconies extend the
              living space outward, while a shared 360-degree rooftop deck with
              BBQ, fire pits, and lounge seating offers an unmatched vantage
              point over the Hollywood Hills, the Sunset Strip skyline, and the
              city beyond.
            </p>

            <ul className="grid gap-4 sm:grid-cols-3">
              {highlights.map((item) => (
                <li
                  key={item.title}
                  className="border border-[var(--border)] bg-[color:rgba(243,241,237,0.9)] p-5 shadow-sm shadow-[#8a847d]/10 backdrop-blur-sm"
                >
                  <p className="text-sm font-semibold text-[#3f5660]">
                    {item.title}
                  </p>
                  <p className="mt-2 text-xs leading-relaxed text-[var(--green-smoke)] sm:text-sm">
                    {item.body}
                  </p>
                </li>
              ))}
            </ul>

            <p className="max-w-3xl border-l-2 border-[#7b8578] pl-6 text-base leading-relaxed text-[var(--moles-breath)] sm:text-lg">
              Life at 1283 Havenhurst places you minutes from the iconic
              restaurants and venues of the Sunset Strip, the shops and studios
              of Melrose, the green of Runyon Canyon, and the luxury retail of
              Beverly Hills and The Grove. It&apos;s quintessential California
              living — private, walkable, refined — in one of the most coveted
              zip codes in the country.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
