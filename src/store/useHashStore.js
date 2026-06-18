import { create } from 'zustand';

const useHashStore = create((set) => ({
  rawText: '',
  encoding: 'UTF-8',

  trimWhitespace: false,
  collapseSpaces: false,
  normalizeLineEndings: false,
  caseConversion: 'none',

  md5: '',
  sha1: '',
  sha256: '',
  sha512: '',
  crc32: '',

  targetHash: '',
  matchResult: null,

  charCount: 0,
  byteCount: 0,
  totalBits: 0,
  latencyMs: 0,
  lastComputed: null,

  setRawText: (text) => set({ rawText: text }),

  setEncoding: (encoding) => set({ encoding }),

  setNormalization: (settings) =>
    set((state) => ({
      ...state,
      ...settings,
    })),

  setTargetHash: (targetHash) => set({ targetHash }),

  setHashes: (hashes) =>
    set((state) => ({
      ...state,
      ...hashes,
    })),

  setTelemetry: (telemetry) =>
    set((state) => ({
      ...state,
      ...telemetry,
    })),

  clearInput: () =>
    set({
      rawText: '',
      charCount: 0,
      byteCount: 0,
    }),

  clearValidationCache: () =>
    set({
      targetHash: '',
      matchResult: null,
    }),

  generateSalt: () =>
    set({
      rawText: Math.random().toString(36).slice(2),
    }),
}));

export default useHashStore;