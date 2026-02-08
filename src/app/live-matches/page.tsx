"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
    ArrowLeft,
    Tv,
    RefreshCw,
    Wifi,
    Clock,
    Trophy,
} from "lucide-react";
import { HLSPlayer } from "@/components/hls-player";
import { fetchTSportsStreams, type LiveSportsStream } from "@/lib/live-sports-api";

export default function LiveMatchesPage() {
    const [matches, setMatches] = useState<LiveSportsStream[]>([]);
    const [selectedMatch, setSelectedMatch] = useState<LiveSportsStream | null>(null);
    const [loading, setLoading] = useState(true);
    const [lastUpdated, setLastUpdated] = useState<string>("");

    const loadMatches = async () => {
        setLoading(true);
        const liveMatches = await fetchTSportsStreams();
        setMatches(liveMatches);
        if (liveMatches.length > 0 && !selectedMatch) {
            setSelectedMatch(liveMatches[0]);
        }
        setLastUpdated(new Date().toLocaleTimeString());
        setLoading(false);
    };

    useEffect(() => {
        loadMatches();

        // Auto-refresh every 5 minutes
        const interval = setInterval(loadMatches, 5 * 60 * 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
            <div className="container mx-auto px-4 py-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                        <Link href="/">
                            <Button variant="ghost" size="icon">
                                <ArrowLeft className="h-5 w-5" />
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                                <Trophy className="h-7 w-7 text-green-600" />
                                Live Cricket Matches
                            </h1>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                                Auto-updated every 12 hours • {matches.length} live {matches.length === 1 ? 'match' : 'matches'}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        {lastUpdated && (
                            <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {lastUpdated}
                            </span>
                        )}
                        <Button
                            onClick={loadMatches}
                            variant="outline"
                            size="sm"
                            disabled={loading}
                            className="gap-2"
                        >
                            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                            Refresh
                        </Button>
                    </div>
                </div>

                {/* Loading State */}
                {loading && matches.length === 0 ? (
                    <div className="flex items-center justify-center min-h-[400px]">
                        <div className="text-center">
                            <RefreshCw className="h-12 w-12 text-green-600 animate-spin mx-auto mb-4" />
                            <p className="text-slate-600 dark:text-slate-400">Loading live matches...</p>
                        </div>
                    </div>
                ) : matches.length === 0 ? (
                    <div className="flex items-center justify-center min-h-[400px]">
                        <Card className="max-w-2xl">
                            <CardContent className="p-8 text-center">
                                <Trophy className="h-16 w-16 text-slate-400 mx-auto mb-4" />
                                <h2 className="text-xl font-bold text-slate-700 dark:text-slate-300 mb-2">
                                    No Live Matches Available
                                </h2>
                                <p className="text-slate-500 dark:text-slate-400 mb-6">
                                    There are no live cricket matches at the moment. Check back later!
                                </p>

                                <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
                                    <p className="text-sm text-blue-800 dark:text-blue-200 mb-4">
                                        <strong>Note:</strong> Live matches are updated every 12 hours from TSports.
                                    </p>
                                </div>

                                <div className="space-y-3">
                                    <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                                        Try these alternatives:
                                    </p>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        <Link href="/live-tv">
                                            <Button variant="outline" className="w-full gap-2">
                                                <Tv className="h-4 w-4" />
                                                Live TV Channels
                                            </Button>
                                        </Link>
                                        <Link href="/streaming">
                                            <Button variant="outline" className="w-full gap-2">
                                                <Wifi className="h-4 w-4" />
                                                Streaming Sites
                                            </Button>
                                        </Link>
                                    </div>

                                    <Button onClick={loadMatches} variant="ghost" className="gap-2 mt-4">
                                        <RefreshCw className="h-4 w-4" />
                                        Check for Matches Again
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                        {/* Sidebar - Match List */}
                        <aside className="lg:col-span-1">
                            <Card className="border-slate-200 dark:border-slate-800 shadow-lg sticky top-6">
                                <CardContent className="p-4">
                                    <h2 className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-3 flex items-center gap-2">
                                        <Wifi className="h-4 w-4 text-green-600" />
                                        Live Now
                                    </h2>
                                    <div className="space-y-2">
                                        {matches.map((match, index) => (
                                            <button
                                                key={index}
                                                onClick={() => setSelectedMatch(match)}
                                                className={`w-full text-left p-3 rounded-lg transition-all ${selectedMatch === match
                                                        ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-md"
                                                        : "bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700"
                                                    }`}
                                            >
                                                {match.logo && (
                                                    <img
                                                        src={match.logo}
                                                        alt={match.name}
                                                        className="w-full h-20 object-cover rounded mb-2"
                                                    />
                                                )}
                                                <div className="text-sm font-medium">
                                                    {match.name}
                                                </div>
                                                {match.category && (
                                                    <div className={`text-xs mt-1 ${selectedMatch === match
                                                            ? "text-green-100"
                                                            : "text-slate-500 dark:text-slate-400"
                                                        }`}>
                                                        {match.category}
                                                    </div>
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </aside>

                        {/* Main Content - Stream Player */}
                        <main className="lg:col-span-3">
                            {selectedMatch && (
                                <Card className="border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden">
                                    {selectedMatch.logo && (
                                        <div
                                            className="h-32 bg-cover bg-center relative"
                                            style={{ backgroundImage: `url(${selectedMatch.logo})` }}
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                                            <div className="absolute bottom-4 left-4 right-4">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <span className="px-2 py-1 bg-red-500 text-white text-xs rounded-full flex items-center gap-1">
                                                        <Wifi className="h-3 w-3 animate-pulse" />
                                                        LIVE
                                                    </span>
                                                    {selectedMatch.category && (
                                                        <span className="text-white text-xs font-medium">
                                                            {selectedMatch.category}
                                                        </span>
                                                    )}
                                                </div>
                                                <h2 className="text-lg font-bold text-white">
                                                    {selectedMatch.name}
                                                </h2>
                                            </div>
                                        </div>
                                    )}

                                    <CardContent className="p-4 bg-black">
                                        <HLSPlayer
                                            src={selectedMatch.link}
                                            title={selectedMatch.name}
                                            autoPlay={false}
                                            headers={selectedMatch.headers}
                                        />
                                    </CardContent>

                                    {/* Info Banner */}
                                    <div className="p-4 bg-blue-50 dark:bg-blue-950/20 border-t border-blue-200 dark:border-blue-800">
                                        <p className="text-xs text-blue-800 dark:text-blue-200 mb-3">
                                            <strong>✅ TSports API:</strong> Direct m3u8 streams, auto-updated every 12 hours.
                                            No geo-blocking, no VPN needed!
                                        </p>
                                        <div className="flex gap-2">
                                            <Link href="/live-tv">
                                                <Button variant="outline" size="sm" className="text-xs gap-1">
                                                    <Tv className="h-3 w-3" />
                                                    More Channels
                                                </Button>
                                            </Link>
                                            <Link href="/streaming">
                                                <Button variant="outline" size="sm" className="text-xs gap-1">
                                                    <Wifi className="h-3 w-3" />
                                                    Streaming Sites
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                </Card>
                            )}
                        </main>
                    </div>
                )}
            </div>
        </div>
    );
}
