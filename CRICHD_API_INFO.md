# How to Extract Stream URLs from CricHD.asia

## Important Information

CricHD.asia **does not provide a public API**. The site embeds streams from various sources, and the stream URLs change frequently (every few hours or days).

## Method 1: Browser Developer Tools (Manual)

1. **Open the streaming page** on crichd.asia
2. **Press F12** to open Developer Tools
3. **Go to Network tab**
4. **Filter by "m3u8"** in the search box
5. **Play the video**
6. **Look for .m3u8 URLs** in the network requests
7. **Copy the URL** and add it to your HLS streams

## Method 2: Use Browser Extensions

Install one of these Chrome extensions:
- **M3U8 Sniffer** - Automatically detects m3u8 streams
- **Stream Detector** - Finds video streams on any page

## Method 3: Programmatic Extraction (Advanced)

You would need to:
1. Load the crichd.asia page in a headless browser
2. Monitor network requests
3. Extract m3u8 URLs when video plays
4. This requires server-side code and is complex

## Current Implementation

For now, we're using **iframe embedding** which is the simplest approach:
- ✅ Works immediately
- ✅ No API needed
- ✅ Automatically updates when they change streams
- ❌ Shows ads and popups
- ❌ Can't customize player

## Better Alternative: Use Direct HLS Streams

Instead of trying to extract from CricHD, use the **Direct HLS streams** we already have:

### Working HLS Streams:
1. **DD Sports** - `https://d75dqofg5kmfk.cloudfront.net/bpk-tv/Ddsports/default/index.m3u8`
2. **T Sports** - `https://live.tsports.com/live/tsports_live/index.m3u8`
3. **Willow Cricket** - `https://willow-plex.amagi.tv/playlist.m3u8`
4. **Star Sports 1-3 HD** - Via ViaTV provider
5. **Sony Ten 1-3 HD** - Via ViaTV provider

These are **much better** than CricHD because:
- ✅ No ads
- ✅ Direct video playback
- ✅ Custom controls
- ✅ Better quality
- ✅ More reliable

## Recommendation

**Use the "Direct" tab** in your streaming page instead of trying to extract from CricHD. The HLS streams work much better and don't require any extraction.

If you really need CricHD, keep it in the "Sites" tab as an iframe fallback option.
