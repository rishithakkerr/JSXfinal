/* ============================================================
   src/components/telemetry/TelemetryHUD.jsx
   Multi-Format Text Hash Calculator & Validation Desk
   ============================================================
   Reads runtime statistics written by useHashEngine and renders
   them in a compact dashboard. No hashing logic. No useEffect.
   No local state. Pure display component.
   ============================================================ */

import useHashStore from '../../store/useHashStore';

/* ------------------------------------------------------------
   Helper: format the lastComputed ISO timestamp into a
   human-readable local time string, or "Never" when null.
   ------------------------------------------------------------ */
function formatLastComputed(isoString) {
  if (!isoString) return 'Never';
  const date = new Date(isoString);
  return date.toLocaleTimeString(undefined, {
    hour:   '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
}

/* ------------------------------------------------------------
   Helper: format large numbers with comma separators so
   totalBits like 3456 renders as "3,456" rather than "3456".
   ------------------------------------------------------------ */
function formatNumber(value) {
  return value.toLocaleString();
}

/* ------------------------------------------------------------
   Component
   ------------------------------------------------------------ */
export default function TelemetryHUD() {
  const charCount    = useHashStore((state) => state.charCount);
  const byteCount    = useHashStore((state) => state.byteCount);
  const totalBits    = useHashStore((state) => state.totalBits);
  const latencyMs    = useHashStore((state) => state.latencyMs);
  const lastComputed = useHashStore((state) => state.lastComputed);
  const encoding     = useHashStore((state) => state.encoding);

  const stats = [
    { label: 'Characters Processed', value: formatNumber(charCount)           },
    { label: 'Byte Count',           value: formatNumber(byteCount)            },
    { label: 'Total Bits',           value: formatNumber(totalBits)            },
    { label: 'Hash Generation Time', value: `${latencyMs} ms`                 },
    { label: 'Active Encoding',      value: encoding                           },
    { label: 'Last Computed',        value: formatLastComputed(lastComputed)   },
  ];

  return (
    <section className="panel" aria-label="System Telemetry">
      <div className="panel-header">
        <h4>System Telemetry</h4>
      </div>
      <div className="panel-body">
        <div className="telemetry-grid">
          {stats.map((stat) => (
            <div className="stat-row" key={stat.label}>
              <span className="stat-label">{stat.label}</span>
              <span className="stat-value">{stat.value}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
