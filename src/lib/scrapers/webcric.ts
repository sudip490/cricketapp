import axios from 'axios';
import * as cheerio from 'cheerio';

const BASE_URL = 'https://me.webcric.com';
const USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36';

export interface WebcricMatch {
    title: string;
    url: string;
    status: 'Live' | 'Upcoming' | 'Completed';
    streamChannels: { name: string; url: string }[];
}

/**
 * Scrapes the list of live and upcoming matches from the Webcric homepage.
 */
export async function getWebcricMatches(): Promise<WebcricMatch[]> {
    try {
        const response = await axios.get(`${BASE_URL}/index.html`, {
            headers: {
                'User-Agent': USER_AGENT,
                'Referer': BASE_URL,
            },
        });

        const $ = cheerio.load(response.data);
        const matches: WebcricMatch[] = [];

        // Webcric typically lists matches in tables on the homepage.
        // We look for table rows that contain match information.
        // The exact selector depends on their current layout, usually simplistic tables.
        // Based on inspection, matches are often links inside tables.

        // Look for all 'a' tags that contain "watch" or resemble match links
        $('a').each((_, element) => {
            const href = $(element).attr('href');
            const text = $(element).text().trim();

            if (href && (href.includes('watch-') || href.includes('cricket-live-streaming'))) {
                // Basic filtering to find match links
                if (text.length > 5 && !text.toLowerCase().includes('scorecard')) {
                    matches.push({
                        title: text,
                        url: href.startsWith('http') ? href : `${BASE_URL}/${href}`,
                        status: text.toLowerCase().includes('live') ? 'Live' : 'Upcoming',
                        streamChannels: [], // To be populated if detailed scraping is done
                    });
                }
            }
        });

        // Remove duplicates based on URL
        return Array.from(new Map(matches.map(m => [m.url, m])).values());
    } catch (error) {
        console.error('Error scraping Webcric homepage:', error);
        return [];
    }
}

/**
 * Attempts to extract the stream URL (iframe source) from a specific match page.
 * Note: This is fragile as the actual stream is often protected by JS/tokens.
 */
export async function getStreamSource(matchUrl: string): Promise<string | null> {
    try {
        const response = await axios.get(matchUrl, {
            headers: {
                'User-Agent': USER_AGENT,
                'Referer': BASE_URL,
            },
            // Important to follow redirects if they exist
            maxRedirects: 5,
        });

        const $ = cheerio.load(response.data);

        // Look for iframes
        let streamUrl: string | null = null;

        $('iframe').each((_, iframe) => {
            const src = $(iframe).attr('src');
            if (src && (src.includes('superover') || src.includes('embed') || src.includes('player'))) {
                streamUrl = src;
                return false; // Break loop
            }
        });

        // Sometimes the iframe is inside a script
        if (!streamUrl) {
            $('script').each((_, script) => {
                const content = $(script).html();
                if (content && content.includes('iframe') && content.includes('src=')) {
                    // Attempt to regex extract src from script
                    const match = content.match(/src=["'](.*?)["']/);
                    if (match && match[1] && (match[1].includes('http') || match[1].startsWith('//'))) {
                        streamUrl = match[1];
                        if (streamUrl.startsWith('//')) streamUrl = `https:${streamUrl}`;
                        return false;
                    }
                }
            });
        }

        return streamUrl;
    } catch (error) {
        console.error(`Error scraping stream source for ${matchUrl}:`, error);
        return null;
    }
}
