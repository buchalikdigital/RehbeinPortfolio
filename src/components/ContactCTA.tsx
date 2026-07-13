"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import Reveal from "@/components/ui/Reveal";
import { company, services } from "@/lib/content";

type Status = "idle" | "sending" | "success" | "error";

export default function ContactCTA() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    setStatus("sending");
    setErrorMsg("");
    try {
      const res = await fetch("/mail.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json().catch(() => ({ success: res.ok }));
      if (res.ok && json.success) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
        setErrorMsg(json.message || "Bitte prüfen Sie Ihre Eingaben.");
      }
    } catch {
      setStatus("error");
      setErrorMsg(
        "Verbindung fehlgeschlagen. Bitte rufen Sie uns an oder versuchen Sie es später erneut."
      );
    }
  }

  return (
    <section id="kontakt" className="section relative overflow-hidden bg-navy-deep">
      <div className="container-x relative grid items-start gap-12 lg:grid-cols-[1fr_1.1fr]">
        {/* Left: pitch + contact facts */}
        <Reveal>
          <p className="eyebrow mb-3 !text-orange-mid">Kontakt</p>
          <h2 className="display text-[clamp(1.6rem,3.4vw,2.4rem)] !text-white">
            Lassen Sie uns Ihr <em className="!text-orange-mid">Projekt</em> starten
          </h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-cream/80">
            Erzählen Sie uns von Ihrem Vorhaben — wir melden uns innerhalb von 24
            Stunden mit einem kostenlosen, unverbindlichen Angebot.
          </p>

          <div className="mt-8 space-y-4">
            <a
              href={`tel:${company.phoneHref}`}
              className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 transition-colors hover:bg-white/10"
            >
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-orange">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff" aria-hidden>
                  <path d="M6.6 10.8a15 15 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.24 11 11 0 0 0 3.5.56 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.3a1 1 0 0 1 1 1 11 11 0 0 0 .56 3.5 1 1 0 0 1-.24 1L6.6 10.8Z" />
                </svg>
              </span>
              <span>
                <span className="block text-xs uppercase tracking-wider text-cream/60">Anrufen</span>
                <span className="font-serif text-base font-bold text-white">{company.phoneDisplay}</span>
              </span>
            </a>

            <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-white/10">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffd7a8" strokeWidth="1.8" aria-hidden>
                  <path d="M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11Z" />
                  <circle cx="12" cy="10" r="2.5" />
                </svg>
              </span>
              <span>
                <span className="block text-xs uppercase tracking-wider text-cream/60">Adresse</span>
                <span className="font-medium text-white">
                  {company.street}, {company.zip} {company.city}
                </span>
              </span>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <span className="mb-2 block text-xs uppercase tracking-wider text-cream/60">
                Öffnungszeiten
              </span>
              <ul className="space-y-1 text-sm text-white/90">
                {company.hours.map((h) => (
                  <li key={h.day} className="flex justify-between gap-4">
                    <span className="text-cream/70">{h.day}</span>
                    <span className="text-right font-medium">{h.time}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>

        {/* Right: form */}
        <Reveal direction="left" delay={0.1}>
          <div className="bg-white p-6 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.5)] sm:p-8">
            {status === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex min-h-[24rem] flex-col items-center justify-center text-center"
              >
                <span className="mb-4 grid h-16 w-16 place-items-center rounded-full bg-orange">
                  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M5 13l4 4L19 7" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <h3 className="font-serif text-xl font-bold text-navy">Vielen Dank!</h3>
                <p className="mt-2 max-w-sm text-sm text-ink-mid">
                  Ihre Anfrage ist bei uns eingegangen. Wir melden uns innerhalb
                  von 24 Stunden bei Ihnen.
                </p>
                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="btn btn-ghost mt-6"
                >
                  Weitere Anfrage senden
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                {/* honeypot */}
                <input
                  type="text"
                  name="honeypot"
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                  aria-hidden
                />
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Name *" name="name" type="text" required placeholder="Ihr Name" />
                  <Field label="Telefon" name="phone" type="tel" placeholder="Ihre Rufnummer" />
                </div>
                <Field label="E-Mail *" name="email" type="email" required placeholder="ihre@email.de" />

                <label className="block">
                  <span className="mb-1.5 block text-sm font-semibold text-ink">Ihr Anliegen</span>
                  <select
                    name="subject"
                    defaultValue=""
                    className="w-full border border-navy/12 bg-white px-4 py-3 text-ink outline-none transition focus:border-orange focus:ring-2 focus:ring-orange/20"
                  >
                    <option value="" disabled>Bitte wählen …</option>
                    {services.map((s) => (
                      <option key={s.key} value={s.title}>{s.title}</option>
                    ))}
                    <option value="Sonstiges">Sonstiges</option>
                  </select>
                </label>

                <label className="block">
                  <span className="mb-1.5 block text-sm font-semibold text-ink">Nachricht *</span>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    placeholder="Beschreiben Sie kurz Ihr Vorhaben …"
                    className="w-full resize-none border border-navy/12 bg-white px-4 py-3 text-ink outline-none transition placeholder:text-ink-faint focus:border-orange focus:ring-2 focus:ring-orange/20"
                  />
                </label>

                {status === "error" && (
                  <p className="bg-orange-light px-4 py-2.5 text-sm font-medium text-orange-dark">
                    {errorMsg}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="btn btn-primary w-full disabled:opacity-70"
                >
                  {status === "sending" ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                      Wird gesendet …
                    </>
                  ) : (
                    <>
                      Anfrage senden
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                        <path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </>
                  )}
                </button>
                <p className="text-center text-xs text-ink-light">
                  Mit dem Absenden stimmen Sie der Verarbeitung Ihrer Daten zur
                  Bearbeitung der Anfrage zu.
                </p>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type,
  required,
  placeholder,
}: {
  label: string;
  name: string;
  type: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-semibold text-ink">{label}</span>
      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        className="w-full border border-navy/12 bg-white px-4 py-3 text-ink outline-none transition placeholder:text-ink-faint focus:border-orange focus:ring-2 focus:ring-orange/20"
      />
    </label>
  );
}
