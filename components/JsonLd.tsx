"use client";

import { useEffect, useRef } from "react";

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(data);
    ref.current.appendChild(script);
    return () => {
      script.remove();
    };
  }, [data]);

  return <div ref={ref} hidden />;
}
