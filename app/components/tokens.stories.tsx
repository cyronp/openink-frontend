import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";

// ─── Token definitions ────────────────────────────────────────────────────────

interface Token {
  name: string;
  value: string;
}

interface TokenGroup {
  label: string;
  tokens: Token[];
}

const RAW_PALETTE: Token[] = [
  { name: "--black",    value: "#000000" },
  { name: "--white",    value: "#ffffff" },
  { name: "--gray-50",  value: "#f7f7f7" },
  { name: "--gray-100", value: "#efefef" },
  { name: "--gray-200", value: "#d9d9d9" },
  { name: "--gray-300", value: "#bebebe" },
  { name: "--gray-400", value: "#a3a3a3" },
  { name: "--gray-500", value: "#808080" },
  { name: "--gray-600", value: "#5c5c5c" },
  { name: "--gray-700", value: "#3d3d3d" },
  { name: "--gray-800", value: "#1f1f1f" },
  { name: "--gray-900", value: "#0a0a0a" },
];

const RESOLVED_MAP: Record<string, string> = {
  "--black":    "#000000",
  "--white":    "#ffffff",
  "--gray-50":  "#f7f7f7",
  "--gray-100": "#efefef",
  "--gray-200": "#d9d9d9",
  "--gray-300": "#bebebe",
  "--gray-400": "#a3a3a3",
  "--gray-500": "#808080",
  "--gray-600": "#5c5c5c",
  "--gray-700": "#3d3d3d",
  "--gray-800": "#1f1f1f",
  "--gray-900": "#0a0a0a",
};

const SEMANTIC_GROUPS: TokenGroup[] = [
  {
    label: "Surfaces",
    tokens: [
      { name: "--background",        value: "var(--white)" },
      { name: "--background-subtle", value: "var(--gray-50)" },
      { name: "--surface",           value: "var(--white)" },
      { name: "--surface-raised",    value: "var(--gray-100)" },
      { name: "--surface-overlay",   value: "var(--gray-200)" },
    ],
  },
  {
    label: "Borders",
    tokens: [
      { name: "--border",        value: "var(--gray-200)" },
      { name: "--border-strong", value: "var(--gray-400)" },
      { name: "--border-focus",  value: "var(--black)" },
    ],
  },
  {
    label: "Text",
    tokens: [
      { name: "--text-primary",   value: "var(--gray-900)" },
      { name: "--text-secondary", value: "var(--gray-600)" },
      { name: "--text-tertiary",  value: "var(--gray-400)" },
      { name: "--text-disabled",  value: "var(--gray-300)" },
      { name: "--text-inverse",   value: "var(--white)" },
    ],
  },
  {
    label: "Interactive",
    tokens: [
      { name: "--interactive-bg",              value: "var(--black)" },
      { name: "--interactive-bg-hover",        value: "var(--gray-800)" },
      { name: "--interactive-bg-active",       value: "var(--gray-700)" },
      { name: "--interactive-bg-subtle",       value: "var(--gray-100)" },
      { name: "--interactive-bg-subtle-hover", value: "var(--gray-200)" },
      { name: "--interactive-fg",              value: "var(--white)" },
      { name: "--interactive-fg-subtle",       value: "var(--gray-900)" },
    ],
  },
  {
    label: "Components",
    tokens: [
      { name: "--primary",            value: "var(--black)" },
      { name: "--primary-foreground", value: "var(--white)" },
      { name: "--secondary",            value: "var(--gray-100)" },
      { name: "--secondary-foreground", value: "var(--gray-900)" },
      { name: "--muted",            value: "var(--gray-100)" },
      { name: "--muted-foreground", value: "var(--gray-500)" },
      { name: "--accent",            value: "var(--gray-900)" },
      { name: "--accent-foreground", value: "var(--white)" },
      { name: "--card",            value: "var(--white)" },
      { name: "--card-foreground", value: "var(--gray-900)" },
      { name: "--popover",            value: "var(--white)" },
      { name: "--popover-foreground", value: "var(--gray-900)" },
      { name: "--input",  value: "var(--gray-300)" },
      { name: "--ring",   value: "var(--black)" },
      { name: "--destructive",            value: "var(--gray-900)" },
      { name: "--destructive-foreground", value: "var(--white)" },
    ],
  },
];

const ALL_FILTERS = ["All", "Palette", "Surfaces", "Borders", "Text", "Interactive", "Components"] as const;
type Filter = (typeof ALL_FILTERS)[number];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function resolveValue(value: string): string {
  const match = value.match(/var\((--[\w-]+)\)/);
  if (match) return RESOLVED_MAP[match[1]] ?? value;
  return value;
}

function isNearWhite(hex: string): boolean {
  if (!hex.startsWith("#") || hex.length < 7) return false;
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return r > 240 && g > 240 && b > 240;
}

function getVarRef(value: string): string | null {
  const match = value.match(/var\((--[\w-]+)\)/);
  return match ? match[1] : null;
}

async function copyText(text: string): Promise<void> {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    // fallback: silent fail
  }
}

// ─── Sub-components ───────────────────────────────────────────────────────────

const CHECKERBOARD: React.CSSProperties = {
  backgroundImage: `
    linear-gradient(45deg, #ccc 25%, transparent 25%),
    linear-gradient(-45deg, #ccc 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, #ccc 75%),
    linear-gradient(-45deg, transparent 75%, #ccc 75%)
  `,
  backgroundSize: "10px 10px",
  backgroundPosition: "0 0, 0 5px, 5px -5px, -5px 0px",
};

interface PaletteSwatchProps {
  token: Token;
  onCopy: (name: string) => void;
}

const PaletteSwatch: React.FC<PaletteSwatchProps> = ({ token, onCopy }) => {
  const hex = resolveValue(token.value);
  const white = isNearWhite(hex);

  return (
    <button
      onClick={() => onCopy(token.name)}
      title={`Click to copy ${token.name}`}
      style={{
        all: "unset",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        borderRadius: 6,
        overflow: "hidden",
        border: "0.5px solid #e5e5e5",
        transition: "transform 0.1s ease",
        minWidth: 0,
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
      }}
    >
      {/* Color block */}
      <div style={{ position: "relative", height: 48, ...(white ? CHECKERBOARD : {}) }}>
        <div style={{ position: "absolute", inset: 0, background: hex }} />
      </div>

      {/* Info */}
      <div style={{ padding: "6px 8px", background: "#fff" }}>
        <div
          style={{
            fontSize: 11,
            fontWeight: 500,
            color: "#0a0a0a",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {token.name.replace("--", "")}
        </div>
        <div
          style={{
            fontSize: 10,
            color: "#5c5c5c",
            fontFamily: "monospace",
            marginTop: 1,
          }}
        >
          {hex}
        </div>
      </div>
    </button>
  );
};

interface SemanticRowProps {
  token: Token;
  onCopy: (name: string) => void;
}

const SemanticRow: React.FC<SemanticRowProps> = ({ token, onCopy }) => {
  const hex = resolveValue(token.value);
  const white = isNearWhite(hex);
  const ref = getVarRef(token.value);

  return (
    <button
      onClick={() => onCopy(token.name)}
      title={`Click to copy ${token.name}`}
      style={{
        all: "unset",
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "8px 0",
        borderBottom: "0.5px solid #e5e5e5",
        cursor: "pointer",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      {/* Mini swatch */}
      <div
        style={{
          position: "relative",
          width: 32,
          height: 32,
          borderRadius: 6,
          border: "0.5px solid #e5e5e5",
          flexShrink: 0,
          ...(white ? CHECKERBOARD : {}),
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: 6,
            background: hex,
          }}
        />
      </div>

      {/* Token name */}
      <div
        style={{
          fontSize: 12,
          fontFamily: "monospace",
          color: "#0a0a0a",
          flex: 1,
          textAlign: "left",
        }}
      >
        {token.name}
      </div>

      {/* Var reference */}
      <div
        style={{
          fontSize: 11,
          fontFamily: "monospace",
          color: "#a3a3a3",
          minWidth: 120,
          textAlign: "right",
        }}
      >
        {ref ? `→ ${ref}` : ""}
      </div>

      {/* Resolved hex */}
      <div
        style={{
          fontSize: 11,
          fontFamily: "monospace",
          color: "#5c5c5c",
          minWidth: 72,
          textAlign: "right",
        }}
      >
        {hex}
      </div>
    </button>
  );
};

// ─── Toast ────────────────────────────────────────────────────────────────────

interface ToastState {
  visible: boolean;
  text: string;
}

// ─── Main component ───────────────────────────────────────────────────────────

const ColorTokens: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<Filter>("All");
  const [toast, setToast] = useState<ToastState>({ visible: false, text: "" });

  const handleCopy = (name: string) => {
    void copyText(name);
    setToast({ visible: true, text: `Copied ${name}` });
    setTimeout(() => setToast((t) => ({ ...t, visible: false })), 1800);
  };

  const showPalette = activeFilter === "All" || activeFilter === "Palette";
  const visibleGroups = SEMANTIC_GROUPS.filter(
    (g) => activeFilter === "All" || activeFilter === g.label
  );

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", padding: "2rem 0", position: "relative" }}>

      {/* Filter tabs */}
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: "1.5rem" }}>
        {ALL_FILTERS.map((f) => {
          const isActive = f === activeFilter;
          return (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              style={{
                fontSize: 11,
                fontWeight: 500,
                letterSpacing: "0.04em",
                padding: "3px 10px",
                borderRadius: 999,
                border: "0.5px solid",
                borderColor: isActive ? "#000" : "#d9d9d9",
                background: isActive ? "#000" : "transparent",
                color: isActive ? "#fff" : "#5c5c5c",
                cursor: "pointer",
                transition: "all 0.1s",
              }}
            >
              {f}
            </button>
          );
        })}
      </div>

      {/* Palette section */}
      {showPalette && (
        <section style={{ marginBottom: "2.5rem" }}>
          <div
            style={{
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#5c5c5c",
              paddingBottom: "0.5rem",
              borderBottom: "0.5px solid #e5e5e5",
              marginBottom: "0.75rem",
            }}
          >
            Palette
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(80px, 1fr))",
              gap: 8,
            }}
          >
            {RAW_PALETTE.map((t) => (
              <PaletteSwatch key={t.name} token={t} onCopy={handleCopy} />
            ))}
          </div>
        </section>
      )}

      {/* Semantic groups */}
      {visibleGroups.map((group) => (
        <section key={group.label} style={{ marginBottom: "2.5rem" }}>
          <div
            style={{
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#5c5c5c",
              paddingBottom: "0.5rem",
              borderBottom: "0.5px solid #e5e5e5",
              marginBottom: "0.75rem",
            }}
          >
            {group.label}
          </div>
          <div>
            {group.tokens.map((t, i) => (
              <div
                key={t.name}
                style={i === group.tokens.length - 1 ? { borderBottom: "none" } : {}}
              >
                <SemanticRow token={t} onCopy={handleCopy} />
              </div>
            ))}
          </div>
        </section>
      ))}

      {/* Toast */}
      <div
        role="status"
        aria-live="polite"
        style={{
          position: "fixed",
          bottom: "1.5rem",
          left: "50%",
          transform: toast.visible
            ? "translateX(-50%) translateY(0)"
            : "translateX(-50%) translateY(8px)",
          background: "#0a0a0a",
          color: "#ffffff",
          fontSize: 13,
          padding: "8px 16px",
          borderRadius: 8,
          opacity: toast.visible ? 1 : 0,
          transition: "opacity 0.15s ease, transform 0.15s ease",
          pointerEvents: "none",
          whiteSpace: "nowrap",
        }}
      >
        {toast.text}
      </div>
    </div>
  );
};

// ─── Storybook meta ───────────────────────────────────────────────────────────

const meta: Meta<typeof ColorTokens> = {
  title: "Color Tokens",
  component: ColorTokens,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Visual reference for all color tokens in the monochrome design system. Click any token to copy its CSS variable name to the clipboard.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ColorTokens>;

// ─── Stories ──────────────────────────────────────────────────────────────────

export const All: Story = {};

export const PaletteOnly: Story = {
  render: () => {
    const [toast, setToast] = useState<ToastState>({ visible: false, text: "" });
    const handleCopy = (name: string) => {
      void copyText(name);
      setToast({ visible: true, text: `Copied ${name}` });
      setTimeout(() => setToast((t) => ({ ...t, visible: false })), 1800);
    };
    return (
      <div style={{ fontFamily: "system-ui, sans-serif", padding: "2rem 0", position: "relative" }}>
        <div
          style={{
            fontSize: 11,
            fontWeight: 500,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "#5c5c5c",
            paddingBottom: "0.5rem",
            borderBottom: "0.5px solid #e5e5e5",
            marginBottom: "0.75rem",
          }}
        >
          Palette
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(80px, 1fr))",
            gap: 8,
          }}
        >
          {RAW_PALETTE.map((t) => (
            <PaletteSwatch key={t.name} token={t} onCopy={handleCopy} />
          ))}
        </div>
        <div
          role="status"
          aria-live="polite"
          style={{
            position: "fixed",
            bottom: "1.5rem",
            left: "50%",
            transform: toast.visible
              ? "translateX(-50%) translateY(0)"
              : "translateX(-50%) translateY(8px)",
            background: "#0a0a0a",
            color: "#fff",
            fontSize: 13,
            padding: "8px 16px",
            borderRadius: 8,
            opacity: toast.visible ? 1 : 0,
            transition: "opacity 0.15s ease, transform 0.15s ease",
            pointerEvents: "none",
          }}
        >
          {toast.text}
        </div>
      </div>
    );
  },
};

export const SemanticOnly: Story = {
  render: () => {
    const [toast, setToast] = useState<ToastState>({ visible: false, text: "" });
    const handleCopy = (name: string) => {
      void copyText(name);
      setToast({ visible: true, text: `Copied ${name}` });
      setTimeout(() => setToast((t) => ({ ...t, visible: false })), 1800);
    };
    return (
      <div style={{ fontFamily: "system-ui, sans-serif", padding: "2rem 0", position: "relative" }}>
        {SEMANTIC_GROUPS.map((group) => (
          <section key={group.label} style={{ marginBottom: "2.5rem" }}>
            <div
              style={{
                fontSize: 11,
                fontWeight: 500,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "#5c5c5c",
                paddingBottom: "0.5rem",
                borderBottom: "0.5px solid #e5e5e5",
                marginBottom: "0.75rem",
              }}
            >
              {group.label}
            </div>
            {group.tokens.map((t) => (
              <SemanticRow key={t.name} token={t} onCopy={handleCopy} />
            ))}
          </section>
        ))}
        <div
          role="status"
          aria-live="polite"
          style={{
            position: "fixed",
            bottom: "1.5rem",
            left: "50%",
            transform: toast.visible
              ? "translateX(-50%) translateY(0)"
              : "translateX(-50%) translateY(8px)",
            background: "#0a0a0a",
            color: "#fff",
            fontSize: 13,
            padding: "8px 16px",
            borderRadius: 8,
            opacity: toast.visible ? 1 : 0,
            transition: "opacity 0.15s ease, transform 0.15s ease",
            pointerEvents: "none",
          }}
        >
          {toast.text}
        </div>
      </div>
    );
  },
};