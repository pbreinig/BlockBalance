import { StyleConstants } from '../../constants/style-constants';
import { StyleSheet } from 'react-native';

const { ListItem } = StyleConstants;
export const styles = StyleSheet.create({
	surface: {
		flexDirection: 'row',
		alignItems: 'center',
		width: '100%',
		height: ListItem.HEIGHT,
		padding: ListItem.PADDING,
		borderRadius: ListItem.BORDER_RADIUS,
		marginBottom: ListItem.MARGIN_BOTTOM,
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
