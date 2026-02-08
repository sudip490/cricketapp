"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    ArrowLeft,
    ExternalLink,
    Tv,
    Radio,
    Play,
    Info,
    Wifi
} from "lucide-react";
import { HLSPlayer } from "@/components/hls-player";
import { cricketStreams, getHLSStreams, getIframeStreams } from "@/data/cricket-streams";

export default function StreamingPage() {
    const hlsStreams = getHLSStreams();
    const iframeStreams = getIframeStreams();

    const [selectedStream, setSelectedStream] = useState(hlsStreams[0]);
    const [activeTab, setActiveTab] = useState<"hls" | "iframe">("hls");

    const handleOpenExternal = () => {
        window.open(selectedStream.url, "_blank", "noopener,noreferrer");
    };

    const currentStreams = activeTab === "hls" ? hlsStreams : iframeStreams;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
            {/* Header */}
            <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Button variant="ghost" size="icon" asChild className="hover:bg-slate-100 dark:hover:bg-slate-800">
                                <Link href="/" aria-label="Back to home">
                                    <ArrowLeft className="h-5 w-5" />
                                </Link>
                            </Button>
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg">
                                    <Tv className="h-5 w-5 text-white" />
                                </div>
                                <div>
                                    <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                        Live Cricket Streaming
                                    </h1>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">
                                        Watch live cricket matches in HD
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={handleOpenExternal}
                                className="gap-2 hover:bg-slate-100 dark:hover:bg-slate-800"
                            >
                                <ExternalLink className="h-4 w-4" />
                                <span className="hidden sm:inline">Open External</span>
                            </Button>
                        </div>
                    </div>
                </div>
            </header>

            <div className="container mx-auto px-4 py-6">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Sidebar - Stream Selection */}
                    <aside className="lg:col-span-1">
                        <Card className="border-slate-200 dark:border-slate-800 shadow-lg">
                            <CardContent className="p-4">
                                <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3 flex items-center gap-2">
                                    <Radio className="h-4 w-4" />
                                    Available Streams
                                </h2>

                                {/* Stream Type Tabs */}
                                <Tabs value={activeTab} onValueChange={(v) => {
                                    setActiveTab(v as "hls" | "iframe");
                                    const streams = v === "hls" ? hlsStreams : iframeStreams;
                                    setSelectedStream(streams[0]);
                                }} className="mb-4">
                                    <TabsList className="grid w-full grid-cols-2">
                                        <TabsTrigger value="hls" className="text-xs">
                                            <Wifi className="h-3 w-3 mr-1" />
                                            Direct
                                        </TabsTrigger>
                                        <TabsTrigger value="iframe" className="text-xs">
                                            <ExternalLink className="h-3 w-3 mr-1" />
                                            Sites
                                        </TabsTrigger>
                                    </TabsList>
                                </Tabs>

                                <div className="space-y-2">
                                    {currentStreams.map((stream) => (
                                        <button
                                            key={stream.id}
                                            onClick={() => setSelectedStream(stream)}
                                            className={`w-full text-left p-3 rounded-lg transition-all ${selectedStream.id === stream.id
                                                    ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md"
                                                    : "bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700"
                                                }`}
                                        >
                                            <div className="font-medium text-sm">{stream.name}</div>
                                            <div className={`text-xs mt-1 ${selectedStream.id === stream.id
                                                    ? "text-blue-100"
                                                    : "text-slate-500 dark:text-slate-400"
                                                }`}>
                                                {stream.description}
                                            </div>
                                        </button>
                                    ))}
                                </div>

                                {/* Info Card */}
                                <div className="mt-6 p-3 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg">
                                    <div className="flex items-start gap-2">
                                        <Info className="h-4 w-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                                        <div className="text-xs text-blue-700 dark:text-blue-300">
                                            <p className="font-medium mb-1">Tips:</p>
                                            <ul className="space-y-1 list-disc list-inside">
                                                <li>Direct streams work better</li>
                                                <li>Use fullscreen for best view</li>
                                                <li>Some streams may be geo-blocked</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </aside>

                    {/* Main Content - Stream Player */}
                    <main className="lg:col-span-3">
                        <Card className="border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden">
                            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h2 className="text-lg font-bold text-white">
                                            {selectedStream.name}
                                        </h2>
                                        <p className="text-sm text-blue-100">
                                            {selectedStream.description}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {selectedStream.type === "hls" && (
                                            <span className="px-2 py-1 bg-green-500/20 text-green-100 text-xs rounded-full border border-green-400/30">
                                                <Wifi className="h-3 w-3 inline mr-1" />
                                                Live
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <CardContent className="p-0">
                                {selectedStream.type === "hls" ? (
                                    <div className="p-4 bg-black">
                                        <HLSPlayer
                                            src={selectedStream.url}
                                            title={selectedStream.name}
                                            autoPlay={false}
                                        />
                                    </div>
                                ) : (
                                    <div className="relative w-full bg-black" style={{ paddingBottom: "56.25%" }}>
                                        <iframe
                                            key={selectedStream.id}
                                            src={selectedStream.url}
                                            className="absolute top-0 left-0 w-full h-full"
                                            allowFullScreen
                                            allow="autoplay; fullscreen; picture-in-picture"
                                            title={selectedStream.name}
                                            sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                                        />
                                    </div>
                                )}
                            </CardContent>

                            {/* Quick Actions */}
                            <div className="p-4 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
                                <div className="flex flex-wrap gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={handleOpenExternal}
                                        className="gap-2"
                                    >
                                        <ExternalLink className="h-3.5 w-3.5" />
                                        Open in New Tab
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        asChild
                                        className="gap-2"
                                    >
                                        <Link href="/live-tv">
                                            <Tv className="h-3.5 w-3.5" />
                                            Go to Live TV
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </Card>

                        {/* Disclaimer */}
                        <div className="mt-4 p-4 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg">
                            <p className="text-xs text-amber-800 dark:text-amber-200">
                                <strong>Disclaimer:</strong> Stream availability depends on broadcasting rights and geographic location.
                                Some streams may require VPN. We are not responsible for third-party content.
                            </p>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}
