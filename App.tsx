import { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { BottomTabNavigator } from './src/navigation/bottom-tab-navigator';
import { SettingsProvider, useSettingsContext } from './src/context/settings-context';
import changeNavigationBarColor from 'react-native-navigation-bar-color';

const AppContent = () => {
	const { theme } = useSettingsContext();

	useEffect(() => {
		changeNavigationBarColor(theme.colors.surface, false, false);
	}, [theme]);

	return (
		<PaperProvider theme={theme}>
			<StatusBar backgroundColor={theme.colors.background} />
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
