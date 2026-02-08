# CricHD Direct Stream URLs

## Pattern Discovered
CricHD uses a consistent URL pattern:
```
https://crichd.one/stream.php?id={channel-id}
```

## Working Channels Added ✅

1. **Willow Cricket**: `https://crichd.one/stream.php?id=willow`
2. **Star Sports 1**: `https://crichd.one/stream.php?id=star-sports-1`
3. **Star Sports 2**: `https://crichd.one/stream.php?id=star-sports-2`
4. **Sony Ten 1**: `https://crichd.one/stream.php?id=ten-1`
5. **Sony Ten 2**: `https://crichd.one/stream.php?id=ten-2`
6. **Sony Ten 3**: `https://crichd.one/stream.php?id=ten-3`

## Potential Additional Channels to Test

### Cricket Channels
- `https://crichd.one/stream.php?id=sky-sports-cricket`
- `https://crichd.one/stream.php?id=star-sports-3`
- `https://crichd.one/stream.php?id=ptv-sports`
- `https://crichd.one/stream.php?id=a-sports`
- `https://crichd.one/stream.php?id=geo-super`
- `https://crichd.one/stream.php?id=dd-sports`
- `https://crichd.one/stream.php?id=tsports`

### Other Sports Channels
- `https://crichd.one/stream.php?id=sky-sports-football`
- `https://crichd.one/stream.php?id=sky-sports-premier-league`
- `https://crichd.one/stream.php?id=bt-sport-1`
- `https://crichd.one/stream.php?id=bt-sport-2`
- `https://crichd.one/stream.php?id=espn`
- `https://crichd.one/stream.php?id=fox-sports`

## How to Test

1. Open the URL in your browser
2. If it loads a video player, it works!
3. Add it to `cricket-streams.ts` following the pattern:

```typescript
{
    id: "crichd-{channel-name}",
    name: "CricHD - {Channel Name}",
    url: "https://crichd.one/stream.php?id={channel-id}",
    type: "iframe",
    description: "{Channel Name} via CricHD",
    category: "live",
    isExternal: true,
},
```

## Current Status

These CricHD streams are now available in your app:
- Go to **http://localhost:3000/streaming**
- Click the **"Sites"** tab
- You'll see all CricHD channels listed

## Notes

- These are iframe embeds, so they may have ads
- Streams may change or go offline
- Some channels may be geo-blocked
- Quality depends on CricHD's servers

## Advantages Over Direct Streams

✅ **More reliable** - CricHD handles the streaming
✅ **No CORS issues** - Embedded in iframe
✅ **Multiple channels** - Easy to add more
✅ **Backup option** - When direct HLS fails

## Usage in App

Users can now:
1. Try **Direct HLS streams** first (no ads, better quality)
2. Fall back to **CricHD streams** if direct doesn't work
3. Use **general streaming sites** as last resort

This gives users 3 tiers of streaming options! 🎉
