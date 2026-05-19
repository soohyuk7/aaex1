type MatterportEmbedProps = {
  modelId: string;
  title: string;
  className?: string;
};

/** Matterport Showcase embed (https://my.matterport.com/show/?m=...) */
export function MatterportEmbed({ modelId, title, className }: MatterportEmbedProps) {
  const src = new URL("https://my.matterport.com/show/");
  src.searchParams.set("m", modelId);
  src.searchParams.set("play", "1");
  src.searchParams.set("qs", "1");
  src.searchParams.set("brand", "0");

  return (
    <iframe
      title={title}
      src={src.toString()}
      allow="fullscreen; xr-spatial-tracking"
      allowFullScreen
      className={className ?? "h-full w-full border-0"}
      loading="lazy"
    />
  );
}
