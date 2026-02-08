# Live Cricket & Football Stream APIs

APIs that provide **live match data and stream URLs**. We only use sources that give **direct stream URLs** (e.g. m3u8) so you can play in your own player—no external streaming sites.

---

## Direct m3u8 / HLS (what this app uses)

### FanCode HLS JSON (Cricket + Football)

| | |
|--|--|
| **URL** | `https://raw.githubusercontent.com/byte-capsule/FanCode-Hls-Fetcher/main/Fancode_hls_m3u8.Json` |
| **Auth** | None |
| **Format** | JSON with `stream_link` = direct HLS URL (e.g. `https://dai.google.com/linear/hls/event/.../master.m3u8`) |
| **Sports** | Cricket, Football (and others when available) |
| **Updated** | ~Every 8 hours (GitHub Actions) |
| **Geo** | Streams are geo-restricted (e.g. India); playback may fail outside allowed regions |

**Response shape (per match):**

- `event_catagory`: `"cricket"` \| `"football"` etc.
- `event_name`, `match_name`, `match_id`
- `team_1`, `team_2`, `team_1_flag`, `team_2_flag`, `banner`
- **`stream_link`**: direct m3u8 URL for your HLS player

**Usage in this app:** Live Matches page fetches this API and plays `stream_link` in the built-in HLS player (no external site embed).

**Credits:** [FanCode-Hls-Fetcher](https://github.com/byte-capsule/FanCode-Hls-Fetcher) (Byte Capsule). Use with attribution.

---

## Embed-only APIs (not used here)

These return **embed URLs** (iframe), not raw m3u8. We don’t use them when you want “no other external” streams.

| API | Base URL | What you get |
|-----|----------|--------------|
| **Streamed** | `https://streamed.pk/api` | `GET /matches/{sport}`, `GET /stream/{source}/{id}` → **embedUrl** (iframe) |
| **WeStream** | `https://westream.su` | `GET /matches/live`, `GET /stream/:source/:id` → embed URLs for iframe |

If you ever want to add them, you’d embed their `embedUrl` in an iframe (similar to CricHD), not in the HLS player.

---

## Summary

- **Direct m3u8 (no external site):** only **FanCode HLS JSON** (cricket + football).
- **Embed-only:** Streamed, WeStream — not integrated when you need “no other external” streams.

This app uses only the FanCode API above for live matches with direct stream URLs.
