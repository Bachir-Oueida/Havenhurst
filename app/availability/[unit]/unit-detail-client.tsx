"use client";

import Link from "next/link";
import { useState } from "react";
import { ScheduleVisitModal } from "@/components/schedule-visit-modal";
import type { LeaseInfo, Unit } from "@/lib/units";

const LEASE_FIELD_LABELS: Record<keyof LeaseInfo, string> = {
  listPrice: "List price",
  origListPrice: "Original list price",
  listDate: "List date",
  statusDate: "Status date",
  forSale: "For sale",
  leaseOption: "Lease option",
  sellerConcessions: "Seller concessions",
  buildingType: "Building type",
  style: "Style",
  furnished: "Furnished",
  mlsNumber: "MLS number",
  apn: "APN",
  lotSize: "Lot size",
  listPricePerSqFt: "List price / sq ft",
  strOrCondoOrADU: "STR / condo / ADU",
  tenantPays: "Tenant pays",
  petsAllowed: "Pets allowed",
};

const LEASE_INFO_ORDER: (keyof LeaseInfo)[] = [
  "listPrice",
  "origListPrice",
  "listDate",
  "statusDate",
  "forSale",
  "leaseOption",
  "sellerConcessions",
  "buildingType",
  "style",
  "furnished",
  "mlsNumber",
  "apn",
  "lotSize",
  "listPricePerSqFt",
  "strOrCondoOrADU",
  "tenantPays",
  "petsAllowed",
];

function LeaseInfoBlock({ info }: { info: LeaseInfo }) {
  const hasAny = LEASE_INFO_ORDER.some((key) => {
    const v = info[key];
    return v != null && String(v).trim() !== "";
  });
  if (!hasAny) {
    return null;
  }

  return (
    <div className="mt-14 border-t border-white/10 pt-14">
      <h3 className="text-xs uppercase tracking-[0.26em] text-[#B8AEA4]">Listing information</h3>
      <dl className="mt-5">
        {LEASE_INFO_ORDER.map((key) => {
          const value = info[key];
          if (value == null || String(value).trim() === "") {
            return null;
          }
          return (
            <SpecRow key={key} theme="dark" label={LEASE_FIELD_LABELS[key]} value={String(value)} />
          );
        })}
      </dl>
    </div>
  );
}

function SpecRow({ label, value, theme = "light" }: { label: string; value: string; theme?: "light" | "dark" }) {
  const isDark = theme === "dark";
  return (
    <div
      className={`border-b py-3 sm:grid sm:grid-cols-[minmax(0,11rem)_1fr] sm:gap-8 ${
        isDark ? "border-white/10" : "border-[color:rgba(154,143,133,0.22)]"
      }`}
    >
      <dt
        className={`text-xs uppercase tracking-[0.18em] ${isDark ? "text-[#B8AEA4]" : "text-[#9A8F85]"}`}
      >
        {label}
      </dt>
      <dd className={`mt-1 text-sm leading-relaxed sm:mt-0 ${isDark ? "text-[#F5F2ED]" : "text-[#1A1A1A]"}`}>
        {value}
      </dd>
    </div>
  );
}

function LeaseStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0">
      <p className="text-[11px] uppercase tracking-[0.28em] text-[#B8AEA4]">{label}</p>
      <p className="font-display mt-3 break-words text-2xl leading-tight text-white sm:text-[1.65rem]">{value}</p>
    </div>
  );
}

export function UnitDetailClient({ unit }: { unit: Unit }) {
  const [scheduleOpen, setScheduleOpen] = useState(false);
  const isAvailable = unit.status === "AVAILABLE";
  const d = unit.propertyDetails;

  return (
    <main className="min-h-screen bg-[#F5F2ED] text-[#1A1A1A]">
      <div className="border-b border-[color:rgba(154,143,133,0.25)] bg-[#F5F2ED]">
        <div className="mx-auto flex w-full max-w-[1280px] items-center justify-between gap-4 px-6 py-4 sm:px-10 lg:px-12">
          <Link
            href="/availability#units"
            className="inline-flex items-center gap-2 text-sm font-medium tracking-[0.06em] text-[#3F3A35] transition hover:text-[#1A1A1A]"
          >
            <span aria-hidden className="text-lg leading-none">
              ←
            </span>
            Availability
          </Link>
          {isAvailable ? (
            <button
              type="button"
              onClick={() => setScheduleOpen(true)}
              className="inline-flex h-11 shrink-0 items-center justify-center rounded-none bg-[#1A1A1A] px-6 text-sm font-medium tracking-[0.08em] text-white transition hover:bg-[#1A1A1A]/92"
            >
              Schedule a Showing
            </button>
          ) : null}
        </div>
      </div>

      <section className="relative min-h-[280px] w-full overflow-hidden sm:min-h-[360px] lg:min-h-[min(52vh,560px)]">
        <img
          src={unit.photos[0] ?? "/images/6.jpg"}
          alt={`Unit ${unit.unitNumber}`}
          className="absolute inset-0 h-full w-full object-cover object-center"
          sizes="100vw"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent"
          aria-hidden
        />
        <div className="relative mx-auto flex h-full min-h-[inherit] w-full max-w-[1280px] flex-col justify-end px-6 pb-10 pt-24 sm:px-10 sm:pb-12 lg:px-12">
          <p className="text-xs uppercase tracking-[0.42em] text-white/85">1283 Havenhurst</p>
          <h1 className="font-display mt-3 text-4xl leading-tight text-white sm:text-5xl lg:text-6xl">
            Unit {unit.unitNumber}
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <span
              className={`rounded-none px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.14em] ${
                isAvailable ? "bg-[#F5F2ED] text-[#1A1A1A]" : "bg-white/20 text-white"
              }`}
            >
              {unit.status === "AVAILABLE" ? "Active" : "Leased"}
            </span>
            {isAvailable && unit.rent ? (
              <span className="text-lg font-light tabular-nums text-white sm:text-xl">{unit.rent}</span>
            ) : null}
          </div>
        </div>
      </section>

      <div className="mx-auto w-full max-w-[1280px] px-6 py-12 sm:px-10 lg:px-12 lg:py-16">
        {!isAvailable ? (
          <div className="max-w-2xl border border-[color:rgba(154,143,133,0.45)] bg-white p-8">
            <p className="font-display text-2xl text-[#1A1A1A]">This residence is not currently available.</p>
            <p className="mt-4 text-base font-light leading-relaxed text-[#3F3A35]">
              Explore other homes at 1283 Havenhurst or join the waitlist to be notified when something opens.
            </p>
            <Link
              href="/availability#units"
              className="mt-8 inline-flex h-11 items-center justify-center rounded-none border border-[color:rgba(154,143,133,0.55)] bg-transparent px-8 text-sm font-medium tracking-[0.08em] text-[#1A1A1A] transition hover:bg-[color:rgba(154,143,133,0.08)]"
            >
              View availability
            </Link>
          </div>
        ) : (
          <>
            {unit.description ? (
              <p className="mx-auto max-w-3xl text-center text-base font-light leading-[1.85] text-[#3F3A35] sm:text-lg">
                {unit.description}
              </p>
            ) : null}

            <div className="relative left-1/2 right-1/2 mt-12 -ml-[50vw] -mr-[50vw] w-screen overflow-x-auto pb-1 [-webkit-overflow-scrolling:touch]">
              <div className="flex w-max gap-3 px-6 sm:gap-4 sm:px-10 lg:px-12">
                {unit.photos.map((photo, index) => (
                  <img
                    key={`${photo}-${index}`}
                    src={photo}
                    alt={`Unit ${unit.unitNumber} — photo ${index + 1}`}
                    className="h-52 w-[min(85vw,22rem)] shrink-0 object-cover sm:h-60 sm:w-[24rem]"
                  />
                ))}
              </div>
            </div>

            {/* Full-bleed dark band: lease + property specs (no cramped sidebar beside gallery) */}
            <section className="relative left-1/2 right-1/2 mt-14 -ml-[50vw] -mr-[50vw] w-screen bg-[#1A1A1A] px-6 py-14 text-[#F5F2ED] sm:px-10 sm:py-16 lg:px-12 lg:py-20">
              <div className="mx-auto max-w-[1280px]">
                <div className="border-b border-white/10 pb-12">
                  <p className="text-xs uppercase tracking-[0.32em] text-[#B8AEA4]">Lease snapshot</p>
                  <div className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
                    <LeaseStat label="Rent" value={unit.rent ?? "—"} />
                    <LeaseStat label="Security deposit" value={unit.securityDeposit ?? "—"} />
                    <LeaseStat label="Lease term" value={d.leaseTermMin} />
                    <LeaseStat label="Available starting" value={d.availableStarting} />
                  </div>
                </div>

                <div className="pt-14">
                  <h2 className="font-display text-3xl tracking-tight text-white sm:text-4xl">Property details</h2>
                  <p className="mt-3 text-sm leading-relaxed text-[#B8AEA4]">
                    {d.addressLine}, {d.cityStateZip}
                  </p>

                  <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:gap-16">
                    <div>
                      <h3 className="text-xs uppercase tracking-[0.26em] text-[#B8AEA4]">General</h3>
                      <dl className="mt-5">
                        <SpecRow theme="dark" label="Year built" value={d.yearBuilt} />
                        <SpecRow theme="dark" label="Stories" value={d.stories} />
                        <SpecRow theme="dark" label="Bedrooms" value={d.bedrooms} />
                        <SpecRow theme="dark" label="Bathrooms" value={d.bathrooms} />
                        <SpecRow theme="dark" label="Approx. sq ft" value={d.approxSqFt} />
                        <SpecRow theme="dark" label="Fireplace" value={d.fireplace} />
                        <SpecRow theme="dark" label="Parking" value={d.parking} />
                        <SpecRow theme="dark" label="View" value={d.view} />
                        {d.amenities ? (
                          <SpecRow theme="dark" label="Community amenities" value={d.amenities} />
                        ) : null}
                      </dl>
                    </div>
                    <div>
                      <h3 className="text-xs uppercase tracking-[0.26em] text-[#B8AEA4]">Interior</h3>
                      <dl className="mt-5">
                        <SpecRow theme="dark" label="Cooling & heating" value={d.coolingHeating} />
                        <SpecRow theme="dark" label="Laundry" value={d.laundry} />
                        <SpecRow theme="dark" label="Appliances" value={d.appliances.join(", ")} />
                      </dl>
                      <h3 className="mt-10 text-xs uppercase tracking-[0.26em] text-[#B8AEA4]">Exterior</h3>
                      <dl className="mt-5">
                        {d.patio ? <SpecRow theme="dark" label="Patio / outdoor" value={d.patio} /> : null}
                        <SpecRow theme="dark" label="Pool / spa" value={d.poolSpa} />
                      </dl>
                    </div>
                  </div>

                  {unit.leaseInfo ? <LeaseInfoBlock info={unit.leaseInfo} /> : null}
                </div>
              </div>
            </section>

            <div className="mt-14 flex flex-col gap-4 sm:flex-row sm:items-center">
              <button
                type="button"
                onClick={() => setScheduleOpen(true)}
                className="inline-flex h-12 w-full items-center justify-center rounded-none bg-[#1A1A1A] px-10 text-sm font-medium tracking-[0.1em] text-white transition hover:bg-[#1A1A1A]/92 sm:w-auto"
              >
                Schedule a private showing
              </button>
              <Link
                href="/availability#units"
                className="inline-flex h-12 w-full items-center justify-center rounded-none bg-[#E8E2DA] px-8 text-sm font-medium tracking-[0.08em] text-[#1A1A1A] transition hover:bg-[#ddd6cd] sm:w-auto"
              >
                Back to all units
              </Link>
            </div>
          </>
        )}
      </div>

      <ScheduleVisitModal isOpen={scheduleOpen} onClose={() => setScheduleOpen(false)} />
    </main>
  );
}
