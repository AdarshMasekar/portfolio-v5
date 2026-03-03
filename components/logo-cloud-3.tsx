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
      <InfiniteSlider gap={55} duration={55}>
        {logos.map((logo) =>
          logo.component ? (
            <div
              key={`logo-${logo.alt}`}
              className="flex items-center justify-center"
            >
              {logo.component}
            </div>
          ) : (
            <div
              key={`logo-${logo.alt}`}
              className="relative h-4 md:h-5 w-auto flex items-center justify-center"
            >
              <img
                alt={logo.alt}
                className="pointer-events-none h-full w-auto select-none dark:brightness-0 dark:invert object-contain"
                loading="lazy"
                src={logo.src!}
              />
            </div>
          ),
        )}
      </InfiniteSlider>
    </div>
  );
}
