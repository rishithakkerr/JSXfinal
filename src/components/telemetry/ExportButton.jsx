/* ============================================================
   src/components/telemetry/ExportButton.jsx
   Multi-Format Text Hash Calculator & Validation Desk
   ============================================================
   Reads all required values from the Zustand store, passes them
   to buildReport() to construct the report object, then triggers
   a JSON file download via Blob + URL.createObjectURL.
   No hashing logic. No useEffect. No local state.
   ============================================================ */

import useHashStore from '../../store/useHashStore';
import { buildReport } from '../../utils/exportReport';

/* ------------------------------------------------------------
   Helper: build a filename like "hash-report-2025-06-01.json"
   using today's local date.
   ------------------------------------------------------------ */
function buildFilename() {
  const today = new Date();
  const yyyy  = today.getFullYear();
  const mm    = String(today.getMonth() + 1).padStart(2, '0');
  const dd    = String(today.getDate()).padStart(2, '0');
  return `hash-report-${yyyy}-${mm}-${dd}.json`;
}

/* ------------------------------------------------------------
   Component
   ------------------------------------------------------------ */
export default function ExportButton() {

  /* ── Read every field the report needs from the store ─────── */
  const rawText              = useHashStore((state) => state.rawText);
  const encoding             = useHashStore((state) => state.encoding);
  const trimWhitespace       = useHashStore((state) => state.trimWhitespace);
  const collapseSpaces       = useHashStore((state) => state.collapseSpaces);
  const normalizeLineEndings = useHashStore((state) => state.normalizeLineEndings);
  const caseConversion       = useHashStore((state) => state.caseConversion);
  const md5                  = useHashStore((state) => state.md5);
  const sha1                 = useHashStore((state) => state.sha1);
  const sha256               = useHashStore((state) => state.sha256);
  const sha512               = useHashStore((state) => state.sha512);
  const crc32                = useHashStore((state) => state.crc32);
  const charCount            = useHashStore((state) => state.charCount);
  const byteCount            = useHashStore((state) => state.byteCount);
  const totalBits            = useHashStore((state) => state.totalBits);
  const latencyMs            = useHashStore((state) => state.latencyMs);
  const lastComputed         = useHashStore((state) => state.lastComputed);
  const targetHash           = useHashStore((state) => state.targetHash);

  /* ── Determine whether there is anything worth exporting ──── */
  // The button is disabled when no hashes have been generated yet,
  // i.e. the user hasn't typed any input.
  const hasOutput = md5 !== '';

  /* ── Click handler: build → serialize → download ─────────── */
  function handleExport() {
    // 1. Assemble the report object via the pure utility.
    const report = buildReport({
      rawText,
      encoding,
      trimWhitespace,
      collapseSpaces,
      normalizeLineEndings,
      caseConversion,
      md5,
      sha1,
      sha256,
      sha512,
      crc32,
      charCount,
      byteCount,
      totalBits,
      latencyMs,
      lastComputed,
      targetHash,
    });

    // 2. Serialize to a pretty-printed JSON string.
    const json = JSON.stringify(report, null, 2);

    // 3. Wrap in a Blob so the browser can treat it as a file.
    const blob = new Blob([json], { type: 'application/json' });

    // 4. Create a temporary object URL for the Blob.
    const url = URL.createObjectURL(blob);

    // 5. Programmatically click a hidden <a> to trigger the download.
    const anchor = document.createElement('a');
    anchor.href     = url;
    anchor.download = buildFilename();
    anchor.click();

    // 6. Release the object URL to free browser memory.
    //    We do this in a tiny timeout so the download has time
    //    to begin before the URL is revoked.
    setTimeout(() => URL.revokeObjectURL(url), 100);
  }

  return (
    <button
      className="btn btn-primary"
      onClick={handleExport}
      disabled={!hasOutput}
    >
      Export Report (JSON)
    </button>
  );
}
