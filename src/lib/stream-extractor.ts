// Service to extract m3u8 streams from CricHD
export type ExtractedStream = {
    success: boolean;
    channelId: string;
    streamUrl?: string;
    allUrls?: string[];
    error?: string;
};

export async function extractCricHDStream(channelId: string): Promise<ExtractedStream> {
    try {
        const response = await fetch(`/api/extract-stream?id=${channelId}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error extracting stream:', error);
        return {
            success: false,
            channelId,
            error: 'Failed to extract stream',
        };
    }
}

// Predefined CricHD channel IDs (real ids from crichd.one/stream.php?id=XXX)
export const CRICHD_CHANNELS = {
    starSports1: 'starsp1',
    willowExtra: 'willowextra',
    cricket2: 'crich2',
    skyCricket: 'skyarena',
    // Legacy slugs (may not work on crichd.one)
    willow: 'willow',
    starSports2: 'star-sports-2',
    sonyTen1: 'ten-1',
    sonyTen2: 'ten-2',
    sonyTen3: 'ten-3',
    ptvSports: 'ptv-sports',
    aSports: 'a-sports',
    geoSuper: 'geo-super',
    ddSports: 'dd-sports',
    tSports: 'tsports',
} as const;

export type CricHDChannelId = typeof CRICHD_CHANNELS[keyof typeof CRICHD_CHANNELS];
