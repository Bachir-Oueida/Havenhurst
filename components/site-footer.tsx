import Link from "next/link";

const InstagramIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="h-4 w-4"
    aria-hidden="true"
  >
    <rect x="3.25" y="3.25" width="17.5" height="17.5" rx="5.25" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="17.3" cy="6.7" r="1.1" fill="currentColor" />
  </svg>
);

const FacebookIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="h-4 w-4"
    aria-hidden="true"
  >
    <path
      d="M13.5 20V12.7H16L16.4 9.8H13.5V8C13.5 7.2 13.8 6.6 15 6.6H16.5V4C16.2 4 15.1 3.9 13.8 3.9C11.1 3.9 9.3 5.5 9.3 8.4V9.8H6.5V12.7H9.3V20H13.5Z"
      fill="currentColor"
    />
  </svg>
);

const EqualHousingIcon = () => (
  <svg
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="h-4 w-4"
    aria-hidden="true"
  >
    <path d="M3 14.5L16 4L29 14.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <rect x="7" y="14.5" width="18" height="13.5" stroke="currentColor" strokeWidth="2" />
    <path d="M11 19H21M11 23H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export function Footer() {
  return (
    <footer className="mt-auto bg-[#171412] text-[#F8F5F1]">
      <div className="mx-auto max-w-7xl px-6 py-14 sm:px-8 lg:px-10 lg:py-16">
        <div className="grid gap-12 text-center md:grid-cols-3 md:text-left">
          <section className="space-y-3">
            <h2 className="text-xs font-semibold tracking-[0.35em] text-[#E4D8CB]">1283 HAVENHURST</h2>
            <p className="text-sm text-[#EDE7DF]">1283 Havenhurst Drive</p>
            <p className="text-sm text-[#EDE7DF]">West Hollywood, CA 90046</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xs font-semibold tracking-[0.3em] text-[#E4D8CB]">CONTACT</h2>
            <p className="text-sm text-[#EDE7DF]">Bachir Oueida</p>
            <p>
              <a href="tel:3107227727" className="text-sm text-[#EDE7DF] transition hover:text-white">
                310.722.7727
              </a>
            </p>
            <p>
              <a
                href="mailto:bachir@oueida.com"
                className="text-sm text-[#EDE7DF] transition hover:text-white"
              >
                bachir@oueida.com
              </a>
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xs font-semibold tracking-[0.3em] text-[#E4D8CB]">FOLLOW</h2>
            <div className="space-y-2">
              <a
                href="https://www.instagram.com/1283_havenhurst/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-sm text-[#EDE7DF] transition hover:text-white"
              >
                <InstagramIcon />
                Instagram
              </a>
            </div>
            <div className="space-y-2">
              <a
                href="https://www.facebook.com/profile.php?id=61572013574156"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-sm text-[#EDE7DF] transition hover:text-white"
              >
                <FacebookIcon />
                Facebook
              </a>
            </div>
          </section>
        </div>

        <div className="mt-12 border-t border-[color:rgba(248,245,241,0.16)] pt-6">
          <div className="flex flex-col items-center justify-between gap-4 text-center text-xs text-[#D5C8BB] md:flex-row md:text-left">
            <p>© 2026 1283 Havenhurst. All rights reserved.</p>
            <div className="flex flex-wrap items-center justify-center gap-2 md:justify-end">
              <Link href="/terms" className="transition hover:text-white">
                Terms
              </Link>
              <span aria-hidden>·</span>
              <Link href="/privacy" className="transition hover:text-white">
                Privacy
              </Link>
              <span aria-hidden>·</span>
              <span className="inline-flex items-center gap-1.5">
                <EqualHousingIcon />
                Equal Housing Opportunity
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function SiteFooter() {
  return <Footer />;
}
