import axios from 'axios';

export async function getEtherPriceInUsd() {
  try {
    const {
      data: { price },
    } = await axios.get<Readonly<{ symbol: string; price: string }>>(
      'https://api.binance.com/api/v3/ticker/price?symbol=ETHUSDC',
    );
    return Number(price);
  } catch (error) {
    throw error;
  }
}
