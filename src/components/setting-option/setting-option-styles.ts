import { StyleSheet } from 'react-native';
import { StyleConstants } from '../../constants/style-constants';

const { Screen } = StyleConstants;
export const styles = StyleSheet.create({
	touchable: {
		flexDirection: 'column',
		justifyContent: 'center',
		height: 60,
		paddingHorizontal: Screen.PADDING,
	},
});
