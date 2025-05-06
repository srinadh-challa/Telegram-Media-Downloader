import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import ytdlp from 'yt-dlp-exec';  // ✅ Native Node.js yt-dlp wrapper

// Get __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure the download directory exists
const ensureDownloadFolder = () => {
    const downloadPath = path.join(__dirname, '..', 'downloads');
    if (!fs.existsSync(downloadPath)) {
        fs.mkdirSync(downloadPath, { recursive: true });
    }
    return downloadPath;
};

// Service to handle video downloading via yt-dlp-exec
const downloadVideo = async (url) => {
    ensureDownloadFolder(); // Ensure 'downloads' folder exists

    const outputPath = path.join(__dirname, '..', 'downloads', '%(title)s.%(ext)s');

    try {
        const result = await ytdlp(url, {
            format: 'best',
            output: outputPath,
            // Additional options if needed
        });
        return result;
    } catch (error) {
        console.error('yt-dlp error:', error);
        throw error;
    }
};

export default {
    downloadVideo,
};
