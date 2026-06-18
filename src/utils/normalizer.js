export function normalizeText(rawText, settings = {}) {
  const {
    trimWhitespace = false,
    collapseSpaces = false,
    normalizeLineEndings = false,
    caseConversion = 'none',
  } = settings;

  let text = typeof rawText === 'string' ? rawText : String(rawText ?? '');

  if (normalizeLineEndings) {
    text = text
      .replace(/\r\n/g, '\n')
      .replace(/\r/g, '\n');
  }

  if (collapseSpaces) {
    if (normalizeLineEndings) {
      text = text
        .split('\n')
        .map((line) => line.replace(/[ \t\f\v\u00a0]+/g, ' '))
        .join('\n');
    } else {
      text = text.replace(/\s+/g, ' ');
    }
  }

  if (trimWhitespace) {
    text = text.trim();
  }

  if (caseConversion === 'lowercase') {
    text = text.toLowerCase();
  } else if (caseConversion === 'uppercase') {
    text = text.toUpperCase();
  }

  return text;
}

export default normalizeText;