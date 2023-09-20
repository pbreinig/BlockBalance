import { ScrollView, View } from 'react-native';
import { ActivityIndicator, Avatar, Surface, Text } from 'react-native-paper';
import { useSettingsContext } from '../../context/settings-context';
import { styles } from './coin-screen-styles';
import { AppbarHeader } from '../../components/appbar-header/appbar-header';
import { cryptoFormat } from '../../util';
import React, { useEffect, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { Graph } from '../../components/graph/graph';
import { fetchPrices, useFetchCoin } from '../../api/coingecko-api';
import { CoinDetails } from '../../components/coin-details/coin-details';

const currentDate = new Date();

export const CoinScreen = ({ route }) => {
	const { name, imgSrc, ticker, id } = route.params.coin;
	const { theme } = useSettingsContext();
	const { isLoading, data } = useFetchCoin(id);
	const [priceData, setPriceData] = useState({ price: 0, pricePercentage24h: 0 });
	const [isFetchingPrice, setIsFetchingPrice] = useState<boolean>(true);
	const [priceAtPoint, setPriceAtPoint] = useState<number>(0);
	const [isInteracting, setIsInteracting] = useState(false);
	const isUp = priceData.pricePercentage24h >= 0;

	useEffect(() => {
		const fetchPriceData = async () => {
			fetchPrices([id]).then((pData) => {
				const { usd: price, usd_24h_change: pricePercentage24h } = pData[id];
				setPriceData({ price, pricePercentage24h });
				setIsFetchingPrice(false);
			});
		};

		fetchPriceData();
	}, []);

	const graphPoints = data?.sparklineData.map((value, index) => ({
		value,
		date: new Date(currentDate.getTime() - (data?.sparklineData.length - 1 - index) * 3600000),
	}));

	const updatePriceAtPoint = useDebouncedCallback((p: number) => {
		setPriceAtPoint(p);
	}, 5);

	return (
		<>
			<AppbarHeader title={name} subtitle={ticker.toUpperCase()} imgSrc={imgSrc} />
			{isLoading || isFetchingPrice ? (
				<ActivityIndicator style={{ top: 24 }} />
			) : (
				<ScrollView contentContainerStyle={styles.body}>
					<Surface mode={'flat'} style={styles.surface}>
						<View style={styles.flexRow}>
							<Avatar.Image source={{ uri: imgSrc }} size={18} style={styles.image} />
							<Text variant={'titleMedium'}>{name}</Text>
						</View>
						<Text variant={'headlineLarge'}>
							{cryptoFormat(
								isInteracting ? priceAtPoint : priceData.price,
								'USD',
								'en',
							)}
						</Text>
						<View style={[styles.flexRow, { gap: 5 }]}>
							<Text variant={'titleMedium'} style={{ lineHeight: 18 }}>
								{'24H'}
							</Text>
							<Text
								variant={'titleMedium'}
								style={{
									color: isUp ? theme.additionalColors.green : theme.colors.error,
									lineHeight: 18,
								}}
							>
								{`${isUp ? '+' : ''}${priceData.pricePercentage24h.toFixed(2)}%`}
							</Text>
						</View>
						<Graph
							data={graphPoints}
							onGestureStart={() => setIsInteracting(true)}
							onPointSelected={updatePriceAtPoint}
							onGestureEnd={() => setIsInteracting(false)}
						/>
						<CoinDetails coinData={data} />
					</Surface>
				</ScrollView>
			)}
		</>
	);
};
