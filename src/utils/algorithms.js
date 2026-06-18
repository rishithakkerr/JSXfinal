export const ALGORITHMS = [
  {
    id: 'md5',
    displayName: 'MD5',
    key: 'md5',
    expectedLength: 32,
  },
  {
    id: 'sha1',
    displayName: 'SHA-1',
    key: 'sha1',
    expectedLength: 40,
  },
  {
    id: 'sha256',
    displayName: 'SHA-256',
    key: 'sha256',
    expectedLength: 64,
  },
  {
    id: 'sha512',
    displayName: 'SHA-512',
    key: 'sha512',
    expectedLength: 128,
  },
  {
    id: 'crc32',
    displayName: 'CRC32',
    key: 'crc32',
    expectedLength: 8,
  },
];

export default ALGORITHMS;
