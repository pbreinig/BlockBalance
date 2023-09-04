import React from 'react';
import { View } from 'react-native';
import { Avatar, Surface, Text } from 'react-native-paper';
import { useSettingsContext } from '../../context/settings-context';
import { styles } from './portfolio-coin-list-item-styles';
import { Coin } from '../../context/portfolio-context';
import { cryptoFormat } from '../../util';

interface IPortfolioCoinListItemProps {
	coin: Coin;
}

export const PortfolioCoinListItem: React.FC<IPortfolioCoinListItemProps> = React.memo((props) => {
	const { coin } = props;
	const { theme } = useSettingsContext();
	const tickerCaps = coin.ticker.toUpperCase();

	return (
		<Surface style={styles.surface} mode={'flat'}>
			<Avatar.Image source={{ uri: coin.imgSrc }} size={32} style={styles.image} />
			<View style={styles.textContainer}>
				<View>
					<Text variant={'bodyLarge'}>{coin.name}</Text>
					<Text variant={'bodySmall'} style={{ color: theme.colors.onSurfaceVariant }}>
						{tickerCaps}
					</Text>
				</View>
				<View>
					<Text variant={'bodyLarge'} style={styles.textRight}>
						{`${cryptoFormat(coin.dollarAmount, 'USD', 'en')}`}
					</Text>
					<Text
						variant={'bodySmall'}
						style={[styles.textRight, { color: theme.colors.onSurfaceVariant }]}
					>
						{`${coin.coinAmount} ${tickerCaps}`}
					</Text>
				</View>
			</View>
		</Surface>
	);
});
