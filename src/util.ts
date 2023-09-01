import { formatCurrency } from '@coingecko/cryptoformat';

export const cryptoFormat = (value: number, isoCode: string, locale: string) =>
	formatCurrency(value, isoCode, locale);
