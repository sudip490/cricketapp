"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { HlsPlayer } from "@/components/live-tv/hls-player";
import { ChannelList } from "@/components/live-tv/channel-list";
import { liveTvCategories } from "@/data/live-tv-channels";
import type { Channel } from "@/data/live-tv-channels";
import { ArrowLeft, ExternalLink } from "lucide-react";

export default function LiveTvPage() {
  const [selectedChannel, setSelectedChannel] = useState<Channel | null>(null);

  const handleOpenExternal = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <main className="min-h-screen flex flex-col">
      <header className="border-b px-4 py-3 flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/" aria-label="Back to home">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <h1 className="text-xl font-semibold">Live TV</h1>
      </header>

      <div className="flex-1 flex flex-col lg:flex-row gap-4 p-4">
        <section className="flex flex-col gap-2 lg:min-w-[280px] lg:max-w-[320px]">
          <Tabs defaultValue={liveTvCategories[0]?.id ?? ""} className="w-full">
            <TabsList className="flex flex-row lg:flex-col h-auto w-full gap-1 rounded-md border bg-muted p-1 min-w-0 overflow-x-auto lg:overflow-visible">
              {liveTvCategories.map((cat) => (
                <TabsTrigger
                  key={cat.id}
                  value={cat.id}
                  className="w-auto lg:w-full min-w-0 lg:justify-start justify-center flex-shrink-0 rounded-sm px-3 py-2.5 text-center lg:text-left text-sm font-medium whitespace-nowrap lg:whitespace-normal break-words data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
                >
                  {cat.name}
                </TabsTrigger>
              ))}
            </TabsList>
            {liveTvCategories.map((cat) => (
              <TabsContent
                key={cat.id}
                value={cat.id}
                className="mt-2 focus-visible:outline-none"
              >
                <ChannelList
                  channels={cat.channels}
                  selectedChannelId={selectedChannel?.id ?? null}
                  onSelectChannel={setSelectedChannel}
                  className="h-[240px] lg:h-[320px]"
                />
              </TabsContent>
            ))}
          </Tabs>
        </section>

        <section className="flex-1 min-w-0">
          <Card>
            <CardHeader className="py-3">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-medium truncate flex-1">
                  {selectedChannel?.name ?? "No channel selected"}
                </h2>
                {selectedChannel?.isExternal && (
                  <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-full flex items-center gap-1">
                    <ExternalLink className="h-3 w-3" />
                    External
                  </span>
                )}
              </div>
              {selectedChannel?.description && (
                <p className="text-sm text-muted-foreground mt-1">
                  {selectedChannel.description}
                </p>
              )}
            </CardHeader>
            <CardContent className="p-0">
              <div className="aspect-video w-full min-h-[240px] bg-black rounded-b-lg overflow-hidden">
                {selectedChannel?.isExternal ? (
                  <div className="h-full w-full flex flex-col items-center justify-center gap-4 p-8 text-center">
                    <ExternalLink className="h-16 w-16 text-blue-500" />
                    <div>
                      <h3 className="text-white text-xl font-semibold mb-2">
                        External Streaming Platform
                      </h3>
                      <p className="text-gray-300 text-sm mb-4">
                        This channel opens in a new browser tab
                      </p>
                    </div>
                    <Button
                      size="lg"
                      onClick={() => handleOpenExternal(selectedChannel.url)}
                      className="gap-2"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Open {selectedChannel.name}
                    </Button>
                    <p className="text-gray-400 text-xs mt-2">
                      Note: External sites may contain ads and require ad-blockers
                    </p>
                  </div>
                ) : (
                  <HlsPlayer
                    src={selectedChannel?.url ?? null}
                    title={selectedChannel?.name}
                    className="h-full w-full object-contain"
                  />
                )}
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  );
}
