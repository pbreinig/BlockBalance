import { StyleConstants } from '../../constants/style-constants';
import { StyleSheet } from 'react-native';

const { Screen, ListItem } = StyleConstants;
export const styles = StyleSheet.create({
	body: {
		padding: Screen.PADDING,
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
	progressBar: {
		position: 'absolute',
		bottom: 56,
	},
	scrollToTopFab: {
		position: 'absolute',
		right: 16,
		bottom: 80,
	},
	searchFab: {
		position: 'absolute',
		right: 16,
		bottom: 16,
	},
});
