import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
	body: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
export const PortfolioScreen = () => {
	return (
		<View style={styles.body}>
			<Text>{'Portfolio'}</Text>
		</View>
	);
};
