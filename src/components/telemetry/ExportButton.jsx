import useHashStore from '../../store/useHashStore';
import { buildReport } from '../../utils/exportReport';

function buildFilename() {
  const today = new Date();
  const yyyy  = today.getFullYear();
  const mm    = String(today.getMonth() + 1).padStart(2, '0');
  const dd    = String(today.getDate()).padStart(2, '0');
  return `hash-report-${yyyy}-${mm}-${dd}.json`;
}

export default function ExportButton() {

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

  const hasOutput = md5 !== '';

  function handleExport() {
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

    const json = JSON.stringify(report, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href     = url;
    anchor.download = buildFilename();
    anchor.click();
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
