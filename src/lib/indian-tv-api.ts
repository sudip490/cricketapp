
export type IndianChannel = {
    id: string;
    name: string;
    logo?: string;
    url: string;
    category?: string;
};

export async function fetchIndianTVChannels(): Promise<IndianChannel[]> {
    try {
        const response = await fetch(
            'https://raw.githubusercontent.com/FunctionError/PiratesTv/main/combined_playlist.m3u',
            { next: { revalidate: 3600 } } // Cache for 1 hour
        );

        if (!response.ok) {
            throw new Error(`Failed to fetch Indian TV channels: ${response.status}`);
        }

        const m3uContent = await response.text();
        return parseM3U(m3uContent);
    } catch (error) {
        console.error('Error fetching Indian TV channels:', error);
        return [];
    }
}

function parseM3U(content: string): IndianChannel[] {
    const channels: IndianChannel[] = [];
    const lines = content.split('\n');

    let currentChannel: Partial<IndianChannel> = {};

    for (const line of lines) {
        if (line.startsWith('#EXTINF:')) {
            // Extract info from #EXTINF line
            const logoMatch = line.match(/tvg-logo="([^"]+)"/);
            const nameMatch = line.match(/,(.+)$/);
            const groupMatch = line.match(/group-title="([^"]+)"/);

            currentChannel = {
                logo: logoMatch ? logoMatch[1] : undefined,
                name: nameMatch ? nameMatch[1].trim() : 'Unknown Channel',
                category: groupMatch ? groupMatch[1] : 'General',
            };
        } else if (line.trim() && !line.startsWith('#') && currentChannel.name) {
            // Stream URL line
            currentChannel.url = line.trim();
            currentChannel.id = currentChannel.name.toLowerCase().replace(/[^a-z0-9]/g, '-');

            channels.push(currentChannel as IndianChannel);
            currentChannel = {};
        }
    }

    return channels;
}
