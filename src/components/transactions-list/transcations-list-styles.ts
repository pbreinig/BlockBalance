import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
	body: {
		padding: 12,
	},
	surface: {
		padding: 12,
		borderRadius: 12,
		marginBottom: 8,
		borderLeftWidth: 6,
		gap: 12,
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
	typeContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		width: 55,
		padding: 8,
		borderRadius: 12,
		borderWidth: 1,
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
