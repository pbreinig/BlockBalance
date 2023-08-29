import { FlatList, View } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';
import { MarketListItem } from '../../components/market-list-item/market-list-item';
import { fetchMarket } from '../../api/coingecko-api';
import { useEffect, useState } from 'react';
import { useSettingsContext } from '../../context/settings-context';
import { styles } from './market-screen-styles';
export const MarketScreen = () => {
	const { theme } = useSettingsContext();
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	useEffect(() => {
		const fetchData = async () => {
			const marketData = await fetchMarket(1);
			setData(marketData);
			setIsLoading(false);
		};
		fetchData();
	}, []);
	const renderItem = ({ item }) => (
		<MarketListItem
			rank={item.market_cap_rank}
			name={item.name}
			ticker={item.symbol}
			imageSrc={item.image}
			price={item.current_price}
			pricePercentage24h={item.price_change_percentage_24h}
			marketCap={item.market_cap}
		/>
	);

	return (
		<View style={styles.body}>
			<Text variant={'headlineLarge'}>{'Market'}</Text>
			<View style={styles.listLabelContainer}>
				<Text variant={'labelMedium'} style={{ color: theme.colors.onSurfaceVariant }}>
					{'COIN · 24H%'}
				</Text>
				<Text variant={'labelMedium'} style={{ color: theme.colors.onSurfaceVariant }}>
					{'PRICE · MCAP'}
				</Text>
			</View>
			{isLoading ? (
				<ActivityIndicator />
			) : (
				<FlatList
					data={data}
					renderItem={renderItem}
					initialNumToRender={20}
					style={styles.flatList}
					contentContainerStyle={styles.flatListContainer}
					showsVerticalScrollIndicator={false}
				/>
			)}
		</View>
	);
};
