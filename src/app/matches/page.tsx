import { WebcricMatches } from "@/components/webcric-matches";

export default function MatchesPage() {
    return (
        <div className="container mx-auto p-4 md:p-8 space-y-6">
            <div className="flex flex-col space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">Live Cricket Matches</h1>
                <div className="text-muted-foreground">
                    Showing real-time match data from WebCric.
                    <br />
                    <span className="text-xs text-yellow-600 dark:text-yellow-400">
                        Note: Streaming links are experimental and dependent on third-party availability.
                    </span>
                </div>
            </div>

            <WebcricMatches />
        </div>
    );
}
