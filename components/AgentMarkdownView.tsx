import { useState, useEffect } from "react";
import { getMarkdownContent } from "@/lib/data/content";

export function AgentMarkdownView() {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-IN", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }),
      );
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);

    return () => clearInterval(timer);
  }, []);

  const markdownContent = getMarkdownContent(time);

  return (
    <pre
      className="w-full whitespace-pre-wrap font-mono text-sm leading-relaxed text-foreground antialiased"
      style={{
        fontFamily:
          '"Courier New", Courier, "Lucida Sans Typewriter", "Lucida Console", monospace',
      }}
    >
      {markdownContent}
    </pre>
  );
}
