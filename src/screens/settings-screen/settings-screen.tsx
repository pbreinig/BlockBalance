import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { styles } from './settings-screen-styles';
import { AppearanceSettings } from '../../components/settings/appearance-settings';

export const SettingsScreen = () => {
	return (
		<View>
			<Text variant={'headlineLarge'} style={styles.headerTitle}>
				{'Settings'}
			</Text>
			<AppearanceSettings />
		</View>
	);
};
