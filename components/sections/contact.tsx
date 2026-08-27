"use client";

import { useState } from "react";
import { Mail, MapPin, Send } from "lucide-react";
import { profile } from "@/data/portfolio";
import { GithubIcon, LinkedinIcon } from "../brand-icons";
import { SectionHeader } from "../section-header";

type Status = "idle" | "sending" | "sent" | "error";

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!response.ok) throw new Error("Message delivery failed");
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  }

  const methods = [
    { icon: Mail, label: "Email", value: profile.email, href: `mailto:${profile.email}` },
    { icon: GithubIcon, label: "GitHub", value: "View profile", href: profile.github },
    { icon: LinkedinIcon, label: "LinkedIn", value: "Connect", href: profile.linkedin },
    { icon: MapPin, label: "Location", value: profile.location, href: undefined },
  ];

  return (
    <section id="contact" className="scroll-mt-20 px-5 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeader eyebrow="Contact" title="Let's build something" description="Open to internships and full-time roles starting 2027." />

        <div className="grid gap-8 lg:grid-cols-2">
          <div data-reveal className="reveal-left grid gap-4 sm:grid-cols-2">
            {methods.map((m) => {
              const Icon = m.icon;
              const content = (
                <div className="card-glow h-full rounded-2xl border border-border-soft bg-bg-card p-5">
                  <Icon size={18} className="mb-3 text-accent" />
                  <p className="font-mono text-xs uppercase tracking-wide text-text-faint">{m.label}</p>
                  <p className="mt-1 text-sm text-text">{m.value}</p>
                </div>
              );
              return m.href ? (
                <a key={m.label} href={m.href} target={m.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="magnetic">
                  {content}
                </a>
              ) : (
                <div key={m.label}>{content}</div>
              );
            })}
          </div>

          <form data-reveal onSubmit={onSubmit} className="reveal-right card-glow rounded-2xl border border-border-soft bg-bg-card p-6" style={{ transitionDelay: "120ms" }}>
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="mb-1.5 block font-mono text-xs text-text-faint">Name</label>
                <input
                  id="name"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full rounded-lg border border-border-soft bg-bg px-3 py-2.5 text-sm text-text outline-none focus:border-accent"
                />
              </div>
              <div>
                <label htmlFor="email" className="mb-1.5 block font-mono text-xs text-text-faint">Email</label>
                <input
                  id="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full rounded-lg border border-border-soft bg-bg px-3 py-2.5 text-sm text-text outline-none focus:border-accent"
                />
              </div>
              <div>
                <label htmlFor="message" className="mb-1.5 block font-mono text-xs text-text-faint">Message</label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full rounded-lg border border-border-soft bg-bg px-3 py-2.5 text-sm text-text outline-none focus:border-accent"
                />
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                className="magnetic shine flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-bg disabled:opacity-60"
              >
                <Send size={15} /> {status === "sending" ? "Sending..." : "Send message"}
              </button>

              {status === "sent" && (
                <p className="text-center text-sm text-accent">Message sent directly to my email. I&apos;ll get back to you soon.</p>
              )}
              {status === "error" && (
                <p className="text-center text-sm text-red-400">
                  Couldn&apos;t send automatically. Please configure SMTP_USER and SMTP_PASS on the server.
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
