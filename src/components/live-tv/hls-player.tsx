"use client";

import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import { cn } from "@/lib/utils";
import { AlertCircle, Loader2 } from "lucide-react";

interface HlsPlayerProps {
  src: string | null;
  title?: string;
  className?: string;
}

export function HlsPlayer({ src, title, className }: HlsPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<Hls | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !src) {
      setError(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    // Cleanup previous instance
    if (hlsRef.current) {
      hlsRef.current.destroy();
      hlsRef.current = null;
    }

    if (Hls.isSupported()) {
      const hls = new Hls({
        enableWorker: true,
        lowLatencyMode: false,
        backBufferLength: 90,
      });

      hlsRef.current = hls;

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        setLoading(false);
        video.play().catch(() => {
          // Auto-play might be blocked, that's okay
        });
      });

      hls.on(Hls.Events.ERROR, (_, data) => {
        console.error("HLS Error:", data);

        if (data.fatal) {
          setLoading(false);
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              setError("Network error - Stream may be offline or blocked");
              // Try to recover
              hls.startLoad();
              break;
            case Hls.ErrorTypes.MEDIA_ERROR:
              setError("Media error - Trying to recover...");
              hls.recoverMediaError();
              break;
            default:
              setError("Unable to play this stream");
              hls.destroy();
              hlsRef.current = null;
              break;
          }
        }
      });

      try {
        hls.loadSource(src);
        hls.attachMedia(video);
      } catch (err) {
        setError("Failed to load stream");
        setLoading(false);
      }

      return () => {
        hls.destroy();
        hlsRef.current = null;
      };
    }

    // Native HLS support (Safari)
    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = src;
      video.addEventListener("loadedmetadata", () => setLoading(false));
      video.addEventListener("error", () => {
        setError("Unable to play this stream");
        setLoading(false);
      });

      return () => {
        video.removeAttribute("src");
        video.load();
      };
    }

    setError("HLS not supported in this browser");
    setLoading(false);
  }, [src]);

  if (!src) {
    return (
      <div
        className={cn(
          "flex aspect-video w-full items-center justify-center rounded-lg border bg-muted text-muted-foreground",
          className
        )}
        aria-label="Video player"
      >
        <p className="text-sm">Select a channel to play</p>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={cn(
          "flex aspect-video w-full flex-col items-center justify-center gap-2 rounded-lg border bg-muted text-muted-foreground",
          className
        )}
      >
        <AlertCircle className="h-12 w-12 text-red-500" />
        <p className="text-sm font-medium">{error}</p>
        <p className="text-xs text-muted-foreground">Try another channel</p>
      </div>
    );
  }

  return (
    <div className="relative w-full aspect-video">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
          <Loader2 className="h-8 w-8 animate-spin text-white" />
        </div>
      )}
      <video
        ref={videoRef}
        controls
        className={cn("w-full aspect-video rounded-lg bg-black", className)}
        aria-label={title ?? "Live TV stream"}
        playsInline
      />
    </div>
  );
}
