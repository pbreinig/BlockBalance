import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import { PortfolioScreen } from '../screens/portfolio-screen';
import { MarketScreen } from '../screens/market-screen';
import { SettingsScreen } from '../screens/settings-screen';

const Tab = createMaterialBottomTabNavigator();

export const BottomTabNavigator = () => {
	return (
		<Tab.Navigator>
			<Tab.Screen name="Portfolio" component={PortfolioScreen} />
			<Tab.Screen name="Market" component={MarketScreen} />
			<Tab.Screen name="Settings" component={SettingsScreen} />
		</Tab.Navigator>
	);
};
