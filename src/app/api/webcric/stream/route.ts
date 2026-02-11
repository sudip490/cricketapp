import { NextRequest, NextResponse } from 'next/server';
import { getStreamSource } from '@/lib/scrapers/webcric';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const matchUrl = searchParams.get('url');

    if (!matchUrl) {
        return NextResponse.json(
            { success: false, error: 'Match URL is required' },
            { status: 400 }
        );
    }

    try {
        const streamUrl = await getStreamSource(matchUrl);

        if (streamUrl) {
            return NextResponse.json({ success: true, streamUrl });
        } else {
            return NextResponse.json(
                { success: false, error: 'Stream not found or protected' },
                { status: 404 }
            );
        }
    } catch (error) {
        console.error('Failed to extract stream:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to extract stream' },
            { status: 500 }
        );
    }
}
