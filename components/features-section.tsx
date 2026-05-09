import type { ReactNode } from "react";

const groups: {
  title: string;
  icon: ReactNode;
  items: string[];
}[] = [
  {
    title: "IN-RESIDENCE",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
        <path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1v-9.5Z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
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
    title: "BUILDING AMENITIES",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
        <path d="M6 22V9l6-5 6 5v13" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M10 22v-6h4v6M2 22h20" strokeLinecap="round" />
      </svg>
    ),
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
    title: "LOCATION",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
        <path d="M12 21s7-4.35 7-10a7 7 0 1 0-14 0c0 5.65 7 10 7 10Z" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="12" cy="11" r="2.25" />
      </svg>
    ),
    items: [
      "Walkable West Hollywood block",
      "Minutes to the Sunset Strip",
      "Minutes to The Grove",
      "10 minutes to Beverly Hills",
      "Minutes to Runyon Canyon",
    ],
  },
  {
    title: "LEASING",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
        <path d="M9 3h6v2H9V3ZM7 7h10v14H7V7Z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 11h6M9 15h4" strokeLinecap="round" />
      </svg>
    ),
    items: [
      "Flexible lease terms",
      "Showings by appointment",
      "Two & three bedroom homes",
      "1,300 – 2,040 sq ft",
      "Professional on-site management",
    ],
  },
];

export function FeaturesSection() {
  return (
    <section
      id="features"
      aria-labelledby="features-heading"
      className="border-b border-[var(--border)] bg-[var(--strong-white)] py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2
          id="features-heading"
          className="font-display text-3xl font-semibold tracking-tight text-[#3f5660] sm:text-4xl"
        >
          Features
        </h2>

        <div className="mt-10 grid gap-10 sm:gap-8 md:grid-cols-2 xl:grid-cols-4 xl:gap-6">
          {groups.map((group) => (
            <div
              key={group.title}
              className="flex flex-col border border-[#d7d1ca] bg-[var(--strong-white)] p-6 shadow-sm shadow-[#8a847d]/10"
            >
              <span className="inline-flex h-12 w-12 items-center justify-center border border-[var(--border)] bg-[var(--strong-white)] text-[#3f5660] shadow-sm">
                {group.icon}
              </span>
              <h3 className="mt-4 text-[11px] font-semibold uppercase leading-snug tracking-[0.2em] text-[#7b8578]">
                {group.title}
              </h3>
              <ul className="mt-6 space-y-2.5 border-t border-[#d7d1ca] pt-6" role="list">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-sm leading-snug text-[var(--moles-breath)]"
                  >
                    <span
                      className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#7b8578]"
                      aria-hidden
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
