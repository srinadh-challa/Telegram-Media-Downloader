import express from 'express';
import bodyParser from 'body-parser';
import botRoutes from './routes/botRoutes.js';
import botController from './controllers/botController.js';
import { config } from './config/index.js';

const app = express();

// Middleware
app.use(bodyParser.json());
app.use('/api', botRoutes);

// Start the bot
botController.startBot();

// Start server
app.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`);
});
