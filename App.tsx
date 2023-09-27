import { PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { NavigationStack } from './src/navigation/navigation-stack';
import { SettingsProvider, useSettingsContext } from './src/context/settings-context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PortfolioProvider } from './src/context/portfolio-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const AppContent = () => {
	const { theme } = useSettingsContext();

	return (
		<PaperProvider theme={theme}>
			<SafeAreaProvider>
				<GestureHandlerRootView style={{ flex: 1 }}>
					<BottomSheetModalProvider>
						<NavigationContainer>
							<NavigationStack />
						</NavigationContainer>
					</BottomSheetModalProvider>
				</GestureHandlerRootView>
			</SafeAreaProvider>
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
