import React, { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import { ActivityIndicator, Searchbar, Text, TouchableRipple } from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { styles } from './coin-list-screen-styles';
import { useSettingsContext } from '../../context/settings-context';
import { SearchCoinListItem } from '../../components/search-coin-list-item/search-coin-list-item';
import { fetchSearchCoins, useFetchTrendingCoins } from '../../api/coingecko-api';
import { useDebounce } from 'use-debounce';

export const CoinListScreen = ({ navigation }) => {
	const { theme } = useSettingsContext();
	const [searchQuery, setSearchQuery] = useState<string>('');
	const [debouncedSearchQuery] = useDebounce(searchQuery, 500);
	const [queriedData, setQueriedData] = useState([]);
	const { isLoading, data } = useFetchTrendingCoins();
	const DATA = debouncedSearchQuery.length > 2 ? queriedData : data;
	const isLoadingQuery = debouncedSearchQuery.length > 2 && !queriedData.length;

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

	const renderItem = ({ item }) => {
		const { name, ticker, imgSrc } = item;

		return (
			<SearchCoinListItem
				name={name}
				ticker={ticker}
				imgSrc={imgSrc}
				onPress={() =>
					navigation.navigate('Transaction', {
						name: name,
						ticker: ticker,
						imgSrc: imgSrc,
					})
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
				{debouncedSearchQuery.length > 2 ? 'Search Results' : 'Trending'}
			</Text>
		);
	};

	return (
		<>
			<View style={styles.headerContainer}>
				<TouchableRipple
					onPress={() => navigation.goBack()}
					rippleColor={theme.additionalColors.ripple}
					style={styles.backButton}
					borderless={true}
				>
					<MaterialIcons name={'arrow-back'} size={25} color={theme.colors.onPrimary} />
				</TouchableRipple>
				<Searchbar
					placeholder={'Search Crypto'}
					value={searchQuery}
					onChangeText={onChangeSearch}
					rippleColor={theme.additionalColors.ripple}
					inputStyle={{ color: theme.colors.onPrimary }}
					placeholderTextColor={theme.colors.onSurfaceVariant}
					style={styles.searchbar}
				/>
			</View>
			{isLoading || isLoadingQuery ? (
				<ActivityIndicator style={{ top: 8 }} />
			) : (
				<FlatList
					data={DATA}
					renderItem={renderItem}
					ListHeaderComponent={renderListHeader}
					initialNumToRender={20}
					removeClippedSubviews={true}
				/>
			)}
		</>
	);
};
