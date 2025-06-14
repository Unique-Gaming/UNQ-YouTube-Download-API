# 🎥 UNQ YouTube Download API

A powerful Node.js-based API that securely fetches YouTube video stream data using 🤫, decrypts it using AES, and provides easy access to download links — all wrapped in a single API!

---

## 🌐 Live Base URL

https://youtube-downloader-api-one.vercel.app/api

---

## 🧰 Available Endpoint

| Endpoint | Method | Description |
|-----------|--------|--------------------------------------------|
| `/api` | GET | Get decrypted stream data for a YouTube URL |
| `/api/download` | GET | Get decrypted downloadable url for a YouTube URL |

---

## 🚀 How It Works
  
✅ Sends POST request with YouTube URL  
✅ Receives encrypted video info  
✅ Decrypts using discovered AES key  
✅ Returns clean, usable stream info  

---

## 🔑 Endpoint Details

### `/api?url=`

Get stream information by providing YouTube video URL

#### Parameters

| Name | Type | Required | Description |
|-------|--------|----------|------------------------|
| url | string | ✅ Yes | YouTube video URL |

#### Example

/api?url=https://youtu.be/JlgkMXex2DI?si=YUhZUxpERIgUJWan

#### Sample Response

```{
	"success": true,
	"data": {
		"id": "JlgkMXex2DI",
		"key": "de576b95e661a7fc5a7fa7d6cf62856d196a552d",
		"url": "https://youtu.be/JlgkMXex2DI?si=YUhZUxpERIgUJWan",
		"title": "Hai Apna Dil To Awara | Sanam ft. Soogum Sookha",
		"titleSlug": "hai-apna-dil-to-awara-sanam-ft-soogum-sookha",
		"thumbnail": "https://i.ytimg.com/vi_webp/JlgkMXex2DI/maxresdefault.webp",
		"duration": 205,
		"durationLabel": "3.42 min",
		"audio_formats": [
			{
				"quality": 128,
				"url": null,
				"label": "MP3 320kbps"
			}
		],
		"video_formats": [
			{
				"height": 360,
				"width": 640,
				"url": "https://rr2---sn-o097znsr.googlevideo.com/videoplayback?expire=1749919779&ei=w1NNaO-NH4e0kucP1c-a0AE&ip=2a13%3A55c0%3A7205%3A2828%3A3a66%3A31f7%3A6d6a%3A1eb9&id=o-ABh7zu2qbjEfd7kILGPO4NKzZbx6csT-BrJT_Mo4b6Zo&itag=18&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&met=1749898179%2C&mh=wl&mm=31%2C29&mn=sn-o097znsr%2Csn-a5msenle&ms=au%2Crdu&mv=m&mvi=2&pl=32&rms=au%2Cau&initcwndbps=7776250&………………………………..",
				"quality": 360,
				"label": "MP4 video",
				"default_selected": 1
			},
			{
				"height": 1080,
				"width": 1920,
				"quality": 1080,
				"label": "1080p",
				"default_selected": 0,
				"url": null
			},
			{
				"height": 720,
				"width": 1280,
				"quality": 720,
				"label": "720p",
				"default_selected": 0,
				"url": null
			},
			{
				"height": 480,
				"width": 854,
				"quality": 480,
				"label": "480p",
				"default_selected": 0,
				"url": null
			},
			{
				"height": 360,
				"width": 640,
				"url": "https://rr2---sn-o097znsr.googlevideo.com/videoplayback?expire=1749919779&ei=w1NNaO-NH4e0kucP1c-a0AE&ip=2a13%3A55c0%3A7205%3A2828%3A3a66%3A31f7%3A6d6a%3A1eb9&id=o-ABh7zu2qbjEfd7kILGPO4NKzZbx6csT-BrJT_Mo4b6Zo&itag=18&……………………………………",
				"quality": 360,
				"label": "360p",
				"default_selected": 0
			},
			{
				"height": 240,
				"width": 426,
				"quality": 240,
				"label": "240p",
				"default_selected": 0,
				"url": null
			},
			{
				"height": 144,
				"width": 256,
				"quality": 144,
				"label": "144p",
				"default_selected": 0,
				"url": null
			}
		],
		"thumbnail_formats": [
			{
				"label": "Thumbnail",
				"quality": "Thumbnail",
				"value": "Thumbnail",
				"url": "https://media.🤫.me/media-downloader?url=https%3A//i.ytimg.com/vi_webp/JlgkMXex2DI/maxresdefault.webp&ext=jpg"
			}
		],
		"default_selected": 360,
		"fromCache": true
	}
}
```
### `/api/download?type=&quality=&key=`

Get downloadable url by type [ mp3 or video ] , key [ From api ] , quality [ For Video:- 1080 , 720 , 480 , 320 , 144 ] [ For Audio:- 128 , 320 ] 

#### Parameters

| Name | Type | Required | Description |
|-------|--------|----------|------------------------|
| type | string | ✅ Yes | Video Or Audio |
| quality | string | ✅ Yes | quality of video or mp3 you want to download |
| key | string | ✅ Yes | Key Achieved Using api |

#### Example

/api/download?type=video&quality=108&key=de576b95e661a7fc5a7fa7d6cf62856d196a552d

#### Sample Response
```
{
  "success": true,
  "data": {
    "data": {
      "downloadUrl": "https://🤫.su/download-direct/video/108/de576b95e661a7fc5a7fa7d6cf62856d196a552d",
      "downloaded": true
    },
    "message": "200",
    "status": true
  }
}
```
---

## ⚙ Tech Stack

- Node.js
- AES decryption (custom module)
- HTTPS requests (🤫 API + CDN)

---

## 📦 Installation

git clone https://github.com/yourusername/unq-youtube-download-api.git  
cd unq-youtube-download-api  
npm install  

Run locally:

node index.js  

Or deploy to:
- Vercel
- Railway
- Heroku
- Any Node-compatible server

---

## 🛠 Reporting Issues & Contributing

### 🐛 Found a bug?

Open an issue:
- What’s not working
- Expected behavior
- Include logs or screenshots  

### 🙌 Want to contribute?

- Fork the repo
- Make your changes in a new branch
- Follow code style
- Add helpful comments + test if possible
- Open a PR with clear description  

---

## ⚠ Disclaimer

This API does not host any video content. All links are fetched from third-party providers (SaveTube CDN).

❗ For educational purposes only  
❌ Do not use for piracy or commercial services  

## License
All rights reserved © 2025 UNQ

---

## 💬 Community

👉 Join our Discord: https://discord.gg/jDXbTEw63z

---
