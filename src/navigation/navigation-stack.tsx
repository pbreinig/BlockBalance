import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TransactionScreen } from '../screens/transaction-screen/transaction-screen';
import { useSettingsContext } from '../context/settings-context';
import { BottomTabs } from './bottom-tab-navigator';
import { CoinListScreen } from '../screens/coin-list-screen/coin-list-screen';
import { CoinScreen } from '../screens/coin-screen/coin-screen';

const Stack = createNativeStackNavigator();

export const NavigationStack = () => {
	const { theme } = useSettingsContext();

	return (
		<Stack.Navigator>
			<Stack.Screen
				name={'PortfolioStack'}
				component={BottomTabs}
				options={{
					headerShown: false,
					contentStyle: { backgroundColor: theme.colors.background },
				}}
			/>
			<Stack.Screen
				name={'CoinList'}
				component={CoinListScreen}
				options={{
					headerShown: false,
					contentStyle: { backgroundColor: theme.colors.background },
				}}
			/>
			<Stack.Screen
				name={'Transaction'}
				component={TransactionScreen}
				options={{
					headerShown: false,
					contentStyle: { backgroundColor: theme.colors.background },
					statusBarColor: theme.colors.surface,
				}}
			/>
			<Stack.Screen
				name={'Coin'}
				component={CoinScreen}
				options={{
					headerShown: false,
					contentStyle: { backgroundColor: theme.colors.background },
					statusBarColor: theme.colors.surface,
				}}
			/>
		</Stack.Navigator>
	);
};
