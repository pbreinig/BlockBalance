import { FlatList, StyleSheet, View } from 'react-native';
import { StyleConstants } from '../constants/style-constants';
import { ActivityIndicator, Text } from 'react-native-paper';
import { MarketListItem } from '../components/market-list-item';
import { fetchMarket } from '../api/coingecko-api';
import { useEffect, useState } from 'react';
import { useSettingsContext } from '../context/settings-context';
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

const { Screen, ListItem } = StyleConstants;
const styles = StyleSheet.create({
	body: {
		padding: Screen.PADDING,
	},
	flatList: {
		width: '100%',
		marginTop: ListItem.PADDING,
	},
	flatListContainer: {
		paddingBottom: 40,
	},
	listLabelContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: '100%',
		top: 6,
		paddingHorizontal: ListItem.PADDING,
	},
});
