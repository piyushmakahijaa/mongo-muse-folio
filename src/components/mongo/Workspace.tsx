import { useMemo, useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  Clock,
  Database,
  FileJson,
  Folder,
  Layers,
  List,
  Plus,
  RefreshCw,
  Search,
  Server,
  Settings,
  Sparkles,
  Table2,
  TerminalSquare,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import { DocumentView } from "./JsonView";
import { Shell } from "./Shell";
import {
  CLUSTER,
  DB_NAME,
  collections,
  documents,
  schemaOf,
  type Doc,
} from "@/lib/portfolio-data";

type TabId = "documents" | "aggregations" | "schema" | "indexes" | "validation";

const AGG_PIPELINE = [
  { stage: "$match", body: "{ openToWork: true }" },
  { stage: "$unwind", body: "'$stack'" },
  { stage: "$group", body: "{ _id: '$stack', builds: { $sum: 1 } }" },
  { stage: "$sort", body: "{ builds: -1 }" },
];

function ToolbarButton({
  icon: Icon,
  label,
  tone = "ghost",
}: {
  icon: typeof Plus;
  label: string;
  tone?: "ghost" | "green";
}) {
  return (
    <span
      className={`inline-flex select-none items-center gap-1.5 rounded border px-2.5 py-1 text-[11.5px] font-semibold uppercase tracking-wide ${
        tone === "green"
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border bg-card text-foreground/80"
      }`}
    >
      <Icon className="size-3.5" />
      {label}
    </span>
  );
}

function DocumentsTab({ docs, collectionId }: { docs: Doc[]; collectionId: string }) {
  const [mode, setMode] = useState<"list" | "json" | "table">("list");
  const tableFields = useMemo(() => {
    const keys = new Set<string>();
    docs.forEach((d) => Object.keys(d).forEach((k) => keys.add(k)));
    return [...keys].slice(0, 6);
  }, [docs]);

  return (
    <div className="space-y-3">
      {/* action toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-1.5">
          <ToolbarButton icon={Plus} label="Add data" tone="green" />
          <ToolbarButton icon={Upload} label="Export data" />
          <ToolbarButton icon={Trash2} label="Delete" />
        </div>
        <div className="flex items-center gap-2">
          <span className="font-mono text-[11.5px] text-muted-foreground">
            1 – {docs.length} of {docs.length}
          </span>
          <RefreshCw className="size-3.5 text-muted-foreground" />
          <div className="flex overflow-hidden rounded border border-border">
            {(
              [
                ["list", List],
                ["json", FileJson],
                ["table", Table2],
              ] as const
            ).map(([m, Icon]) => (
              <button
                key={m}
                type="button"
                aria-label={`${m} view`}
                onClick={() => setMode(m)}
                className={`px-2 py-1 transition-colors ${
                  mode === m ? "bg-accent text-primary" : "bg-card text-muted-foreground"
                }`}
              >
                <Icon className="size-3.5" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {mode === "table" ? (
        <div className="doc-in overflow-x-auto rounded border border-border bg-card">
          <table className="w-full border-collapse text-left font-mono text-[12px]">
            <thead>
              <tr className="border-b border-border bg-surface">
                {tableFields.map((f) => (
                  <th key={f} className="whitespace-nowrap px-3 py-2 font-semibold text-key">
                    {f}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {docs.map((d, i) => (
                <tr key={i} className="border-b border-border/70 last:border-0">
                  {tableFields.map((f) => {
                    const v = d[f];
                    const text = Array.isArray(v)
                      ? `Array (${v.length})`
                      : typeof v === "string"
                        ? v
                        : String(v ?? "—");
                    return (
                      <td
                        key={f}
                        className="max-w-[220px] truncate px-3 py-2 text-foreground/80"
                        title={text}
                      >
                        {text}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : mode === "json" ? (
        <pre className="doc-in overflow-x-auto rounded border border-border bg-card p-4 font-mono text-[12px] leading-relaxed text-foreground/85">
          {JSON.stringify(docs, null, 2)}
        </pre>
      ) : (
        <div className="space-y-2.5">
          {docs.map((d, i) => (
            <article
              key={i}
              style={{ animationDelay: `${i * 55}ms` }}
              className="doc-in rounded border border-border bg-card px-4 py-3.5 transition-shadow hover:shadow-panel"
            >
              <DocumentView doc={d} />
            </article>
          ))}
        </div>
      )}

      <p className="pt-1 font-mono text-[11px] text-muted-foreground">
        Query returned {docs.length} document{docs.length === 1 ? "" : "s"} from {DB_NAME}.
        {collectionId}
      </p>
    </div>
  );
}

function AggregationsTab({ docs }: { docs: Doc[] }) {
  const [stage, setStage] = useState(AGG_PIPELINE.length - 1);
  const preview = useMemo(() => {
    const counts = new Map<string, number>();
    docs.forEach((d) => {
      const arr = (d["stack"] ?? d["items"] ?? d["strengths"] ?? []) as string[];
      arr.forEach?.((s) => counts.set(s, (counts.get(s) ?? 0) + 1));
    });
    return [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 12);
  }, [docs]);

  return (
    <div className="grid gap-4 lg:grid-cols-[300px_1fr]">
      <div className="space-y-2">
        {AGG_PIPELINE.map((s, i) => (
          <button
            key={s.stage}
            type="button"
            onClick={() => setStage(i)}
            className={`w-full rounded border px-3 py-2 text-left transition-colors ${
              i <= stage ? "border-primary/50 bg-accent" : "border-border bg-card"
            }`}
          >
            <span className="font-mono text-[12px] font-semibold text-primary">{s.stage}</span>
            <p className="mt-0.5 font-mono text-[11.5px] text-muted-foreground">{s.body}</p>
          </button>
        ))}
      </div>
      <div className="rounded border border-border bg-card p-4">
        <p className="font-mono text-[11px] uppercase tracking-wide text-muted-foreground">
          Stage output preview
        </p>
        {preview.length === 0 ? (
          <p className="mt-3 font-mono text-[12px] text-muted-foreground">
            No array fields in this collection to unwind.
          </p>
        ) : (
          <div className="mt-3 space-y-1.5">
            {preview.map(([k, v]) => (
              <div key={k} className="flex items-center gap-3">
                <span className="w-44 shrink-0 truncate font-mono text-[12px] text-key">{k}</span>
                <span className="h-2 rounded-full bg-leaf" style={{ width: `${v * 34}px` }} />
                <span className="font-mono text-[11.5px] text-number">{v}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function SchemaTab({ docs }: { docs: Doc[] }) {
  const schema = schemaOf(docs);
  return (
    <div className="overflow-hidden rounded border border-border bg-card">
      <table className="w-full border-collapse text-left font-mono text-[12px]">
        <thead>
          <tr className="border-b border-border bg-surface text-[11px] uppercase tracking-wide text-muted-foreground">
            <th className="px-3 py-2">Field</th>
            <th className="px-3 py-2">Type</th>
            <th className="px-3 py-2">Coverage</th>
          </tr>
        </thead>
        <tbody>
          {schema.map((f) => (
            <tr key={f.name} className="border-b border-border/70 last:border-0">
              <td className="px-3 py-2 text-key">{f.name}</td>
              <td className="px-3 py-2 text-string">{f.types}</td>
              <td className="px-3 py-2">
                <span className="flex items-center gap-2">
                  <span className="h-1.5 w-24 rounded-full bg-muted">
                    <span
                      className="block h-1.5 rounded-full bg-leaf"
                      style={{ width: `${f.coverage}%` }}
                    />
                  </span>
                  <span className="text-number">{f.coverage}%</span>
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function IndexesTab({ collectionId }: { collectionId: string }) {
  const col = collections.find((c) => c.id === collectionId)!;
  return (
    <div className="overflow-hidden rounded border border-border bg-card">
      <table className="w-full border-collapse text-left font-mono text-[12px]">
        <thead>
          <tr className="border-b border-border bg-surface text-[11px] uppercase tracking-wide text-muted-foreground">
            <th className="px-3 py-2">Name</th>
            <th className="px-3 py-2">Keys</th>
            <th className="px-3 py-2">Type</th>
            <th className="px-3 py-2">Size</th>
          </tr>
        </thead>
        <tbody>
          {col.indexes.map((idx) => (
            <tr key={idx.name} className="border-b border-border/70 last:border-0">
              <td className="px-3 py-2 text-key">{idx.name}</td>
              <td className="px-3 py-2 text-string">{idx.keys}</td>
              <td className="px-3 py-2">
                <span className="rounded bg-accent px-1.5 py-0.5 text-[10.5px] text-primary">
                  {idx.type}
                </span>
              </td>
              <td className="px-3 py-2 text-number">{idx.size}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ValidationTab({ collectionId }: { collectionId: string }) {
  const col = collections.find((c) => c.id === collectionId)!;
  return (
    <div className="rounded border border-border bg-card p-4">
      <p className="font-mono text-[11px] uppercase tracking-wide text-muted-foreground">
        $jsonSchema
      </p>
      <pre className="mt-3 overflow-x-auto font-mono text-[12px] leading-relaxed text-foreground/85">
        {`{
  $jsonSchema: {
    bsonType: "object",
    title: "${col.name}",
    description: "${col.description}",
    required: [ "_id" ],
    additionalProperties: true
  }
}`}
      </pre>
    </div>
  );
}

export function Workspace() {
  const [active, setActive] = useState("profile");
  const [tab, setTab] = useState<TabId>("documents");
  const [shellOpen, setShellOpen] = useState(false);
  const [dbOpen, setDbOpen] = useState(true);

  const col = collections.find((c) => c.id === active)!;
  const docs = documents[active] ?? [];

  const tabs: { id: TabId; label: string; badge?: number }[] = [
    { id: "documents", label: "Documents", badge: docs.length },
    { id: "aggregations", label: "Aggregations" },
    { id: "schema", label: "Schema" },
    { id: "indexes", label: "Indexes", badge: col.indexes.length },
    { id: "validation", label: "Validation" },
  ];

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-surface">
      {/* menu bar */}
      <div className="flex shrink-0 items-center gap-5 border-b border-border bg-card px-4 py-1.5 text-[12px] text-foreground/70">
        {["Connections", "Edit", "View", "Collection", "Help"].map((m) => (
          <span key={m}>{m}</span>
        ))}
      </div>

      <div className="flex min-h-0 flex-1 overflow-hidden">
        {/* sidebar */}
        <aside className="hidden w-64 shrink-0 flex-col overflow-y-auto border-r border-border bg-sidebar md:flex">
          <div className="flex items-center justify-between px-4 py-3">
            <span className="text-[17px] font-semibold tracking-tight text-foreground">
              Compass
            </span>
            <Settings className="size-4 text-muted-foreground" />
          </div>
          <div className="space-y-1 px-3 pb-3 text-[13px]">
            <p className="flex items-center gap-2 rounded px-2 py-1.5 text-foreground/80">
              <span className="font-mono text-primary">{"{}"}</span> My Queries
            </p>
            <p className="flex items-center gap-2 rounded px-2 py-1.5 text-foreground/80">
              <Layers className="size-3.5 text-muted-foreground" /> Data Modeling
            </p>
          </div>

          <div className="border-t border-border px-4 py-3">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
              Connections (1)
            </p>
            <div className="mt-2 flex items-center gap-2 rounded border border-border bg-card px-2 py-1.5">
              <Search className="size-3.5 text-muted-foreground" />
              <span className="text-[12px] text-muted-foreground">Search connections</span>
            </div>
          </div>

          <nav className="px-2 pb-6 text-[13px]">
            <div className="flex items-center gap-1.5 rounded px-2 py-1.5 text-foreground">
              <ChevronDown className="size-3.5 text-muted-foreground" />
              <Server className="size-3.5 text-primary" />
              <span className="font-mono text-[12.5px]">{CLUSTER}</span>
            </div>
            <button
              type="button"
              onClick={() => setDbOpen((o) => !o)}
              className="ml-4 flex w-[calc(100%-1rem)] items-center gap-1.5 rounded px-2 py-1.5 text-left hover:bg-accent"
            >
              {dbOpen ? (
                <ChevronDown className="size-3.5 text-muted-foreground" />
              ) : (
                <ChevronRight className="size-3.5 text-muted-foreground" />
              )}
              <Database className="size-3.5 text-primary" />
              <span className="font-mono text-[12.5px]">{DB_NAME}</span>
            </button>
            {dbOpen && (
              <div className="ml-9 space-y-0.5">
                {collections.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setActive(c.id)}
                    className={`flex w-full items-center justify-between gap-2 rounded px-2 py-1.5 text-left transition-colors ${
                      active === c.id
                        ? "bg-accent font-medium text-primary"
                        : "text-foreground/80 hover:bg-accent/60"
                    }`}
                  >
                    <span className="flex items-center gap-2 font-mono text-[12.5px]">
                      <Folder
                        className={`size-3.5 ${active === c.id ? "text-primary" : "text-muted-foreground"}`}
                      />
                      {c.name}
                    </span>
                    <span className="font-mono text-[10.5px] text-muted-foreground">{c.count}</span>
                  </button>
                ))}
              </div>
            )}
          </nav>
        </aside>

        {/* main */}
        <main className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden bg-card">
          {/* window tabs */}
          <div className="flex shrink-0 items-center gap-0 border-b border-border bg-surface pr-3">
            <div className="flex items-center gap-2 border-r border-border px-4 py-2.5 text-[12.5px] text-muted-foreground">
              <Server className="size-3.5" /> {CLUSTER}
            </div>
            <div className="flex items-center gap-2 border-r border-border bg-card px-4 py-2.5 text-[12.5px] font-medium text-foreground">
              <Folder className="size-3.5 text-primary" /> {col.name}
              <X className="size-3 text-muted-foreground" />
            </div>
            <Plus className="mx-3 size-4 text-muted-foreground" />
            <button
              type="button"
              onClick={() => setShellOpen((s) => !s)}
              className="ml-auto inline-flex items-center gap-1.5 rounded border border-border bg-card px-3 py-1.5 text-[12px] font-medium text-foreground hover:border-primary"
            >
              <TerminalSquare className="size-3.5 text-primary" />
              {shellOpen ? "Close MongoDB shell" : "Open MongoDB shell"}
            </button>
          </div>

          {/* mobile collection picker */}
          <div className="flex gap-2 overflow-x-auto border-b border-border px-3 py-2 md:hidden">
            {collections.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setActive(c.id)}
                className={`whitespace-nowrap rounded-full border px-3 py-1 font-mono text-[11.5px] ${
                  active === c.id
                    ? "border-primary bg-accent text-primary"
                    : "border-border text-muted-foreground"
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto">
            <div className="px-5 pb-10 pt-4">
              {/* breadcrumb */}
              <div className="flex flex-wrap items-center gap-1.5 font-mono text-[13px]">
                <span className="text-primary">{CLUSTER}</span>
                <ChevronRight className="size-3.5 text-muted-foreground" />
                <span className="text-primary">{DB_NAME}</span>
                <ChevronRight className="size-3.5 text-muted-foreground" />
                <span className="font-semibold text-foreground">{col.name}</span>
              </div>
              <p className="mt-1 text-[12.5px] text-muted-foreground">{col.description}</p>

              {/* tabs */}
              <div className="mt-3 flex gap-5 overflow-x-auto border-b border-border">
                {tabs.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setTab(t.id)}
                    className={`-mb-px whitespace-nowrap border-b-2 px-1 pb-2.5 text-[13px] transition-colors ${
                      tab === t.id
                        ? "border-leaf font-semibold text-foreground"
                        : "border-transparent text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {t.label}
                    {t.badge !== undefined && (
                      <span className="ml-1.5 rounded bg-muted px-1.5 py-0.5 font-mono text-[10.5px] text-muted-foreground">
                        {t.badge}
                      </span>
                    )}
                  </button>
                ))}
              </div>

              {/* query bar */}
              <div className="mt-4 flex flex-wrap items-center gap-3 rounded border border-border bg-surface px-3 py-2.5">
                <Clock className="size-3.5 shrink-0 text-muted-foreground" />
                <code className="min-w-0 flex-1 truncate font-mono text-[12.5px] text-foreground/85">
                  <span className="text-muted-foreground">Type a query: </span>
                  {col.query}
                </code>
                <span className="hidden items-center gap-1 font-mono text-[11.5px] text-primary sm:inline-flex">
                  <Sparkles className="size-3" /> Generate query
                </span>
                <span className="rounded border border-border bg-card px-2.5 py-1 text-[11.5px] font-semibold text-foreground/80">
                  Explain
                </span>
                <span className="rounded border border-border bg-card px-2.5 py-1 text-[11.5px] text-muted-foreground">
                  Reset
                </span>
                <span className="rounded bg-primary px-3 py-1 text-[11.5px] font-semibold text-primary-foreground">
                  Find
                </span>
              </div>

              <div className="mt-4">
                {tab === "documents" && <DocumentsTab docs={docs} collectionId={active} />}
                {tab === "aggregations" && <AggregationsTab docs={docs} />}
                {tab === "schema" && <SchemaTab docs={docs} />}
                {tab === "indexes" && <IndexesTab collectionId={active} />}
                {tab === "validation" && <ValidationTab collectionId={active} />}
              </div>
            </div>
          </div>

          {shellOpen && (
            <div className="h-56 shrink-0">
              <Shell active={col.name} onSelect={setActive} />
            </div>
          )}

          {/* status bar */}
          <div className="flex shrink-0 flex-wrap items-center justify-between gap-2 border-t border-border bg-surface px-4 py-1.5 font-mono text-[11px] text-muted-foreground">
            <span>
              {DB_NAME}.{col.name} · {col.storage} · {col.indexes.length} index
              {col.indexes.length === 1 ? "" : "es"}
            </span>
            <span>Built by Piyush Makhija · MongoDB 7.0.5 · connected</span>
          </div>
        </main>
      </div>
    </div>
  );
}
