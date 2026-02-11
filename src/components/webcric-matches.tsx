"use client";

import { useEffect, useState } from "react";
import { Play, Calendar, ExternalLink, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HLSPlayer } from "@/components/hls-player";

interface Match {
    title: string;
    url: string;
    status: 'Live' | 'Upcoming' | 'Completed';
}

export function WebcricMatches() {
    const [matches, setMatches] = useState<Match[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
    const [streamUrl, setStreamUrl] = useState<string | null>(null);
    const [streamLoading, setStreamLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchMatches = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch('/api/webcric/matches');
            const data = await res.json();
            if (data.success) {
                setMatches(data.matches);
            } else {
                setError("Failed to load matches");
            }
        } catch (err) {
            setError("Error connecting to server");
        } finally {
            setLoading(false);
        }
    };

    const handleMatchClick = async (match: Match) => {
        setSelectedMatch(match);
        setStreamUrl(null);
        setStreamLoading(true);

        try {
            // Attempt to get stream from our API
            const res = await fetch(`/api/webcric/stream?url=${encodeURIComponent(match.url)}`);
            const data = await res.json();

            if (data.success && data.streamUrl) {
                setStreamUrl(data.streamUrl);
            } else {
                // Determine if we should show an error or iframe fallback
                // For now, if scraper fails, we might just show the match link.
            }
        } catch (err) {
            console.error("Stream fetch error", err);
        } finally {
            setStreamLoading(false);
        }
    };

    useEffect(() => {
        fetchMatches();
    }, []);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Live Matches (WebCric)</h2>
                <Button variant="outline" size="sm" onClick={fetchMatches} disabled={loading}>
                    <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                    Refresh
                </Button>
            </div>

            {error && (
                <div className="p-4 bg-red-500/10 text-red-500 rounded-md text-sm">
                    {error}
                </div>
            )}

            {selectedMatch && (
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-lg">{selectedMatch.title}</h3>
                        <Button variant="ghost" size="sm" onClick={() => setSelectedMatch(null)}>
                            Close Player
                        </Button>
                    </div>

                    <div className="aspect-video bg-black rounded-lg overflow-hidden relative">
                        {streamLoading ? (
                            <div className="absolute inset-0 flex items-center justify-center text-white">
                                <RefreshCw className="h-8 w-8 animate-spin mb-2" />
                            </div>
                        ) : streamUrl ? (
                            <HLSPlayer
                                src={streamUrl}
                                autoPlay={true}
                            // These headers are critical for proxy play but browsers block them usually
                            // The proxy service (corsproxy.io) handles them if configured
                            />
                        ) : (
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6 text-center">
                                <p className="mb-4 text-lg font-medium">Direct stream extraction failed.</p>
                                <p className="text-sm text-gray-400 mb-6">
                                    WebCric streams are protected. You can watch directly on their site.
                                </p>
                                <Button asChild variant="secondary">
                                    <a href={selectedMatch.url} target="_blank" rel="noopener noreferrer">
                                        Watch on WebCric <ExternalLink className="ml-2 h-4 w-4" />
                                    </a>
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            )}

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {matches.map((match) => (
                    <div
                        key={match.url}
                        className={`bg-card border rounded-lg p-4 hover:border-primary/50 transition-colors cursor-pointer ${selectedMatch?.url === match.url ? 'border-primary ring-1 ring-primary' : ''
                            }`}
                        onClick={() => handleMatchClick(match)}
                    >
                        <div className="flex justify-between items-start mb-2">
                            <span className={`text-xs px-2 py-1 rounded-full ${match.status === 'Live' ? 'bg-red-500 text-white animate-pulse' : 'bg-slate-100 dark:bg-slate-800'
                                }`}>
                                {match.status}
                            </span>
                            <Play className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <h3 className="font-medium line-clamp-2 mb-2">{match.title}</h3>
                        <div className="flex items-center text-xs text-muted-foreground">
                            <Calendar className="h-3 w-3 mr-1" />
                            Match Details
                        </div>
                    </div>
                ))}

                {!loading && matches.length === 0 && (
                    <div className="col-span-full text-center py-12 text-muted-foreground">
                        No active matches found.
                    </div>
                )}
            </div>
        </div>
    );
}
