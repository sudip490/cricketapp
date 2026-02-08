"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
    ArrowLeft,
    Tv,
    Search,
    Play,
    ListFilter,
    RefreshCw,
} from "lucide-react";
import { HLSPlayer } from "@/components/hls-player";
import { fetchIndianTVChannels, type IndianChannel } from "@/lib/indian-tv-api";

export default function IndianTVPage() {
    const [channels, setChannels] = useState<IndianChannel[]>([]);
    const [filteredChannels, setFilteredChannels] = useState<IndianChannel[]>([]);
    const [selectedChannel, setSelectedChannel] = useState<IndianChannel | null>(null);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<string>("All");
    const [categories, setCategories] = useState<string[]>([]);

    useEffect(() => {
        loadChannels();
    }, []);

    useEffect(() => {
        filterChannels();
    }, [searchQuery, selectedCategory, channels]);

    const loadChannels = async () => {
        setLoading(true);
        const data = await fetchIndianTVChannels();
        setChannels(data);

        // Extract unique categories
        const cats = Array.from(new Set(data.map(c => c.category || "General"))).sort();
        setCategories(["All", ...cats]);

        setLoading(false);
    };

    const filterChannels = () => {
        let filtered = channels;

        if (selectedCategory !== "All") {
            filtered = filtered.filter(c => (c.category || "General") === selectedCategory);
        }

        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(c =>
                c.name.toLowerCase().includes(query)
            );
        }

        setFilteredChannels(filtered);
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
            <div className="container mx-auto px-4 py-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <div className="flex items-center gap-4">
                        <Link href="/">
                            <Button variant="ghost" size="icon">
                                <ArrowLeft className="h-5 w-5" />
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-2xl font-bold flex items-center gap-2">
                                <Tv className="h-6 w-6 text-orange-500" />
                                Indian Live TV
                            </h1>
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                {channels.length} Live Channels Available
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 w-full md:w-auto">
                        <div className="relative w-full md:w-64">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-slate-500" />
                            <Input
                                placeholder="Search channels..."
                                className="pl-8"
                                value={searchQuery}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <Button variant="outline" size="icon" onClick={loadChannels} title="Refresh Channels">
                            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                        </Button>
                    </div>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

                    {/* Sidebar / Categories (Mobile: Top Scroll, Desktop: Sidebar) */}
                    <aside className="lg:col-span-1 space-y-4">


                        <Card className="p-4 sticky top-4 max-h-[calc(100vh-2rem)] overflow-y-auto">
                            <h3 className="font-semibold mb-3 flex items-center gap-2">
                                <ListFilter className="h-4 w-4" />
                                Categories
                            </h3>
                            <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
                                {categories.map(cat => (
                                    <button
                                        key={cat}
                                        onClick={() => setSelectedCategory(cat)}
                                        className={`px-3 py-2 rounded-md text-sm text-left transition-colors whitespace-nowrap lg:whitespace-normal ${selectedCategory === cat
                                            ? "bg-orange-500 text-white font-medium"
                                            : "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
                                            }`}
                                    >
                                        {cat}
                                        <span className="ml-2 text-xs opacity-70">
                                            ({cat === "All"
                                                ? channels.length
                                                : channels.filter(c => (c.category || "General") === cat).length})
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </Card>
                    </aside>

                    {/* Channels Grid & Desktop Player */}
                    <div className="lg:col-span-3 space-y-6">
                        {/* Desktop Player */}
                        {selectedChannel && (
                            <div className="sticky top-4 z-10 mb-6">
                                <Card className="overflow-hidden border-orange-500 border-2 shadow-xl">
                                    <div className="aspect-video bg-black">
                                        <HLSPlayer
                                            src={selectedChannel.url}
                                            title={selectedChannel.name}
                                            autoPlay={true}
                                        />
                                    </div>
                                    <div className="p-4 bg-slate-100 dark:bg-slate-800 flex justify-between items-center">
                                        <div>
                                            <h2 className="text-xl font-bold">{selectedChannel.name}</h2>
                                            <span className="text-sm text-slate-500">{selectedChannel.category}</span>
                                        </div>
                                        <Button variant="outline" size="sm" onClick={() => setSelectedChannel(null)}>
                                            Close Player
                                        </Button>
                                    </div>
                                </Card>
                            </div>
                        )}

                        {/* Channel Grid */}
                        {loading ? (
                            <div className="flex justify-center py-20">
                                <RefreshCw className="h-10 w-10 animate-spin text-orange-500" />
                            </div>
                        ) : filteredChannels.length === 0 ? (
                            <div className="text-center py-20 text-slate-500">
                                <Search className="h-10 w-10 mx-auto mb-2 opacity-20" />
                                <p>No channels found matching "{searchQuery}"</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                {filteredChannels.map(channel => (
                                    <Card
                                        key={channel.id + channel.url} // Unique key
                                        className={`cursor-pointer hover:shadow-lg transition-all hover:scale-105 border-transparent hover:border-orange-500 border-2 ${selectedChannel?.url === channel.url ? 'ring-2 ring-orange-500' : ''
                                            }`}
                                        onClick={() => {
                                            setSelectedChannel(channel);
                                            window.scrollTo({ top: 0, behavior: 'smooth' });
                                        }}
                                    >
                                        <CardContent className="p-4 flex flex-col items-center text-center h-full justify-center gap-3">
                                            {channel.logo ? (
                                                <img
                                                    src={channel.logo}
                                                    alt={channel.name}
                                                    className="w-16 h-16 object-contain"
                                                    onError={(e) => {
                                                        (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(channel.name)}&background=random`;
                                                    }}
                                                />
                                            ) : (
                                                <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center">
                                                    <Tv className="h-8 w-8 text-slate-400" />
                                                </div>
                                            )}
                                            <div>
                                                <h3 className="font-semibold text-sm line-clamp-2">{channel.name}</h3>
                                                <p className="text-xs text-slate-400 mt-1 truncate max-w-[120px]">
                                                    {channel.category}
                                                </p>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
