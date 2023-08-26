import { PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { BottomTabNavigator } from './src/navigation/bottom-tab-navigator';
import { SettingsProvider, useSettingsContext } from './src/context/settings-context';

const AppContent = () => {
	const { theme } = useSettingsContext();

	return (
		<PaperProvider theme={theme}>
			<NavigationContainer>
				<BottomTabNavigator />
			</NavigationContainer>
		</PaperProvider>
	);
};
const App = () => {
	return (
		<SettingsProvider>
			<AppContent />
		</SettingsProvider>
	);
};

export default App;
