"use client";

/**
 * ═══════════════════════════════════════════════════════════════
 * MDX BLOG COMPONENTS
 * ═══════════════════════════════════════════════════════════════
 * Reusable interactive visual blocks you can embed in any .mdx essay.
 */

export function KeyMetric({ label, value, detail, trend }) {
  return (
    <div style={{
      background: "var(--bg-surface-2)",
      border: "1px solid var(--border)",
      borderRadius: "var(--radius-md)",
      padding: "var(--space-5)",
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-1)"
    }}>
      <span style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "1px", fontFamily: "var(--font-mono)" }}>
        {label}
      </span>
      <div style={{ display: "flex", alignItems: "baseline", gap: "var(--space-2)" }}>
        <span style={{ fontSize: "var(--text-3xl)", fontWeight: "700", color: "var(--text-primary)", fontFamily: "var(--font-heading)" }}>
          {value}
        </span>
        {trend && (
          <span style={{ fontSize: "var(--text-xs)", color: "var(--accent-2)", fontFamily: "var(--font-mono)" }}>
            {trend}
          </span>
        )}
      </div>
      {detail && (
        <span style={{ fontSize: "var(--text-xs)", color: "var(--text-secondary)" }}>
          {detail}
        </span>
      )}
    </div>
  );
}

export function StatGrid({ children }) {
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
      gap: "var(--space-4)",
      margin: "var(--space-8) 0"
    }}>
      {children}
    </div>
  );
}

export function Callout({ type = "insight", title, children }) {
  const isWarning = type === "warning";
  const borderColor = isWarning ? "#f59e0b" : "var(--accent-1)";
  const bgGlow = isWarning ? "rgba(245, 158, 11, 0.08)" : "var(--accent-1-glow)";

  return (
    <div style={{
      margin: "var(--space-6) 0",
      padding: "var(--space-6)",
      background: bgGlow,
      borderLeft: `3px solid ${borderColor}`,
      borderRadius: "0 var(--radius-md) var(--radius-md) 0"
    }}>
      {title && (
        <p style={{
          fontFamily: "var(--font-heading)",
          fontWeight: "600",
          fontSize: "var(--text-base)",
          color: isWarning ? "#fbbf24" : "var(--accent-1-light)",
          marginBottom: "var(--space-2)"
        }}>
          {title}
        </p>
      )}
      <div style={{ fontSize: "var(--text-sm)", color: "var(--text-secondary)", lineHeight: 1.7 }}>
        {children}
      </div>
    </div>
  );
}

export function ComparisonTable({ headers, rows }) {
  return (
    <div style={{ overflowX: "auto", margin: "var(--space-8) 0" }}>
      <table style={{
        width: "100%",
        borderCollapse: "collapse",
        fontSize: "var(--text-sm)",
        textAlign: "left"
      }}>
        <thead>
          <tr style={{ borderBottom: "1px solid var(--border-light)" }}>
            {headers.map((h, idx) => (
              <th key={idx} style={{
                padding: "var(--space-3) var(--space-4)",
                color: "var(--text-primary)",
                fontFamily: "var(--font-heading)"
              }}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rIdx) => (
            <tr key={rIdx} style={{
              borderBottom: "1px solid var(--border)",
              background: rIdx % 2 === 0 ? "transparent" : "rgba(255, 255, 255, 0.02)"
            }}>
              {row.map((cell, cIdx) => (
                <td key={cIdx} style={{
                  padding: "var(--space-3) var(--space-4)",
                  color: cIdx === 0 ? "var(--text-primary)" : "var(--text-secondary)",
                  fontWeight: cIdx === 0 ? "500" : "400"
                }}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function MetricBar({ label, value, displayValue, max = 100, color = "var(--accent-1)" }) {
  const percentage = Math.min(100, Math.max(5, (value / max) * 100));

  return (
    <div style={{ margin: "var(--space-4) 0" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "var(--space-1)", fontSize: "var(--text-sm)" }}>
        <span style={{ color: "var(--text-secondary)" }}>{label}</span>
        <span style={{ fontFamily: "var(--font-mono)", color: "var(--text-primary)", fontWeight: "500" }}>{displayValue || value}</span>
      </div>
      <div style={{
        height: "8px",
        background: "var(--bg-surface-2)",
        borderRadius: "var(--radius-full)",
        overflow: "hidden"
      }}>
        <div style={{
          width: `${percentage}%`,
          height: "100%",
          background: color,
          borderRadius: "var(--radius-full)",
          transition: "width 0.6s ease"
        }} />
      </div>
    </div>
  );
}
