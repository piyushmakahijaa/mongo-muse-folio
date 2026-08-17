import {
  ArrowUpRight,
  Award,
  BadgeCheck,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  Star,
} from "lucide-react";
import type { Doc } from "@/lib/portfolio-data";

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded border border-border bg-surface px-2 py-0.5 font-mono text-[11px] text-foreground/75">
      {children}
    </span>
  );
}

function Stars({ value }: { value: number }) {
  return (
    <span className="inline-flex items-center gap-1 font-mono text-[11.5px] text-muted-foreground">
      <Star className="size-3 fill-primary text-primary" />
      {value.toFixed(1)}
    </span>
  );
}

function ProfileCard({ doc }: { doc: Doc }) {
  return (
    <article className="doc-in overflow-hidden rounded border border-border bg-card">
      <div className="flex flex-wrap items-start gap-5 border-b border-border bg-surface/70 px-6 py-6">
        <div className="flex size-16 items-center justify-center rounded-full bg-accent text-[22px] font-semibold text-primary">
          PM
        </div>
        <div className="min-w-[240px] flex-1">
          <h2 className="text-[26px] font-semibold leading-tight tracking-tight text-foreground">
            {String(doc["name"])}
          </h2>
          <p className="text-[14px] font-medium text-primary">{String(doc["role"])}</p>
          <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-[12.5px] text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <MapPin className="size-3.5" /> {String(doc["location"])}
            </span>
            <span>{String(doc["focus"])}</span>
            {doc["openToWork"] === true && (
              <span className="inline-flex items-center gap-1 rounded-full bg-accent px-2 py-0.5 text-primary">
                <BadgeCheck className="size-3.5" /> open to work
              </span>
            )}
          </p>
        </div>
      </div>
      <div className="px-6 py-5">
        <p className="max-w-3xl text-[13.5px] leading-relaxed text-foreground/80">
          {String(doc["summary"])}
        </p>
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          {(
            [
              ["Strengths", doc["strengths"]],
              ["Currently learning", doc["currentlyLearning"]],
            ] as const
          ).map(([label, arr]) => (
            <div key={label}>
              <p className="font-mono text-[11px] uppercase tracking-wide text-muted-foreground">
                {label}
              </p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {(arr as string[]).map((s) => (
                  <Chip key={s}>{s}</Chip>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-5 flex flex-wrap gap-6 border-t border-border pt-4 font-mono text-[12px] text-muted-foreground">
          <span>
            CGPA <span className="text-number">{String(doc["cgpa"])}</span>
          </span>
          <span>
            Years coding <span className="text-number">{String(doc["yearsCoding"])}</span>
          </span>
          <span>
            Email <span className="text-string">{String(doc["email"])}</span>
          </span>
        </div>
      </div>
    </article>
  );
}

function ProjectCard({ doc, i }: { doc: Doc; i: number }) {
  const status = String(doc["status"]);
  return (
    <article
      style={{ animationDelay: `${i * 60}ms` }}
      className="doc-in flex flex-col rounded border border-border bg-card p-5 transition-shadow hover:shadow-panel"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-[16px] font-semibold leading-snug text-foreground">
            {String(doc["name"])}
          </h3>
          <p className="font-mono text-[11.5px] text-muted-foreground">
            {String(doc["category"])} · {String(doc["year"])}
          </p>
        </div>
        <span
          className={`shrink-0 rounded-full px-2 py-0.5 font-mono text-[10.5px] uppercase ${
            status === "live"
              ? "bg-primary text-primary-foreground"
              : "bg-accent text-primary"
          }`}
        >
          {status}
        </span>
      </div>

      <p className="mt-3 text-[13px] leading-relaxed text-foreground/80">
        {String(doc["description"])}
      </p>

      <ul className="mt-3 space-y-1.5">
        {(doc["highlights"] as string[]).map((h) => (
          <li key={h} className="flex gap-2 text-[12.5px] text-muted-foreground">
            <span className="mt-[7px] size-1.5 shrink-0 rounded-full bg-leaf" />
            {h}
          </li>
        ))}
      </ul>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {(doc["stack"] as string[]).map((s) => (
          <Chip key={s}>{s}</Chip>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
        <Stars value={doc["rating"] as number} />
        {typeof doc["link"] === "string" && (
          <a
            href={doc["link"]}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-[12px] font-semibold text-primary hover:underline"
          >
            Visit <ArrowUpRight className="size-3.5" />
          </a>
        )}
      </div>
    </article>
  );
}

function SkillCard({ doc, i }: { doc: Doc; i: number }) {
  const prof = doc["proficiency"] as number;
  return (
    <article
      style={{ animationDelay: `${i * 50}ms` }}
      className="doc-in rounded border border-border bg-card p-4"
    >
      <div className="flex items-center justify-between">
        <h3 className="font-mono text-[13px] font-semibold text-key">{String(doc["category"])}</h3>
        <span className="font-mono text-[11.5px] text-number">{prof.toFixed(1)} / 5</span>
      </div>
      <span className="mt-2 block h-1.5 w-full rounded-full bg-muted">
        <span
          className="block h-1.5 rounded-full bg-leaf transition-all"
          style={{ width: `${(prof / 5) * 100}%` }}
        />
      </span>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {(doc["items"] as string[]).map((s) => (
          <Chip key={s}>{s}</Chip>
        ))}
      </div>
    </article>
  );
}

function Timeline({ docs, kind }: { docs: Doc[]; kind: "education" | "achievements" }) {
  return (
    <div className="relative ml-2 border-l border-border pl-6">
      {docs.map((d, i) => (
        <div
          key={i}
          style={{ animationDelay: `${i * 60}ms` }}
          className="doc-in relative pb-6 last:pb-0"
        >
          <span className="absolute -left-[31px] flex size-5 items-center justify-center rounded-full border border-border bg-card text-primary">
            {kind === "education" ? (
              <GraduationCap className="size-3" />
            ) : (
              <Award className="size-3" />
            )}
          </span>
          {kind === "education" ? (
            <>
              <p className="font-mono text-[11.5px] text-muted-foreground">
                {String(d["startYear"])} – {String(d["endYear"])}
                {d["ongoing"] === true && " · ongoing"}
              </p>
              <h3 className="text-[15px] font-semibold text-foreground">
                {String(d["qualification"])}
              </h3>
              <p className="text-[13px] text-foreground/75">
                {String(d["institution"])} · {String(d["place"])}
              </p>
              <span className="mt-1 inline-block rounded bg-accent px-2 py-0.5 font-mono text-[11px] text-primary">
                {String(d["score"])}
              </span>
            </>
          ) : (
            <>
              <p className="font-mono text-[11.5px] text-muted-foreground">
                {String(d["year"])} · {String(d["type"])}
              </p>
              <h3 className="text-[15px] font-semibold text-foreground">{String(d["title"])}</h3>
              <p className="text-[13px] text-foreground/75">
                {String(d["issuer"])} — {String(d["notes"])}
              </p>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

function ContactCard({ doc }: { doc: Doc }) {
  const links = [
    { label: "Email", value: String(doc["email"]), href: `mailto:${String(doc["email"])}`, icon: Mail },
    { label: "Phone", value: String(doc["phone"]), href: `tel:${String(doc["phone"])}`, icon: Phone },
    { label: "GitHub", value: String(doc["github"]), href: String(doc["github"]), icon: ArrowUpRight },
    { label: "LinkedIn", value: String(doc["linkedin"]), href: String(doc["linkedin"]), icon: ArrowUpRight },
    { label: "Website", value: String(doc["website"]), href: String(doc["website"]), icon: ArrowUpRight },
  ];
  return (
    <article className="doc-in rounded border border-border bg-card p-5">
      <p className="text-[13.5px] text-foreground/80">
        {String(doc["availability"])} · based in {String(doc["location"])} · usually replies within{" "}
        {String(doc["responseTimeHours"])}h.
      </p>
      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        {links.map((l) => (
          <a
            key={l.label}
            href={l.href}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between gap-3 rounded border border-border bg-surface px-3 py-2.5 hover:border-primary"
          >
            <span className="min-w-0">
              <span className="block font-mono text-[10.5px] uppercase tracking-wide text-muted-foreground">
                {l.label}
              </span>
              <span className="block truncate font-mono text-[12.5px] text-foreground/85">
                {l.value}
              </span>
            </span>
            <l.icon className="size-4 shrink-0 text-primary" />
          </a>
        ))}
      </div>
    </article>
  );
}

export function PortfolioView({ collectionId, docs }: { collectionId: string; docs: Doc[] }) {
  if (collectionId === "profile") return <ProfileCard doc={docs[0]!} />;
  if (collectionId === "contact") return <ContactCard doc={docs[0]!} />;
  if (collectionId === "projects")
    return (
      <div className="grid gap-4 xl:grid-cols-2">
        {docs.map((d, i) => (
          <ProjectCard key={i} doc={d} i={i} />
        ))}
      </div>
    );
  if (collectionId === "skills")
    return (
      <div className="grid gap-4 md:grid-cols-2">
        {docs.map((d, i) => (
          <SkillCard key={i} doc={d} i={i} />
        ))}
      </div>
    );
  return <Timeline docs={docs} kind={collectionId === "education" ? "education" : "achievements"} />;
}
