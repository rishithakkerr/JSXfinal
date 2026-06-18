import { useEffect } from 'react';
import useHashStore from '../store/useHashStore';

const KEYS = {
  encoding:             'hash_calc_encoding',
  trimWhitespace:       'hash_calc_trimWhitespace',
  collapseSpaces:       'hash_calc_collapseSpaces',
  normalizeLineEndings: 'hash_calc_normalizeLineEndings',
  caseConversion:       'hash_calc_caseConversion',
};

function readFromStorage(key, fallback) {
    const raw = localStorage.getItem(key);
    if (raw === null) return fallback;
    return JSON.parse(raw);
  }



function writeToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

export function useLocalStorage() {

  const encoding             = useHashStore((state) => state.encoding);
  const trimWhitespace       = useHashStore((state) => state.trimWhitespace);
  const collapseSpaces       = useHashStore((state) => state.collapseSpaces);
  const normalizeLineEndings = useHashStore((state) => state.normalizeLineEndings);
  const caseConversion       = useHashStore((state) => state.caseConversion);
  const setEncoding      = useHashStore((state) => state.setEncoding);
  const setNormalization = useHashStore((state) => state.setNormalization);

  useEffect(() => {

    const savedEncoding             = readFromStorage(KEYS.encoding,             encoding);
    const savedTrimWhitespace       = readFromStorage(KEYS.trimWhitespace,       trimWhitespace);
    const savedCollapseSpaces       = readFromStorage(KEYS.collapseSpaces,       collapseSpaces);
    const savedNormalizeLineEndings = readFromStorage(KEYS.normalizeLineEndings, normalizeLineEndings);
    const savedCaseConversion       = readFromStorage(KEYS.caseConversion,       caseConversion);

    setEncoding(savedEncoding);
    setNormalization({
      trimWhitespace:       savedTrimWhitespace,
      collapseSpaces:       savedCollapseSpaces,
      normalizeLineEndings: savedNormalizeLineEndings,
      caseConversion:       savedCaseConversion,
    });

  }, []); 

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
}

export default useLocalStorage;
