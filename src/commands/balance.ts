import { Context } from 'telegraf';
import { fetchKRC20Balances, formatBalance } from '../utils';
import { isTextMessage } from '../utils';

export const handleBalanceCommand = async (ctx: Context) => {
  // Check if the message is a text message (for both groups/channels and DMs)
  if (ctx.message && isTextMessage(ctx.message)) {
    const args = ctx.message.text.split(' ').slice(1);

    if (args.length !== 1) {
      return ctx.reply('Please provide a valid wallet address. Usage: /balance <WALLET_ADDRESS>');
    }

    const address = args[0];

    try {
      const balances = await fetchKRC20Balances(address);

      if (balances.length === 0) {
        return ctx.reply(`No KRC20 tokens found for address: ${address}`);
      }

      let response = `KRC20 Balances for ${address}:\n`;
      balances.forEach((token) => {
        response += `${token.tick}: ${formatBalance(token.balance, parseInt(token.dec))}\n`;
      });

      ctx.reply(response);
    } catch (error) {
      console.error(`Error handling balance command: ${error}`);
      ctx.reply('Failed to retrieve balances. Please try again later.');
    }
  } else {
    ctx.reply('This command only works with text messages.');
  }
};
