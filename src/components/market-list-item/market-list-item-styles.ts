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
	leftTextContainer: {
		maxWidth: '50%',
	},
	rightTextContainer: {
		maxWidth: '50%',
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
