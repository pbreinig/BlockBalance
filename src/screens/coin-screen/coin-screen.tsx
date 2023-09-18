import { View } from 'react-native';
import { ActivityIndicator, Surface, Text } from 'react-native-paper';
import { useSettingsContext } from '../../context/settings-context';
import { styles } from './coin-screen-styles';
import { AppbarHeader } from '../../components/appbar-header/appbar-header';
import { cryptoFormat } from '../../util';
import React, { useCallback, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { Graph } from '../../components/graph/graph';
import { useFetchCoin } from '../../api/coingecko-api';

const currentDate = new Date();

export const CoinScreen = ({ route }) => {
	const { coin } = route.params;
	const { name, imgSrc, ticker, pricePercentage24h, price, id } = coin;
	const { theme } = useSettingsContext();
	const { isLoading, data } = useFetchCoin(id);
	const [priceTitle, setPriceTitle] = useState<number>(price);
	const isUp = pricePercentage24h && pricePercentage24h >= 0;

	const graphPoints = data?.sparklineData.map((value, index) => ({
		value,
		date: new Date(currentDate.getTime() - (data?.sparklineData.length - 1 - index) * 3600000),
	}));

	const updatePriceTitle = useDebouncedCallback((p: number) => {
		setPriceTitle(p);
	}, 5);

	const resetPriceTitle = useCallback(() => setPriceTitle(price), []);

	return (
		<>
			<AppbarHeader title={name} subtitle={ticker.toUpperCase()} imgSrc={imgSrc} />
			{isLoading ? (
				<ActivityIndicator style={{ top: 24 }} />
			) : (
				<View style={styles.body}>
					<Surface mode={'flat'} style={styles.surface}>
						<Text variant={'headlineLarge'}>
							{cryptoFormat(priceTitle, 'USD', 'en')}
						</Text>
						{pricePercentage24h && (
							<Text
								variant={'titleMedium'}
								style={{
									color: isUp ? theme.additionalColors.green : theme.colors.error,
									lineHeight: 20,
								}}
							>
								{`${isUp ? '+' : ''}${pricePercentage24h.toFixed(2)}%`}
							</Text>
						)}
						<Graph
							data={graphPoints}
							onPointSelected={updatePriceTitle}
							onGestureEnd={resetPriceTitle}
						/>
					</Surface>
				</View>
			)}
		</>
	);
};
