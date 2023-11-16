import { View } from 'react-native';
import { Divider, Text } from 'react-native-paper';
import { styles } from './settings-screen-styles';
import { AppearanceSettings } from '../../components/settings/appearance-settings';
import { GeneralSettings } from '../../components/settings/general-settings';
import { useSettingsContext } from '../../context/settings-context';

export const SettingsScreen = () => {
	const { theme } = useSettingsContext();

	return (
		<View>
			<Text variant={'headlineLarge'} style={styles.headerTitle}>
				{'Settings'}
			</Text>
			<GeneralSettings />
			<Divider
				horizontalInset={true}
				style={{ backgroundColor: theme.colors.onSurfaceVariant }}
			/>
			<AppearanceSettings />
		</View>
	);
};
