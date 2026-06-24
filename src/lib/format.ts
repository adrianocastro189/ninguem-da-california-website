const MONTHS_PT = [
  'JAN',
  'FEV',
  'MAR',
  'ABR',
  'MAI',
  'JUN',
  'JUL',
  'AGO',
  'SET',
  'OUT',
  'NOV',
  'DEZ',
];

/** Format YYYY-MM-DD into a short pt-BR label like "15 AGO". Falls back to input. */
export function dateLabel(date: string | null | undefined): string {
  const value = (date ?? '').toString();
  const m = value.match(/(\d{4})-(\d{2})-(\d{2})/);
  return m ? `${m[3]} ${MONTHS_PT[parseInt(m[2], 10) - 1]}` : value;
}

/** Rotation angle for a polaroid member card by index (mirrors the prototype). */
export function memberRotation(index: number): string {
  const rotations = ['-4deg', '3deg', '-2.5deg', '4deg', '-3deg', '2deg'];
  return rotations[index % rotations.length];
}

/** Zero-pad a number to two digits ("01", "27"). */
export function pad2(n: number): string {
  return String(n).padStart(2, '0');
}
