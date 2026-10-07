"use client";

import { useId } from "react";

export function MediaPlaceholder({
  file,
  subtitle,
  ratio = "16 / 9",
  className = "",
  compact = false,
  fill = false,
  title,
  captionPlacement = "center",
  showCaption = false,
}: {
  file: string;
  subtitle: string;
  ratio?: string;
  kind?: "IMAGE" | "VIDEO";
  coords?: string;
  className?: string;
  compact?: boolean;
  fill?: boolean;
  title?: string;
  captionPlacement?: "center" | "corner";
  showCaption?: boolean;
}) {
  const pid = useId().replace(/:/g, "");
  const heading = title && !/yakında/i.test(title) ? title : "Görsel yer tutucu";
  const corner = captionPlacement === "corner";
  return (
    <figure
      className={`blueprint relative isolate overflow-hidden text-frost ${fill ? "h-full w-full" : "rounded-tile"} ${className}`}
      style={fill ? undefined : { aspectRatio: ratio }}
      aria-hidden={showCaption ? undefined : true}
    >
      <div className="absolute inset-0 opacity-40">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id={`dot-${pid}`} width="28" height="28" patternUnits="userSpaceOnUse">
              <circle cx="3" cy="3" r="1.2" fill="currentColor" opacity="0.22" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#dot-${pid})`} />
        </svg>
      </div>
      {showCaption ? (
        <figcaption
          className={
            corner
              ? "absolute bottom-5 right-5 z-20 max-w-xs rounded-lg bg-white/95 px-4 py-3 text-left shadow-hud"
              : "relative z-10 flex h-full flex-col items-center justify-center px-5 text-center"
          }
        >
          <p className={`font-semibold text-frost ${compact ? "text-sm" : "text-base"}`}>{heading}</p>
          <p className={`mt-2 max-w-md text-balance text-mute ${compact ? "text-xs leading-5" : "text-sm leading-6"}`}>
            {subtitle}
          </p>
          <p className="sr-only">{file}</p>
        </figcaption>
      ) : null}
    </figure>
  );
}
