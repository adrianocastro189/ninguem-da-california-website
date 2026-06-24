import { existsSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

/**
 * Fails the build if any .css under src/ is not in the allowlist. Only the
 * design-token sources may be hand-authored CSS files; component styling
 * goes in scoped <style> blocks using var(--token). See ARCHITECTURE.md §6.
 */
const ALLOWED = new Set(['src/styles/tokens.css', 'src/styles/global.css']);

function findCss(dir) {
  const found = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) found.push(...findCss(full));
    else if (entry.endsWith('.css')) found.push(full.replace(/\\/g, '/'));
  }
  return found;
}

const offenders = (existsSync('src') ? findCss('src') : []).filter(
  (f) => !ALLOWED.has(f),
);
if (offenders.length > 0) {
  console.error(
    'Only tokens.css and global.css may be hand-authored CSS under src/:',
  );
  for (const f of offenders) console.error('  ' + f);
  process.exit(1);
}
