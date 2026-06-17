/* ============================================================
   src/App.jsx — Application Shell
   Multi-Format Text Hash Calculator & Validation Desk
   ============================================================
   Initializes the two engine hooks and composes the UI from
   existing components. No business logic lives here.
   ============================================================ */

import './styles/global.css';

/* ── Hooks ────────────────────────────────────────────────── */
import { useHashEngine }   from './hooks/useHashEngine';
import { useLocalStorage } from './hooks/useLocalStorage';

/* ── Layout ───────────────────────────────────────────────── */
import AppHeader from './components/layout/AppHeader';
import AppFooter from './components/layout/AppFooter';

/* ── Console ──────────────────────────────────────────────── */
import PayloadConsole  from './components/console/PayloadConsole';
import EncodingOptions from './components/console/EncodingOptions';

/* ── Digest ───────────────────────────────────────────────── */
import TextInputArea    from './components/digest/TextInputArea';
import HashResultsTable from './components/digest/HashResultsTable';
import ValidationInput  from './components/digest/ValidationInput';

/* ── Telemetry ────────────────────────────────────────────── */
import TelemetryHUD  from './components/telemetry/TelemetryHUD';
import ExportButton  from './components/telemetry/ExportButton';

/* ============================================================ */

export default function App() {
  /* Initialize engine hooks — all side effects handled inside. */
  useHashEngine();
  useLocalStorage();

  return (
    <div className="app-shell">

      {/* ── HEADER ─────────────────────────────────────────── */}
      <AppHeader />

      {/* ── MAIN CONTENT ───────────────────────────────────── */}
      <main className="app-main">

        {/* ── ROW 1: Payload Console ───────────────────────── */}
        <PayloadConsole />

        {/* ── ROW 2: Encoding & Normalization ──────────────── */}
        <EncodingOptions />

        {/* ── ROW 3: Text Input + Hash Results ─────────────── */}
        <div className="two-col-grid">
          <TextInputArea />
          <HashResultsTable />
        </div>

        {/* ── ROW 4: Checksum Validation ───────────────────── */}
        <ValidationInput />

        {/* ── ROW 5: Telemetry HUD + Export ────────────────── */}
        <TelemetryHUD />

        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <ExportButton />
        </div>

      </main>

      {/* ── FOOTER ─────────────────────────────────────────── */}
      <AppFooter />

    </div>
  );
}
