import { useState } from "react";
import { Github, Globe, Leaf, Linkedin, Loader2, Lock, Mail, Server } from "lucide-react";
import { CLUSTER, DB_NAME, contactDocs, profileDocs } from "@/lib/portfolio-data";

export function ConnectScreen({ onConnect }: { onConnect: () => void }) {
  const [state, setState] = useState<"idle" | "connecting">("idle");
  const p = profileDocs[0]!;
  const c = contactDocs[0]!;

  function connect() {
    setState("connecting");
    setTimeout(onConnect, 900);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-surface px-4 py-10">
      <div className="w-full max-w-3xl overflow-hidden rounded-lg border border-border bg-card shadow-panel">
        <div className="flex items-center gap-2 border-b border-border bg-surface px-4 py-2.5">
          <Leaf className="size-4 text-primary" />
          <span className="text-[13px] font-semibold text-foreground">
            MongoDB Compass — New Connection
          </span>
        </div>

        <div className="grid gap-0 md:grid-cols-[1.15fr_1fr]">
          <div className="border-border p-6 md:border-r">
            <p className="font-mono text-[11px] uppercase tracking-wide text-muted-foreground">
              URI
            </p>
            <div className="mt-2 flex items-center gap-2 rounded border border-border bg-surface px-3 py-2 font-mono text-[12.5px] text-foreground/85">
              <Server className="size-3.5 shrink-0 text-primary" />
              <span className="truncate">mongodb://{CLUSTER}/{DB_NAME}</span>
            </div>

            <p className="mt-5 font-mono text-[11px] uppercase tracking-wide text-muted-foreground">
              Authentication
            </p>
            <div className="mt-2 flex items-center gap-2 rounded border border-border bg-surface px-3 py-2 font-mono text-[12.5px] text-muted-foreground">
              <Lock className="size-3.5 shrink-0 text-primary" />
              None — this cluster is public, read as much as you like
            </div>

            <button
              type="button"
              onClick={connect}
              disabled={state === "connecting"}
              className="pulse-ring mt-6 inline-flex w-full items-center justify-center gap-2 rounded bg-primary px-4 py-2.5 text-[13px] font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-80"
            >
              {state === "connecting" ? (
                <>
                  <Loader2 className="size-4 animate-spin" /> Connecting…
                </>
              ) : (
                "Connect"
              )}
            </button>
            <p className="mt-3 text-center font-mono text-[11px] text-muted-foreground">
              Press connect to browse the portfolio as a live database.
            </p>
          </div>

          <div className="bg-surface/60 p-6">
            <div className="flex size-14 items-center justify-center rounded-full bg-accent text-[19px] font-semibold text-primary">
              PM
            </div>
            <h1 className="mt-3 text-[22px] font-semibold leading-tight tracking-tight text-foreground">
              {String(p["name"])}
            </h1>
            <p className="text-[13px] text-primary">{String(p["role"])}</p>
            <p className="mt-1 text-[12.5px] text-muted-foreground">
              {String(p["focus"])} · {String(p["location"])}
            </p>
            <p className="mt-4 text-[12.5px] leading-relaxed text-foreground/75">
              {String(p["summary"]).slice(0, 170)}…
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {[
                { icon: Github, href: String(c["github"]), label: "GitHub" },
                { icon: Linkedin, href: String(c["linkedin"]), label: "LinkedIn" },
                { icon: Globe, href: String(c["website"]), label: "Website" },
                { icon: Mail, href: `mailto:${String(c["email"])}`, label: "Email" },
              ].map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded border border-border bg-card px-2.5 py-1.5 text-[11.5px] font-medium text-foreground/80 hover:border-primary hover:text-primary"
                >
                  <l.icon className="size-3.5" /> {l.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
