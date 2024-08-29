# Kat Wallet Bot Management

This document outlines the steps to manage the Kat Wallet Telegram Bot using PM2.

## Prerequisites

- Node.js and npm installed
- PM2 installed globally (`npm install -g pm2`)

## Starting the Bot

To start the bot using PM2, follow these steps:

1. Navigate to the project directory:
   ```
   cd /path/to/kat-wallet-bot-tg
   ```

2. Build the TypeScript project:
   ```
   npm run build
   ```

3. Start the bot using PM2:
   ```
   pm2 start ecosystem.config.js
   ```

## Managing the Bot

- To check the status of the bot:
  ```
  pm2 status
  ```

- To view logs:
  ```
  pm2 logs kat-wallet-bot-tg
  ```

- To restart the bot:
  ```
  pm2 restart kat-wallet-bot-tg
  ```

- To stop the bot:
  ```
  pm2 stop kat-wallet-bot-tg
  ```

## Updating the Bot

To update the bot with new changes:

1. Pull the latest changes from the repository:
   ```
   git pull origin main
   ```

2. Install any new dependencies:
   ```
   npm install
   ```

3. Rebuild the project:
   ```
   npm run build
   ```

4. Restart the bot:
   ```
   pm2 restart kat-wallet-bot-tg
   ```

## Automatic Startup

To ensure the bot starts automatically on system reboot:

1. Save the current PM2 process list:
   ```
   pm2 save
   ```

2. Generate the startup script:
   ```
   pm2 startup
   ```

3. Follow the instructions provided by the above command to set up the startup script.

## Troubleshooting

If you encounter any issues:

1. Check the logs:
   ```
   pm2 logs kat-wallet-bot-tg
   ```

2. Ensure all environment variables are correctly set.

3. Try stopping the bot, removing it from PM2, and starting it again:
   ```
   pm2 stop kat-wallet-bot-tg
   pm2 delete kat-wallet-bot-tg
   pm2 start ecosystem.config.js
   ```

For more information on PM2 commands, refer to the [PM2 documentation](https://pm2.keymetrics.io/docs/usage/quick-start/).
