# Kat-Wallet-Bot-TG

Kat-Wallet-Bot-TG is a Telegram bot designed to provide information about KRC20 tokens. It allows users to check token balances for a given wallet address and retrieve critical token information.

## Features

- Check KRC20 token balances for a given wallet address
- Retrieve detailed information about a specific KRC20 token

## Prerequisites

- Node.js (version 12 or higher recommended)
- npm (Node Package Manager)
- Telegram Bot Token (obtainable from BotFather)
- KRC20 API endpoint

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/argonmining/kat-wallet-bot-tg.git
   cd kat-wallet-bot-tg
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory and add the following environment variables:
   ```
   TELEGRAM_TOKEN=your_telegram_bot_token
   MAINNET_API_BASE_URL=kasplex_krc20_api_base_url
   ```

## Usage

```
npm run build
npm start
```

Check the Bot Management file for additional usage instructions. 

## Kasplex API

https://docs.kasplex.org/tools-and-reference/kasplex-indexer-api
