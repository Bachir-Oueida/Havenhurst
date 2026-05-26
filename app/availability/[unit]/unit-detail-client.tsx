"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { ScheduleVisitModal } from "@/components/schedule-visit-modal";
import { formatBathrooms } from "@/lib/units";
import type { LeaseInfo, Unit } from "@/lib/units";

/* ─────────────────────────── Photo Gallery ──────────────────────────────── */

function ZoomIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-6 w-6"
      aria-hidden
    >
      <circle cx="11" cy="11" r="7" />
      <line x1="11" y1="8" x2="11" y2="14" />
      <line x1="8" y1="11" x2="14" y2="11" />
      <line x1="16.5" y1="16.5" x2="21" y2="21" />
    </svg>
  );
}

function GalleryThumb({
  src,
  alt,
  featured,
  onClick,
}: {
  src: string;
  alt: string;
  featured?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative block w-full overflow-hidden bg-[#1A1A1A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1A1A1A] ${
        featured ? "col-span-2 row-span-2 sm:col-span-2 sm:row-span-2" : ""
      }`}
    >
      <img
        src={src}
        alt={alt}
        className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
      />
      <div className="absolute inset-0 flex items-center justify-center bg-black/0 text-white/0 transition-all duration-300 group-hover:bg-black/30 group-hover:text-white/90">
        <span className="flex h-11 w-11 items-center justify-center border border-white/60 bg-black/20 backdrop-blur-sm transition-all duration-300 group-hover:scale-100 scale-75 opacity-0 group-hover:opacity-100">
          <ZoomIcon />
        </span>
      </div>
    </button>
  );
}

function Lightbox({
  photos,
  index,
  unitNumber,
  onClose,
  onPrev,
  onNext,
}: {
  photos: string[];
  index: number;
  unitNumber: string;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, onPrev, onNext]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(delta) < 40) return;
    delta < 0 ? onNext() : onPrev();
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95"
      onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      role="dialog"
      aria-modal="true"
      aria-label={`Photo ${index + 1} of ${photos.length}`}
    >
      {/* Close */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Close gallery"
        className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center border border-white/20 bg-white/5 text-white/80 transition hover:bg-white/15 hover:text-white sm:right-6 sm:top-6"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" className="h-5 w-5">
          <path d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Prev */}
      {photos.length > 1 && (
        <button
          type="button"
          onClick={onPrev}
          aria-label="Previous photo"
          className="absolute left-3 top-1/2 z-10 -translate-y-1/2 flex h-11 w-11 items-center justify-center border border-white/20 bg-white/5 text-white/80 transition hover:bg-white/15 hover:text-white sm:left-6"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
      )}

      {/* Image */}
      <img
        key={index}
        src={photos[index]}
        alt={`Unit ${unitNumber} — photo ${index + 1} of ${photos.length}`}
        className="max-h-[88vh] max-w-[88vw] select-none object-contain shadow-2xl"
        draggable={false}
      />

      {/* Next */}
      {photos.length > 1 && (
        <button
          type="button"
          onClick={onNext}
          aria-label="Next photo"
          className="absolute right-3 top-1/2 z-10 -translate-y-1/2 flex h-11 w-11 items-center justify-center border border-white/20 bg-white/5 text-white/80 transition hover:bg-white/15 hover:text-white sm:right-6"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      )}

      {/* Counter */}
      <p className="absolute bottom-5 left-1/2 -translate-x-1/2 text-xs uppercase tracking-[0.28em] text-white/50 tabular-nums">
        {index + 1} / {photos.length}
      </p>
    </div>
  );
}

function PhotoGallery({ photos, unitNumber }: { photos: string[]; unitNumber: string }) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openAt = useCallback((i: number) => setLightboxIndex(i), []);
  const close = useCallback(() => setLightboxIndex(null), []);
  const prev = useCallback(
    () => setLightboxIndex((i) => (i !== null ? (i - 1 + photos.length) % photos.length : null)),
    [photos.length],
  );
  const next = useCallback(
    () => setLightboxIndex((i) => (i !== null ? (i + 1) % photos.length : null)),
    [photos.length],
  );

  if (photos.length === 0) {
    return (
      <div className="mt-12 flex h-48 w-full items-center justify-center border border-[color:rgba(154,143,133,0.35)] bg-[#EDEAE5]">
        <p className="text-xs uppercase tracking-[0.32em] text-[#9A8F85]">No photos available</p>
      </div>
    );
  }

  const hasFeatured = photos.length >= 3;
  const featured = photos[0];
  const secondary = hasFeatured ? photos.slice(1, 3) : [];
  const rest = hasFeatured ? photos.slice(3) : photos.slice(1);

  return (
    <div className="mt-12">
      <div className="mb-0.5 flex items-center justify-between">
        <p className="text-xs uppercase tracking-[0.32em] text-[#9A8F85]">Photos</p>
        <p className="text-xs tabular-nums text-[#9A8F85]">{photos.length} images</p>
      </div>

      {/* Bento hero (first 3 photos) */}
      <div
        className={`grid gap-0.5 ${
          hasFeatured
            ? "grid-cols-3 grid-rows-[220px_220px] sm:grid-rows-[260px_260px]"
            : photos.length === 2
            ? "grid-cols-2 grid-rows-[280px] sm:grid-rows-[340px]"
            : "grid-cols-1 grid-rows-[340px] sm:grid-rows-[480px]"
        }`}
      >
        <GalleryThumb
          src={featured}
          alt={`Unit ${unitNumber} — photo 1`}
          featured={hasFeatured}
          onClick={() => openAt(0)}
        />
        {secondary.map((src, i) => (
          <GalleryThumb
            key={src}
            src={src}
            alt={`Unit ${unitNumber} — photo ${i + 2}`}
            onClick={() => openAt(i + 1)}
          />
        ))}
        {!hasFeatured && photos[1] && (
          <GalleryThumb
            src={photos[1]}
            alt={`Unit ${unitNumber} — photo 2`}
            onClick={() => openAt(1)}
          />
        )}
      </div>

      {/* Remaining photos — uniform 3-col grid */}
      {rest.length > 0 && (
        <div className="mt-0.5 grid grid-cols-2 gap-0.5 sm:grid-cols-3">
          {rest.map((src, i) => (
            <div key={src} className="aspect-[4/3]">
              <GalleryThumb
                src={src}
                alt={`Unit ${unitNumber} — photo ${i + (hasFeatured ? 4 : 2)}`}
                onClick={() => openAt(i + (hasFeatured ? 3 : 1))}
              />
            </div>
          ))}
        </div>
      )}

      {lightboxIndex !== null && (
        <Lightbox
          photos={photos}
          index={lightboxIndex}
          unitNumber={unitNumber}
          onClose={close}
          onPrev={prev}
          onNext={next}
        />
      )}
    </div>
  );
}

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
        {unit.photos.length > 0 ? (
          <>
            <img
              src={unit.photos[0]}
              alt={`Unit ${unit.unitNumber}`}
              className="absolute inset-0 h-full w-full object-cover object-center"
              sizes="100vw"
            />
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent"
              aria-hidden
            />
          </>
        ) : (
          <div className="absolute inset-0 bg-[#1A1A1A]" />
        )}
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

            <PhotoGallery photos={unit.photos} unitNumber={unit.unitNumber} />

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
                        <SpecRow theme="dark" label="Stories" value={d.stories} />
                        <SpecRow theme="dark" label="Bedrooms" value={d.bedrooms} />
                        <SpecRow theme="dark" label="Bathrooms" value={formatBathrooms(d.bathrooms)} />
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
