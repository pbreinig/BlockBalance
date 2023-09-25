import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
	body: {
		padding: 12,
	},
	surface: {
		padding: 12,
		borderRadius: 12,
	},
	flexRow: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	image: {
		marginRight: 8,
		backgroundColor: 'transparent',
	},
	timeFrameSelection: {
		flexDirection: 'row',
		justifyContent: 'center',
		gap: 12,
	},
	chipUnselected: {
		backgroundColor: 'transparent',
	},
});
