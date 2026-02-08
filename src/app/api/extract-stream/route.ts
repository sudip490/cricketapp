import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const channelId = searchParams.get('id');

    if (!channelId) {
        return NextResponse.json({ error: 'Channel ID is required' }, { status: 400 });
    }

    try {
        // Fetch the CricHD stream page
        const crichd_url = `https://crichd.one/stream.php?id=${channelId}`;

        const response = await fetch(crichd_url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.5',
                'Referer': 'https://crichd.one/',
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch CricHD page: ${response.status}`);
        }

        const html = await response.text();

        // Extract m3u8 URL using regex patterns
        const patterns = [
            /https?:\/\/[^"'\s]+\.m3u8[^"'\s]*/gi,
            /"(https?:\/\/[^"]+\.m3u8[^"]*)"/gi,
            /'(https?:\/\/[^']+\.m3u8[^']*)'/gi,
            /source:\s*["']([^"']+\.m3u8[^"']*)["']/gi,
            /file:\s*["']([^"']+\.m3u8[^"']*)["']/gi,
        ];

        let m3u8Urls: string[] = [];

        for (const pattern of patterns) {
            const matches = html.matchAll(pattern);
            for (const match of matches) {
                const url = match[1] || match[0];
                if (url && url.includes('.m3u8')) {
                    // Clean up the URL
                    const cleanUrl = url.replace(/["']/g, '').trim();
                    if (!m3u8Urls.includes(cleanUrl)) {
                        m3u8Urls.push(cleanUrl);
                    }
                }
            }
        }

        if (m3u8Urls.length === 0) {
            return NextResponse.json({
                error: 'No m3u8 stream found',
                debug: {
                    channelId,
                    url: crichd_url,
                    htmlLength: html.length,
                }
            }, { status: 404 });
        }

        // Return the first (usually best quality) m3u8 URL
        return NextResponse.json({
            success: true,
            channelId,
            streamUrl: m3u8Urls[0],
            allUrls: m3u8Urls,
        });

    } catch (error) {
        console.error('Error extracting stream:', error);
        return NextResponse.json({
            error: 'Failed to extract stream',
            message: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
    }
}
