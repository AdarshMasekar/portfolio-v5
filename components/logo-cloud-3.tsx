import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { cn } from "@/lib/utils";

export type Logo = {
  src?: string;
  alt: string;
  width?: number;
  height?: number;
  component?: React.ReactNode;
};

type LogoCloudProps = React.ComponentProps<"div"> & {
  logos: Logo[];
};

export function LogoCloud({ className, logos, ...props }: LogoCloudProps) {
  return (
    <div
      {...props}
      className={cn(
        "overflow-hidden py-4 [mask-image:linear-gradient(to_right,transparent,black,transparent)] bg-background/50",
        className,
      )}
    >
      <InfiniteSlider reverse gap={55} duration={77}>
        {logos.map((logo) =>
          logo.component ? (
            <div
              key={`logo-${logo.alt}`}
              className="flex items-center justify-center"
            >
              {logo.component}
            </div>
          ) : (
            <img
              alt={logo.alt}
              className="pointer-events-none h-4 select-none md:h-5 dark:brightness-0 dark:invert"
              height={logo.height || "auto"}
              key={`logo-${logo.alt}`}
              loading="lazy"
              src={logo.src!}
              width={logo.width || "auto"}
            />
          ),
        )}
      </InfiniteSlider>
    </div>
  );
}
