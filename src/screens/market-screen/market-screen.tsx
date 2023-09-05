import { FlatList, useWindowDimensions, View } from 'react-native';
import { ActivityIndicator, Portal, ProgressBar, Text } from 'react-native-paper';
import { MarketListItem } from '../../components/market-list-item/market-list-item';
import { useFetchMarket } from '../../api/coingecko-api';
import { useSettingsContext } from '../../context/settings-context';
import { styles } from './market-screen-styles';

export const MarketScreen = () => {
	const { theme } = useSettingsContext();
	const { height: WINDOW_HEIGHT } = useWindowDimensions();
	const { isLoading, data, hasNextPage, fetchNextPage, isFetchingNextPage } = useFetchMarket();
	const flattenData = data?.pages.flatMap((page) => page.data);

	const loadMore = () => hasNextPage && fetchNextPage();

	const renderItem = ({ item }) => (
		<MarketListItem
			id={item.id}
			rank={item.rank}
			name={item.name}
			ticker={item.ticker}
			imgSrc={item.imgSrc}
			price={item.price}
			pricePercentage24h={item.pricePercentage24h}
			marketCap={item.marketCap}
		/>
	);

	return (
		<View style={styles.body}>
			<Text variant={'headlineLarge'}>{'Market'}</Text>
			<View style={styles.listLabelContainer}>
				<Text variant={'labelSmall'} style={{ color: theme.colors.onSurfaceVariant }}>
					{'COIN · 24H%'}
				</Text>
				<Text variant={'labelSmall'} style={{ color: theme.colors.onSurfaceVariant }}>
					{'PRICE · MCAP'}
				</Text>
			</View>
			{isLoading ? (
				<ActivityIndicator style={{ top: 18 }} />
			) : (
				<FlatList
					data={flattenData}
					keyExtractor={(item) => item.id}
					renderItem={renderItem}
					initialNumToRender={20}
					style={styles.flatList}
					contentContainerStyle={styles.flatListContainer}
					showsVerticalScrollIndicator={false}
					onEndReached={loadMore}
					onEndReachedThreshold={0.4}
					removeClippedSubviews={true}
				/>
			)}
			<Portal>
				<ProgressBar
					indeterminate={true}
					style={{ height: 3, top: WINDOW_HEIGHT - 83 }}
					visible={isFetchingNextPage}
				/>
			</Portal>
		</View>
	);
};
