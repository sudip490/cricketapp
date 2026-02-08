"use client";

import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Channel } from "@/data/live-tv-channels";
import { cn } from "@/lib/utils";
import { ExternalLink } from "lucide-react";

interface ChannelListProps {
  channels: Channel[];
  selectedChannelId: string | null;
  onSelectChannel: (channel: Channel) => void;
  className?: string;
}

export function ChannelList({
  channels,
  selectedChannelId,
  onSelectChannel,
  className,
}: ChannelListProps) {
  return (
    <ScrollArea className={cn("h-full min-h-[200px]", className)}>
      <ul className="flex flex-col gap-1.5 p-1" role="list">
        {channels.map((channel) => (
          <li key={channel.id}>
            <Card
              className={cn(
                "cursor-pointer transition-colors hover:bg-accent",
                selectedChannelId === channel.id && "ring-2 ring-primary bg-accent"
              )}
              onClick={() => onSelectChannel(channel)}
            >
              <div className="px-4 py-3 flex items-center justify-between gap-2">
                <span className="text-sm font-medium">{channel.name}</span>
                {channel.isExternal && (
                  <ExternalLink className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />
                )}
              </div>
            </Card>
          </li>
        ))}
      </ul>
    </ScrollArea>
  );
}
