"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";

type ScheduleVisitModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

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

function getTodayDateValue() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function ScheduleVisitModal({ isOpen, onClose }: ScheduleVisitModalProps) {
  const [values, setValues] = useState<FormValues>(INITIAL_VALUES);
  const [submitState, setSubmitState] = useState<"idle" | "submitting" | "success" | "error">(
    "idle",
  );
  const [errorMessage, setErrorMessage] = useState("");
  const minDate = useMemo(() => getTodayDateValue(), []);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      setSubmitState("idle");
      setErrorMessage("");
      setValues(INITIAL_VALUES);
    }
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitState("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = (await response.json().catch(() => null)) as
        | {
            success?: boolean;
            error?: string;
          }
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
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black/45 px-4 py-8"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="relative w-full max-w-2xl rounded-none border border-[color:rgba(154,143,133,0.45)] bg-[#F5F2ED] p-6 sm:p-8">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 inline-flex h-8 w-8 items-center justify-center rounded-none border border-[color:rgba(154,143,133,0.45)] text-[#1A1A1A] transition hover:bg-[color:rgba(154,143,133,0.1)]"
          aria-label="Close schedule a visit popup"
        >
          <svg
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          >
            <path d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <p className="text-xs font-semibold uppercase tracking-[0.33em] text-[#8D7A66]">
          SCHEDULE A VISIT
        </p>

        {submitState !== "success" ? (
          <form className="mt-6 grid gap-4 sm:grid-cols-2" onSubmit={handleSubmit}>
            <label className="flex flex-col gap-1 text-sm text-[#3B3733]">
              Your Name
              <input
                required
                type="text"
                value={values.name}
                onChange={(event) =>
                  setValues((current) => ({
                    ...current,
                    name: event.target.value,
                  }))
                }
                className="h-11 rounded-none border border-[color:rgba(154,143,133,0.45)] bg-white px-3 text-[#1A1A1A] outline-none transition focus:border-[#1A1A1A]"
              />
            </label>

            <label className="flex flex-col gap-1 text-sm text-[#3B3733]">
              Your Email
              <input
                required
                type="email"
                value={values.email}
                onChange={(event) =>
                  setValues((current) => ({
                    ...current,
                    email: event.target.value,
                  }))
                }
                className="h-11 rounded-none border border-[color:rgba(154,143,133,0.45)] bg-white px-3 text-[#1A1A1A] outline-none transition focus:border-[#1A1A1A]"
              />
            </label>

            <label className="flex flex-col gap-1 text-sm text-[#3B3733]">
              Preferred Showing Date
              <input
                required
                type="date"
                min={minDate}
                value={values.date}
                onChange={(event) =>
                  setValues((current) => ({
                    ...current,
                    date: event.target.value,
                  }))
                }
                className="h-11 rounded-none border border-[color:rgba(154,143,133,0.45)] bg-white px-3 text-[#1A1A1A] outline-none transition focus:border-[#1A1A1A]"
              />
            </label>

            <label className="flex flex-col gap-1 text-sm text-[#3B3733]">
              Preferred Time
              <select
                value={values.preferredTime}
                onChange={(event) =>
                  setValues((current) => ({
                    ...current,
                    preferredTime: event.target.value,
                  }))
                }
                className="h-11 rounded-none border border-[color:rgba(154,143,133,0.45)] bg-white px-3 text-[#1A1A1A] outline-none transition focus:border-[#1A1A1A]"
              >
                {TIME_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value} disabled={opt.value === ""}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="flex flex-col gap-1 text-sm text-[#3B3733]">
              Phone Number
              <input
                type="tel"
                value={values.phone}
                onChange={(event) =>
                  setValues((current) => ({
                    ...current,
                    phone: event.target.value,
                  }))
                }
                className="h-11 rounded-none border border-[color:rgba(154,143,133,0.45)] bg-white px-3 text-[#1A1A1A] outline-none transition focus:border-[#1A1A1A]"
              />
            </label>

            <label className="flex flex-col gap-1 text-sm text-[#3B3733] sm:col-span-2">
              Your Message
              <textarea
                rows={4}
                value={values.message}
                onChange={(event) =>
                  setValues((current) => ({
                    ...current,
                    message: event.target.value,
                  }))
                }
                className="rounded-none border border-[color:rgba(154,143,133,0.45)] bg-white px-3 py-2 text-[#1A1A1A] outline-none transition focus:border-[#1A1A1A]"
              />
            </label>

            <button
              type="submit"
              disabled={submitState === "submitting"}
              className="mt-2 inline-flex h-11 w-full items-center justify-center rounded-none bg-[#1A1A1A] px-6 text-sm font-semibold tracking-[0.12em] text-white transition hover:bg-[#1A1A1A]/92 disabled:cursor-not-allowed disabled:opacity-60 sm:col-span-2"
            >
              {submitState === "submitting" ? "SUBMITTING..." : "SUBMIT"}
            </button>

            {submitState === "error" ? (
              <p className="text-sm text-red-700 sm:col-span-2">{errorMessage}</p>
            ) : null}
          </form>
        ) : (
          <div className="py-10">
            <p className="max-w-lg text-base text-zinc-700">
              Thank you — we&apos;ve received your inquiry and will be in touch soon.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
