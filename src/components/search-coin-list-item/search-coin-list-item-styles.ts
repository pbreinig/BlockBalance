import { StyleSheet } from 'react-native';
import { StyleConstants } from '../../constants/style-constants';

const { ListItem } = StyleConstants;
export const styles = StyleSheet.create({
	itemContainer: {
		height: ListItem.HEIGHT,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: 12,
	},
	itemLeftRightContainer: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	image: {
		marginRight: ListItem.PADDING,
		backgroundColor: 'transparent',
	},
});
