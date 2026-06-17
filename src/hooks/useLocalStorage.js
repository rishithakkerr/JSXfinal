/* ============================================================
   src/hooks/useLocalStorage.js — Preference Persistence Hook
   Multi-Format Text Hash Calculator & Validation Desk
   ============================================================
   Responsibilities:
     1. On mount: read saved preferences from localStorage and
        write them into the Zustand store.
     2. On change: whenever any tracked preference changes,
        save the updated values back to localStorage.

   Persisted keys:
     - hash_calc_encoding
     - hash_calc_trimWhitespace
     - hash_calc_collapseSpaces
     - hash_calc_normalizeLineEndings
     - hash_calc_caseConversion

   NOT persisted:
     - rawText, hashes, telemetry, validation

   Drop this hook into App.jsx as a single call:
     useLocalStorage()
   ============================================================ */

import { useEffect } from 'react';
import useHashStore from '../store/useHashStore';

/* ------------------------------------------------------------
   Storage key constants
   Centralising keys here avoids typos and makes them easy
   to update in one place if needed later.
   ------------------------------------------------------------ */
const KEYS = {
  encoding:             'hash_calc_encoding',
  trimWhitespace:       'hash_calc_trimWhitespace',
  collapseSpaces:       'hash_calc_collapseSpaces',
  normalizeLineEndings: 'hash_calc_normalizeLineEndings',
  caseConversion:       'hash_calc_caseConversion',
};

/* ------------------------------------------------------------
   Helper: safely read a value from localStorage.
   Returns the parsed value on success, or `fallback` on any
   error (missing key, malformed JSON, SecurityError, etc.).
   ------------------------------------------------------------ */
function readFromStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    // getItem returns null when the key does not exist.
    if (raw === null) return fallback;
    return JSON.parse(raw);
  } catch {
    // JSON.parse failed or localStorage is unavailable.
    return fallback;
  }
}

/* ------------------------------------------------------------
   Helper: safely write a value to localStorage.
   Silently swallows errors (e.g. storage quota exceeded,
   private-browsing restrictions).
   ------------------------------------------------------------ */
function writeToStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Fail silently — persistence is a nice-to-have, not critical.
  }
}

/* ------------------------------------------------------------
   Hook Definition
   ------------------------------------------------------------ */
export function useLocalStorage() {

  // ── Pull current preference values from the store ────────────
  const encoding             = useHashStore((state) => state.encoding);
  const trimWhitespace       = useHashStore((state) => state.trimWhitespace);
  const collapseSpaces       = useHashStore((state) => state.collapseSpaces);
  const normalizeLineEndings = useHashStore((state) => state.normalizeLineEndings);
  const caseConversion       = useHashStore((state) => state.caseConversion);

  // ── Pull the store actions needed to restore saved values ─────
  const setEncoding      = useHashStore((state) => state.setEncoding);
  const setNormalization = useHashStore((state) => state.setNormalization);

  // ── Effect 1: Restore saved preferences on mount ─────────────
  // The empty dependency array [] means this runs exactly once,
  // after the component that called this hook first renders.
  useEffect(() => {

    // Read each preference from localStorage, falling back to the
    // store's default values if nothing has been saved yet.
    const savedEncoding             = readFromStorage(KEYS.encoding,             encoding);
    const savedTrimWhitespace       = readFromStorage(KEYS.trimWhitespace,       trimWhitespace);
    const savedCollapseSpaces       = readFromStorage(KEYS.collapseSpaces,       collapseSpaces);
    const savedNormalizeLineEndings = readFromStorage(KEYS.normalizeLineEndings, normalizeLineEndings);
    const savedCaseConversion       = readFromStorage(KEYS.caseConversion,       caseConversion);

    // Push the restored values into the store so the rest of the
    // application immediately reflects the user's last-used settings.
    setEncoding(savedEncoding);
    setNormalization({
      trimWhitespace:       savedTrimWhitespace,
      collapseSpaces:       savedCollapseSpaces,
      normalizeLineEndings: savedNormalizeLineEndings,
      caseConversion:       savedCaseConversion,
    });

  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  // The empty array is intentional: we only want to restore once
  // on mount. Listing the store values here would cause an
  // infinite loop (restore → update store → restore again…).

  // ── Effect 2: Persist whenever any preference changes ────────
  // This runs after every render where one of the listed values
  // has changed, keeping localStorage in sync with the store.
  useEffect(() => {
    writeToStorage(KEYS.encoding,             encoding);
    writeToStorage(KEYS.trimWhitespace,       trimWhitespace);
    writeToStorage(KEYS.collapseSpaces,       collapseSpaces);
    writeToStorage(KEYS.normalizeLineEndings, normalizeLineEndings);
    writeToStorage(KEYS.caseConversion,       caseConversion);
  }, [
    encoding,
    trimWhitespace,
    collapseSpaces,
    normalizeLineEndings,
    caseConversion,
  ]);

  // This hook has no return value.
  // It works entirely through Zustand store side effects.
}

export default useLocalStorage;
