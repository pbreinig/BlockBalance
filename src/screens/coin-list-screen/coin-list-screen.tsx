import React, { useState } from 'react';
import { FlatList, View } from 'react-native';
import { ActivityIndicator, Searchbar, Text, TouchableRipple } from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { styles } from './coin-list-screen-styles';
import { useSettingsContext } from '../../context/settings-context';
import { SearchCoinListItem } from '../../components/search-coin-list-item/search-coin-list-item';
import { useFetchTrendingCoins } from '../../api/coingecko-api';

export const CoinListScreen = ({ navigation }) => {
	const { theme } = useSettingsContext();
	const [searchQuery, setSearchQuery] = useState<string>('');
	const { isLoading, data } = useFetchTrendingCoins();

	const DATA = data?.filter(
		(coins: { item: { name: string; symbol: string } }) =>
			coins.item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			coins.item.symbol.toLowerCase().includes(searchQuery.toLowerCase()),
	);

	const onChangeSearch = (query) => setSearchQuery(query);

	const renderItem = ({ item }) => {
		const { name, symbol, large } = item.item;

		return (
			<SearchCoinListItem
				name={name}
				ticker={symbol}
				imgSrc={large}
				onPress={() =>
					navigation.navigate('Transaction', {
						name: name,
						ticker: symbol,
						imgSrc: large,
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
				{searchQuery === '' ? 'Trending Coins' : 'Search Result'}
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
			{isLoading ? (
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
