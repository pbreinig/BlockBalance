import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TransactionScreen } from '../screens/transaction-screen/transaction-screen';
import { useSettingsContext } from '../context/settings-context';
import { BottomTabs } from './bottom-tab-navigator';
import { CoinSearchScreen } from '../screens/coin-search-screen/coin-search-screen';
import { CoinScreen } from '../screens/coin-screen/coin-screen';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Stack = createNativeStackNavigator();

export const NavigationStack = () => {
	const { theme } = useSettingsContext();
	const insets = useSafeAreaInsets();

	return (
		<Stack.Navigator>
			<Stack.Screen
				name={'PortfolioStack'}
				component={BottomTabs}
				options={{
					headerShown: false,
					contentStyle: {
						backgroundColor: theme.colors.background,
						paddingTop: insets.top,
					},
					statusBarColor: theme.colors.background,
					navigationBarColor: theme.colors.surface,
				}}
			/>
			<Stack.Screen
				name={'CoinSearch'}
				component={CoinSearchScreen}
				options={{
					headerShown: false,
					contentStyle: {
						backgroundColor: theme.colors.background,
						paddingTop: insets.top,
					},
					statusBarColor: theme.colors.surface,
					navigationBarColor: theme.colors.background,
				}}
			/>
			<Stack.Screen
				name={'Transaction'}
				component={TransactionScreen}
				options={{
					headerShown: false,
					contentStyle: { backgroundColor: theme.colors.background },
					statusBarColor: theme.colors.surface,
					navigationBarColor: theme.colors.background,
				}}
			/>
			<Stack.Screen
				name={'Coin'}
				component={CoinScreen}
				options={{
					headerShown: false,
					contentStyle: { backgroundColor: theme.colors.background },
					statusBarColor: theme.colors.surface,
					navigationBarColor: theme.colors.background,
				}}
			/>
		</Stack.Navigator>
	);
};
