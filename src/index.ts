import { Telegraf } from 'telegraf';
import dotenv from 'dotenv';
import { handleBalanceCommand } from './commands/balance';
import { handleStatusCommand } from './commands/status'; 

dotenv.config();

const bot = new Telegraf(process.env.TELEGRAM_TOKEN as string);

bot.start((ctx) => ctx.reply('Welcome to the Kat Bot! Use /help to see available commands.'));
bot.help((ctx) => {
  const helpMessage = `
Available commands:
/balance <WALLET_ADDRESS> - Check KRC20 token balances for a wallet
/status <TOKEN_TICKER> - Get information about a specific KRC20 token
`;
  ctx.reply(helpMessage);
});

// Register the /balance command
bot.command('balance', handleBalanceCommand);

// Register the /status command
bot.command('status', handleStatusCommand); // Update this line

bot.launch()
  .then(() => {
    console.log('Bot is up and running...');
  })
  .catch((error) => {
    console.error('Error starting the bot:', error);
    process.exit(1);
  });

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

// Handle unhandled promise rejections
process.on('unhandledRejection', (error) => {
  console.error('Unhandled promise rejection:', error);
});