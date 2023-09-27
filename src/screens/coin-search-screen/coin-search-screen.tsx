import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, Keyboard } from 'react-native';
import { ActivityIndicator, Searchbar, Text } from 'react-native-paper';
import { styles } from './coin-search-screen-styles';
import { useSettingsContext } from '../../context/settings-context';
import { SearchCoinListItem } from '../../components/search-coin-list-item/search-coin-list-item';
import { fetchSearchCoins, useFetchTrendingCoins } from '../../api/coingecko-api';
import { useDebounce } from 'use-debounce';

export const CoinSearchScreen = ({ navigation, route }) => {
	const { theme } = useSettingsContext();
	const [searchQuery, setSearchQuery] = useState<string>('');
	const [debouncedSearchQuery] = useDebounce(searchQuery, 500);
	const [queriedData, setQueriedData] = useState([]);
	const { isLoading, data } = useFetchTrendingCoins();
	const DATA = debouncedSearchQuery.length > 2 ? queriedData : data;
	const isLoadingQuery = debouncedSearchQuery.length > 2 && !queriedData.length;
	const { isMarket } = route.params;

	useEffect(() => {
		if (debouncedSearchQuery.length > 2) {
			fetchSearchCoins(debouncedSearchQuery).then((queriedCoins) => {
				setQueriedData(queriedCoins);
			});
		} else {
			setQueriedData([]);
		}
	}, [debouncedSearchQuery]);

	const onChangeSearch = (query) => setSearchQuery(query);

	const handleScrollBeginDrag = useCallback(() => Keyboard.dismiss(), []);

	const renderItem = ({ item }) => {
		const { id, name, ticker, imgSrc } = item;

		return (
			<SearchCoinListItem
				id={id}
				name={name}
				ticker={ticker}
				imgSrc={imgSrc}
				onPress={() =>
					navigation.navigate(isMarket ? 'Coin' : 'Transaction', { coin: item })
				}
			/>
		);
	};

	const renderListHeader = () => {
		return (
			<Text
				variant={'labelLarge'}
				style={[styles.listHeader, { color: theme.colors.primary }]}
			>
				{debouncedSearchQuery.length > 2 ? 'Search Results' : 'Trending Search'}
			</Text>
		);
	};

	return (
		<>
			<Searchbar
				mode={'view'}
				theme={{ colors: { outline: theme.colors.onSurfaceVariant } }}
				placeholder={'Search Crypto'}
				icon={'arrow-left'}
				iconColor={theme.colors.onPrimary}
				onIconPress={() => navigation.goBack()}
				value={searchQuery}
				onChangeText={onChangeSearch}
				rippleColor={theme.additionalColors.ripple}
				inputStyle={{ color: theme.colors.onPrimary }}
				placeholderTextColor={theme.colors.onSurfaceVariant}
				autoFocus={true}
			/>
			{isLoading || isLoadingQuery ? (
				<ActivityIndicator style={{ top: 12 }} />
			) : (
				<FlatList
					data={DATA}
					keyExtractor={(item) => item.id}
					renderItem={renderItem}
					ListHeaderComponent={renderListHeader}
					initialNumToRender={20}
					removeClippedSubviews={true}
					onScrollBeginDrag={handleScrollBeginDrag}
				/>
			)}
		</>
	);
};
