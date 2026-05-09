"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ScheduleVisitModal } from "../../components/schedule-visit-modal";
import { getAvailableUnitCount, UNITS } from "@/lib/units";
import mainImage from "../../public/images/6.jpg";

export default function AvailabilityPage() {
  const [scheduleOpen, setScheduleOpen] = useState(false);
  const availableUnitCount = useMemo(() => getAvailableUnitCount(), []);

  const openSchedule = () => setScheduleOpen(true);

  return (
    <main className="min-h-screen bg-[#F5F2ED] text-[#1A1A1A]">
      <section className="grid min-h-[520px] lg:min-h-[min(88vh,920px)] lg:grid-cols-2 lg:items-stretch">
        <div className="order-2 flex min-h-0 bg-[#F5F2ED] lg:order-1 lg:py-0">
          <div className="mx-auto flex w-full max-w-[640px] flex-col justify-center px-6 py-16 sm:px-10 sm:py-20 lg:border-l lg:border-[color:rgba(154,143,133,0.35)] lg:pl-14 lg:pr-12">
            <div className="flex items-center gap-3">
              <span className="h-px w-10 shrink-0 bg-[#9A8F85]" aria-hidden />
              <p className="text-xs uppercase tracking-[0.42em] text-[#9A8F85]">CURRENT AVAILABILITY</p>
            </div>
            <h1 className="font-display mt-8 text-[2.75rem] leading-[1.05] tracking-tight text-[#1A1A1A] sm:text-6xl lg:text-[3.25rem]">
              Eight boutique residences.
            </h1>
            <p className="mt-8 max-w-xl text-base font-light leading-[1.75] text-[#3F3A35] sm:text-lg">
              Browse current availability below — open any residence for full details and to schedule a private showing.
            </p>
            <div className="mt-10">
              <a
                href="#units"
                className="inline-flex h-12 min-w-[11rem] items-center justify-center rounded-none bg-[#1A1A1A] px-10 text-sm font-medium tracking-[0.1em] text-white transition hover:bg-[#1A1A1A]/92"
              >
                Browse Units
              </a>
            </div>
            <p className="mt-6 text-sm tabular-nums text-[#9A8F85]">
              {availableUnitCount} of {UNITS.length} residences currently available.
            </p>
          </div>
        </div>

        <div className="relative order-1 min-h-[420px] w-full overflow-hidden lg:order-2 lg:min-h-[min(88vh,920px)]">
          <img
            src={mainImage.src}
            alt="1283 Havenhurst exterior"
            className="absolute inset-0 h-full w-full object-cover object-center"
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent lg:bg-gradient-to-l lg:from-transparent lg:via-transparent lg:to-black/10"
            aria-hidden
          />
        </div>
      </section>

      <section id="units" className="border-t border-[color:rgba(154,143,133,0.25)] py-20">
        <div className="mx-auto w-full max-w-[1280px] px-6 sm:px-10 lg:px-12">
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {UNITS.map((unit) => {
              const isLeased = unit.status === "LEASED";
              const isAvailable = !isLeased;
              const detailHref = `/availability/${unit.unitNumber}`;

              return (
                <article
                  key={unit.unitNumber}
                  className={`flex min-h-[485px] flex-col border border-[color:rgba(154,143,133,0.55)] bg-white ${
                    isLeased ? "opacity-60" : ""
                  }`}
                >
                  <Link
                    href={detailHref}
                    className="block w-full text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1A1A1A]"
                    aria-label={`View details for unit ${unit.unitNumber}`}
                  >
                    <img
                      src={unit.photos[0] ?? "/images/6.jpg"}
                      alt={`Unit ${unit.unitNumber}`}
                      className={`h-48 w-full object-cover ${isLeased ? "opacity-50" : ""}`}
                    />
                  </Link>

                  <div className="flex flex-1 flex-col p-4">
                    <div className="flex items-center justify-between gap-3">
                      <Link href={detailHref} className="font-display text-2xl text-[#1A1A1A] hover:underline">
                        Unit {unit.unitNumber}
                      </Link>
                      <span
                        className={`rounded-none px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.12em] ${
                          isLeased
                            ? "bg-[#EAE5DF] text-[#9A8F85]"
                            : "bg-[#EAE5DF] text-[#1A1A1A]"
                        }`}
                      >
                        {unit.status}
                      </span>
                    </div>

                    {isAvailable ? (
                      <div className="mt-4 space-y-1 text-sm font-light text-[#332F2C]">
                        <p>
                          {unit.rent} · {unit.propertyDetails.bedrooms} bed · {unit.propertyDetails.bathrooms}{" "}
                          bath
                        </p>
                        <p>{unit.propertyDetails.approxSqFt} sq ft (approx.)</p>
                      </div>
                    ) : (
                      <p className="mt-4 text-sm font-light text-[#4B4742]">
                        This residence is not currently available.
                      </p>
                    )}

                    <div className="mt-auto flex flex-col gap-2 pt-4">
                      <Link
                        href={detailHref}
                        className="inline-flex h-11 w-full items-center justify-center rounded-none bg-[#1A1A1A] px-4 text-sm font-medium tracking-[0.08em] text-white transition hover:bg-[#1A1A1A]/92"
                      >
                        {isAvailable ? "View residence" : "View details"}
                      </Link>
                      {isAvailable ? (
                        <button
                          type="button"
                          onClick={openSchedule}
                          className="inline-flex h-10 w-full items-center justify-center rounded-none border border-[color:rgba(154,143,133,0.55)] px-4 text-sm font-medium tracking-[0.06em] text-[#1A1A1A] transition hover:bg-[color:rgba(154,143,133,0.08)]"
                        >
                          Inquire
                        </button>
                      ) : null}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#1A1916] py-20 text-[#F0ECE6]">
        <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-8 px-6 sm:px-10 lg:flex-row lg:items-center lg:justify-between lg:px-12">
          <div className="max-w-3xl">
            <h2 className="font-display text-4xl leading-tight sm:text-5xl">
              Don&apos;t see what you&apos;re looking for?
            </h2>
            <p className="mt-4 text-base font-light leading-relaxed text-[#D8D0C6]">
              Join the waitlist and we&apos;ll notify you the moment a residence becomes available.
            </p>
          </div>

          <button
            type="button"
            onClick={openSchedule}
            className="inline-flex h-11 w-full items-center justify-center rounded-none bg-[#F5F2ED] px-8 text-sm font-medium tracking-[0.08em] text-[#1A1A1A] transition hover:bg-[#ede7de] sm:w-auto"
          >
            Join the Waitlist
          </button>
        </div>
      </section>

      <ScheduleVisitModal isOpen={scheduleOpen} onClose={() => setScheduleOpen(false)} />
    </main>
  );
}
