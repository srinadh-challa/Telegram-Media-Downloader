// services/videoDownloadService.js
import { exec } from 'child_process';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

// Get the current directory path using import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure the download directory exists
const ensureDownloadFolder = () => {
    const downloadPath = path.join(__dirname, '..', 'downloads');
    if (!fs.existsSync(downloadPath)) {
        fs.mkdirSync(downloadPath, { recursive: true });
    }
};

// Service to handle video downloading via yt-dlp
const downloadVideo = async (url) => {
    return new Promise((resolve, reject) => {
        ensureDownloadFolder(); // Ensure the 'downloads' folder exists

        const outputPath = path.join(__dirname, '..', 'downloads', '%(title)s.%(ext)s');
        
        const command = `yt-dlp -f best --output "${outputPath}" ${url}`;
        
        exec(command, (error, stdout, stderr) => {
            if (error) {
                reject(`Error: ${error.message}`);
                return;
            }
            if (stderr) {
                reject(`stderr: ${stderr}`);
                return;
            }
            resolve(stdout);
        });
    });
};

export default {
    downloadVideo,
};
