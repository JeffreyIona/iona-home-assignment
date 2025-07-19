export function idFromSlug(slug: string): number | null {
  const match = slug.match(/-(\d+)$/);
  return match ? Number(match[1]) : null;
}
