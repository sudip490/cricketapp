"use client";

import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import { Play, Pause, Volume2, VolumeX, Maximize, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";


interface HLSPlayerProps {
    src: string;
    title?: string;
    autoPlay?: boolean;
    headers?: Record<string, string>;
    className?: string; // NEW
}

export function HLSPlayer({ src, title, autoPlay = false, headers, className }: HLSPlayerProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const hlsRef = useRef<Hls | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentSrc, setCurrentSrc] = useState(src);
    const [retryCount, setRetryCount] = useState(0);

    // Reset currentSrc when src prop changes
    useEffect(() => {
        setCurrentSrc(src);
        setRetryCount(0);
        setError(null);
    }, [src]);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        // Clean up previous instance
        if (hlsRef.current) {
            hlsRef.current.destroy();
        }

        setIsLoading(true);
        // Don't reset error here if we are retrying
        if (retryCount === 0) setError(null);

        if (Hls.isSupported()) {
            const hls = new Hls({
                enableWorker: true,
                lowLatencyMode: true,
                backBufferLength: 90,
                xhrSetup: headers ? (xhr) => {
                    Object.entries(headers).forEach(([key, value]) => {
                        xhr.setRequestHeader(key, value);
                    });
                } : undefined,
            });

            hlsRef.current = hls;
            hls.loadSource(currentSrc);
            hls.attachMedia(video);

            hls.on(Hls.Events.MANIFEST_PARSED, () => {
                setIsLoading(false);
                setError(null); // Success!
                if (autoPlay) {
                    video.play().catch((err) => {
                        console.error("Auto-play failed:", err);
                        setIsPlaying(false);
                    });
                }
            });

            hls.on(Hls.Events.ERROR, (event, data) => {
                console.error("HLS Error:", data);
                if (data.fatal) {
                    // If network error and haven't retried with proxy yet
                    if (data.type === Hls.ErrorTypes.NETWORK_ERROR && retryCount === 0) {
                        console.log("Network error, attempting CORS proxy...");
                        setRetryCount(1);
                        // Try with corsproxy.io
                        setCurrentSrc(`https://corsproxy.io/?${encodeURIComponent(src)}`);
                        return; // return early, useEffect will re-run with new src
                    }

                    setIsLoading(false);
                    setError("Stream unavailable. It might be geo-blocked or offline.");
                    hls.destroy();
                }
            });
        } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
            // For Safari
            video.src = currentSrc;
            video.addEventListener("loadedmetadata", () => {
                setIsLoading(false);
                setError(null);
                if (autoPlay) {
                    video.play().catch((err) => {
                        console.error("Auto-play failed:", err);
                        setIsPlaying(false);
                    });
                }
            });

            video.addEventListener("error", () => {
                if (retryCount === 0) {
                    console.log("Safari network error, attempting CORS proxy...");
                    setRetryCount(1);
                    setCurrentSrc(`https://corsproxy.io/?${encodeURIComponent(src)}`);
                } else {
                    setIsLoading(false);
                    setError("Stream unavailable on Safari.");
                }
            });
        } else {
            setError("HLS is not supported in this browser");
            setIsLoading(false);
        }

        return () => {
            if (hlsRef.current) {
                hlsRef.current.destroy();
            }
        };
    }, [currentSrc, autoPlay, headers, src, retryCount]);

    const togglePlay = () => {
        const video = videoRef.current;
        if (!video) return;

        if (video.paused) {
            video.play();
            setIsPlaying(true);
        } else {
            video.pause();
            setIsPlaying(false);
        }
    };

    const toggleMute = () => {
        const video = videoRef.current;
        if (!video) return;

        video.muted = !video.muted;
        setIsMuted(video.muted);
    };

    const toggleFullscreen = () => {
        const video = videoRef.current;
        if (!video) return;

        if (document.fullscreenElement) {
            document.exitFullscreen();
        } else {
            video.requestFullscreen();
        }
    };

    return (
        <div className={`relative w-full bg-black rounded-lg overflow-hidden group ${className || ""}`}>
            <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                <video
                    ref={videoRef}
                    className="absolute top-0 left-0 w-full h-full"
                    onClick={togglePlay}
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                />

                {/* Loading Overlay */}
                {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/80">
                        <div className="text-center">
                            <Loader2 className="h-12 w-12 text-white animate-spin mx-auto mb-2" />
                            <p className="text-white text-sm">Loading stream...</p>
                        </div>
                    </div>
                )}

                {/* Error Overlay */}
                {error && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/80">
                        <div className="text-center px-4 max-w-md">
                            <p className="text-red-400 text-sm mb-4">{error}</p>
                            <p className="text-slate-300 text-xs mb-4">
                                This stream may be geo-blocked or require a VPN. Try opening it in VLC Media Player.
                            </p>
                            <div className="flex gap-2 justify-center">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => {
                                        navigator.clipboard.writeText(src);
                                        alert("Stream URL copied! Open VLC → Media → Open Network Stream → Paste URL");
                                    }}
                                    className="mt-2"
                                >
                                    Copy URL for VLC
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => window.location.reload()}
                                    className="mt-2"
                                >
                                    Retry
                                </Button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Controls Overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={togglePlay}
                                className="text-white hover:bg-white/20"
                            >
                                {isPlaying ? (
                                    <Pause className="h-5 w-5" />
                                ) : (
                                    <Play className="h-5 w-5" />
                                )}
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={toggleMute}
                                className="text-white hover:bg-white/20"
                            >
                                {isMuted ? (
                                    <VolumeX className="h-5 w-5" />
                                ) : (
                                    <Volume2 className="h-5 w-5" />
                                )}
                            </Button>
                            {title && (
                                <span className="text-white text-sm ml-2">{title}</span>
                            )}
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={toggleFullscreen}
                            className="text-white hover:bg-white/20"
                        >
                            <Maximize className="h-5 w-5" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
