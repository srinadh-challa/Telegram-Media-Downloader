import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import ytdlp from 'yt-dlp-exec';

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

// Service to handle video downloading
const downloadVideo = async (url) => {
    const downloadPath = ensureDownloadFolder();

    // Use yt-dlp to get file info first (like title)
    const info = await ytdlp(url, {
        dumpSingleJson: true,
        noCheckCertificates: true,
    });

    const title = info.title.replace(/[^\w\s]/gi, ''); // clean filename
    const ext = info.ext || 'mp4'; // default extension
    const filePath = path.join(downloadPath, `${title}.${ext}`);

    // Download the video
    await ytdlp(url, {
        format: 'best',
        output: filePath,
        noCheckCertificates: true,
    });

    return filePath;
};

export default {
    downloadVideo,
};
