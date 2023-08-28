import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar, Surface, Text } from 'react-native-paper';
import { StyleConstants } from '../constants/style-constants';
import { useSettingsContext } from '../context/settings-context';

interface IMarketListItemProps {
	rank: number;
	name: string;
	ticker: string;
	imageSrc: string;
	price: number;
	pricePercentage24h: number;
	marketCap: number;
}

export const MarketListItem: React.FC<IMarketListItemProps> = (props) => {
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
					<Text variant={'titleMedium'}>{name}</Text>
					<View style={styles.tickerChangeContainer}>
						<Text
							variant={'labelMedium'}
							style={[styles.ticker, { color: theme.colors.onSurfaceVariant }]}
						>
							{ticker}
						</Text>
						<Text
							variant={'labelMedium'}
							style={{
								color: isUp ? theme.additionalColors.green : theme.colors.error,
							}}
						>
							{` ${isUp ? '+' : ''}${pricePercentage24h.toFixed(2)}%`}
						</Text>
					</View>
				</View>
				<View>
					<Text variant={'titleMedium'} style={styles.textRight}>{`$${price}`}</Text>
					<Text
						variant={'labelMedium'}
						style={[styles.textRight, { color: theme.colors.onSurfaceVariant }]}
					>
						{`$${marketCap}`}
					</Text>
				</View>
			</View>
		</Surface>
	);
};

const { ListItem } = StyleConstants;
const styles = StyleSheet.create({
	surface: {
		flexDirection: 'row',
		alignItems: 'center',
		width: '100%',
		height: ListItem.HEIGHT,
		padding: ListItem.PADDING,
		borderRadius: ListItem.BORDER_RADIUS,
		marginBottom: ListItem.MARGIN_BOTTOM,
	},
	rankContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		position: 'absolute',
		top: 0,
		left: 0,
		minWidth: 15,
		height: 15,
		borderTopLeftRadius: ListItem.BORDER_RADIUS,
		borderBottomRightRadius: 3,
		paddingHorizontal: 5,
	},
	image: {
		marginRight: ListItem.PADDING,
		backgroundColor: 'transparent',
	},
	textContainer: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	tickerChangeContainer: {
		flexDirection: 'row',
	},
	ticker: {
		textTransform: 'uppercase',
	},
	textRight: {
		textAlign: 'right',
	},
});
