import { describe, expect, it } from 'vitest';
import { dateLabel, memberRotation, pad2 } from './format';

describe('dateLabel', () => {
  it('formats YYYY-MM-DD into a short pt-BR label', () => {
    expect(dateLabel('2026-08-15')).toBe('15 AGO');
  });

  it('returns the input unchanged when it is not a date', () => {
    expect(dateLabel('em breve')).toBe('em breve');
    expect(dateLabel('')).toBe('');
    expect(dateLabel(null)).toBe('');
  });
});

describe('pad2', () => {
  it('zero-pads a single digit', () => {
    expect(pad2(1)).toBe('01');
  });

  it('leaves two digits untouched', () => {
    expect(pad2(27)).toBe('27');
  });
});

describe('memberRotation', () => {
  it('returns the first rotation for index 0', () => {
    expect(memberRotation(0)).toBe('-4deg');
  });

  it('wraps around with the modulo of the rotation list', () => {
    expect(memberRotation(6)).toBe('-4deg');
    expect(memberRotation(7)).toBe('3deg');
  });
});
