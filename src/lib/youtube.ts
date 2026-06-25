/** Build a privacy-friendly nocookie embed URL for a YouTube id. '' when empty.
 *  Pass { autoplay: true } to append &autoplay=1 (used by the video lightbox). */
export function embedUrl(id: string, opts?: { autoplay?: boolean }): string {
  if (!id) return '';
  const base = `https://www.youtube-nocookie.com/embed/${id}?rel=0&modestbranding=1`;
  return opts?.autoplay ? `${base}&autoplay=1` : base;
}

/** Extract a YouTube id from a full URL or a bare id. '' when none found. */
export function ytId(input: string | null | undefined): string {
  if (!input) return '';
  const value = String(input).trim();
  if (!/[/.]/.test(value) && value.length >= 6) return value; // bare id
  const match = value.match(/(?:youtu\.be\/|v=|shorts\/|embed\/)([\w-]{6,})/);
  return match ? match[1] : '';
}
