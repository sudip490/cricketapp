// Auto-updating sports streaming APIs
export type LiveSportsStream = {
    name: string;
    logo?: string;
    link: string;
    headers?: Record<string, string>;
    category?: string;
};

export type SportsAPIResponse = {
    name: string;
    owner: string;
    channels_amount: number;
    updated_on: string;
    channels: LiveSportsStream[];
};

/**
 * TSports API - Updates every 12 hours
 * Provides live cricket, football, and other sports
 * Source: https://github.com/byte-capsule/TSports-m3u8-Grabber
 */
export async function fetchTSportsStreams(): Promise<LiveSportsStream[]> {
    try {
        const response = await fetch(
            'https://raw.githubusercontent.com/byte-capsule/TSports-m3u8-Grabber/main/TSports_m3u8_headers.Json',
            { next: { revalidate: 3600 } } // Cache for 1 hour
        );

        if (!response.ok) {
            throw new Error(`Failed to fetch TSports streams: ${response.status}`);
        }

        const data: SportsAPIResponse = await response.json();
        return data.channels || [];
    } catch (error) {
        console.error('Error fetching TSports streams:', error);
        return [];
    }
}

/**
 * IPTV-ORG Sports API - Community-maintained, frequently updated
 * Provides 1000+ sports channels worldwide
 * Source: https://github.com/iptv-org/iptv
 */
export async function fetchIPTVOrgSportsStreams(): Promise<LiveSportsStream[]> {
    try {
        const response = await fetch(
            'https://iptv-org.github.io/iptv/categories/sports.m3u',
            { next: { revalidate: 7200 } } // Cache for 2 hours
        );

        if (!response.ok) {
            throw new Error(`Failed to fetch IPTV-ORG streams: ${response.status}`);
        }

        const m3uContent = await response.text();
        return parseM3U(m3uContent);
    } catch (error) {
        console.error('Error fetching IPTV-ORG streams:', error);
        return [];
    }
}

/**
 * Parse M3U playlist format
 */
function parseM3U(content: string): LiveSportsStream[] {
    const streams: LiveSportsStream[] = [];
    const lines = content.split('\n');

    let currentStream: Partial<LiveSportsStream> = {};

    for (const line of lines) {
        if (line.startsWith('#EXTINF:')) {
            // Extract stream info from #EXTINF line
            const logoMatch = line.match(/tvg-logo="([^"]+)"/);
            const nameMatch = line.match(/,(.+)$/);
            const categoryMatch = line.match(/group-title="([^"]+)"/);

            currentStream = {
                logo: logoMatch ? logoMatch[1] : undefined,
                name: nameMatch ? nameMatch[1].trim() : 'Unknown',
                category: categoryMatch ? categoryMatch[1] : 'Sports',
            };
        } else if (line.trim() && !line.startsWith('#') && currentStream.name) {
            // This line is the stream URL
            currentStream.link = line.trim();

            // Filter for cricket and football channels
            const name = currentStream.name?.toLowerCase() || '';
            if (
                name.includes('cricket') ||
                name.includes('sports') ||
                name.includes('football') ||
                name.includes('soccer') ||
                name.includes('star') ||
                name.includes('sony') ||
                name.includes('espn') ||
                name.includes('willow') ||
                name.includes('dd sports') ||
                name.includes('t sports')
            ) {
                streams.push(currentStream as LiveSportsStream);
            }

            currentStream = {};
        }
    }

    return streams;
}

/**
 * Get all live sports streams from all APIs
 */
export async function getAllLiveSportsStreams(): Promise<{
    tsports: LiveSportsStream[];
    iptvorg: LiveSportsStream[];
    total: number;
}> {
    const [tsports, iptvorg] = await Promise.all([
        fetchTSportsStreams(),
        fetchIPTVOrgSportsStreams(),
    ]);

    return {
        tsports,
        iptvorg,
        total: tsports.length + iptvorg.length,
    };
}
