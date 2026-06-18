
import useHashStore from '../../store/useHashStore';

export default function HashRow({ algorithm }) {
  const hashValue = useHashStore((state) => state[algorithm.key]);

  const hasHash = hashValue !== '' && hashValue != null;

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(hashValue);
    } catch {
    }
  }

  return (
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
