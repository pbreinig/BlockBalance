import { formatCurrency } from '@coingecko/cryptoformat';
import { format } from 'date-fns';

export const cryptoFormat = (value: number, isoCode: string, locale: string) =>
	formatCurrency(value, isoCode, locale);

export const currencyFormat = (value: number, isoCode: string, locale: string) =>
	formatCurrency(value, isoCode, locale, false, { decimalPlaces: 2 });

export const formatTimestamp = (timestamp: number) => format(timestamp, 'EEE, MMM d HH:mm');
