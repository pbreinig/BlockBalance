import { StyleSheet } from 'react-native';
import { StyleConstants } from '../../constants/style-constants';

const { Screen } = StyleConstants;
export const styles = StyleSheet.create({
	touchable: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		height: 60,
		paddingHorizontal: Screen.PADDING,
	},
	leftView: {
		flexDirection: 'row',
	},
	title: {
		marginLeft: 16,
	},
});
