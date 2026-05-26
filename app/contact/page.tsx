"use client";

import { FormEvent, useMemo, useState } from "react";

type SubmitState = "idle" | "submitting" | "success" | "error";

type FormValues = {
  name: string;
  email: string;
  date: string;
  preferredTime: string;
  phone: string;
  message: string;
};

const INITIAL_VALUES: FormValues = {
  name: "",
  email: "",
  date: "",
  preferredTime: "",
  phone: "",
  message: "",
};

const TIME_OPTIONS = [
  { value: "", label: "Select a time window" },
  { value: "9am–12pm", label: "9am – 12pm" },
  { value: "12pm–3pm", label: "12pm – 3pm" },
  { value: "3pm–6pm", label: "3pm – 6pm" },
];

function toMinDateValue() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

const fieldClassName =
  "h-11 w-full rounded-none border border-[color:rgba(154,143,133,0.45)] bg-white px-3 text-sm font-light text-[#1A1A1A] outline-none transition focus:border-[#1A1A1A] focus:ring-0";

export default function ContactPage() {
  const [values, setValues] = useState<FormValues>(INITIAL_VALUES);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const minDate = useMemo(() => toMinDateValue(), []);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitState("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = (await response.json().catch(() => null)) as
        | { success?: boolean; error?: string }
        | null;

      if (!response.ok || !data?.success) {
        throw new Error(data?.error ?? "Unable to submit your inquiry right now.");
      }

      setSubmitState("success");
    } catch (error) {
      setSubmitState("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Unable to submit your inquiry right now.",
      );
    }
  };

  return (
    <main className="min-h-screen bg-[#F5F2ED] text-[#1A1A1A]">
      {/* Hero — pt-28/pt-32 clears the fixed navbar */}
      <section className="w-full bg-[#1A1916] px-6 pb-16 pt-28 sm:px-10 sm:pt-32 lg:px-12">
        <div className="mx-auto grid w-full max-w-[1280px] gap-10 md:grid-cols-2 md:items-end">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-[rgba(240,236,230,0.45)]">CONTACT</p>
            <h1 className="font-display mt-5 text-5xl leading-[1.02] text-[#F0ECE6] sm:text-[52px]">
              Get in touch.
            </h1>
            <p className="mt-5 max-w-[380px] text-base font-light leading-relaxed text-[rgba(240,236,230,0.55)]">
              Private showings at 1283 Havenhurst are by appointment. Reach out below and we
              will be in touch shortly.
            </p>
          </div>

          <div className="md:text-right">
            <p className="text-xs uppercase tracking-[0.35em] text-[rgba(240,236,230,0.4)]">
              DIRECT LINE
            </p>
            <p className="font-display mt-4 text-3xl text-[#F0ECE6] sm:text-[22px]">310.722.7727</p>
            <p className="mt-2 text-sm text-[rgba(240,236,230,0.55)]">bachir@oueida.com</p>
          </div>
        </div>
      </section>

      <div className="h-1 w-full bg-[#F5F2ED]" aria-hidden="true" />

      <section className="py-20">
        <div className="mx-auto grid w-full max-w-[1280px] gap-14 px-6 sm:px-10 lg:grid-cols-2 lg:px-12">
          <section>
            {submitState !== "success" ? (
              <>
                <p className="text-xs uppercase tracking-[0.4em] text-[#9A8F85]">SCHEDULE A VISIT</p>
                <h2 className="font-display mt-4 text-4xl leading-tight text-[#1A1A1A]">
                  Private Showing Request
                </h2>

                <form className="mt-8 space-y-4" onSubmit={onSubmit}>
                  <label className="flex flex-col gap-1 text-sm font-light text-[#3F3A35]">
                    Your Name
                    <input
                      required
                      type="text"
                      value={values.name}
                      onChange={(event) =>
                        setValues((current) => ({ ...current, name: event.target.value }))
                      }
                      className={fieldClassName}
                    />
                  </label>

                  <label className="flex flex-col gap-1 text-sm font-light text-[#3F3A35]">
                    Your Email
                    <input
                      required
                      type="email"
                      value={values.email}
                      onChange={(event) =>
                        setValues((current) => ({ ...current, email: event.target.value }))
                      }
                      className={fieldClassName}
                    />
                  </label>

                  <label className="flex flex-col gap-1 text-sm font-light text-[#3F3A35]">
                    Preferred Showing Date
                    <input
                      required
                      type="date"
                      min={minDate}
                      value={values.date}
                      onChange={(event) =>
                        setValues((current) => ({ ...current, date: event.target.value }))
                      }
                      className={fieldClassName}
                    />
                  </label>

                  <label className="flex flex-col gap-1 text-sm font-light text-[#3F3A35]">
                    Preferred Time
                    <select
                      value={values.preferredTime}
                      onChange={(event) =>
                        setValues((current) => ({ ...current, preferredTime: event.target.value }))
                      }
                      className={fieldClassName}
                    >
                      {TIME_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value} disabled={opt.value === ""}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="flex flex-col gap-1 text-sm font-light text-[#3F3A35]">
                    Phone Number
                    <input
                      type="tel"
                      value={values.phone}
                      onChange={(event) =>
                        setValues((current) => ({ ...current, phone: event.target.value }))
                      }
                      className={fieldClassName}
                    />
                  </label>

                  <label className="flex flex-col gap-1 text-sm font-light text-[#3F3A35]">
                    Your Message
                    <textarea
                      rows={5}
                      value={values.message}
                      onChange={(event) =>
                        setValues((current) => ({ ...current, message: event.target.value }))
                      }
                      className="w-full rounded-none border border-[color:rgba(154,143,133,0.45)] bg-white px-3 py-3 text-sm font-light text-[#1A1A1A] outline-none transition focus:border-[#1A1A1A] focus:ring-0"
                    />
                  </label>

                  <button
                    type="submit"
                    disabled={submitState === "submitting"}
                    className="inline-flex h-12 w-full items-center justify-center rounded-none bg-[#1A1A1A] px-8 text-sm font-medium tracking-[0.1em] text-white transition hover:bg-[#1A1A1A]/92 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {submitState === "submitting" ? "SUBMITTING..." : "SUBMIT"}
                  </button>

                  {submitState === "error" ? (
                    <p className="text-sm text-red-700">{errorMessage}</p>
                  ) : null}
                </form>
              </>
            ) : (
              <div className="flex min-h-[320px] items-center justify-center border border-[color:rgba(154,143,133,0.45)] px-8 py-10 text-center">
                <p className="font-display text-2xl leading-relaxed text-[#1A1A1A]">
                  Thank you — we&apos;ve received your inquiry and will be in touch soon.
                </p>
              </div>
            )}
          </section>

          <aside className="space-y-14">
            <section>
              <p className="text-xs uppercase tracking-[0.36em] text-[#9A8F85]">LEASING</p>
              <div className="mt-4 h-px w-full bg-[color:rgba(154,143,133,0.4)]" />
              <div className="mt-5 space-y-2">
                <p className="font-display text-xl text-[#1A1A1A]">Bachir Oueida</p>
                <p>
                  <a
                    href="tel:3107227727"
                    className="text-sm font-light text-[#1A1A1A] transition hover:text-[#9A8F85]"
                  >
                    310.722.7727
                  </a>
                </p>
                <p>
                  <a
                    href="mailto:bachir@oueida.com"
                    className="text-sm font-light text-[#1A1A1A] transition hover:text-[#9A8F85]"
                  >
                    bachir@oueida.com
                  </a>
                </p>
              </div>
            </section>

            <section>
              <p className="text-xs uppercase tracking-[0.36em] text-[#9A8F85]">PROPERTY</p>
              <div className="mt-4 h-px w-full bg-[color:rgba(154,143,133,0.4)]" />
              <div className="mt-5 space-y-2 text-sm font-light text-[#1A1A1A]">
                <p>1283 Havenhurst Drive</p>
                <p>West Hollywood, CA 90046</p>
                <p className="italic text-[#9A8F85]">Showings by appointment only.</p>
              </div>
            </section>
          </aside>
        </div>
      </section>

      <section className="w-full">
        <iframe
          title="Map — 1283 Havenhurst Drive"
          src="https://www.google.com/maps?q=34.0942,-118.3677&z=15&output=embed"
          className="h-[260px] w-full sm:h-[320px] lg:h-[380px]"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </section>
    </main>
  );
}
