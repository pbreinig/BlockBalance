import { StyleConstants } from '../../constants/style-constants';
import { StyleSheet } from 'react-native';

const { ListItem } = StyleConstants;
export const styles = StyleSheet.create({
	image: {
		marginRight: ListItem.PADDING,
		backgroundColor: 'transparent',
	},
});
