# How CricHD Works (URL Structure & Data Flow)

CricHD does **not** expose a public REST/JSON API. It works with **two domains**, **HTML pages**, and **query-based stream URLs**. Here’s how it fits together.

---

## 1. Two domains

| Domain        | Role |
|---------------|------|
| **crichd.asia** | Main site: homepage, events, schedules, rankings. You browse here to find matches. |
| **crichd.one**  | Stream player: actual video pages. All “Watch” links point here. |

---

## 2. crichd.asia – Event listing (no API)

- **Homepage:** `https://crichd.asia/`  
  - Renders live/upcoming/ended events as HTML (links and cards).  
  - No `wp-json` or other public API (tested; not available).

- **Event page:** `https://crichd.asia/events/{event-slug}`  
  - Example: `https://crichd.asia/events/india-vs-south-africa`  
  - Page contains:
    - Match title, teams, status (Live / Starting soon / Ended)
    - Schedule link, rankings link
    - A **stream table**: columns like Streamer, Channel, and **Watch** link

- **Watch links** from event pages point to **crichd.one** with a channel id, e.g.  
  `https://crichd.one/stream.php?id=starsp1`

So “event data” is only in the HTML; there is no documented JSON API for events or streams from crichd.asia.

---

## 3. crichd.one – Stream player (URL “API”)

This is the only “API-like” part: **fixed URL pattern with a single query parameter.**

### Stream URL pattern

```
https://crichd.one/stream.php?id={CHANNEL_ID}
```

- **Alternative player (Player 2):**  
  `https://crichd.one/stream2.php?id={CHANNEL_ID}`

### Example channel IDs (from event pages)

| Channel      | `id` value   |
|-------------|--------------|
| Star Sports 1 | `starsp1`  |
| Willow 2    | `willowextra` |
| Cricket 2   | `crich2`   |
| Sky Cricket | `skyarena` |

So the “API” is: **you must know the channel `id`**; then you open `stream.php?id=<id>` (or `stream2.php?id=<id>`).

---

## 4. How the stream page works (why extraction is hard)

- **stream.php** returns **HTML + JavaScript**, not JSON.
- The **real video** is loaded by that JavaScript (e.g. HLS m3u8), often:
  - After redirects or anti-bot checks
  - From another domain
  - With tokens or short-lived URLs
- So:
  - **In a browser:** User clicks “Watch” → crichd.one loads → JS runs → video appears.
  - **Server-side fetch:** Your server gets the initial HTML; the m3u8 URL may not be in that HTML (it’s injected or fetched by JS), and requests are often blocked by Cloudflare/anti-bot.

So there is **no stable, documented “stream API”** that returns m3u8 or stream URLs in a reliable way for server-side use.

---

## 5. What your project does

Your app already follows this model:

1. **`/api/extract-stream`**  
   - **Input:** `id` = CricHD channel id (e.g. `starsp1`).  
   - **Behavior:** Fetches `https://crichd.one/stream.php?id={id}` and tries to find m3u8 URLs in the raw HTML with regex.  
   - **Limitation:** Often blocked by Cloudflare / anti-bot; stream URLs are often added by JS, so they’re not in the first HTML response.

2. **`stream-extractor.ts`**  
   - Calls that API: `GET /api/extract-stream?id={channelId}`.  
   - Uses channel ids (your `CRICHD_CHANNELS` may not match crichd.one’s ids; event pages use values like `starsp1`, `willowextra`, etc.).

3. **Iframe embedding**  
   - You embed the player page:  
     `https://crichd.one/stream.php?id={channelId}`  
   - No extraction needed; the browser runs their JS and shows the stream (with their ads).

---

## 6. Summary: “API” in practice

| What you might expect | What CricHD actually has |
|------------------------|---------------------------|
| REST API for events    | None; only HTML pages on crichd.asia |
| REST API for stream URL | None |
| Stable stream URL pattern | Yes: `https://crichd.one/stream.php?id={CHANNEL_ID}` (and `stream2.php`) |
| Way to get m3u8 server-side | Not reliable; JS + protection block simple scraping |

So **the only reliable “API” is the stream URL pattern**; “event data” and “stream links” are obtained by using crichd.asia event pages (e.g. scraping the stream table) and then opening crichd.one with the correct `id`. For playback without scraping, **embedding the stream URL in an iframe** is the approach that works.
