import { useEffect, useRef, useState, type FormEvent } from "react";
import { DB_NAME, collections } from "@/lib/portfolio-data";

type Line = { kind: "in" | "out" | "err"; text: string };

const HELP = [
  "show collections            list every collection in this database",
  "use <collection>            open a collection in the workspace",
  "db.<collection>.find()      run the collection query",
  "db.stats()                  cluster summary",
  "whoami                      the short version",
  "clear                       wipe the shell",
].join("\n");

export function Shell({
  active,
  onSelect,
}: {
  active: string;
  onSelect: (id: string) => void;
}) {
  const [lines, setLines] = useState<Line[]>([
    { kind: "out", text: `Connected to ${DB_NAME} — type "help" to explore.` },
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [lines]);

  function run(raw: string) {
    const cmd = raw.trim();
    if (!cmd) return;
    const push = (l: Line[]) => setLines((prev) => [...prev, { kind: "in", text: cmd }, ...l]);

    if (cmd === "clear") {
      setLines([]);
      return;
    }
    if (cmd === "help") return push([{ kind: "out", text: HELP }]);
    if (cmd === "whoami")
      return push([
        {
          kind: "out",
          text: "Piyush Makhija — full-stack developer (APIs, real-time systems, applied AI). B.E. Computer Engineering, Mumbai.",
        },
      ]);
    if (cmd === "show collections" || cmd === "show dbs")
      return push([{ kind: "out", text: collections.map((c) => `${c.name}  (${c.count} docs)`).join("\n") }]);
    if (cmd === "db.stats()")
      return push([
        {
          kind: "out",
          text: `{ db: "${DB_NAME}", collections: ${collections.length}, objects: ${collections.reduce((a, c) => a + c.count, 0)}, ok: 1 }`,
        },
      ]);

    const useMatch = cmd.match(/^use\s+([a-z_]+)$/i);
    const findMatch = cmd.match(/^db\.([a-z_]+)\.(find|aggregate|findOne|count)\(/i);
    const target = useMatch?.[1] ?? findMatch?.[1];
    if (target) {
      const found = collections.find((c) => c.name === target.toLowerCase());
      if (!found) return push([{ kind: "err", text: `ns not found: ${DB_NAME}.${target}` }]);
      onSelect(found.id);
      return push([
        { kind: "out", text: `switched to ${DB_NAME}.${found.name} — ${found.count} document(s) rendered above.` },
      ]);
    }

    push([{ kind: "err", text: `Unrecognised command: ${cmd}. Try "help".` }]);
  }

  function submit(e: FormEvent) {
    e.preventDefault();
    run(input);
    setInput("");
  }

  return (
    <div className="flex h-full flex-col overflow-hidden border-t border-border bg-background/80">
      <div className="flex items-center justify-between border-b border-border/70 px-4 py-2">
        <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
          mongosh
        </span>
        <span className="font-mono text-[11px] text-leaf/70">{DB_NAME}.{active}</span>
      </div>
      <div ref={scrollRef} className="min-h-0 flex-1 space-y-1.5 overflow-y-auto px-4 py-3">
        {lines.map((l, i) => (
          <pre
            key={i}
            className={`whitespace-pre-wrap font-mono text-[12px] leading-5 ${
              l.kind === "in"
                ? "text-foreground"
                : l.kind === "err"
                  ? "text-destructive"
                  : "text-muted-foreground"
            }`}
          >
            {l.kind === "in" ? `> ${l.text}` : l.text}
          </pre>
        ))}
      </div>
      <form onSubmit={submit} className="flex items-center gap-2 border-t border-border/70 px-4 py-2.5">
        <span className="font-mono text-[12px] text-leaf">&gt;</span>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          spellCheck={false}
          aria-label="mongosh command input"
          placeholder="db.projects.find()"
          className="w-full bg-transparent font-mono text-[12px] text-foreground outline-none placeholder:text-muted-foreground/50"
        />
      </form>
    </div>
  );
}
