import './styles/global.css';

import { useHashEngine } from './hooks/useHashEngine';
import { useLocalStorage } from './hooks/useLocalStorage';

import AppHeader from './components/layout/AppHeader';
import AppFooter from './components/layout/AppFooter';

import PayloadConsole from './components/console/PayloadConsole';
import EncodingOptions from './components/console/EncodingOptions';

import TextInputArea from './components/digest/TextInputArea';
import HashResultsTable from './components/digest/HashResultsTable';
import ValidationInput from './components/digest/ValidationInput';

import TelemetryHUD from './components/telemetry/TelemetryHUD';
import ExportButton from './components/telemetry/ExportButton';

export default function App() {
  useHashEngine();
  useLocalStorage();

  return (
    <div className="app-shell">
      <AppHeader />

      <main className="app-main">
        <PayloadConsole />

        <EncodingOptions />

        <div className="two-col-grid">
          <TextInputArea />
          <HashResultsTable />
        </div>

        <ValidationInput />

        <TelemetryHUD />

        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <ExportButton />
        </div>
      </main>

      <AppFooter />
    </div>
  );
}