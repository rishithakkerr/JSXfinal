import { useEffect } from 'react';
import useHashStore from '../store/useHashStore';
import { normalizeText } from '../utils/normalizer';
import { computeHashes } from '../utils/hashWorker';

export function useHashEngine() {
  const rawText = useHashStore((state) => state.rawText);
  const encoding = useHashStore((state) => state.encoding);
  const trimWhitespace = useHashStore((state) => state.trimWhitespace);
  const collapseSpaces = useHashStore((state) => state.collapseSpaces);
  const normalizeLineEndings = useHashStore((state) => state.normalizeLineEndings);
  const caseConversion = useHashStore((state) => state.caseConversion);

  const setHashes = useHashStore((state) => state.setHashes);
  const setTelemetry = useHashStore((state) => state.setTelemetry);

  useEffect(() => {
    if (rawText === '') {
      setHashes({
        md5: '',
        sha1: '',
        sha256: '',
        sha512: '',
        crc32: '',
      });

      setTelemetry({
        charCount: 0,
        byteCount: 0,
        totalBits: 0,
        latencyMs: 0,
        lastComputed: null,
      });

      return;
    }

    const normalizedText = normalizeText(rawText, {
      trimWhitespace,
      collapseSpaces,
      normalizeLineEndings,
      caseConversion,
    });

    async function runHashing() {
      try {
        const hashResults = await computeHashes(normalizedText);

        const encoder = new TextEncoder();
        const byteArray = encoder.encode(normalizedText);
        const byteCount = byteArray.length;
        const charCount = normalizedText.length;
        const totalBits = byteCount * 8;

        setHashes({
          md5: hashResults.md5,
          sha1: hashResults.sha1,
          sha256: hashResults.sha256,
          sha512: hashResults.sha512,
          crc32: hashResults.crc32,
        });

        setTelemetry({
          charCount,
          byteCount,
          totalBits,
          latencyMs: hashResults.latencyMs,
          lastComputed: new Date().toISOString(),
        });
      } catch (err) {
        console.error('[useHashEngine] hashing failed:', err);
      }
    }

    runHashing();
  }, [
    rawText,
    encoding,
    trimWhitespace,
    collapseSpaces,
    normalizeLineEndings,
    caseConversion,
    setHashes,
    setTelemetry,
  ]);
}

export default useHashEngine;