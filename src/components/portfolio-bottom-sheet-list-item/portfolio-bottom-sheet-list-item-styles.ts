import { StyleConstants } from '../../constants/style-constants';
import { StyleSheet } from 'react-native';

const { Screen, ListItem } = StyleConstants;
export const styles = StyleSheet.create({
	touchable: {
		paddingHorizontal: Screen.PADDING,
		height: ListItem.HEIGHT,
	},
	container: {
		height: ListItem.HEIGHT,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	row: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	icon: {
		marginRight: 12,
	},
});
