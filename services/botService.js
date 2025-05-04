// services/botService.js
import dotenv from 'dotenv';
dotenv.config(); // Load environment variables

import { Telegraf } from 'telegraf';
import videoDownloadService from './videoDownloadService.js';

// Initialize bot with token from environment variables
const bot = new Telegraf(process.env.BOT_TOKEN);

// Clear any existing webhook (if set) before starting the bot
bot.telegram.deleteWebhook()
    .then(() => {
        // Proceed with bot launching after webhook is deleted
        console.log('Webhook cleared successfully');
        bot.launch();
    })
    .catch((err) => {
        console.error('Error deleting webhook:', err);
        bot.launch(); // Launch bot even if there's an error clearing the webhook
    });

// Start command
bot.start((ctx) => {
    const keyboard = [
        [
            { text: 'YouTube Channel Link', url: 'https://www.youtube.com/@multineeds' }, // Replace with your channel URL
        ],
        [
            { text: 'Join Our Telegram Channel', url: 'https://t.me/multineeds' }, // Replace with your Telegram channel link
        ]
    ];

    const replyMarkup = { 
        inline_keyboard: keyboard 
    };

    ctx.reply("Welcome! Send me a video URL to download, or choose an option below:", {
        reply_markup: replyMarkup
    });
});

// Help command
bot.help((ctx) => {
    const keyboard = [
        [
            { text: 'YouTube Channel Link', url: 'https://www.youtube.com/@multineeds' }, // Replace with your channel URL
        ],
        [
            { text: 'Join Our Telegram Channel', url: 'https://t.me/multineeds' }, // Replace with your Telegram channel link
        ]
    ];

    const replyMarkup = { 
        inline_keyboard: keyboard 
    };

    ctx.reply("Send me a YouTube or other video URL to download, or choose an option below:", {
        reply_markup: replyMarkup
    });
});

// Video URL handling
bot.on('text', async (ctx) => {
    const url = ctx.message.text;
    try {
        const result = await videoDownloadService.downloadVideo(url);
        ctx.reply('Download complete! Video is ready.');
    } catch (err) {
        ctx.reply('Error downloading video. Please try again.');
        console.error(err);
    }
});

export default bot;
