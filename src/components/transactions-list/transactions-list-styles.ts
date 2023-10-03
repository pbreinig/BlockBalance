import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
	body: {
		padding: 12,
	},
	noTransactionsSurface: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		margin: 12,
		padding: 12,
		borderRadius: 12,
	},
	addFirstText: {
		width: 200,
		textAlign: 'center',
		marginTop: 12,
	},
	fab: {
		position: 'absolute',
		right: 16,
		bottom: 16,
	},
	row: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	listHeader: {
		paddingHorizontal: 12,
		marginBottom: 12,
	},
	listHeaderItem: {
		alignItems: 'center',
	},
});
