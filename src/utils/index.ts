import axios from 'axios';
import { Message } from 'telegraf/types';

interface TokenBalance {
  tick: string;
  balance: string;
  dec: string;
}

/**
 * Type guard function to check if a message is a text message.
 * @param message The message to check.
 * @returns True if the message is a text message, false otherwise.
 */
export function isTextMessage(message: Message): message is Message.TextMessage {
  return 'text' in message;
}

/**
 * Fetches the KRC20 token balances for a given wallet address.
 * @param address The wallet address to query.
 * @returns A promise that resolves to an array of token balances.
 */
export const fetchKRC20Balances = async (address: string): Promise<TokenBalance[]> => {
  const apiBaseUrl = process.env.MAINNET_API_BASE_URL;
  if (!apiBaseUrl) {
    throw new Error('API base URL not found for Mainnet');
  }

  const url = `${apiBaseUrl}/address/${address}/tokenlist`;
  try {
    const response = await axios.get(url);
    return response.data.result;
  } catch (error) {
    console.error(`Failed to fetch KRC20 balances: ${error}`);
    throw new Error('Failed to retrieve KRC20 balances');
  }
};

/**
 * Formats the balance of a token based on its decimals.
 * @param balance The raw balance as a string.
 * @param decimals The number of decimals for the token.
 * @returns A formatted balance string.
 */
export const formatBalance = (balance: string, decimals: number): string => {
  const balanceBigInt = BigInt(balance);
  const divisor = BigInt(10 ** decimals);
  const integerPart = balanceBigInt / divisor;
  const fractionalPart = balanceBigInt % divisor;

  let formattedBalance = integerPart.toLocaleString('en-US');
  if (fractionalPart > 0) {
    const fractionalStr = fractionalPart.toString().padStart(decimals, '0');
    const trimmedFractionalStr = fractionalStr.replace(/0+$/, '');
    if (trimmedFractionalStr.length > 0) {
      formattedBalance += '.' + trimmedFractionalStr;
    }
  }

  return formattedBalance;
};

/**
 * Retrieves information about a specific KRC20 token.
 * @param ticker The token ticker to query.
 * @returns A promise that resolves to a formatted string with token information.
 */
export const getTokenInfo = async (ticker: string): Promise<string> => {
  const apiBaseUrl = process.env.MAINNET_API_BASE_URL;
  if (!apiBaseUrl) {
    throw new Error('API base URL not found for Mainnet');
  }

  const url = `${apiBaseUrl}/token/${ticker}`;
  try {
    const response = await axios.get(url);
    const tokenInfo = response.data.result[0];

    // Build a response string with token information
    let responseString = `Token Information for ${ticker}:\n`;
    responseString += `Maximum Supply: ${formatBalance(tokenInfo.max, parseInt(tokenInfo.dec))}\n`;
    responseString += `Minted: ${formatBalance(tokenInfo.minted, parseInt(tokenInfo.dec))}\n`;
    responseString += `Remaining: ${formatBalance((BigInt(tokenInfo.max) - BigInt(tokenInfo.minted)).toString(), parseInt(tokenInfo.dec))}\n`;

    return responseString;
  } catch (error) {
    console.error(`Failed to fetch token info: ${error}`);
    throw new Error('Failed to retrieve token information');
  }
};
