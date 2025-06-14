import crypto from 'crypto';
function getShuffledArray() {
    const initialArray = [
        "error", "6C35BBC4EB", "32065fiPRVJ", "9651PJDqag", "match",
        "2949160OwuPPs", "1QaLwoE", "subtle", "15775023ibpdbH", "or:",
        "gMUfw", "12IfiARR", "importKey", "3235491JMTwmH", "334826TTrbVe",
        "10zgbCLj", "Format err", "2719575PhDuLf", "592dZwFMH",
        "7584E4A29F", "Invalid fo", "on failed:", "YrlUc", "crypto",
        "AES-CBC", "map"
    ];
    function shuffleArray(arr) {
        const n = (index) => {
            const adjustedIndex = index - 450;
            if (adjustedIndex >= 0 && adjustedIndex < arr.length) {
                return arr[adjustedIndex];
            }
            throw new Error('Index out of bounds');
        };
        while (true) {
            try {
                const calc =
                    -parseInt(n(469)) / 1 * (parseInt(n(451)) / 2) +
                    -parseInt(n(466)) / 3 * (parseInt(n(455)) / 4) +
                    -parseInt(n(465)) / 5 * (parseInt(n(474)) / 6) +
                    -parseInt(n(450)) / 7 +
                    -parseInt(n(468)) / 8 +
                    parseInt(n(454)) / 9 +
                    -parseInt(n(452)) / 10 * (-parseInt(n(471)) / 11);
                if (Math.round(calc) === 249055) break;
            } catch {}
            arr.push(arr.shift());
        }
        return arr;
    }
    return shuffleArray([...initialArray]);
}
function getActualKey() {
    const shuffledArray = getShuffledArray();
    const part1 = shuffledArray[6];
    const part2 = shuffledArray[14];
    const keyString = "C5D58EF67A" + part1 + part2 + "12";
    const hexBytes = keyString.match(/[\dA-F]{2}/gi) || [];
    return Buffer.from(hexBytes.map(byte => parseInt(byte, 16)));
}
export function decryptSaveTubeData(encryptedBase64) {
    try {
        const key = getActualKey();
        if (key.length !== 16) throw new Error(`Invalid key length: ${key.length}`);
        const encryptedBuffer = Buffer.from(encryptedBase64, 'base64');
        const iv = encryptedBuffer.subarray(0, 16);
        const data = encryptedBuffer.subarray(16);
        const decipher = crypto.createDecipheriv('aes-128-cbc', key, iv);
        let decrypted = decipher.update(data);
        decrypted = Buffer.concat([decrypted, decipher.final()]);
        return JSON.parse(decrypted.toString('utf8'));
    } catch (err) {
        throw new Error(`Decryption failed: ${err.message}`);
    }
}


// Most Websites Change Their Encryption Mechanisim Time To Time So Always Keep an eye on https://github.com/Unique-Gaming/UNQ-YouTube-Download-API 
