import CryptoJS from 'crypto-js';

function stringToBytes(text) {
  return new TextEncoder().encode(text);
}

function bufferToHex(buffer) {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

async function webCryptoHash(algorithm, text) {
  const bytes = stringToBytes(text);
  const buffer = await crypto.subtle.digest(algorithm, bytes);
  return bufferToHex(buffer);
}

function computeMd5(text) {
  return CryptoJS.MD5(text).toString(CryptoJS.enc.Hex);
}

function computeSha1(text) {
  return CryptoJS.SHA1(text).toString(CryptoJS.enc.Hex);
}

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

function computeCrc32(text) {
  const bytes = new TextEncoder().encode(text);
  let crc = 0xffffffff;

  for (let i = 0; i < bytes.length; i++) {
    crc = CRC32_TABLE[(crc ^ bytes[i]) & 0xff] ^ (crc >>> 8);
  }

  return ((crc ^ 0xffffffff) >>> 0).toString(16).padStart(8, '0');
}

export async function computeHashes(text) {
  const startTime = performance.now();

  const md5 = computeMd5(text);
  const sha1 = computeSha1(text);
  const crc32 = computeCrc32(text);

  const [sha256, sha512] = await Promise.all([
    webCryptoHash('SHA-256', text),
    webCryptoHash('SHA-512', text),
  ]);

  const latencyMs = parseFloat((performance.now() - startTime).toFixed(2));

  return {
    md5,
    sha1,
    sha256,
    sha512,
    crc32,
    latencyMs,
  };
}

export default computeHashes;