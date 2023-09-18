import React from 'react';
import { View } from 'react-native';
import { Avatar, Surface, Text, TouchableRipple } from 'react-native-paper';
import { useSettingsContext } from '../../context/settings-context';
import { styles } from './market-list-item-styles';
import { cryptoFormat } from '../../util';

interface IMarketListItemProps {
	id: string;
	rank: number;
	name: string;
	ticker: string;
	imgSrc: string;
	price: number;
	pricePercentage24h: number;
	marketCap: number;
	onPress: () => void;
}

export const MarketListItem: React.FC<IMarketListItemProps> = React.memo((props) => {
	const { rank, name, ticker, imgSrc, price, pricePercentage24h, marketCap, onPress } = props;
	const { theme } = useSettingsContext();
	const isUp = pricePercentage24h >= 0;

	return (
		<Surface style={styles.surface} mode={'flat'}>
			<TouchableRipple
				rippleColor={theme.additionalColors.ripple}
				borderless={true}
				style={styles.ripple}
				onPress={onPress}
			>
				<>
					<View
						style={[styles.rankContainer, { backgroundColor: theme.colors.secondary }]}
					>
						<Text
							variant={'labelSmall'}
							style={{ color: theme.colors.onSurfaceVariant }}
						>
							{rank}
						</Text>
					</View>
					<Avatar.Image source={{ uri: imgSrc }} size={32} style={styles.image} />
					<View style={styles.textContainer}>
						<View>
							<Text variant={'bodyLarge'}>{name}</Text>
							<View style={styles.tickerChangeContainer}>
								<Text
									variant={'bodySmall'}
									style={[
										styles.ticker,
										{ color: theme.colors.onSurfaceVariant },
									]}
								>
									{ticker}
								</Text>
								{pricePercentage24h && (
									<Text
										variant={'bodySmall'}
										style={{
											color: isUp
												? theme.additionalColors.green
												: theme.colors.error,
										}}
									>
										{` ${isUp ? '+' : ''}${pricePercentage24h.toFixed(2)}%`}
									</Text>
								)}
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
				</>
			</TouchableRipple>
		</Surface>
	);
});
