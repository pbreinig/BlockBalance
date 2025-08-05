import React from 'react';
import { View } from 'react-native';
import { Surface, Text, TouchableRipple } from 'react-native-paper';
import { Transaction } from '../../context/portfolio-context';
import { useSettingsContext } from '../../context/settings-context';
import { styles } from './transactions-list-item-styles';
import { cryptoFormat, currencyFormat, formatTimestamp } from '../../util';

interface TransactionsListItemProps {
	transaction: Transaction;
	ticker: string;
	currentPrice: number;
	onPress: () => void;
}

const nFormat = new Intl.NumberFormat('en-US', { maximumFractionDigits: 5 });
export const TransactionsListItem: React.FC<TransactionsListItemProps> = React.memo((props) => {
	const { transaction, ticker, currentPrice, onPress } = props;
	const { type, id, price, note, coin, date } = transaction;
	const { theme } = useSettingsContext();
	const isBuy = type === 'buy';
	const dateFormatted = formatTimestamp(date, 'd MMM YYY HH:mm');
	const buySell = isBuy ? 'Buy' : 'Sell';
	const change = ((currentPrice - price) / price) * 100;
	const worth = currentPrice * coin.coinAmount;

	return (
		<Surface mode={'flat'} key={id} style={styles.surface}>
			<TouchableRipple
				onPress={onPress}
				rippleColor={theme.additionalColors.ripple}
				borderless={true}
				style={styles.touchable}
			>
				<View
					style={[
						styles.container,
						{ borderColor: isBuy ? theme.additionalColors.green : theme.colors.error },
					]}
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
						<Text
							variant={'bodySmall'}
							style={{ color: theme.colors.onSurfaceVariant }}
						>
							{dateFormatted}
						</Text>
					</View>
					<View style={[styles.row, { justifyContent: 'space-between' }]}>
						<View>
							<Text variant={'bodyLarge'}>{cryptoFormat(price, 'USD', 'en')}</Text>
							<Text
								variant={'bodySmall'}
								style={{ color: theme.colors.onSurfaceVariant }}
							>
								{`${buySell} Price (${ticker.toUpperCase()}/USD)`}
							</Text>
						</View>
						<View style={{ alignItems: 'flex-end' }}>
							<Text variant={'bodyLarge'}>{nFormat.format(coin.coinAmount)}</Text>
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
								{currencyFormat(coin.fiatValue, 'USD', 'en')}
							</Text>
							<Text
								variant={'bodySmall'}
								style={{ color: theme.colors.onSurfaceVariant }}
							>
								{isBuy ? 'Cost (USD)' : 'Proceeds (USD)'}
							</Text>
						</View>
						{isBuy ? (
							<View style={{ alignItems: 'flex-end' }}>
								<Text variant={'bodyLarge'}>
									{currencyFormat(worth, 'USD', 'en')}
								</Text>
								<Text
									variant={'bodySmall'}
									style={{ color: theme.colors.onSurfaceVariant }}
								>
									{'Worth (USD)'}
								</Text>
							</View>
						) : null}
					</View>
					{isBuy ? (
						<View>
							<Text
								variant={'bodyLarge'}
								style={{
									color:
										change >= 0
											? theme.additionalColors.green
											: theme.colors.error,
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
					) : null}
					{note ? (
						<View>
							<Text variant={'bodyLarge'}>{note}</Text>
							<Text
								variant={'bodySmall'}
								style={{ color: theme.colors.onSurfaceVariant }}
							>
								{'Note'}
							</Text>
						</View>
					) : null}
				</View>
			</TouchableRipple>
		</Surface>
	);
});
