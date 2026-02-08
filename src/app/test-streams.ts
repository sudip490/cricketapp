// Quick stream testing utility
// Run with: npx tsx src/app/test-streams.ts

const testStreams = [
    // Star Sports channels from GitHub
    { name: "Star Sports 1 HD (GitHub)", url: "http://116.90.120.149:8000/play/a0ba/index.m3u8" },
    { name: "Star Sports Select 1 HD", url: "http://172.16.29.250/hls/Star_Sport_Select1HD.m3u8" },
    { name: "Star Sports Select 2 HD", url: "http://116.90.120.149:8000/play/a0cm/index.m3u8" },
    { name: "Star Sports 1 Hindi HD", url: "http://116.90.120.149:8000/play/a0bv/index.m3u8" },

    // Sony Ten channels
    { name: "Sony Ten 1 HD (GitHub)", url: "http://172.32.1.88:1935/tvprogram/TEN-1HD/playlist.m3u8" },

    // Current channels (sample)
    { name: "StarSports 1 (Current)", url: "http://103.10.30.130:8081/viatv/viastarsports1sd/chunks.m3u8" },
    { name: "Sony Ten 1 HD (Current)", url: "http://103.10.30.130:8081/viatv/viaten1hd/chunks.m3u8" },
];

async function testStream(url: string, timeout = 5000): Promise<boolean> {
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeout);

        const response = await fetch(url, {
            method: 'HEAD',
            signal: controller.signal,
        });

        clearTimeout(timeoutId);
        return response.ok;
    } catch (error) {
        return false;
    }
}

async function main() {
    console.log('🔍 Testing stream URLs...\n');

    const results = [];

    for (const stream of testStreams) {
        process.stdout.write(`Testing ${stream.name}... `);
        const works = await testStream(stream.url);
        console.log(works ? '✅ WORKING' : '❌ FAILED');

        results.push({
            name: stream.name,
            url: stream.url,
            working: works,
        });
    }

    console.log('\n📊 Summary:');
    console.log(`Working: ${results.filter(r => r.working).length}/${results.length}`);
    console.log('\n✅ Working streams:');
    results.filter(r => r.working).forEach(r => {
        console.log(`  - ${r.name}`);
        console.log(`    ${r.url}`);
    });

    console.log('\n❌ Failed streams:');
    results.filter(r => !r.working).forEach(r => {
        console.log(`  - ${r.name}`);
    });
}

main().catch(console.error);
