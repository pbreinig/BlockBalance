import { StyleSheet } from 'react-native';
import { StyleConstants } from '../../constants/style-constants';

const { Screen } = StyleConstants;
export const styles = StyleSheet.create({
	headerContainer: {
		paddingHorizontal: Screen.PADDING,
		paddingBottom: 12,
	},
	footerContainer: {
		padding: Screen.PADDING,
		paddingVertical: 12,
		borderTopWidth: 0.5,
		flexDirection: 'row',
		gap: 12,
	},
	input: {
		marginHorizontal: 24,
		marginBottom: 76,
	},
	button: {
		flex: 1,
		borderRadius: 12,
	},
});
