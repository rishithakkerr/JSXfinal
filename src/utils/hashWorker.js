/* ============================================================
   src/utils/hashWorker.js — Async Hash Computation Utility
   Multi-Format Text Hash Calculator & Validation Desk
   ============================================================
   MD5, SHA-1   → CryptoJS (synchronous)
   SHA-256, SHA-512 → Web Crypto API (async)
   CRC32        → pure-JS lookup-table implementation
                  (CryptoJS does NOT ship CRC32 by default)
   ============================================================ */

import CryptoJS from 'crypto-js';

/* ------------------------------------------------------------
   Web Crypto helpers — SHA-256 / SHA-512
   ------------------------------------------------------------ */
function stringToBytes(text) {
  return new TextEncoder().encode(text);
}

function bufferToHex(buffer) {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

async function webCryptoHash(algorithm, text) {
  const bytes  = stringToBytes(text);
  const buffer = await crypto.subtle.digest(algorithm, bytes);
  return bufferToHex(buffer);
}

/* ------------------------------------------------------------
   CryptoJS helpers — MD5, SHA-1
   ------------------------------------------------------------ */
function computeMd5(text) {
  return CryptoJS.MD5(text).toString(CryptoJS.enc.Hex);
}

function computeSha1(text) {
  return CryptoJS.SHA1(text).toString(CryptoJS.enc.Hex);
}

/* ------------------------------------------------------------
   Pure-JS CRC32 — standard IEEE 802.3 polynomial
   CryptoJS does not include CRC32 in its default build.
   ------------------------------------------------------------ */

// Build the 256-entry lookup table once at module load time.
const CRC32_TABLE = (() => {
  const table = new Uint32Array(256);
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let j = 0; j < 8; j++) {
      c = c & 1 ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
    }
    table[i] = c;
  }
  return table;
})();

/**
 * Computes CRC32 of a UTF-8 encoded string.
 * Returns an 8-character lowercase hex string.
 * @param {string} text
 * @returns {string}
 */
function computeCrc32(text) {
  const bytes = new TextEncoder().encode(text);
  let crc = 0xffffffff;
  for (let i = 0; i < bytes.length; i++) {
    crc = CRC32_TABLE[(crc ^ bytes[i]) & 0xff] ^ (crc >>> 8);
  }
  // Finalize and convert to unsigned 32-bit hex.
  return ((crc ^ 0xffffffff) >>> 0).toString(16).padStart(8, '0');
}

/* ------------------------------------------------------------
   Public API
   ------------------------------------------------------------ */

/**
 * Computes MD5, SHA-1, SHA-256, SHA-512, and CRC32 for the
 * given (already-normalized) text string.
 *
 * @param {string} text
 * @returns {Promise<{
 *   md5: string, sha1: string, sha256: string,
 *   sha512: string, crc32: string, latencyMs: number
 * }>}
 */
export async function computeHashes(text) {
  const startTime = performance.now();

  // Synchronous
  const md5   = computeMd5(text);
  const sha1  = computeSha1(text);
  const crc32 = computeCrc32(text);

  // Async — run in parallel
  const [sha256, sha512] = await Promise.all([
    webCryptoHash('SHA-256', text),
    webCryptoHash('SHA-512', text),
  ]);

  const latencyMs = parseFloat((performance.now() - startTime).toFixed(2));

  return { md5, sha1, sha256, sha512, crc32, latencyMs };
}

export default computeHashes;
