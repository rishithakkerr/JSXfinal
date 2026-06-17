/* ============================================================
   src/components/console/EncodingOptions.jsx
   Multi-Format Text Hash Calculator & Validation Desk
   ============================================================
   Reads and writes encoding + normalization settings from the
   Zustand store. No hashing logic, no telemetry, no local state.
   The hook layer (useHashEngine) reacts to these values on its
   own — this component only forwards user input to the store.
   ============================================================ */

import useHashStore from '../../store/useHashStore';

export default function EncodingOptions() {
  const encoding             = useHashStore((state) => state.encoding);
  const trimWhitespace       = useHashStore((state) => state.trimWhitespace);
  const collapseSpaces       = useHashStore((state) => state.collapseSpaces);
  const normalizeLineEndings = useHashStore((state) => state.normalizeLineEndings);
  const caseConversion       = useHashStore((state) => state.caseConversion);

  const setEncoding      = useHashStore((state) => state.setEncoding);
  const setNormalization = useHashStore((state) => state.setNormalization);

  return (
    <section className="panel" aria-label="Encoding & Normalization Options">
      <div className="panel-header">
        <h4>Encoding &amp; Normalization</h4>
      </div>
      <div className="panel-body">
        <div className="options-grid">

          {/* ── Encoding ────────────────────────────────────── */}
          <div className="option-group">
            <label htmlFor="encoding-select">Encoding</label>
            <select
              id="encoding-select"
              value={encoding}
              onChange={(e) => setEncoding(e.target.value)}
            >
              <option value="UTF-8">UTF-8</option>
              <option value="ASCII">ASCII</option>
            </select>
          </div>

          {/* ── Case Conversion ─────────────────────────────── */}
          <div className="option-group">
            <label htmlFor="case-select">Case Conversion</label>
            <select
              id="case-select"
              value={caseConversion}
              onChange={(e) => setNormalization({ caseConversion: e.target.value })}
            >
              <option value="none">None</option>
              <option value="lowercase">Lowercase</option>
              <option value="uppercase">Uppercase</option>
            </select>
          </div>

          {/* ── Normalization Checkboxes ────────────────────── */}
          <div className="option-group option-group-checkboxes">
            <label>Normalization</label>

            <div className="checkbox-row">
              <input
                type="checkbox"
                id="trim-whitespace"
                checked={trimWhitespace}
                onChange={(e) => setNormalization({ trimWhitespace: e.target.checked })}
              />
              <label htmlFor="trim-whitespace" className="checkbox-label">
                Trim whitespace
              </label>
            </div>

            <div className="checkbox-row">
              <input
                type="checkbox"
                id="collapse-spaces"
                checked={collapseSpaces}
                onChange={(e) => setNormalization({ collapseSpaces: e.target.checked })}
              />
              <label htmlFor="collapse-spaces" className="checkbox-label">
                Collapse duplicate spaces
              </label>
            </div>

            <div className="checkbox-row">
              <input
                type="checkbox"
                id="normalize-line-endings"
                checked={normalizeLineEndings}
                onChange={(e) => setNormalization({ normalizeLineEndings: e.target.checked })}
              />
              <label htmlFor="normalize-line-endings" className="checkbox-label">
                Normalize line endings
              </label>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
