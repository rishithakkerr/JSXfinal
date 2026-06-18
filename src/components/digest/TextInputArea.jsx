import useHashStore from '../../store/useHashStore';

export default function TextInputArea() {
  const rawText    = useHashStore((state) => state.rawText);
  const setRawText = useHashStore((state) => state.setRawText);
  const charCount  = useHashStore((state) => state.charCount);
  const byteCount  = useHashStore((state) => state.byteCount);

  return (
    <section className="panel" aria-label="Text Input">
      <div className="panel-header">
        <h4>Input Payload</h4>
      </div>
      <div className="panel-body">

        <textarea
          rows={10}
          placeholder="Type or paste text to hash…"
          value={rawText}
          onChange={(e) => setRawText(e.target.value)}
        />

        <div className="stat-row">
          <span className="stat-label">Characters</span>
          <span className="stat-value">{charCount}</span>
        </div>

        <div className="stat-row">
          <span className="stat-label">Bytes</span>
          <span className="stat-value">{byteCount}</span>
        </div>

      </div>
    </section>
  );
}
