import { useState, type ReactNode } from "react";
import { ChevronRight } from "lucide-react";

type Props = {
  value: unknown;
  name?: string;
  depth?: number;
  defaultOpen?: boolean;
};

function Punct({ children }: { children: ReactNode }) {
  return <span className="text-muted-foreground/70">{children}</span>;
}

function Scalar({ value }: { value: unknown }) {
  if (typeof value === "string") {
    if (value.startsWith("ObjectId(")) {
      return <span className="text-objectid">{value}</span>;
    }
    return <span className="text-string">&quot;{value}&quot;</span>;
  }
  if (typeof value === "number") return <span className="text-number">{value}</span>;
  if (typeof value === "boolean")
    return <span className="text-number">{value ? "true" : "false"}</span>;
  return <span className="text-muted-foreground">null</span>;
}

export function JsonView({ value, name, depth = 0, defaultOpen = true }: Props) {
  const [open, setOpen] = useState(defaultOpen || depth < 1);
  const isArray = Array.isArray(value);
  const isObject = !isArray && typeof value === "object" && value !== null;

  if (!isArray && !isObject) {
    return (
      <div className="flex flex-wrap gap-x-2 font-mono text-[12.5px] leading-6">
        {name && <span className="text-key">{name}:</span>}
        <Scalar value={value} />
      </div>
    );
  }

  const entries: [string, unknown][] = isArray
    ? (value as unknown[]).map((v, i) => [String(i), v])
    : Object.entries(value as Record<string, unknown>);

  return (
    <div className="font-mono text-[12.5px] leading-6">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="group flex items-center gap-1 text-left hover:text-foreground"
      >
        <ChevronRight
          className={`size-3 shrink-0 text-muted-foreground transition-transform ${open ? "rotate-90" : ""}`}
        />
        {name && <span className="text-key">{name}:</span>}
        <Punct>{isArray ? "[" : "{"}</Punct>
        {!open && (
          <span className="text-muted-foreground/60">
            {entries.length} {isArray ? "items" : "fields"}
            <Punct>{isArray ? "]" : "}"}</Punct>
          </span>
        )}
      </button>
      {open && (
        <>
          <div className="ml-[7px] border-l border-border/70 pl-4">
            {entries.map(([k, v]) => (
              <JsonView key={k} name={isArray ? undefined : k} value={v} depth={depth + 1} />
            ))}
          </div>
          <div className="ml-[7px] pl-4">
            <Punct>{isArray ? "]" : "}"}</Punct>
          </div>
        </>
      )}
    </div>
  );
}
