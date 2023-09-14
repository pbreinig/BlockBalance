import { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { NavigationStack } from './src/navigation/navigation-stack';
import { SettingsProvider, useSettingsContext } from './src/context/settings-context';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PortfolioProvider } from './src/context/portfolio-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

const AppContent = () => {
	const { theme } = useSettingsContext();

	useEffect(() => {
		changeNavigationBarColor(theme.colors.surface, false, false);
	}, [theme]);

	return (
		<PaperProvider theme={theme}>
			<StatusBar backgroundColor={theme.colors.background} />
			<GestureHandlerRootView style={{ flex: 1 }}>
				<BottomSheetModalProvider>
					<NavigationContainer>
						<NavigationStack />
					</NavigationContainer>
				</BottomSheetModalProvider>
			</GestureHandlerRootView>
		</PaperProvider>
	);
};
const App = () => {
	const queryClient = new QueryClient();

	return (
		<QueryClientProvider client={queryClient}>
			<PortfolioProvider>
				<SettingsProvider>
					<AppContent />
				</SettingsProvider>
			</PortfolioProvider>
		</QueryClientProvider>
	);
};

export default App;
