import { useState, type ReactNode } from "react";
import { ChevronRight } from "lucide-react";

type Props = {
  value: unknown;
  name?: string | undefined;
  depth?: number;
  defaultOpen?: boolean;
};

function Punct({ children }: { children: ReactNode }) {
  return <span className="text-muted-foreground">{children}</span>;
}

function isUrl(v: string) {
  return v.startsWith("http://") || v.startsWith("https://");
}

function Scalar({ value }: { value: unknown }) {
  if (typeof value === "string") {
    if (value.startsWith("ObjectId(")) {
      return <span className="text-objectid">{value}</span>;
    }
    if (/^\d{4}-\d{2}-\d{2}T/.test(value)) {
      return <span className="text-date">{value}</span>;
    }
    if (isUrl(value)) {
      return (
        <a
          href={value}
          target="_blank"
          rel="noreferrer"
          className="text-string underline decoration-string/40 underline-offset-2 hover:decoration-string"
        >
          &quot;{value}&quot;
        </a>
      );
    }
    return <span className="text-string">&quot;{value}&quot;</span>;
  }
  if (typeof value === "number") return <span className="text-number">{value}</span>;
  if (typeof value === "boolean")
    return <span className="text-boolean">{value ? "true" : "false"}</span>;
  return <span className="text-muted-foreground">null</span>;
}

export function JsonView({ value, name, depth = 0, defaultOpen = false }: Props) {
  const [open, setOpen] = useState(defaultOpen);
  const isArray = Array.isArray(value);
  const isObject = !isArray && typeof value === "object" && value !== null;

  if (!isArray && !isObject) {
    return (
      <div className="flex gap-1.5 font-mono text-[12.5px] leading-[1.65]">
        {name && (
          <span className="shrink-0 text-key">
            {name}
            <Punct>:</Punct>
          </span>
        )}
        <span className="min-w-0 break-words">
          <Scalar value={value} />
        </span>
      </div>
    );
  }

  const entries: [string, unknown][] = isArray
    ? (value as unknown[]).map((v, i) => [String(i), v])
    : Object.entries(value as Record<string, unknown>);

  return (
    <div className="font-mono text-[12.5px] leading-[1.65]">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="-ml-3.5 flex items-center gap-1 text-left"
      >
        <ChevronRight
          className={`size-3 shrink-0 text-muted-foreground transition-transform ${open ? "rotate-90" : ""}`}
        />
        {name && (
          <span className="text-key">
            {name}
            <Punct>:</Punct>
          </span>
        )}
        <span className="text-muted-foreground">
          {isArray ? `Array (${entries.length})` : `Object (${entries.length})`}
        </span>
      </button>
      {open && (
        <div className="ml-3 border-l border-border pl-3">
          {entries.map(([k, v]) => (
            <JsonView key={k} name={isArray ? `${k}` : k} value={v} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

export function DocumentView({ doc }: { doc: Record<string, unknown> }) {
  return (
    <div className="space-y-0.5 pl-3.5">
      {Object.entries(doc).map(([k, v]) => (
        <JsonView key={k} name={k} value={v} />
      ))}
    </div>
  );
}
