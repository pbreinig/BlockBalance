import { useCallback, useRef, useState } from 'react';
import { FlatList, View } from 'react-native';
import { ActivityIndicator, FAB, ProgressBar, Text } from 'react-native-paper';
import { MarketListItem } from '../../components/market-list-item/market-list-item';
import { useFetchMarket } from '../../api/coingecko-api';
import { useSettingsContext } from '../../context/settings-context';
import { styles } from './market-screen-styles';
import { useScrollToTop } from '@react-navigation/native';

export const MarketScreen = ({ navigation }) => {
	const { theme } = useSettingsContext();
	const { isLoading, data, hasNextPage, fetchNextPage, isFetchingNextPage } = useFetchMarket();
	const flattenData = data?.pages.flatMap((page) => page.data);
	const [scrollToTopVisible, setScrollToTopVisible] = useState<boolean>(false);
	const flatListRef = useRef<FlatList>(null);
	useScrollToTop(flatListRef);

	const loadMore = () => hasNextPage && fetchNextPage();

	const scrollToTop = useCallback(() => flatListRef.current?.scrollToOffset({ offset: 0 }), []);

	const onScroll = useCallback((offsetY: number) => setScrollToTopVisible(offsetY > 300), []);

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
			onPress={() => navigation.navigate('Coin', { coin: item })}
		/>
	);

	return (
		<>
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
						ref={flatListRef}
						data={flattenData}
						keyExtractor={(item) => item.id}
						renderItem={renderItem}
						initialNumToRender={20}
						style={styles.flatList}
						contentContainerStyle={styles.flatListContainer}
						showsVerticalScrollIndicator={false}
						onScroll={(e) => onScroll(e.nativeEvent.contentOffset.y)}
						onEndReached={loadMore}
						onEndReachedThreshold={0.4}
						removeClippedSubviews={true}
					/>
				)}
			</View>
			<ProgressBar
				indeterminate={true}
				style={styles.progressBar}
				visible={isFetchingNextPage}
			/>
			<FAB
				icon={'chevron-up'}
				style={styles.scrollToTopFab}
				rippleColor={theme.additionalColors.ripple}
				onPress={scrollToTop}
				visible={scrollToTopVisible}
			/>
		</>
	);
};
