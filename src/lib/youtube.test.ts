import { describe, expect, it } from 'vitest';
import { embedUrl, ytId } from './youtube';

describe('ytId', () => {
  it('extracts the id from a watch?v= URL', () => {
    expect(ytId('https://www.youtube.com/watch?v=z8_S_wHfDxo')).toBe(
      'z8_S_wHfDxo',
    );
  });

  it('extracts the id from a youtu.be short link', () => {
    expect(ytId('https://youtu.be/z8_S_wHfDxo')).toBe('z8_S_wHfDxo');
  });

  it('extracts the id from a shorts/ URL', () => {
    expect(ytId('https://www.youtube.com/shorts/z8_S_wHfDxo')).toBe(
      'z8_S_wHfDxo',
    );
  });

  it('extracts the id from an embed/ URL', () => {
    expect(ytId('https://www.youtube.com/embed/z8_S_wHfDxo')).toBe(
      'z8_S_wHfDxo',
    );
  });

  it('accepts a bare id', () => {
    expect(ytId('z8_S_wHfDxo')).toBe('z8_S_wHfDxo');
  });

  it('returns an empty string for empty, null, undefined and garbage', () => {
    expect(ytId('')).toBe('');
    expect(ytId(null)).toBe('');
    expect(ytId(undefined)).toBe('');
    expect(ytId('https://example.com/no-id-here')).toBe('');
  });
});

describe('embedUrl', () => {
  it('builds a nocookie embed URL for an id', () => {
    expect(embedUrl('abc123')).toBe(
      'https://www.youtube-nocookie.com/embed/abc123?rel=0&modestbranding=1',
    );
  });

  it('returns an empty string for an empty id', () => {
    expect(embedUrl('')).toBe('');
  });
});
