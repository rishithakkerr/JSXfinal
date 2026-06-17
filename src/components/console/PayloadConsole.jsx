/* ============================================================
   src/components/console/PayloadConsole.jsx
   Multi-Format Text Hash Calculator & Validation Desk
   ============================================================ */

import useHashStore from '../../store/useHashStore';

export default function PayloadConsole() {
  const clearInput           = useHashStore((state) => state.clearInput);
  const generateSalt         = useHashStore((state) => state.generateSalt);
  const clearValidationCache = useHashStore((state) => state.clearValidationCache);
  const setRawText           = useHashStore((state) => state.setRawText);

  async function handlePaste() {
    try {
      const text = await navigator.clipboard.readText();
      setRawText(text);
    } catch {
      // Clipboard access denied or unavailable — fail silently.
    }
  }

  return (
    <section className="panel" aria-label="Payload Configuration Console">
      <div className="panel-header">
        <h4>Payload Configuration Console</h4>
      </div>
      <div className="panel-body">
        <div className="console-toolbar">

          <button className="btn btn-secondary" onClick={clearInput}>
            Clear Input Workspace
          </button>

          <button className="btn btn-secondary" onClick={handlePaste}>
            Paste Clipboard Content
          </button>

          <button className="btn btn-secondary" onClick={generateSalt}>
            Generate Random Salt
          </button>

          <button className="btn btn-ghost" onClick={clearValidationCache}>
            Clear Validation Cache
          </button>

        </div>
      </div>
    </section>
  );
}
