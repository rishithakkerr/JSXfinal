/* ============================================================
   src/utils/exportReport.js — Report Object Builder
   Multi-Format Text Hash Calculator & Validation Desk
   ============================================================
   Pure utility: receives current application data, returns a
   plain JS object shaped for JSON export.
   No file download logic. No React. No Zustand. No side effects.
   ============================================================ */

/**
 * Constructs a structured report object from the current
 * application state.
 *
 * @param {object} data
 * @param {string} data.rawText
 * @param {string} data.encoding
 * @param {boolean} data.trimWhitespace
 * @param {boolean} data.collapseSpaces
 * @param {boolean} data.normalizeLineEndings
 * @param {string}  data.caseConversion
 * @param {string}  data.md5
 * @param {string}  data.sha1
 * @param {string}  data.sha256
 * @param {string}  data.sha512
 * @param {string}  data.crc32
 * @param {number}  data.charCount
 * @param {number}  data.byteCount
 * @param {number}  data.totalBits
 * @param {number}  data.latencyMs
 * @param {string|null} data.lastComputed
 * @param {string}  data.targetHash
 * @returns {object} Report object ready for JSON.stringify().
 */
export function buildReport(data) {
  const {
    /* input */
    rawText,
    encoding,

    /* normalization */
    trimWhitespace,
    collapseSpaces,
    normalizeLineEndings,
    caseConversion,

    /* hashes */
    md5,
    sha1,
    sha256,
    sha512,
    crc32,

    /* telemetry */
    charCount,
    byteCount,
    totalBits,
    latencyMs,
    lastComputed,

    /* validation */
    targetHash,
  } = data;

  return {
    // Top-level metadata: when the report was generated.
    timestamp: new Date().toISOString(),

    input: {
      rawText,
      encoding,
    },

    normalization: {
      trimWhitespace,
      collapseSpaces,
      normalizeLineEndings,
      caseConversion,
    },

    hashes: {
      md5,
      sha1,
      sha256,
      sha512,
      crc32,
    },

    telemetry: {
      charCount,
      byteCount,
      totalBits,
      latencyMs,
      lastComputed,
    },

    validation: {
      targetHash,
    },
  };
}

export default buildReport;
