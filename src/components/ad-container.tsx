"use client";

import { useEffect, useRef } from "react";

interface AdContainerProps {
    adCode?: string; // Optional direct HTML string
    adSlotId?: string; // If using Google (not recommended) or specific div ID
    width?: number | string;
    height?: number | string;
    className?: string;
}

export function AdContainer({
    adCode,
    adSlotId,
    width = 300,
    height = 250,
    className
}: AdContainerProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (containerRef.current && adCode) {
            // Unsafe but necessary for some ad networks that give raw HTML
            // Always sanitize or trust the source (ad network)
            const range = document.createRange();
            range.selectNode(containerRef.current);
            const documentFragment = range.createContextualFragment(adCode);
            containerRef.current.innerHTML = '';
            containerRef.current.appendChild(documentFragment);
        }
    }, [adCode]);

    return (
        <div
            ref={containerRef}
            id={adSlotId}
            className={`flex items-center justify-center bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden my-4 mx-auto ${className || ''}`}
            style={{
                width: typeof width === 'number' ? `${width}px` : width,
                height: typeof height === 'number' ? `${height}px` : height,
                minHeight: typeof height === 'number' ? `${height}px` : height
            }}
        >
            {/* Placeholder Text - Shows only in Dev or if no ad loaded */}
            {!adCode && (
                <div className="text-center p-4">
                    <p className="text-xs text-slate-400 font-mono">AD SPACE ({width}x{height})</p>
                    <p className="text-[10px] text-slate-300">Place Adsterra/Monetag code here</p>
                </div>
            )}
        </div>
    );
}
