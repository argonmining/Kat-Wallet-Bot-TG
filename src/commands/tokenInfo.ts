import { Context } from 'telegraf';
import { getTokenInfo } from '../utils';
import { isTextMessage } from '../utils';

export const handleTokenInfoCommand = async (ctx: Context) => {
  // Check if the message is a text message (for both groups/channels and DMs)
  if (ctx.message && isTextMessage(ctx.message)) {
    const args = ctx.message.text.split(' ').slice(1);

    if (args.length !== 1) {
      return ctx.reply('Please provide a valid token ticker. Usage: /tokeninfo <TOKEN_TICKER>');
    }

    const ticker = args[0].toUpperCase();

    try {
      const tokenInfo = await getTokenInfo(ticker);
      ctx.reply(tokenInfo);
    } catch (error) {
      console.error(`Error handling token info command: ${error}`);
      ctx.reply('Failed to retrieve token information. Please try again later.');
    }
  } else {
    ctx.reply('This command only works with text messages.');
  }
};
