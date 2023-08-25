import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
	body: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
export const SettingsScreen = () => {
	return (
		<View style={styles.body}>
			<Text>{'Settings'}</Text>
		</View>
	);
};
