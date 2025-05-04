import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Export configuration variables
export const config = {
    botToken: process.env.BOT_TOKEN,
    port: process.env.PORT || 3000,
};

