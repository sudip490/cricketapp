export type CricketStream = {
    id: string;
    name: string;
    url: string;
    type: "hls" | "iframe";
    description?: string;
    category: "live" | "highlights" | "general";
    isExternal?: boolean;
};

export const cricketStreams: CricketStream[] = [
    // Live Cricket Streams (HLS)
    {
        id: "dd-sports",
        name: "DD Sports",
        url: "https://d75dqofg5kmfk.cloudfront.net/bpk-tv/Ddsports/default/index.m3u8",
        type: "hls",
        description: "Official Indian Sports Channel",
        category: "live",
    },
    {
        id: "t-sports",
        name: "T Sports",
        url: "https://live.tsports.com/live/tsports_live/index.m3u8",
        type: "hls",
        description: "Bangladesh Cricket Channel",
        category: "live",
    },
    {
        id: "willow-cricket",
        name: "Willow Cricket",
        url: "https://willow-plex.amagi.tv/playlist.m3u8",
        type: "hls",
        description: "Premium Cricket Channel",
        category: "live",
    },
    {
        id: "star-sports-1",
        name: "Star Sports 1",
        url: "http://103.10.30.130:8081/viatv/viastarsports1hd/chunks.m3u8",
        type: "hls",
        description: "Star Sports 1 HD",
        category: "live",
    },
    {
        id: "star-sports-2",
        name: "Star Sports 2",
        url: "http://103.10.30.130:8081/viatv/viastarsports2hd/chunks.m3u8",
        type: "hls",
        description: "Star Sports 2 HD",
        category: "live",
    },
    {
        id: "sony-ten-1",
        name: "Sony Ten 1 HD",
        url: "http://103.10.30.130:8081/viatv/viaten1hd/chunks.m3u8",
        type: "hls",
        description: "Sony Ten 1 HD",
        category: "live",
    },
    {
        id: "sony-ten-2",
        name: "Sony Ten 2 HD",
        url: "http://103.10.30.130:8081/viatv/viaten2hd/chunks.m3u8",
        type: "hls",
        description: "Sony Ten 2 HD",
        category: "live",
    },
    {
        id: "sony-ten-3",
        name: "Sony Ten 3 HD",
        url: "http://103.10.30.130:8081/viatv/viaten3hd/chunks.m3u8",
        type: "hls",
        description: "Sony Ten 3 HD",
        category: "live",
    },

    // External Streaming Sites (iframe)
    {
        id: "crichd-asia",
        name: "CricHD Asia",
        url: "https://crichd.asia/",
        type: "iframe",
        description: "Live Cricket Streaming HD",
        category: "general",
        isExternal: true,
    },
    {
        id: "crichd-alt",
        name: "CricHD Alternative",
        url: "https://crichd.com/live-cricket-streaming-free-website-5",
        type: "iframe",
        description: "CricHD Mirror Site",
        category: "general",
        isExternal: true,
    },
    {
        id: "smartcric",
        name: "SmartCric",
        url: "https://smartcric.com/",
        type: "iframe",
        description: "Cricket Live Streaming",
        category: "general",
        isExternal: true,
    },
    {
        id: "crictime",
        name: "Crictime",
        url: "https://crictime.com/",
        type: "iframe",
        description: "Free Cricket Streaming",
        category: "general",
        isExternal: true,
    },

    // CricHD Direct Streams (iframe) - use real crichd.one channel IDs: stream.php?id=XXX
    {
        id: "crichd-star-sports-1",
        name: "CricHD - Star Sports 1",
        url: "https://crichd.one/stream.php?id=starsp1",
        type: "iframe",
        description: "Star Sports 1 via CricHD",
        category: "live",
        isExternal: true,
    },
    {
        id: "crichd-willow-2",
        name: "CricHD - Willow 2",
        url: "https://crichd.one/stream.php?id=willowextra",
        type: "iframe",
        description: "Willow Extra via CricHD",
        category: "live",
        isExternal: true,
    },
    {
        id: "crichd-cricket-2",
        name: "CricHD - Cricket 2",
        url: "https://crichd.one/stream.php?id=crich2",
        type: "iframe",
        description: "Cricket 2 via CricHD",
        category: "live",
        isExternal: true,
    },
    {
        id: "crichd-sky-cricket",
        name: "CricHD - Sky Cricket",
        url: "https://crichd.one/stream.php?id=skyarena",
        type: "iframe",
        description: "Sky Cricket via CricHD",
        category: "live",
        isExternal: true,
    },
];

export const getStreamsByCategory = (category: CricketStream["category"]) => {
    return cricketStreams.filter((stream) => stream.category === category);
};

export const getHLSStreams = () => {
    return cricketStreams.filter((stream) => stream.type === "hls");
};

export const getIframeStreams = () => {
    return cricketStreams.filter((stream) => stream.type === "iframe");
};
