export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <section
      hidden
      dangerouslySetInnerHTML={{
        __html: `<script type="application/ld+json">${JSON.stringify(data)}</script>`,
      }}
    />
  );
}
