import https from 'https';
import zlib from 'zlib';
function fetchJson(url, options = {}) {
    return new Promise((resolve, reject) => {
        const req = https.request(url, options, res => {
            let chunks = [];
            res.on('data', chunk => chunks.push(chunk));
            res.on('end', () => {
                const buffer = Buffer.concat(chunks);

                const encoding = res.headers['content-encoding'];
                let decompress;
                if (encoding === 'gzip') decompress = zlib.gunzip;
                else if (encoding === 'deflate') decompress = zlib.inflate;
                else if (encoding === 'br') decompress = zlib.brotliDecompress;
                if (decompress) {
                    decompress(buffer, (err, decoded) => {
                        if (err) return reject(err);
                        try {
                            resolve(JSON.parse(decoded.toString()));
                        } catch (e) {
                            reject(new Error(`Invalid JSON: ${decoded.toString()}`));
                        }
                    });
                } else {
                    try {
                        resolve(JSON.parse(buffer.toString()));
                    } catch (e) {
                        reject(new Error(`Invalid JSON: ${buffer.toString()}`));
                    }
                }
            });
        });
        req.on('error', reject);
        if (options.body) {
            req.write(options.body);
        }
        req.end();
    });
}
export default async (req, res) => {
    try {
        const { type, quality, key } = req.query;
        if (!type || !quality || !key) {
            res.status(400).json({ success: false, error: "Missing type, quality, or key parameter" });
            return;
        }
        const cdnRes = await fetchJson('https://media.savetube.me/api/random-cdn');
        const cdn = cdnRes.cdn;
        if (!cdn) {
            res.status(500).json({ success: false, error: "Failed to get CDN" });
            return;
        }
        const postData = JSON.stringify({
            downloadType: type,
            quality: quality,
            key: key
        });
        const options = {
            method: 'POST',
            headers: {
                'Host': cdn,
                'Accept': '*/*',
                'Content-Type': 'application/json',
                'Sec-Fetch-Site': 'cross-site',
                'Origin': 'https://yt.savetube.me',
                'Sec-Fetch-Mode': 'cors',
                'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_1_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.1.1 Mobile/15E148 Safari/604.1',
                'Referer': 'https://yt.savetube.me/',
                'Sec-Fetch-Dest': 'empty',
                'Accept-Language': 'en-GB,en;q=0.9',
                'Priority': 'u=3, i',
                'Accept-Encoding': 'gzip, deflate, br',
                'Connection': 'keep-alive',
                'Content-Length': Buffer.byteLength(postData)
            },
            body: postData
        };
        const downloadRes = await fetchJson(`https://${cdn}/download`, options);
        if (downloadRes.message === "200") {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json({ success: true, data: downloadRes });
        } else {
            res.setHeader('Content-Type', 'application/json');
            res.status(500).json({ success: false, data: downloadRes });
        }
    } catch (err) {
        res.setHeader('Content-Type', 'application/json');
        res.status(500).json({ success: false, error: err.message });
    }
};
