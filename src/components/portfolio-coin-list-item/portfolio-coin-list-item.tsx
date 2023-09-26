import React from 'react';
import { View } from 'react-native';
import { Avatar, Surface, Text, TouchableRipple } from 'react-native-paper';
import { useSettingsContext } from '../../context/settings-context';
import { styles } from './portfolio-coin-list-item-styles';
import { Coin } from '../../context/portfolio-context';
import { cryptoFormat, currencyFormat } from '../../util';

interface PortfolioCoinListItemProps {
	coin: Coin;
	onPress: () => void;
}

const nFormat = new Intl.NumberFormat('en-US', { maximumFractionDigits: 5 });
export const PortfolioCoinListItem: React.FC<PortfolioCoinListItemProps> = (props) => {
	const { coin, onPress } = props;
	const { name, imgSrc, ticker, fiatValue, coinAmount, pricePercentage24h, price } = coin;
	const { theme } = useSettingsContext();
	const isUp = pricePercentage24h && pricePercentage24h >= 0;

	return (
		<Surface style={styles.surface} mode={'flat'}>
			<TouchableRipple
				rippleColor={theme.additionalColors.ripple}
				borderless={true}
				style={styles.ripple}
				onPress={onPress}
			>
				<>
					<Avatar.Image source={{ uri: imgSrc }} size={32} style={styles.image} />
					<View style={styles.textContainer}>
						<View style={styles.leftTextContainer}>
							<Text variant={'bodyLarge'} numberOfLines={1}>
								{name}
							</Text>
							<View style={styles.tickerPriceChangeContainer}>
								<Text
									variant={'bodySmall'}
									numberOfLines={1}
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
										{` ${isUp ? '+' : ''}${pricePercentage24h.toFixed(2)}% `}
									</Text>
								)}
								<Text variant={'bodySmall'} numberOfLines={1}>
									{`${cryptoFormat(price || 0, 'USD', 'en')}`}
								</Text>
							</View>
						</View>
						<View style={styles.rightTextContainer}>
							<Text variant={'bodyLarge'} numberOfLines={1}>
								{currencyFormat(fiatValue, 'USD', 'en')}
							</Text>
							<Text
								variant={'bodySmall'}
								numberOfLines={1}
								style={[styles.ticker, { color: theme.colors.onSurfaceVariant }]}
							>
								{`${nFormat.format(coinAmount)} ${ticker}`}
							</Text>
						</View>
					</View>
				</>
			</TouchableRipple>
		</Surface>
	);
};
