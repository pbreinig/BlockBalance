import { ScrollView, View } from 'react-native';
import { ActivityIndicator, Avatar, Chip, Surface, Text } from 'react-native-paper';
import { useSettingsContext } from '../../context/settings-context';
import { styles } from './coin-screen-styles';
import { AppbarHeader } from '../../components/appbar-header/appbar-header';
import React, { useEffect, useState } from 'react';
import { Chart } from '../../components/chart/chart';
import { fetchPrices, useFetchCoin } from '../../api/coingecko-api';
import { CoinDetails } from '../../components/coin-details/coin-details';
import { LineChart } from 'react-native-wagmi-charts';
import { useMMKVNumber } from 'react-native-mmkv';
import { storage } from '../../storage';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Tabs, TabScreen, TabsProvider } from 'react-native-paper-tabs';
import { TransactionsList } from '../../components/transactions-list/transactions-list';

export const CoinScreen = ({ navigation, route }) => {
	const { name, imgSrc, ticker, id } = route.params.coin;
	const { theme } = useSettingsContext();
	const insets = useSafeAreaInsets();
	const { isLoading, data } = useFetchCoin(id);
	const [currentPrice, setCurrentPrice] = useState<number>(0);
	const [isFetchingPrice, setIsFetchingPrice] = useState<boolean>(true);
	const [timeFrame = 24, setTimeFrame] = useMMKVNumber('timeFrame', storage);
	const dataTimestamp = Date.parse(data?.lastUpdated);

	useEffect(() => {
		const fetchPriceData = async () => {
			fetchPrices([id]).then((pData) => {
				const { usd: price } = pData[id];
				setCurrentPrice(price);
				setIsFetchingPrice(false);
			});
		};

		fetchPriceData();
	}, []);

	const lineChartData = data?.sparklineData
		.map((value: number, index: number) => ({
			timestamp: dataTimestamp - (data?.sparklineData.length - 1 - index) * 3600000,
			value,
		}))
		.slice(-timeFrame);

	const renderTimeFrameChip = (value: number, text: string) => (
		<Chip
			rippleColor={theme.additionalColors.ripple}
			onPress={() => setTimeFrame(value)}
			selected={timeFrame === value}
			showSelectedCheck={false}
			style={timeFrame !== value && styles.chipUnselected}
		>
			{text}
		</Chip>
	);

	return (
		<>
			<AppbarHeader title={name} subtitle={ticker.toUpperCase()} imgSrc={imgSrc} />
			<TabsProvider defaultIndex={0}>
				<Tabs uppercase={false} tabLabelStyle={{ fontFamily: 'Manrope-Medium' }}>
					<TabScreen label={'Overview'}>
						{isLoading || isFetchingPrice ? (
							<ActivityIndicator style={{ top: 24 }} />
						) : (
							<ScrollView
								contentContainerStyle={[
									styles.body,
									{ paddingBottom: insets.bottom },
								]}
							>
								<Surface mode={'flat'} style={styles.surface}>
									<View style={styles.flexRow}>
										<Avatar.Image
											source={{ uri: imgSrc }}
											size={18}
											style={styles.image}
										/>
										<Text variant={'titleMedium'}>{name}</Text>
									</View>
									<LineChart.Provider data={lineChartData}>
										<Chart points={lineChartData} currentPrice={currentPrice} />
									</LineChart.Provider>
									<View style={styles.timeFrameSelection}>
										{renderTimeFrameChip(12, '12H')}
										{renderTimeFrameChip(24, '24H')}
										{renderTimeFrameChip(72, '3D')}
										{renderTimeFrameChip(168, '1W')}
									</View>
									<CoinDetails coinData={data} />
								</Surface>
							</ScrollView>
						)}
					</TabScreen>
					<TabScreen label={'Transactions'}>
						<TransactionsList
							id={id}
							name={name}
							ticker={ticker}
							imgSrc={imgSrc}
							currentPrice={currentPrice}
							navigation={navigation}
						/>
					</TabScreen>
				</Tabs>
			</TabsProvider>
		</>
	);
};
