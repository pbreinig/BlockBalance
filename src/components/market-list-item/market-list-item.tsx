import React from 'react';
import { View } from 'react-native';
import { Avatar, Surface, Text } from 'react-native-paper';
import { useSettingsContext } from '../../context/settings-context';
import { styles } from './market-list-item-styles';
import { cryptoFormat } from '../../util';

interface IMarketListItemProps {
	rank: number;
	name: string;
	ticker: string;
	imageSrc: string;
	price: number;
	pricePercentage24h: number;
	marketCap: number;
}

export const MarketListItem: React.FC<IMarketListItemProps> = React.memo((props) => {
	const { rank, name, ticker, imageSrc, price, pricePercentage24h, marketCap } = props;
	const { theme } = useSettingsContext();
	const isUp = pricePercentage24h >= 0;

	return (
		<Surface style={styles.surface} mode={'flat'}>
			<View style={[styles.rankContainer, { backgroundColor: theme.colors.secondary }]}>
				<Text variant={'labelSmall'} style={{ color: theme.colors.onSurfaceVariant }}>
					{rank}
				</Text>
			</View>
			<Avatar.Image source={{ uri: imageSrc }} size={32} style={styles.image} />
			<View style={styles.textContainer}>
				<View>
					<Text variant={'bodyLarge'}>{name}</Text>
					<View style={styles.tickerChangeContainer}>
						<Text
							variant={'bodySmall'}
							style={[styles.ticker, { color: theme.colors.onSurfaceVariant }]}
						>
							{ticker}
						</Text>
						<Text
							variant={'bodySmall'}
							style={{
								color: isUp ? theme.additionalColors.green : theme.colors.error,
							}}
						>
							{` ${isUp ? '+' : ''}${pricePercentage24h.toFixed(2)}%`}
						</Text>
					</View>
				</View>
				<View>
					<Text variant={'bodyLarge'} style={styles.textRight}>
						{`${cryptoFormat(price, 'USD', 'en')}`}
					</Text>
					<Text
						variant={'bodySmall'}
						style={[styles.textRight, { color: theme.colors.onSurfaceVariant }]}
					>
						{`${cryptoFormat(marketCap, 'USD', 'en')}`}
					</Text>
				</View>
			</View>
		</Surface>
	);
});
