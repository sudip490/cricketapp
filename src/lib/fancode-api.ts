// API endpoint to fetch live cricket matches from FanCode
export const FANCODE_API = "https://raw.githubusercontent.com/byte-capsule/FanCode-Hls-Fetcher/main/Fancode_hls_m3u8.Json";

export type FanCodeMatch = {
    event_catagory: string;
    event_name: string;
    match_id: number;
    match_name: string;
    team_1: string;
    team_1_flag: string;
    team_2: string;
    team_2_flag: string;
    banner: string;
    stream_link: string;
};

export type FanCodeResponse = {
    type: string;
    generated_by: string;
    total_mathes: number;
    last_upaded: string;
    matches: FanCodeMatch[];
};

export async function fetchLiveCricketMatches(): Promise<FanCodeMatch[]> {
    try {
        const response = await fetch(FANCODE_API, {
            cache: "no-store", // Always fetch fresh data
        });

        if (!response.ok) {
            throw new Error("Failed to fetch live matches");
        }

        const data: FanCodeResponse = await response.json();

        // Filter only cricket matches
        return data.matches.filter(match => match.event_catagory === "cricket");
    } catch (error) {
        console.error("Error fetching live cricket matches:", error);
        return [];
    }
}

export async function getAllLiveMatches(): Promise<FanCodeMatch[]> {
    try {
        const response = await fetch(FANCODE_API, {
            cache: "no-store",
        });

        if (!response.ok) {
            throw new Error("Failed to fetch live matches");
        }

        const data: FanCodeResponse = await response.json();
        return data.matches;
    } catch (error) {
        console.error("Error fetching live matches:", error);
        return [];
    }
}

export async function fetchLiveFootballMatches(): Promise<FanCodeMatch[]> {
    try {
        const response = await fetch(FANCODE_API, { cache: "no-store" });
        if (!response.ok) throw new Error("Failed to fetch live matches");
        const data: FanCodeResponse = await response.json();
        return data.matches.filter((m) => m.event_catagory === "football");
    } catch (error) {
        console.error("Error fetching live football matches:", error);
        return [];
    }
}
