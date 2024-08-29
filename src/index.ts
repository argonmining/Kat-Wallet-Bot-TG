import { Telegraf } from 'telegraf';
import dotenv from 'dotenv';
import { handleBalanceCommand } from './commands/balance';
import { handleTokenInfoCommand } from './commands/tokenInfo';

dotenv.config();

const bot = new Telegraf(process.env.TELEGRAM_TOKEN as string);

bot.start((ctx) => ctx.reply('Welcome to the KRC20 Token Info Bot!'));
bot.help((ctx) => ctx.reply('Send me a command to get started!'));

// Register the /balance command
bot.command('balance', handleBalanceCommand);

// Register the /tokeninfo command
bot.command('tokeninfo', handleTokenInfoCommand);

bot.launch().then(() => {
  console.log('Bot is up and running...');
});

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));