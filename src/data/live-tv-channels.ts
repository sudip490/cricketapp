export type Channel = {
  id: string;
  name: string;
  url: string;
  isExternal?: boolean; // If true, opens in new tab instead of embedding
  description?: string; // Optional description for the channel
};

export type Category = {
  id: string;
  name: string;
  channels: Channel[];
};

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

const categories: Category[] = [
  {
    id: "serials",
    name: "Serials",
    channels: [
      {
        id: slugify("ZeeTV HD"),
        name: "ZeeTV HD",
        url: "http://103.10.30.130:8081/viatv/viazeetvhd/chunks.m3u8",
      },
      {
        id: slugify("Colors"),
        name: "Colors",
        url: "http://103.10.30.130:8081/viatv/viacolors/chunks.m3u8",
      },
      {
        id: slugify("Colors HD"),
        name: "Colors HD",
        url: "http://103.10.30.130:8081/viatv/viacolors/chunks.m3u8",
      },
      {
        id: slugify("Colors Rishtey"),
        name: "Colors Rishtey",
        url: "http://103.10.30.130:8081/viatv/viacolorsristey.stream/chunks.m3u8",
      },
      {
        id: slugify("Sony SAB"),
        name: "Sony SAB",
        url: "http://103.10.30.130:8081/viatv/viasonysabhd/chunks.m3u8",
      },
      {
        id: slugify("Sony SAB HD"),
        name: "Sony SAB HD",
        url: "http://103.10.30.130:8081/viatv/viasonysabhd/chunks.m3u8",
      },
      {
        id: slugify("Star Bharat"),
        name: "Star Bharat",
        url: "http://103.10.30.130:8081/viatv/viastarbharat/chunks.m3u8",
      },
      {
        id: slugify("Zee TV"),
        name: "Zee TV",
        url: "http://103.10.30.130:8081/viatv/viazeetv/chunks.m3u8",
      },
    ],
  },
  {
    id: "sports",
    name: "Sports",
    channels: [
      // ✅ WORKING - Sony Ten Channels (ViaTV)
      {
        id: slugify("Sony Ten 1 HD"),
        name: "Sony Ten 1 HD",
        url: "http://103.10.30.130:8081/viatv/viaten1hd/chunks.m3u8",
        description: "✅ Working - Premium Sports Channel",
      },
      {
        id: slugify("Sony Ten 2 HD"),
        name: "Sony Ten 2 HD",
        url: "http://103.10.30.130:8081/viatv/viaten2hd/chunks.m3u8",
        description: "✅ Working - Premium Sports Channel",
      },
      {
        id: slugify("Sony Ten 3 HD"),
        name: "Sony Ten 3 HD",
        url: "http://103.10.30.130:8081/viatv/viaten3hd/chunks.m3u8",
        description: "✅ Working - Premium Sports Channel",
      },

      // ✅ NEW - IPTV-ORG Working Streams
      {
        id: slugify("DD Sports HD IPTV"),
        name: "DD Sports HD (1080p)",
        url: "http://103.78.149.54:8000/play/a02i/index.m3u8",
        description: "✅ Official Indian Sports Channel - IPTV",
      },
      {
        id: slugify("DD Sports SD IPTV"),
        name: "DD Sports (576p)",
        url: "http://103.78.149.54:8000/play/a02r/index.m3u8",
        description: "✅ Official Indian Sports Channel - IPTV",
      },
      {
        id: slugify("Star Sports 1 HD IPTV"),
        name: "Star Sports 1 HD (720p)",
        url: "http://122.165.240.223:1234/stream/tp/sp1/master.m3u8",
        description: "✅ Premium Cricket Channel - IPTV",
      },
      {
        id: slugify("Star Sports 2 HD IPTV"),
        name: "Star Sports 2 HD (720p)",
        url: "http://122.165.240.223:1234/stream/tp/sp2/master.m3u8",
        description: "✅ Premium Cricket Channel - IPTV",
      },
      {
        id: slugify("T Sports IPTV"),
        name: "T Sports (720p)",
        url: "https://tvsen7.aynaott.com/tsportshd/index.m3u8",
        description: "✅ Bangladesh Cricket Channel - IPTV",
      },
      {
        id: slugify("Sony Sports Ten 3 IPTV"),
        name: "Sony Sports Ten 3 (576p)",
        url: "http://103.253.18.58:8000/play/a00b",
        description: "✅ Premium Sports Channel - IPTV",
      },
      {
        id: slugify("Willow Sports IPTV"),
        name: "Willow Sports (1080p)",
        url: "https://amg01269-amg01269c1-firetv-us-5377.playouts.now.amagi.tv/playlist.m3u8",
        description: "✅ Premium Cricket Channel - May be geo-blocked",
      },

      // ✅ International Sports Channels
      {
        id: slugify("CBS Sports Golazo"),
        name: "CBS Sports Golazo (Football)",
        url: "https://dai.google.com/linear/hls/event/Sgvz7Qn5RYWs3Vu3Yz5rKA/master.m3u8",
        description: "✅ Live Football Coverage",
      },
      {
        id: slugify("Red Bull TV"),
        name: "Red Bull TV (Sports)",
        url: "https://rbmn-live.akamaized.net/hls/live/590964/BoRB-AT/master.m3u8",
        description: "✅ Extreme Sports & Events",
      },
      {
        id: slugify("beIN SPORTS XTRA"),
        name: "beIN SPORTS XTRA",
        url: "https://d35j504z0x2vu2.cloudfront.net/v1/manifest/0bc8e8376bd8417a1b6761138aa41c26c7309312/bein-sports-xtra/43e99595-3ab3-4f82-a828-0d32dc308c98/0.m3u8",
        description: "✅ International Sports Coverage",
      },
      {
        id: slugify("FIFA+"),
        name: "FIFA+ (Football)",
        url: "https://ythls.armelin.one/channel/UCpcTrCXblq78GZrTUTLWeBw.m3u8",
        description: "✅ Official FIFA Channel",
      },

      // Star Sports Channels (ViaTV - May be offline)
      {
        id: slugify("StarSports1"),
        name: "StarSports 1 (ViaTV)",
        url: "http://103.10.30.130:8081/viatv/viastarsports1sd/chunks.m3u8",
        description: "⚠️ May be offline - Try IPTV version",
      },
      {
        id: slugify("StarSports 2"),
        name: "StarSports 2 (ViaTV)",
        url: "http://103.10.30.130:8081/viatv/viastarsports2sd/chunks.m3u8",
        description: "⚠️ May be offline - Try IPTV version",
      },
      {
        id: slugify("StarSports 3"),
        name: "StarSports 3 (ViaTV)",
        url: "http://103.10.30.130:8081/viatv/viastarsports3sd/chunks.m3u8",
        description: "⚠️ May be offline",
      },
      {
        id: slugify("StarSports 1 HD"),
        name: "StarSports 1 HD (ViaTV)",
        url: "http://103.10.30.130:8081/viatv/viastarsports1hd/chunks.m3u8",
        description: "⚠️ May be offline - Try IPTV version",
      },
      {
        id: slugify("StarSports 2 HD"),
        name: "StarSports 2 HD (ViaTV)",
        url: "http://103.10.30.130:8081/viatv/viastarsports2hd/chunks.m3u8",
        description: "⚠️ May be offline - Try IPTV version",
      },
      {
        id: slugify("StarSports 3 HD"),
        name: "StarSports 3 HD (ViaTV)",
        url: "http://103.10.30.130:8081/viatv/viastarsports3hd/chunks.m3u8",
        description: "⚠️ May be offline",
      },
      {
        id: slugify("StarSports SELECT 1 HD"),
        name: "StarSports SELECT 1 HD (ViaTV)",
        url: "http://103.10.30.130:8081/viatv/viaselecthd/chunks.m3u8",
        description: "⚠️ May be offline",
      },
      {
        id: slugify("StarSports SELECT 2 HD"),
        name: "StarSports SELECT 2 HD (ViaTV)",
        url: "http://103.10.30.130:8081/viatv/viaselecthd2/chunks.m3u8",
        description: "⚠️ May be offline",
      },
      {
        id: slugify("StarSports SELECT 1"),
        name: "StarSports SELECT 1 (ViaTV)",
        url: "http://103.10.30.130:8081/viatv/viaselect1sd/chunks.m3u8",
        description: "⚠️ May be offline",
      },
      {
        id: slugify("StarSports SELECT 2"),
        name: "StarSports SELECT 2 (ViaTV)",
        url: "http://103.10.30.130:8081/viatv/viachannelv/chunks.m3u8",
        description: "⚠️ May be offline",
      },
      {
        id: slugify("StarSports 1 HD HINDI"),
        name: "StarSports 1 HD HINDI (ViaTV)",
        url: "http://103.10.30.130:8081/viatv/viastarsports3hd/chunks.m3u8",
        description: "⚠️ May be offline",
      },
      {
        id: slugify("Action Sports HD"),
        name: "Action Sports HD (ViaTV)",
        url: "http://103.10.30.130:8081/viatv/viaactionsportshd/chunks.m3u8",
        description: "⚠️ May be offline",
      },
    ],
  },
  {
    id: "musics-and-series",
    name: "Music and Series",
    channels: [
      {
        id: slugify("Mtv"),
        name: "Mtv",
        url: "http://103.10.30.130:8081/viatv/viamtv/chunks.m3u8",
      },
      {
        id: slugify("Mtv HD+"),
        name: "Mtv HD+",
        url: "http://103.10.30.130:8081/viatv/viaMtvHD.stream/chunks.m3u8",
      },
      {
        id: slugify("TLC"),
        name: "TLC",
        url: "http://103.10.30.130:8081/viatv/viatlcindia/chunks.m3u8",
      },
      {
        id: slugify("ZOOM"),
        name: "ZOOM",
        url: "http://103.10.30.130:8081/viatv/viazoom/chunks.m3u8",
      },
      {
        id: slugify("M Tunes"),
        name: "M Tunes",
        url: "http://103.10.30.130:8081/viatv/viamtuneshd/chunks.m3u8",
      },
      {
        id: slugify("9XM"),
        name: "9XM",
        url: "http://103.10.30.130:8081/viatv/via9xm/chunks.m3u8",
      },
      {
        id: slugify("B4U Music"),
        name: "B4U Music",
        url: "http://103.10.30.130:8081/viatv/viab4umusic/chunks.m3u8",
      },
      {
        id: slugify("AXN"),
        name: "AXN",
        url: "http://103.10.30.130:8081/viatv/viaaxn/chunks.m3u8",
      },
      {
        id: slugify("Comedy Central"),
        name: "Comedy Central",
        url: "http://103.10.30.130:8081/viatv/viacomedycentral/chunks.m3u8",
      },
    ],
  },
  {
    id: "cartoon",
    name: "Cartoon",
    channels: [
      {
        id: slugify("Nick"),
        name: "Nick",
        url: "http://103.10.30.130:8081/viatv/vianick/chunks.m3u8",
      },
      {
        id: slugify("Disney"),
        name: "Disney",
        url: "http://103.10.30.130:8081/viatv/viaDisneyChannel1500.stream/chunks.m3u8",
      },
      {
        id: slugify("Nick JR"),
        name: "Nick JR",
        url: "http://103.10.30.130:8081/viatv/vianickjr/chunks.m3u8",
      },
      {
        id: slugify("Disney JR"),
        name: "Disney JR",
        url: "http://103.10.30.130:8081/viatv/viadisneyjunior/chunks.m3u8",
      },
      {
        id: slugify("CBeebies"),
        name: "CBeebies",
        url: "http://103.10.30.130:8081/viatv/viacb/chunks.m3u8",
      },
      {
        id: slugify("Sonic"),
        name: "Sonic",
        url: "http://103.10.30.130:8081/viatv/viaSonicSd.stream/chunks.m3u8",
      },
    ],
  },
  {
    id: "movies",
    name: "Movies",
    channels: [
      {
        id: slugify("StarPlus"),
        name: "StarPlus",
        url: "http://103.10.30.130:8081/viatv/viaStarPlusSd.stream/chunks.m3u8",
      },
      {
        id: slugify("StarGold"),
        name: "StarGold",
        url: "http://103.10.30.130:8081/viatv/viaStarGoldSD.stream/chunks.m3u8",
      },
      {
        id: slugify("SONY MAX HD"),
        name: "SONY MAX HD",
        url: "http://103.10.30.130:8081/viatv/viasonymaxhd/chunks.m3u8",
      },
      {
        id: slugify("& Pictures HD"),
        name: "& Pictures HD",
        url: "http://103.10.30.130:8081/viatv/viaandpicture/chunks.m3u8",
      },
      {
        id: slugify("Zee Cinema HD"),
        name: "Zee Cinema HD",
        url: "http://103.10.30.130:8081/viatv/viazeecinemahd/chunks.m3u8",
      },
      {
        id: slugify("StarUtshavMovies HD"),
        name: "Star Utshav Movies HD",
        url: "http://103.10.30.130:8081/viatv/viastarutsav/chunks.m3u8",
      },
      {
        id: slugify("& Tv HD"),
        name: "& Tv HD",
        url: "http://103.10.30.130:8081/viatv/viaandtv/chunks.m3u8",
      },
      {
        id: slugify("StarPlus HD"),
        name: "StarPlus HD",
        url: "http://103.10.30.130:8081/viatv/viaStarPlusSd.stream/chunks.m3u8",
      },
      {
        id: slugify("Zee Bollywood"),
        name: "Zee Bollywood",
        url: "http://103.10.30.130:8081/viatv/viazeecinema/chunks.m3u8",
      },
      {
        id: slugify("Sony MAX"),
        name: "Sony MAX",
        url: "http://103.10.30.130:8081/viatv/viasonymax/chunks.m3u8",
      },
      {
        id: slugify("Zee Action"),
        name: "Zee Action",
        url: "http://103.10.30.130:8081/viatv/viazeeaction/chunks.m3u8",
      },
      {
        id: slugify("Star Movies"),
        name: "Star Movies",
        url: "http://103.10.30.130:8081/viatv/viastarmovies/chunks.m3u8",
      },
      {
        id: slugify("Star Movies HD"),
        name: "Star Movies HD",
        url: "http://103.10.30.130:8081/viatv/viastarmovieshd/chunks.m3u8",
      },
    ],
  },
  {
    id: "news",
    name: "News",
    channels: [
      {
        id: slugify("Aaj Tak"),
        name: "Aaj Tak",
        url: "http://103.10.30.130:8081/viatv/viaaajtak/chunks.m3u8",
      },
      {
        id: slugify("India TV"),
        name: "India TV",
        url: "http://103.10.30.130:8081/viatv/viaindiatv/chunks.m3u8",
      },
      {
        id: slugify("NDTV"),
        name: "NDTV",
        url: "http://103.10.30.130:8081/viatv/viandtv24x7/chunks.m3u8",
      },
      {
        id: slugify("CNN News18"),
        name: "CNN News18",
        url: "http://103.10.30.130:8081/viatv/viacnn/chunks.m3u8",
      },
      {
        id: slugify("Times Now"),
        name: "Times Now",
        url: "http://103.10.30.130:8081/viatv/viatimesnow/chunks.m3u8",
      },
    ],
  },
  {
    id: "dancer-and-wildlife",
    name: "Dancer and Wildlife",
    channels: [
      {
        id: slugify("National Geographic"),
        name: "National Geographic",
        url: "http://103.10.30.130:8081/viatv/vianatgeowildhd/chunks.m3u8",
      },
      {
        id: slugify("Animal Planet"),
        name: "Animal Planet",
        url: "http://103.10.30.130:8081/viatv/viaanimalplanet/chunks.m3u8",
      },
      {
        id: slugify("Discovery HD"),
        name: "Discovery HD",
        url: "http://103.10.30.130:8081/viatv/viadiscoveryhd/chunks.m3u8",
      },
      {
        id: slugify("HBO"),
        name: "HBO",
        url: "http://103.10.30.130:8081/viatv/viahbohd/chunks.m3u8",
      },
    ],
  },
  {
    id: "nepali",
    name: "Nepali",
    channels: [
      {
        id: slugify("TV Filmy"),
        name: "TV Filmy",
        url: "http://103.10.30.130:8081/viatv/viatvfilmy/chunks.m3u8",
      },
      {
        id: slugify("NtvNepal"),
        name: "Ntv Nepal",
        url: "http://103.10.30.130:8081/viatv/viantvnepal/chunks.m3u8",
      },
      {
        id: slugify("Avenews"),
        name: "Avenews",
        url: "http://103.10.30.130:8081/viatv/viaavenews/chunks.m3u8",
      },
      {
        id: slugify("Kantipur HD"),
        name: "Kantipur HD",
        url: "http://103.10.30.130:8081/viatv/viakantipuriptv/chunks.m3u8",
      },
      {
        id: slugify("Kantipur Cineplex"),
        name: "Kantipur Cineplex",
        url: "http://103.10.30.130:8081/viatv/viaKntCineplexTv.stream/chunks.m3u8",
      },
      {
        id: slugify("Ap1 HD"),
        name: "Ap1 HD",
        url: "http://103.10.30.130:8081/viatv/viaap1hd/chunks.m3u8",
      },
      {
        id: slugify("Sagarmatha TV"),
        name: "Sagarmatha TV",
        url: "http://103.10.30.130:8081/viatv/viasagar/chunks.m3u8",
      },
      {
        id: slugify("ABC News"),
        name: "ABC News",
        url: "http://103.10.30.130:8081/viatv/viaabc/chunks.m3u8",
      },
      {
        id: slugify("News 24"),
        name: "News 24",
        url: "http://103.10.30.130:8081/viatv/viaNews24/chunks.m3u8",
      },
      {
        id: slugify("Tv Today"),
        name: "Tv Today",
        url: "http://103.10.30.130:8081/viatv/viatvtoday/chunks.m3u8",
      },
    ],
  },
];

const allChannels: Channel[] = categories.flatMap(
  (category) => category.channels
);

export const liveTvCategories: Category[] = [
  {
    id: "all",
    name: "All Networks",
    channels: allChannels,
  },
  ...categories,
];
