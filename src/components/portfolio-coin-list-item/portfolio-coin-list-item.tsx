import React from 'react';
import { View } from 'react-native';
import { Avatar, Surface, Text } from 'react-native-paper';
import { useSettingsContext } from '../../context/settings-context';
import { styles } from './portfolio-coin-list-item-styles';
import { Coin } from '../../context/portfolio-context';
import { cryptoFormat, currencyFormat } from '../../util';

interface IPortfolioCoinListItemProps {
	coin: Coin;
}

export const PortfolioCoinListItem: React.FC<IPortfolioCoinListItemProps> = React.memo((props) => {
	const { coin } = props;
	const { name, imgSrc, ticker, fiatValue, coinAmount, pricePercentage24h, price } = coin;
	const { theme } = useSettingsContext();
	const isUp = pricePercentage24h && pricePercentage24h >= 0;

	return (
		<Surface style={styles.surface} mode={'flat'}>
			<Avatar.Image source={{ uri: imgSrc }} size={32} style={styles.image} />
			<View style={styles.textContainer}>
				<View>
					<Text variant={'bodyLarge'}>{name}</Text>
					<View style={styles.tickerPriceChangeContainer}>
						<Text
							variant={'bodySmall'}
							style={[styles.ticker, { color: theme.colors.onSurfaceVariant }]}
						>
							{ticker}
						</Text>
						{pricePercentage24h && (
							<Text
								variant={'bodySmall'}
								style={{
									color: isUp ? theme.additionalColors.green : theme.colors.error,
								}}
							>
								{` ${isUp ? '+' : ''}${pricePercentage24h.toFixed(2)}% `}
							</Text>
						)}
						<Text variant={'bodySmall'}>
							{`${cryptoFormat(price || 0, 'USD', 'en')}`}
						</Text>
					</View>
				</View>
				<View>
					<Text variant={'bodyLarge'} style={styles.textRight}>
						{currencyFormat(fiatValue, 'USD', 'en')}
					</Text>
					<Text
						variant={'bodySmall'}
						style={[
							styles.textRight,
							styles.ticker,
							{ color: theme.colors.onSurfaceVariant },
						]}
					>
						{`${coinAmount} ${ticker}`}
					</Text>
				</View>
			</View>
		</Surface>
	);
});
