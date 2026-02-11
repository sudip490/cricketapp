import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
    const url = request.nextUrl.searchParams.get('url');
    if (!url) {
        return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    try {
        const response = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                'Referer': new URL(url).origin,
            },
        });

        if (!response.ok) {
            // For segment files (.ts), return empty body to prevent HLS.js remux errors
            if (url.endsWith('.ts')) {
                return new NextResponse(null, { status: response.status });
            }
            return NextResponse.json({ error: `Failed to fetch: ${response.statusText}` }, { status: response.status });
        }

        const contentType = response.headers.get('content-type') || '';
        const isPlaylist = contentType.includes('mpegurl') || url.endsWith('.m3u8');

        if (isPlaylist) {
            const text = await response.text();
            const baseUrl = url; // The original URL is the base for relative paths inside the m3u8

            const rewritten = text.split('\n').map(line => {
                const trimmed = line.trim();
                if (!trimmed) return line;

                if (trimmed.startsWith('#')) {
                    // Rewrite URI in EXT-X-KEY and EXT-X-MAP
                    if (trimmed.startsWith('#EXT-X-KEY') || trimmed.startsWith('#EXT-X-MAP')) {
                        return trimmed.replace(/URI=["'](.*?)["']/, (match, group1) => {
                            try {
                                const absoluteUrl = new URL(group1, baseUrl).toString();
                                return `URI="/api/proxy?url=${encodeURIComponent(absoluteUrl)}"`;
                            } catch (e) {
                                return match;
                            }
                        });
                    }
                    return line;
                }

                // Rewrite segment URLs
                try {
                    const absoluteUrl = new URL(trimmed, baseUrl).toString();
                    return `/api/proxy?url=${encodeURIComponent(absoluteUrl)}`;
                } catch (e) {
                    return line;
                }
            }).join('\n');

            return new NextResponse(rewritten, {
                status: 200,
                headers: {
                    'Content-Type': 'application/vnd.apple.mpegurl',
                    'Access-Control-Allow-Origin': '*',
                    'Cache-Control': 'no-cache, no-store, must-revalidate, proxy-revalidate',
                    'Pragma': 'no-cache',
                    'Expires': '0',
                },
            });
        }

        // For segments (ts) and other content, stream the body
        return new NextResponse(response.body, {
            status: 200,
            headers: {
                'Content-Type': contentType,
                'Access-Control-Allow-Origin': '*',
                'Cache-Control': 'public, max-age=31536000, immutable',
            },
        });

    } catch (error) {
        console.error('Proxy error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
