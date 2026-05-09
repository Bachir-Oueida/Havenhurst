const distances: { place: string; mi: string }[] = [
  { place: "The Sunset Strip", mi: "0.2 mi" },
  { place: "Chateau Marmont", mi: "0.3 mi" },
  { place: "The Comedy Store", mi: "0.4 mi" },
  { place: "TCL Chinese Theatre / Walk of Fame", mi: "1.7 mi" },
  { place: "The Grove & Farmers Market", mi: "1.7 mi" },
  { place: "Runyon Canyon Park", mi: "2.0 mi" },
  { place: "LACMA & Academy Museum", mi: "2.3 mi" },
  { place: "Rodeo Drive / Beverly Hills", mi: "2.7 mi" },
  { place: "Paramount Studios", mi: "3.0 mi" },
  { place: "Westfield Century City", mi: "4.0 mi" },
  { place: "Griffith Observatory", mi: "6.5 mi" },
  { place: "Downtown Los Angeles", mi: "9.0 mi" },
  { place: "LAX", mi: "12.3 mi" },
];

export function NeighborhoodSection() {
  return (
    <section
      id="neighborhood"
      aria-labelledby="neighborhood-heading"
      className="relative overflow-x-clip border-b border-[var(--border)] bg-[var(--strong-white)]"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_60%_at_50%_-10%,rgba(123,133,120,0.18),transparent_55%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute right-0 top-1/2 h-[24rem] w-[24rem] -translate-y-1/2 translate-x-1/2 rounded-full border border-[#d7d1ca]/70 opacity-40 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
        <header className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#7b8578]">
            Neighborhood
          </p>
          <h2
            id="neighborhood-heading"
            className="font-display mt-4 text-4xl font-semibold tracking-tight text-[#3f5660] sm:text-5xl"
          >
            The Neighborhood
          </h2>
          <div className="mt-6 h-px w-16 bg-[#7b8578]" aria-hidden />
        </header>

        <div className="mt-14 grid gap-14 lg:grid-cols-12 lg:gap-12 lg:gap-y-0 xl:gap-16">
          <div className="lg:col-span-6 xl:col-span-7">
            <p className="text-lg leading-[1.75] text-[var(--moles-breath)] sm:text-xl">
              1283 Havenhurst sits on a quiet residential block just south of the
              Sunset Strip — walking distance to Chateau Marmont, The Comedy
              Store, and some of the most recognizable dining and nightlife in
              the country. The Grove and Original Farmers Market sit minutes
              south. Beverly Hills, Rodeo Drive, and the Westfield Century City
              shopping corridor are a short drive west. For green space, Runyon
              Canyon, Laurel Canyon, and Plummer Park are all close to home.
              Paramount Pictures and the studios of Hollywood are minutes east —
              this is the entertainment industry&apos;s front yard.
            </p>
          </div>

          <div
            id="distances"
            className="lg:col-span-6 xl:col-span-5 scroll-mt-24 lg:sticky lg:top-28 lg:self-start"
          >
            <div className="relative">
              <div
                className="absolute -inset-px rounded-[1.35rem] bg-gradient-to-br from-[#b7a899]/40 via-[#7b8578]/20 to-transparent opacity-80"
                aria-hidden
              />
              <div className="relative overflow-hidden rounded-3xl border border-[var(--border)] bg-[color:rgba(243,241,237,0.95)] shadow-[0_24px_80px_-20px_rgba(63,86,96,0.24)] backdrop-blur-sm">
                <div className="border-b border-[var(--border)] bg-gradient-to-b from-[#f3f1ed] to-[color:rgba(243,241,237,0.8)] px-7 py-6 sm:px-8">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#7b8578]">
                    Distances
                  </p>
                  <p className="mt-2 font-display text-xl font-semibold text-[#3f5660] sm:text-2xl">
                    From 1283 Havenhurst
                  </p>
                </div>

                <dl className="divide-y divide-[var(--border)] px-2 py-2 sm:px-3">
                  {distances.map((row) => (
                    <div
                      key={row.place}
                      className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 px-4 py-3.5 sm:px-5 sm:py-3"
                    >
                      <dt className="min-w-0 max-w-[calc(100%-5rem)] text-sm leading-snug text-[var(--moles-breath)]">
                        {row.place}
                      </dt>
                      <dd className="shrink-0 text-sm font-semibold tabular-nums text-[#3f5660]">
                        {row.mi}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
