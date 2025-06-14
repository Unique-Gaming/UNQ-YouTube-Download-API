import https from 'https';
import zlib from 'zlib';
import { decryptSaveTubeData } from '../decrypt/decryption.js';

function fetchJson(url, options = {}) {
    return new Promise((resolve, reject) => {
        const req = https.request(url, options, res => {
            let stream = res;
            const encoding = res.headers['content-encoding'];
            if (encoding === 'gzip') {
                stream = res.pipe(zlib.createGunzip());
            } else if (encoding === 'deflate') {
                stream = res.pipe(zlib.createInflate());
            } else if (encoding === 'br') {
                stream = res.pipe(zlib.createBrotliDecompress());
            }
            let data = '';
            stream.on('data', chunk => {
                data += chunk.toString();
            });
            stream.on('end', () => {
                try {
                    resolve(JSON.parse(data));
                } catch (e) {
                    reject(new Error(`Invalid JSON response: ${data}`));
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
        const ytUrl = req.query.url;
        if (!ytUrl) {
            res.status(400).json({ success: false, error: 'Missing url query parameter' });
            return;
        }

        const cdnRes = await fetchJson('https://media.savetube.me/api/random-cdn');
        const cdn = cdnRes.cdn;
        if (!cdn) throw new Error('CDN fetch failed');

        const postData = JSON.stringify({ url: ytUrl });
        const options = {
            method: 'POST',
            headers: {
                'Sec-Fetch-Mode': 'cors',
                'Accept-Encoding': 'deflate, br, gzip',
                'Connection': 'keep-alive',
                'Sec-Fetch-Dest': 'empty',
                'Origin': 'https://yt.savetube.me',
                'Sec-Fetch-Site': 'cross-site',
                'Content-Type': 'application/json',
                'Referer': 'https://yt.savetube.me/',
                'Host': cdn,
                'Accept-Language': 'en-GB,en;q=0.9',
                'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_1_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.1.1 Mobile/15E148 Safari/604.1',
                'Priority': 'u=3, i',
                'Accept': 'application/json, text/plain, */*',
                'Content-Length': Buffer.byteLength(postData)
            },
            body: postData
        };

        const infoRes = await fetchJson(`https://${cdn}/v2/info`, options);
        if (!infoRes?.data) throw new Error("No encrypted data received");

        const decrypted = decryptSaveTubeData(infoRes.data);
        res.status(200).json({ success: true, data: decrypted });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};
