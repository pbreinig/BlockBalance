import React, { useCallback } from 'react';
import { FlatList, View } from 'react-native';
import { FAB, Surface, Text } from 'react-native-paper';
import { styles } from './transcations-list-styles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { usePortfolioContext } from '../../context/portfolio-context';
import { useSettingsContext } from '../../context/settings-context';
import { cryptoFormat, currencyFormat, formatTimestamp } from '../../util';

interface TransactionsListProps {
	id: string;
	name: string;
	ticker: string;
	imgSrc: string;
	currentPrice: number;
	navigation: any;
}

const nFormat = new Intl.NumberFormat('en-US', { maximumFractionDigits: 5 });
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

	const renderItem = ({ item }) => {
		const isBuy = item.type === 'buy';
		const date = formatTimestamp(item.date, 'd MMM YYY HH:mm');
		const buySell = isBuy ? 'Buy' : 'Sell';
		const change = ((currentPrice - item.price) / item.price) * 100;

		return (
			<Surface
				mode={'flat'}
				style={[
					styles.surface,
					{ borderColor: isBuy ? theme.additionalColors.green : theme.colors.error },
				]}
				key={item.id}
			>
				<View style={styles.row}>
					<View
						style={[
							styles.typeContainer,
							{
								borderColor: isBuy
									? theme.additionalColors.green
									: theme.colors.error,
							},
						]}
					>
						<Text variant={'labelMedium'}>{buySell}</Text>
					</View>
					<Text variant={'bodySmall'} style={{ color: theme.colors.onSurfaceVariant }}>
						{date}
					</Text>
				</View>
				<View style={[styles.row, { justifyContent: 'space-between' }]}>
					<View>
						<Text variant={'bodyLarge'}>{cryptoFormat(item.price, 'USD', 'en')}</Text>
						<Text
							variant={'bodySmall'}
							style={{ color: theme.colors.onSurfaceVariant }}
						>
							{`${buySell} Price (${ticker.toUpperCase()}/USD)`}
						</Text>
					</View>
					<View style={{ alignItems: 'flex-end' }}>
						<Text variant={'bodyLarge'}>{nFormat.format(item.coin.coinAmount)}</Text>
						<Text
							variant={'bodySmall'}
							style={{ color: theme.colors.onSurfaceVariant }}
						>
							{`Amount (${ticker.toUpperCase()})`}
						</Text>
					</View>
				</View>
				<View style={[styles.row, { justifyContent: 'space-between' }]}>
					<View>
						<Text variant={'bodyLarge'}>
							{currencyFormat(item.coin.fiatValue, 'USD', 'en')}
						</Text>
						<Text
							variant={'bodySmall'}
							style={{ color: theme.colors.onSurfaceVariant }}
						>
							{isBuy ? 'Cost (USD)' : 'Proceeds (USD)'}
						</Text>
					</View>
					{isBuy && (
						<View style={{ alignItems: 'flex-end' }}>
							<Text variant={'bodyLarge'}>
								{currencyFormat(currentPrice * item.coin.coinAmount, 'USD', 'en')}
							</Text>
							<Text
								variant={'bodySmall'}
								style={{ color: theme.colors.onSurfaceVariant }}
							>
								{'Worth (USD)'}
							</Text>
						</View>
					)}
				</View>
				{isBuy && (
					<View>
						<Text
							variant={'bodyLarge'}
							style={{
								color:
									change >= 0 ? theme.additionalColors.green : theme.colors.error,
							}}
						>
							{`${change.toFixed(2)}%`}
						</Text>
						<Text
							variant={'bodySmall'}
							style={{ color: theme.colors.onSurfaceVariant }}
						>
							{'Change'}
						</Text>
					</View>
				)}
				{item.note && (
					<View>
						<Text variant={'bodyLarge'}>{item.note}</Text>
						<Text
							variant={'bodySmall'}
							style={{ color: theme.colors.onSurfaceVariant }}
						>
							{'Note'}
						</Text>
					</View>
				)}
			</Surface>
		);
	};

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
