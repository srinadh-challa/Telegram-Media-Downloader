// controller/botController.js
import { Telegraf } from 'telegraf';
import videoDownloadService from '../services/videoDownloadService.js'; // Ensure correct import
import { config } from '../config/index.js'; // Ensure the config file has your bot token

// Initialize bot with token from environment variables
const bot = new Telegraf(config.botToken);

const startBot = () => {
    // Start command
    bot.start((ctx) => {
        const keyboard = [
            [
                { text: 'Subscribe YouTube Channel', url: 'https://www.youtube.com/@multineeds' }, // Replace with your channel URL
            ],
            [
                { text: 'Join Our Telegram Channel', url: 'https://t.me/multineeds' }, // Replace with your Telegram channel link
            ]
        ];

        const replyMarkup = { 
            inline_keyboard: keyboard 
        };

        ctx.reply("Welcome! After subscribe and join in channel then use bot by Sending a video URL to download", {
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
    
        if (!url || !url.startsWith('http')) {
            ctx.reply("❌ Please send a valid video URL.");
            return;
        }
    
        ctx.reply("⬇️ Downloading video... Please wait.");
    
        try {
            const filePath = await videoDownloadService.downloadVideo(url);
            ctx.reply("⬇ still Downloading video... Please wait.");   
            await ctx.replyWithVideo({ source: filePath });
            ctx.reply("✅ Download complete! Thank you for using our bot.");
                
        } catch (err) {
            ctx.reply('❌ Error downloading video. Please try again.');
            console.error(err);
        }
    });
    

    // Start the bot
    bot.launch().then(() => {
        console.log('Bot started successfully!');
    }).catch((err) => {
        console.error('Error starting bot:', err);
    });
};

export default { startBot };
