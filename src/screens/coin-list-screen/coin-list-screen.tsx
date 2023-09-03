import React, { useState } from 'react';
import { FlatList, View } from 'react-native';
import { ActivityIndicator, Searchbar, TouchableRipple } from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { styles } from './coin-list-screen-styles';
import { useSettingsContext } from '../../context/settings-context';
import { SearchCoinListItem } from '../../components/search-coin-list-item/search-coin-list-item';
import { useFetchCoinList } from '../../api/coingecko-api';

export const CoinListScreen = ({ navigation }) => {
	const { theme } = useSettingsContext();
	const [searchQuery, setSearchQuery] = useState<string>('');
	const { isLoading, data } = useFetchCoinList();

	const DATA = data?.filter(
		(item: { name: string; symbol: string }) =>
			item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			item.symbol.toLowerCase().includes(searchQuery.toLowerCase()),
	);

	const onChangeSearch = (query) => setSearchQuery(query);

	const renderItem = ({ item }) => (
		<SearchCoinListItem
			name={item.name}
			ticker={item.symbol}
			onPress={() =>
				navigation.navigate('Transaction', { name: item.name, ticker: item.symbol })
			}
		/>
	);

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
					initialNumToRender={20}
					removeClippedSubviews={true}
				/>
			)}
		</>
	);
};
