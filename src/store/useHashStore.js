import { create } from 'zustand';

/* ============================================================
   useHashStore.js — Zustand Store Skeleton
   No hashing logic, no persistence, no side effects.
   Actions only update state directly.
   ============================================================ */

const useHashStore = create((set) => ({

  /* ---------------- input ---------------- */
  rawText: '',
  encoding: 'UTF-8',

  /* ---------------- normalization ---------------- */
  trimWhitespace: false,
  collapseSpaces: false,
  normalizeLineEndings: false,
  caseConversion: 'none',

  /* ---------------- hashes ---------------- */
  md5: '',
  sha1: '',
  sha256: '',
  sha512: '',
  crc32: '',

  /* ---------------- validation ---------------- */
  targetHash: '',
  matchResult: null,

  /* ---------------- telemetry ---------------- */
  charCount: 0,
  byteCount: 0,
  totalBits: 0,
  latencyMs: 0,
  lastComputed: null,

  /* ---------------- actions ---------------- */

  setRawText: (text) => set({ rawText: text }),

  setEncoding: (encoding) => set({ encoding }),

  setNormalization: (settings) => set((state) => ({
    ...state,
    ...settings,
  })),

  setTargetHash: (targetHash) => set({ targetHash }),

  setHashes: (hashes) => set((state) => ({
    ...state,
    ...hashes,
  })),

  setTelemetry: (telemetry) => set((state) => ({
    ...state,
    ...telemetry,
  })),

  clearInput: () => set({
    rawText: '',
    charCount: 0,
    byteCount: 0,
  }),

  clearValidationCache: () => set({
    targetHash: '',
    matchResult: null,
  }),

  generateSalt: () => set({
    rawText: Math.random().toString(36).slice(2),
  }),

}));

export default useHashStore;
