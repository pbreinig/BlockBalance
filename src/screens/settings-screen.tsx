import { StyleSheet, View } from 'react-native';
import { Switch, Text, useTheme } from 'react-native-paper';
import { useSettingsContext } from '../context/settings-context';

const styles = StyleSheet.create({
	body: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
export const SettingsScreen = () => {
	const { toggleTheme } = useSettingsContext();
	const theme = useTheme();

	return (
		<View style={styles.body}>
			<Text>{'Dark Mode'}</Text>
			<Switch value={theme.dark} onChange={toggleTheme} />
		</View>
	);
};
