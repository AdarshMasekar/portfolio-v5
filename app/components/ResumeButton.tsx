export function ResumeButton() {
  return (
    <a
      href="/Adarsh Masekar - PSE.pdf"
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex h-10 w-32 items-center justify-center overflow-hidden rounded-full border border-foreground/20 bg-background font-medium text-foreground transition-all hover:bg-foreground/5 active:scale-95"
    >
      <div className="relative h-6 w-full overflow-hidden flex items-center justify-center">
        <span className="absolute inset-0 flex items-center justify-center transition-transform duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full">
          Resume
        </span>
        <span className="absolute inset-0 flex items-center justify-center translate-y-full transition-transform duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-y-0">
          Resume
        </span>
      </div>
    </a>
  );
}
