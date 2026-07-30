/**
 * Renders a JSON-LD <script> tag for structured data.
 * Safe for SSR — outputs a script tag that search engines parse.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}
