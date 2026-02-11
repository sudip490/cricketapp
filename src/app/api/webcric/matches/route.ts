import { NextResponse } from 'next/server';
import { getWebcricMatches } from '@/lib/scrapers/webcric';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const matches = await getWebcricMatches();
        return NextResponse.json({ success: true, matches });
    } catch (error) {
        console.error('Failed to fetch matches:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch matches' },
            { status: 500 }
        );
    }
}
