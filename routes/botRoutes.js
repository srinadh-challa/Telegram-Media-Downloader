import express from 'express';
import botController from '../controllers/botController.js';

const router = express.Router();

// Health check endpoint
router.get('/health', (req, res) => {
    res.send("Bot is running!");
});

// Webhook to receive updates from Telegram
router.post('/webhook', (req, res) => {
    // Handle incoming update and process through bot service
    botController.handleUpdate(req.body);
    res.send('Update processed');
});

export default router;
