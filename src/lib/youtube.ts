/** Build a privacy-friendly nocookie embed URL for a YouTube id. '' when empty. */
export function embedUrl(id: string): string {
  return id
    ? `https://www.youtube-nocookie.com/embed/${id}?rel=0&modestbranding=1`
    : '';
}

/** Extract a YouTube id from a full URL or a bare id. '' when none found. */
export function ytId(input: string | null | undefined): string {
  if (!input) return '';
  const value = String(input).trim();
  if (!/[/.]/.test(value) && value.length >= 6) return value; // bare id
  const match = value.match(/(?:youtu\.be\/|v=|shorts\/|embed\/)([\w-]{6,})/);
  return match ? match[1] : '';
}
