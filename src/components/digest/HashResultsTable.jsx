import ALGORITHMS from '../../utils/algorithms';
import HashRow from './HashRow';

export default function HashResultsTable() {
  return (
    <section className="panel" aria-label="Hash Results">
      <div className="panel-header">
        <h4>Digest Output</h4>
      </div>
      <table>
        <thead>
          <tr>
            <th>Algorithm</th>
            <th>Length</th>
            <th>Hash Value</th>
            <th style={{ textAlign: 'right' }}>Copy</th>
          </tr>
        </thead>
        <tbody>
          {ALGORITHMS.map((algorithm) => (
            <HashRow key={algorithm.id} algorithm={algorithm} />
          ))}
        </tbody>
      </table>
    </section>
  );
}
