import { StyleSheet } from 'react-native';
import { StyleConstants } from '../../constants/style-constants';

const { Screen, ListItem } = StyleConstants;
export const styles = StyleSheet.create({
	body: {
		padding: Screen.PADDING,
		paddingBottom: 0,
	},
	headerTitle: {
		paddingBottom: Screen.PADDING,
	},
	fab: {
		position: 'absolute',
		right: 16,
		bottom: 16,
	},
	flatList: {
		width: '100%',
		marginTop: ListItem.PADDING,
	},
	flatListContainer: {
		paddingBottom: 40,
	},
	listLabelContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: '100%',
		top: 6,
		paddingHorizontal: ListItem.PADDING,
	},
});
