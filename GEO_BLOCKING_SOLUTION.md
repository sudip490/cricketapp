# Live Matches - Geo-Blocking Issue & Solution

## The Problem

The FanCode streams are **geo-blocked** and only available in **India** 🇮🇳. This is why you're seeing "Failed to load stream" errors.

## Why This Happens

1. **Geographic Restrictions**: FanCode has broadcasting rights only for India
2. **CORS Restrictions**: Browser security prevents direct playback from some regions
3. **IP-based Blocking**: The stream servers check your IP address location

## Solutions

### Option 1: Use VPN (Recommended)

1. **Install a VPN** with Indian server:
   - ProtonVPN (Free tier available)
   - NordVPN
   - ExpressVPN
   - Any VPN with India servers

2. **Connect to India server**

3. **Refresh the page** and try again

### Option 2: Use VLC Media Player

If the stream doesn't work in browser even with VPN:

1. **Click "Copy URL for VLC"** button when you see the error
2. **Open VLC Media Player**
3. **Go to**: Media → Open Network Stream
4. **Paste the URL** and click Play
5. **Make sure VPN is connected** to India

### Option 3: Use Other Streaming Options

Go back to homepage and try:

1. **Live TV Channels** (`/live-tv`)
   - 75+ channels including Star Sports, Sony Ten
   - Many work without VPN
   - Direct m3u8 streams

2. **Live Streaming** (`/streaming`)
   - CricHD Asia, SmartCric, Crictime
   - External streaming sites
   - Some may work without VPN

## How to Test if VPN is Working

1. Visit: https://whatismyipaddress.com/
2. Check if location shows **India**
3. If yes, refresh the live matches page

## Alternative: Use the Static Streams

The **Live TV** and **Streaming** pages have streams that may work better in your region:

### Working Streams (No VPN needed):
- **DD Sports**: Indian government channel
- **T Sports**: Bangladesh cricket
- **Willow Cricket**: International cricket
- **Star Sports** (via ViaTV): May work in some regions
- **Sony Ten** (via ViaTV): May work in some regions

## Technical Details

The FanCode API we're using:
- **Source**: https://github.com/byte-capsule/FanCode-Hls-Fetcher
- **Update Frequency**: Every 30 minutes
- **Stream Format**: HLS (m3u8)
- **Geo-restriction**: India only
- **Requires**: VPN to India for most users

## Summary

✅ **Live Matches page works** - It fetches real match data
✅ **URLs are valid** - They're real FanCode streams
❌ **Geo-blocked** - Only accessible from India
✅ **Solution**: Use VPN connected to India
✅ **Alternative**: Use Live TV or Streaming pages

The feature is working correctly - the limitation is from FanCode's geo-blocking, not our implementation.
