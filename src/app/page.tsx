import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tv, Radio, ArrowRight, Wifi } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            Cricket & Sports Streaming
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg">
            Watch live cricket and sports from multiple sources
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">

          {/* Live TV Card */}
          <Link href="/live-tv" className="group">
            <Card className="h-full border-2 border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-300 hover:shadow-xl hover:scale-105">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Tv className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-2xl flex items-center justify-between">
                  Live TV Channels
                  <ArrowRight className="h-5 w-5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                </CardTitle>
                <CardDescription className="text-base">
                  Access 75+ live TV channels including Star Sports, Sony Ten, and more
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                    <span>Sports, Movies, News & Entertainment</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                    <span>Direct m3u8 streams</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                    <span>No external redirects</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* Indian TV Card - NEW */}
          <Link href="/indian-tv" className="group">
            <Card className="h-full border-2 border-slate-200 dark:border-slate-800 hover:border-orange-500 dark:hover:border-orange-500 transition-all duration-300 hover:shadow-xl hover:scale-105">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Tv className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-2xl flex items-center justify-between">
                  Indian IPTV
                  <ArrowRight className="h-5 w-5 text-slate-400 group-hover:text-orange-600 group-hover:translate-x-1 transition-all" />
                </CardTitle>
                <CardDescription className="text-base">
                  Watch 500+ live Indian TV channels across all categories
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
                    <span>News, Movies, Sports, Music</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
                    <span>Auto-updated channel list</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
                    <span>Fast search & filtering</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* Streaming Sites Card */}
          <Link href="/streaming" className="group">
            <Card className="h-full border-2 border-slate-200 dark:border-slate-800 hover:border-indigo-500 dark:hover:border-indigo-500 transition-all duration-300 hover:shadow-xl hover:scale-105">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Radio className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-2xl flex items-center justify-between">
                  Live Streaming
                  <ArrowRight className="h-5 w-5 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
                </CardTitle>
                <CardDescription className="text-base">
                  Watch from popular streaming platforms like CricHD, SmartCric, and more
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></div>
                    <span>Multiple streaming sources</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></div>
                    <span>Live cricket matches</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></div>
                    <span>Embedded player with controls</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>

        <div className="mt-12 max-w-2xl mx-auto text-center">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Choose your preferred streaming method. Live TV offers direct channels, while Streaming provides access to popular cricket streaming websites.
          </p>
        </div>
      </div>
    </main>
  );
}
