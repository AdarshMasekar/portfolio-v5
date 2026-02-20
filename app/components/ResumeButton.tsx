import { Download } from "lucide-react";

export function ResumeButton() {
  return (
    <a
      href="/Adarsh Masekar - PSE.pdf"
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex h-10 w-40 items-center justify-center overflow-hidden rounded-full border border-foreground/20 bg-background font-medium text-foreground transition-all duration-300 hover:bg-foreground/5 hover:border-foreground/40 active:scale-95"
    >
      <div className="absolute inset-0 flex items-center justify-center gap-2 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full">
        <span>Resume</span>
        <Download className="h-4 w-4 opacity-70" />
      </div>
      <div className="absolute inset-0 flex items-center justify-center gap-2 translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-y-0">
        <span>Resume</span>
        <Download className="h-4 w-4" />
      </div>
    </a>
  );
}
