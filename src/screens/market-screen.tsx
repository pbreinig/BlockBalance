import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
	body: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
export const MarketScreen = () => {
	return (
		<View style={styles.body}>
			<Text>{'Market'}</Text>
		</View>
	);
};
