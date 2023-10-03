import React, { useCallback } from 'react';
import { FlatList, View } from 'react-native';
import { FAB, Surface, Text } from 'react-native-paper';
import { styles } from './transactions-list-styles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { usePortfolioContext } from '../../context/portfolio-context';
import { useSettingsContext } from '../../context/settings-context';
import { cryptoFormat } from '../../util';
import { TransactionsListItem } from '../transactions-list-item/transactions-list-item';

interface TransactionsListProps {
	id: string;
	name: string;
	ticker: string;
	imgSrc: string;
	currentPrice: number;
	navigation: any;
}

export const TransactionsList: React.FC<TransactionsListProps> = (props) => {
	const { id, name, ticker, imgSrc, currentPrice, navigation } = props;
	const insets = useSafeAreaInsets();
	const { theme } = useSettingsContext();
	const { portfolio } = usePortfolioContext();
	const transactions = portfolio.transactions
		.filter((t) => t.coin.id === id)
		.sort((t1, t2) => t2.date - t1.date);
	const buyTransactions = transactions.filter((t) => t.type === 'buy');
	const sellTransactions = transactions.filter((t) => t.type === 'sell');
	const avgBuyPrice =
		buyTransactions.reduce((total, t) => total + t.price, 0) / buyTransactions.length;
	const avgSellPrice =
		sellTransactions.reduce((total, t) => total + t.price, 0) / sellTransactions.length;

	const handleNavigation = useCallback(() => {
		const coin = { id, name, ticker, imgSrc };
		navigation.navigate('Transaction', { coin, cameFromCoinScreen: true });
	}, []);

	const renderItem = ({ item }) => (
		<TransactionsListItem transaction={item} ticker={ticker} currentPrice={currentPrice} />
	);

	const renderListHeader = () => (
		<View style={[styles.row, styles.listHeader]}>
			<View style={styles.listHeaderItem}>
				<Text variant={'bodyLarge'}>{transactions.length}</Text>
				<Text variant={'bodySmall'} style={{ color: theme.colors.onSurfaceVariant }}>
					{'Transactions'}
				</Text>
			</View>
			<View style={styles.listHeaderItem}>
				<Text variant={'bodyLarge'}>
					{avgBuyPrice ? cryptoFormat(avgBuyPrice, 'USD', 'en') : '-'}
				</Text>
				<Text variant={'bodySmall'} style={{ color: theme.colors.onSurfaceVariant }}>
					{'Avg. Buy Price'}
				</Text>
			</View>
			<View style={styles.listHeaderItem}>
				<Text variant={'bodyLarge'}>
					{avgSellPrice ? cryptoFormat(avgSellPrice, 'USD', 'en') : '-'}
				</Text>
				<Text variant={'bodySmall'} style={{ color: theme.colors.onSurfaceVariant }}>
					{'Avg. Sell Price'}
				</Text>
			</View>
		</View>
	);

	return transactions.length ? (
		<>
			<FlatList
				data={transactions}
				keyExtractor={(item) => item.id}
				renderItem={renderItem}
				ListHeaderComponent={renderListHeader}
				contentContainerStyle={[styles.body, { paddingBottom: insets.bottom }]}
			/>
			<FAB
				icon={'plus'}
				rippleColor={theme.additionalColors.ripple}
				style={[styles.fab, { bottom: styles.fab.bottom + insets.bottom }]}
				onPress={handleNavigation}
			/>
		</>
	) : (
		<Surface
			mode={'flat'}
			style={[styles.noTransactionsSurface, { marginBottom: insets.bottom }]}
		>
			<FAB
				icon={'plus'}
				rippleColor={theme.additionalColors.ripple}
				onPress={handleNavigation}
			/>
			<Text variant={'titleMedium'} style={styles.addFirstText}>
				{`Add your first ${name} transaction`}
			</Text>
		</Surface>
	);
};
