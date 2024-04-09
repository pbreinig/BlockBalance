import { useEffect, useRef } from 'react';
import { formatCurrency } from '@coingecko/cryptoformat';
import { format } from 'date-fns';
import { parse } from 'node-html-parser';

export const cryptoFormat = (value: number, isoCode: string, locale: string) =>
	formatCurrency(value, isoCode, locale);

export const currencyFormat = (value: number, isoCode: string, locale: string) =>
	formatCurrency(value, isoCode, locale, false, { decimalPlaces: 2 });

export const formatTimestamp = (timestamp: number, frmt?: string) =>
	format(timestamp, frmt || 'EEE, MMM d HH:mm');

export const stripHTML = (textWithHTML: string) => parse(textWithHTML).text;

export const usePrevious = <T>(value: T): T | undefined => {
	const ref = useRef<T>();
	useEffect(() => {
		ref.current = value;
	});
	return ref.current;
};
