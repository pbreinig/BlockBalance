import { StyleConstants } from '../../constants/style-constants';
import { StyleSheet } from 'react-native';

const { ListItem } = StyleConstants;
export const styles = StyleSheet.create({
	surface: {
		flexDirection: 'row',
		alignItems: 'center',
		width: '100%',
		height: ListItem.HEIGHT,
		borderRadius: ListItem.BORDER_RADIUS,
		marginBottom: ListItem.MARGIN_BOTTOM,
	},
	ripple: {
		flexDirection: 'row',
		alignItems: 'center',
		padding: ListItem.PADDING,
		borderRadius: ListItem.BORDER_RADIUS,
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
	leftTextContainer: {
		maxWidth: '50%',
	},
	rightTextContainer: {
		alignItems: 'flex-end',
		maxWidth: '50%',
	},
	tickerPriceChangeContainer: {
		flexDirection: 'row',
	},
	ticker: {
		textTransform: 'uppercase',
	},
});
