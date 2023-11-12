import { Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('screen');
const CELL_WIDTH = width / 2 - 36;
export const styles = StyleSheet.create({
	divider: {
		marginVertical: 12,
	},
	verticalDivider: {
		width: StyleSheet.hairlineWidth,
	},
	infoRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		gap: 12,
	},
	infoCell: {
		width: CELL_WIDTH,
		height: CELL_WIDTH / 4,
		justifyContent: 'flex-end',
		alignItems: 'center',
	},
	linkButtonContainer: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		gap: 8,
	},
	linkButton: {
		alignSelf: 'flex-start',
	},
});
