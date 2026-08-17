import { useMemo, useState } from "react";
import {
  Activity,
  ArrowUpRight,
  Database,
  Folder,
  Layers,
  Mail,
  Search,
  Sparkles,
  TerminalSquare,
  Trophy,
} from "lucide-react";
import { JsonView } from "./JsonView";
import { Shell } from "./Shell";
import {
  DB_NAME,
  achievements,
  collections,
  contact,
  education,
  profile,
  projects,
  skillGroups,
} from "@/lib/portfolio-data";

const QUERIES: Record<string, string> = {
  profile: "db.profile.findOne({ open_to_work: true })",
  projects: "db.projects.find().sort({ year: -1 })",
  skills: "db.skills.aggregate([{ $group: { _id: '$category', items: { $push: '$name' } } }])",
  education: "db.education.find().sort({ period: -1 })",
  contact: "db.contact.insertOne({ from: '<you>', message: '...' })",
};

const EXPLAIN: Record<string, { examined: number; returned: number; ms: number; index: string }> = {
  profile: { examined: 1, returned: 1, ms: 0.4, index: "open_to_work_1" },
  projects: { examined: 4, returned: 4, ms: 1.2, index: "year_-1" },
  skills: { examined: 30, returned: 5, ms: 2.1, index: "COLLSCAN → $group" },
  education: { examined: 3, returned: 3, ms: 0.6, index: "period_-1" },
  contact: { examined: 0, returned: 1, ms: 0.3, index: "acknowledged" },
};

function Panel({
  title,
  meta,
  children,
}: {
  title: string;
  meta?: string;
  children: React.ReactNode;
}) {
  return (
    <article className="doc-in overflow-hidden rounded-lg border border-border bg-card shadow-panel transition-colors hover:border-leaf-dim">
      <header className="flex items-center justify-between gap-3 border-b border-border/70 bg-surface-raised/40 px-4 py-2.5">
        <span className="font-mono text-[11.5px] text-objectid">{title}</span>
        {meta && <span className="font-mono text-[11px] text-muted-foreground">{meta}</span>}
      </header>
      <div className="px-4 py-4">{children}</div>
    </article>
  );
}

function ProfileView() {
  return (
    <div className="space-y-5">
      <div className="doc-in relative overflow-hidden rounded-lg border border-leaf-dim bg-card p-6 shadow-leaf sm:p-8">
        <div className="pointer-events-none absolute inset-0 grid-canvas opacity-60" />
        <div className="relative">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-leaf">
            {DB_NAME} · profile · 1 document
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-glow-leaf sm:text-5xl">
            {profile.name}
          </h1>
          <p className="mt-2 font-mono text-sm text-leaf">{profile.role}</p>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
            {profile.summary}
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {profile.focus.map((f) => (
              <span
                key={f}
                className="rounded-full border border-leaf-dim bg-leaf-deep/50 px-3 py-1 font-mono text-[11px] text-leaf"
              >
                {f}
              </span>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={contact.website.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-md bg-primary px-4 py-2 font-mono text-[12px] font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              live deployment <ArrowUpRight className="size-3.5" />
            </a>
            <a
              href={`mailto:${contact.email}`}
              className="inline-flex items-center gap-1.5 rounded-md border border-border bg-surface px-4 py-2 font-mono text-[12px] text-foreground transition-colors hover:border-leaf-dim"
            >
              <Mail className="size-3.5" /> {contact.email}
            </a>
          </div>
        </div>
      </div>

      <Panel title="_id: ObjectId(&quot;piyush_makhija&quot;)" meta="raw document">
        <JsonView value={profile} />
      </Panel>

      <Panel title="collection: achievements (embedded)" meta={`${achievements.length} entries`}>
        <ul className="space-y-2.5">
          {achievements.map((a) => (
            <li key={a} className="flex gap-2.5 text-[13.5px] text-muted-foreground">
              <Trophy className="mt-0.5 size-3.5 shrink-0 text-string" />
              {a}
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  );
}

function ProjectsView() {
  return (
    <div className="space-y-4">
      {projects.map((p, i) => (
        <article
          key={p._id}
          style={{ animationDelay: `${i * 70}ms` }}
          className="doc-in group overflow-hidden rounded-lg border border-border bg-card shadow-panel transition-colors hover:border-leaf-dim"
        >
          <header className="flex flex-wrap items-center justify-between gap-2 border-b border-border/70 bg-surface-raised/40 px-4 py-2.5">
            <span className="font-mono text-[11.5px] text-objectid">_id: {p._id}</span>
            <span className="flex items-center gap-2 font-mono text-[11px] text-muted-foreground">
              <span className="size-1.5 rounded-full bg-leaf pulse-ring" />
              {p.status} · {p.year}
            </span>
          </header>
          <div className="px-4 py-4">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h2 className="text-lg font-semibold">{p.title}</h2>
              <span className="font-mono text-[11px] text-muted-foreground">{p.role}</span>
            </div>
            <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">{p.summary}</p>
            <ul className="mt-3 space-y-1.5 border-l border-border pl-3.5">
              {p.highlights.map((h) => (
                <li key={h} className="font-mono text-[12px] leading-5 text-muted-foreground">
                  <span className="text-key">→ </span>
                  {h}
                </li>
              ))}
            </ul>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              {p.stack.map((s) => (
                <span
                  key={s}
                  className="rounded border border-border px-2 py-0.5 font-mono text-[11px] text-muted-foreground transition-colors group-hover:border-leaf-dim group-hover:text-leaf"
                >
                  {s}
                </span>
              ))}
            </div>
            {p.link && (
              <a
                href={p.link.href}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center gap-1 font-mono text-[12px] text-leaf hover:underline"
              >
                {p.link.label} <ArrowUpRight className="size-3.5" />
              </a>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}

function SkillsView() {
  const stages = ["$match", "$unwind", "$group", "$sort"];
  return (
    <div className="space-y-5">
      <div className="doc-in rounded-lg border border-border bg-card p-4 shadow-panel">
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
          aggregation pipeline
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          {stages.map((s, i) => (
            <span key={s} className="flex items-center gap-2">
              <span className="rounded border border-leaf-dim bg-leaf-deep/40 px-2.5 py-1 font-mono text-[11.5px] text-leaf">
                {s}
              </span>
              {i < stages.length - 1 && (
                <span className="relative block h-px w-8 overflow-hidden bg-border">
                  <span className="shard-flow absolute inset-y-0 w-3 bg-leaf" />
                </span>
              )}
            </span>
          ))}
        </div>
      </div>

      {skillGroups.map((g, i) => (
        <article
          key={g._id}
          style={{ animationDelay: `${i * 60}ms` }}
          className="doc-in overflow-hidden rounded-lg border border-border bg-card shadow-panel transition-colors hover:border-leaf-dim"
        >
          <header className="flex items-center justify-between border-b border-border/70 bg-surface-raised/40 px-4 py-2.5">
            <span className="font-mono text-[11.5px]">
              <span className="text-key">_id:</span>{" "}
              <span className="text-string">&quot;{g._id}&quot;</span>
            </span>
            <span className="font-mono text-[11px] text-number">count: {g.count}</span>
          </header>
          <div className="flex flex-wrap gap-2 px-4 py-4">
            {g.items.map((it) => (
              <span
                key={it}
                className="rounded-md border border-border bg-surface px-2.5 py-1 font-mono text-[11.5px] text-foreground/90 transition-colors hover:border-leaf hover:text-leaf"
              >
                {it}
              </span>
            ))}
          </div>
        </article>
      ))}
    </div>
  );
}

function EducationView() {
  return (
    <div className="space-y-4">
      {education.map((e, i) => (
        <Panel key={e._id} title={`_id: ${e._id}`} meta={e.period}>
          <div style={{ animationDelay: `${i * 60}ms` }}>
            <h2 className="text-base font-semibold">{e.institution}</h2>
            <p className="mt-1 font-mono text-[12.5px] text-leaf">{e.qualification}</p>
            <p className="mt-2 font-mono text-[12px] text-muted-foreground">
              {e.place} · <span className="text-number">{e.score}</span>
            </p>
          </div>
        </Panel>
      ))}
    </div>
  );
}

function ContactView() {
  const rows = [
    { k: "email", v: contact.email, href: `mailto:${contact.email}` },
    { k: "phone", v: contact.phone, href: `tel:${contact.phone.replace(/\s/g, "")}` },
    { k: "github", v: contact.github.label, href: contact.github.href },
    { k: "linkedin", v: contact.linkedin.label, href: contact.linkedin.href },
    { k: "website", v: contact.website.label, href: contact.website.href },
  ];
  return (
    <Panel title="db.contact.insertOne(...)" meta="acknowledged: true">
      <div className="space-y-2">
        {rows.map((r) => (
          <a
            key={r.k}
            href={r.href}
            target={r.href.startsWith("http") ? "_blank" : undefined}
            rel="noreferrer"
            className="flex flex-wrap items-center gap-2 rounded-md border border-transparent px-2 py-1.5 font-mono text-[12.5px] transition-colors hover:border-leaf-dim hover:bg-surface-raised/50"
          >
            <span className="text-key">{r.k}:</span>
            <span className="text-string">&quot;{r.v}&quot;</span>
            <ArrowUpRight className="size-3.5 text-muted-foreground" />
          </a>
        ))}
      </div>
    </Panel>
  );
}

export function Workspace() {
  const [active, setActive] = useState("profile");
  const [shellOpen, setShellOpen] = useState(true);
  const explain = EXPLAIN[active]!;
  const view = useMemo(() => {
    switch (active) {
      case "projects":
        return <ProjectsView />;
      case "skills":
        return <SkillsView />;
      case "education":
        return <EducationView />;
      case "contact":
        return <ContactView />;
      default:
        return <ProfileView />;
    }
  }, [active]);

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-background">
      {/* connection bar */}
      <header className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-b border-border bg-sidebar px-4 py-2.5">
        <div className="flex items-center gap-2.5">
          <Database className="size-4 text-leaf" />
          <span className="font-mono text-[12.5px] text-foreground">
            piyush@cluster0<span className="text-muted-foreground">:27017</span>
          </span>
          <span className="hidden items-center gap-1.5 rounded-full border border-leaf-dim bg-leaf-deep/40 px-2.5 py-0.5 font-mono text-[10.5px] text-leaf sm:inline-flex">
            <span className="size-1.5 rounded-full bg-leaf pulse-ring" /> PRIMARY · connected
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="hidden font-mono text-[11px] text-muted-foreground md:inline">
            <Activity className="mr-1 inline size-3 text-leaf" />
            oplog: 0 lag · 3 nodes
          </span>
          <button
            type="button"
            onClick={() => setShellOpen((s) => !s)}
            className="inline-flex items-center gap-1.5 rounded-md border border-border bg-surface px-3 py-1.5 font-mono text-[11.5px] text-foreground transition-colors hover:border-leaf-dim"
          >
            <TerminalSquare className="size-3.5 text-leaf" />
            {shellOpen ? "hide shell" : "open shell"}
          </button>
        </div>
      </header>

      <div className="flex min-h-0 flex-1 overflow-hidden">
        {/* sidebar */}
        <aside className="hidden w-64 shrink-0 flex-col overflow-y-auto border-r border-sidebar-border bg-sidebar px-3 py-4 md:flex">
          <p className="px-2 font-mono text-[10.5px] uppercase tracking-[0.16em] text-muted-foreground">
            Databases (1)
          </p>
          <div className="mt-3 flex items-center gap-2 rounded-md bg-sidebar-accent px-2 py-1.5">
            <Layers className="size-3.5 text-leaf" />
            <span className="font-mono text-[12px]">{DB_NAME}</span>
          </div>
          <nav className="mt-1 space-y-0.5 border-l border-sidebar-border pl-3">
            {collections.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setActive(c.id)}
                className={`flex w-full items-center justify-between gap-2 rounded-md px-2 py-1.5 text-left transition-colors ${
                  active === c.id
                    ? "bg-sidebar-accent text-leaf"
                    : "text-sidebar-foreground/80 hover:bg-sidebar-accent/50"
                }`}
              >
                <span className="flex items-center gap-2 font-mono text-[12px]">
                  <Folder className="size-3.5 opacity-70" />
                  {c.name}
                </span>
                <span className="font-mono text-[10.5px] text-muted-foreground">{c.count}</span>
              </button>
            ))}
          </nav>

          <div className="mt-auto space-y-2 pt-6">
            <p className="px-2 font-mono text-[10.5px] uppercase tracking-[0.16em] text-muted-foreground">
              Cluster
            </p>
            <dl className="space-y-1 px-2 font-mono text-[11px] text-muted-foreground">
              <div className="flex justify-between">
                <dt>storage</dt>
                <dd className="text-foreground/80">150.3 kB</dd>
              </div>
              <div className="flex justify-between">
                <dt>indexes</dt>
                <dd className="text-foreground/80">8</dd>
              </div>
              <div className="flex justify-between">
                <dt>uptime</dt>
                <dd className="text-foreground/80">since 2022</dd>
              </div>
            </dl>
          </div>
        </aside>

        {/* main */}
        <main className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
          {/* mobile collection tabs */}
          <div className="flex gap-2 overflow-x-auto border-b border-border bg-sidebar px-3 py-2 md:hidden">
            {collections.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setActive(c.id)}
                className={`whitespace-nowrap rounded-full border px-3 py-1 font-mono text-[11.5px] ${
                  active === c.id
                    ? "border-leaf-dim bg-leaf-deep/50 text-leaf"
                    : "border-border text-muted-foreground"
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto">
            <div className="mx-auto max-w-4xl px-4 py-5 sm:px-6">
              {/* query bar */}
              <div className="flex items-center gap-3 rounded-lg border border-border bg-surface px-3.5 py-2.5">
                <Search className="size-3.5 shrink-0 text-leaf" />
                <code className="flex-1 truncate font-mono text-[12.5px] text-leaf">
                  {QUERIES[active]}
                </code>
                <span className="inline-block size-2 caret-blink bg-leaf" />
              </div>
              <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 px-1 font-mono text-[11px] text-muted-foreground">
                <span>
                  <Sparkles className="mr-1 inline size-3 text-string" />
                  docs examined: <span className="text-number">{explain.examined}</span>
                </span>
                <span>
                  returned: <span className="text-number">{explain.returned}</span>
                </span>
                <span>
                  executionTimeMillis: <span className="text-number">{explain.ms}</span>
                </span>
                <span className="text-leaf/80">plan: {explain.index}</span>
              </div>

              <div className="mt-5 pb-10">{view}</div>

              <footer className="border-t border-border pb-8 pt-4 font-mono text-[11px] text-muted-foreground">
                connection closed cleanly · built by Piyush Makhija · {DB_NAME}
              </footer>
            </div>
          </div>

          {shellOpen && (
            <div className="h-56 shrink-0">
              <Shell active={active} onSelect={setActive} />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
