export function buildReport(data) {
  const {
    rawText,
    encoding,

    trimWhitespace,
    collapseSpaces,
    normalizeLineEndings,
    caseConversion,

    md5,
    sha1,
    sha256,
    sha512,
    crc32,

    charCount,
    byteCount,
    totalBits,
    latencyMs,
    lastComputed,

    targetHash,
  } = data;

  return {
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