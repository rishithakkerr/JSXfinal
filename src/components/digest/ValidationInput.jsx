import useHashStore from '../../store/useHashStore';
import ALGORITHMS from '../../utils/algorithms';

export default function ValidationInput() {
  const targetHash = useHashStore((state) => state.targetHash);
  const setTargetHash = useHashStore((state) => state.setTargetHash);

  const md5    = useHashStore((state) => state.md5);
  const sha1   = useHashStore((state) => state.sha1);
  const sha256 = useHashStore((state) => state.sha256);
  const sha512 = useHashStore((state) => state.sha512);
  const crc32  = useHashStore((state) => state.crc32);

  const generatedHashes = { md5, sha1, sha256, sha512, crc32 };

  function findMatch() {
    if (!targetHash) return null;

    const needle = targetHash.trim().toLowerCase();
    if (needle === '') return null;

    for (const algorithm of ALGORITHMS) {
      const candidate = generatedHashes[algorithm.key];
      if (candidate && candidate.toLowerCase() === needle) {
        return algorithm.displayName;
      }
    }

    return false;
  }

  const matchResult = findMatch();

  let statusClass  = '';
  let statusLabel  = '';
  let statusDetail = '';

  if (matchResult === null) {
  } else if (matchResult === false) {
    statusClass  = 'validation-status validation-status--error';
    statusLabel  = 'No Match';
  } else {
    statusClass  = 'validation-status validation-status--success';
    statusLabel  = 'Match Found';
    statusDetail = `(${matchResult})`;
  }

  return (
    <section className="panel" aria-label="Checksum Validation">
      <div className="panel-header">
        <h4>Checksum Validation</h4>
      </div>
      <div className="panel-body">

        <label htmlFor="target-hash-input">Expected Hash</label>
        <input
          id="target-hash-input"
          type="text"
          placeholder="Paste an expected MD5, SHA-1, SHA-256, SHA-512, or CRC32 digest…"
          value={targetHash}
          onChange={(e) => setTargetHash(e.target.value)}
          spellCheck={false}
          autoComplete="off"
          className="mono"
        />

        {matchResult !== null && (
          <div className={statusClass} role="status" aria-live="polite">
            <span className={`status-dot ${matchResult ? 'active' : 'error'}`} />
            <span className="validation-status-label">{statusLabel}</span>
            {statusDetail && (
              <span className="validation-status-detail">{statusDetail}</span>
            )}
          </div>
        )}

      </div>
    </section>
  );
}
