import { StyleSheet } from 'react-native';
import { StyleConstants } from '../../constants/style-constants';

const { Screen, ListItem } = StyleConstants;
export const styles = StyleSheet.create({
	body: {
		padding: Screen.PADDING,
		paddingBottom: 0,
	},
	headerContainer: {
		padding: 14,
		borderRadius: 18,
	},
	headerTitle: {
		paddingBottom: Screen.PADDING,
	},
	nameContainer: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	totalFiatValue: {
		fontFamily: 'Manrope-Bold',
		fontSize: 45,
		letterSpacing: 0,
		lineHeight: 52,
	},
	switchIconsContainer: {
		flexDirection: 'column',
		height: 20,
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
