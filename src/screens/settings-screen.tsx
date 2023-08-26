import { StyleSheet, View } from 'react-native';
import { Switch, Text } from 'react-native-paper';
import { useSettingsContext } from '../context/settings-context';

const styles = StyleSheet.create({
	body: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
export const SettingsScreen = () => {
	const { isThemeDark, toggleTheme } = useSettingsContext();

	return (
		<View style={styles.body}>
			<Text>{'Dark Mode'}</Text>
			<Switch value={isThemeDark} onChange={toggleTheme} />
		</View>
	);
};
