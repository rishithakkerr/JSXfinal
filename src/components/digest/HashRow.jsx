/* ============================================================
   src/components/digest/HashRow.jsx
   Multi-Format Text Hash Calculator & Validation Desk
   ============================================================
   Renders a single row of the Hash Results table. Reads its own
   hash value from the store using the algorithm's key. Contains
   no hashing logic — it only displays whatever the store already
   holds and offers a copy-to-clipboard action.
   ============================================================ */

import useHashStore from '../../store/useHashStore';

export default function HashRow({ algorithm }) {
  const hashValue = useHashStore((state) => state[algorithm.key]);

  const hasHash = hashValue !== '' && hashValue != null;

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(hashValue);
    } catch {
      // Clipboard access denied or unavailable — fail silently.
    }
  }

  return (
    /* data-key lets CSS target each algorithm's pill with its own pastel */
    <tr data-key={algorithm.key}>
      <td><code>{algorithm.displayName}</code></td>
      <td className="hash-length-cell">{algorithm.expectedLength}</td>
      <td className="hash-value-cell">
        {hasHash ? (
          hashValue
        ) : (
          <span className="placeholder-text">—</span>
        )}
      </td>
      <td style={{ textAlign: 'right' }}>
        <button
          className="btn btn-secondary btn-copy"
          onClick={handleCopy}
          disabled={!hasHash}
        >
          Copy
        </button>
      </td>
    </tr>
  );
}
