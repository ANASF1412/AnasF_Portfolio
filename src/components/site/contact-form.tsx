import { useState } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { toast } from "sonner";
import { profile } from "@/lib/portfolio-data";

type Status = "idle" | "sending" | "sent" | "error";

const MAX = { name: 100, email: 255, message: 1000 };

function validate(v: { name: string; email: string; message: string }) {
  if (!v.name.trim()) return "Please add your name.";
  if (v.name.trim().length > MAX.name) return "Name is too long.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) return "Please add a valid email.";
  if (v.email.trim().length > MAX.email) return "Email is too long.";
  if (v.message.trim().length < 10) return "A little more detail helps — 10 characters minimum.";
  if (v.message.trim().length > MAX.message) return "Message is too long.";
  return null;
}

const field =
  "w-full rounded-xl border border-border bg-surface/40 px-4 py-3 text-sm text-foreground transition-colors duration-300 placeholder:text-muted-foreground focus:border-cyan/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan";

export function ContactForm() {
  const [values, setValues] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  const set =
    (k: keyof typeof values) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setValues((v) => ({ ...v, [k]: e.target.value }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const problem = validate(values);
    if (problem) {
      setError(problem);
      setStatus("error");
      return;
    }
    setError(null);
    setStatus("sending");

    const name = values.name.trim();
    const email = values.email.trim();
    const message = values.message.trim();

    try {
      if (profile.web3formsKey) {
        // FormData keeps this a "simple" request — no CORS preflight to fail on.
        const fd = new FormData();
        fd.append("access_key", profile.web3formsKey);
        fd.append("name", name);
        fd.append("email", email);
        fd.append("subject", `Portfolio Contact from ${name}`);
        fd.append("message", message);
        fd.append("from_name", "Portfolio contact form");
        fd.append("replyto", email);
        const res = await fetch("https://api.web3forms.com/submit", { method: "POST", body: fd });
        const data = (await res.json().catch(() => null)) as {
          success?: boolean;
          message?: string;
        } | null;
        if (!res.ok || !data?.success) throw new Error(data?.message ?? String(res.status));
      } else if (profile.contactEndpoint) {
        const res = await fetch(profile.contactEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({ name, email, message, source: "portfolio-footer-cta" }),
        });
        if (!res.ok) throw new Error(String(res.status));
      } else {
        // No delivery service configured yet — hand off to the visitor's mail client.
        const body = `${message}\n\n— ${name} (${email})`;
        window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(
          `Portfolio enquiry — ${name}`,
        )}&body=${encodeURIComponent(body)}`;
      }
      setStatus("sent");
      setValues({ name: "", email: "", message: "" });
      toast.success("Message sent successfully! I'll get back to you shortly.");
    } catch {
      const msg = `Couldn't send that. Email me directly at ${profile.email}.`;
      setError(msg);
      setStatus("error");
      toast.error(msg);
    }
  }

  if (status === "sent") {
    return (
      <div className="neon-frame corner-ticks rounded-2xl p-5 text-center sm:p-8">
        <CheckCircle2 className="mx-auto h-8 w-8 text-cyan" />
        <p className="mt-4 font-mono text-xs uppercase tracking-widest text-cyan">
          MESSAGE TRANSMITTED
        </p>
        <h3 className="mt-3 text-lg font-semibold text-foreground">Thanks — it's in my inbox.</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          I reply within a day, usually with links to whichever build is closest to your stack.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan mt-6 inline-flex h-11 items-center rounded-full border border-border px-5 text-sm text-muted-foreground transition-colors duration-300 hover:border-cyan/50 hover:text-foreground"
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="neon-frame corner-ticks rounded-2xl p-6 sm:p-7">
      <p className="font-mono text-xs uppercase tracking-widest text-cyan">Direct line</p>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <label className="block">
          <span className="sr-only">Your name</span>
          <input
            className={field}
            placeholder="Your name"
            value={values.name}
            onChange={set("name")}
            maxLength={MAX.name}
            autoComplete="name"
            required
          />
        </label>
        <label className="block">
          <span className="sr-only">Your email</span>
          <input
            className={field}
            type="email"
            placeholder="you@company.com"
            value={values.email}
            onChange={set("email")}
            maxLength={MAX.email}
            autoComplete="email"
            required
          />
        </label>
      </div>
      <label className="mt-3 block">
        <span className="sr-only">Message</span>
        <textarea
          className={`${field} min-h-[120px] resize-y`}
          placeholder="Role, team, and what you're building — a couple of lines is plenty."
          value={values.message}
          onChange={set("message")}
          maxLength={MAX.message}
          required
        />
      </label>

      {error ? (
        <p role="alert" aria-live="assertive" className="mt-3 text-sm text-magenta">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "sending"}
        className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan group mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground transition-shadow duration-500 disabled:opacity-70 sm:w-auto"
        style={{ boxShadow: "var(--glow-violet)" }}
      >
        {status === "sending" ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
        )}
        {status === "sending" ? "Sending…" : "Send message"}
      </button>
      <p className="mt-3 font-mono text-[0.68rem] text-muted-foreground">
        Goes straight to {profile.email} · no newsletter, no spam.
      </p>
    </form>
  );
}
