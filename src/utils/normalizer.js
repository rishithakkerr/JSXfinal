/* ============================================================
   src/utils/normalizer.js — Pure Text Normalization Utility
   Multi-Format Text Hash Calculator & Validation Desk
   ============================================================
   Accepts raw text and a normalization settings object.
   Returns processed text with no side effects.
   No React. No Zustand. No imports required.
   ============================================================ */

/**
 * Normalizes raw text according to the provided settings.
 *
 * @param {string} rawText - The original input string.
 * @param {object} settings - Normalization options.
 * @param {boolean} settings.trimWhitespace      - Strip leading/trailing whitespace.
 * @param {boolean} settings.collapseSpaces      - Collapse internal runs of whitespace to a single space.
 * @param {boolean} settings.normalizeLineEndings - Convert all line endings to Unix-style LF (\n).
 * @param {'none'|'lowercase'|'uppercase'} settings.caseConversion - Case transformation to apply.
 * @returns {string} The normalized text.
 */
export function normalizeText(rawText, settings = {}) {
  const {
    trimWhitespace      = false,
    collapseSpaces      = false,
    normalizeLineEndings = false,
    caseConversion      = 'none',
  } = settings;

  // Start with the raw input; guard against non-string values.
  let text = typeof rawText === 'string' ? rawText : String(rawText ?? '');

  // ── Step 1: Normalize line endings ──────────────────────────
  // Convert Windows-style CRLF (\r\n) and old Mac-style CR (\r)
  // to Unix-style LF (\n) so every line ending is consistent.
  if (normalizeLineEndings) {
    text = text
      .replace(/\r\n/g, '\n') // Windows → Unix
      .replace(/\r/g,   '\n'); // Old Mac → Unix
  }

  // ── Step 2: Collapse internal whitespace ────────────────────
  // Replace any sequence of whitespace characters (spaces, tabs,
  // non-breaking spaces, etc.) with a single regular space.
  // Note: this intentionally does NOT affect newlines when
  // normalizeLineEndings is also active — \n is preserved because
  // \n is matched separately. When normalizeLineEndings is false,
  // collapseSpaces will collapse newlines too (by design: the user
  // only asked for space collapsing, not line preservation).
  if (collapseSpaces) {
    // Preserve newlines when normalizeLineEndings is active.
    if (normalizeLineEndings) {
      // Split on newlines, collapse spaces within each line, rejoin.
      text = text
        .split('\n')
        .map((line) => line.replace(/[ \t\f\v\u00a0]+/g, ' '))
        .join('\n');
    } else {
      // No line-ending protection — collapse all whitespace runs.
      text = text.replace(/\s+/g, ' ');
    }
  }

  // ── Step 3: Trim leading / trailing whitespace ───────────────
  // Using String.prototype.trim() which removes spaces, tabs,
  // newlines, and other whitespace from both ends.
  if (trimWhitespace) {
    text = text.trim();
  }

  // ── Step 4: Case conversion ──────────────────────────────────
  if (caseConversion === 'lowercase') {
    text = text.toLowerCase();
  } else if (caseConversion === 'uppercase') {
    text = text.toUpperCase();
  }
  // 'none' → no transformation

  return text;
}

export default normalizeText;
