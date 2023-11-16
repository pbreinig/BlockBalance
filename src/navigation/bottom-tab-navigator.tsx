import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import { MarketScreen } from '../screens/market-screen/market-screen';
import { SettingsScreen } from '../screens/settings-screen/settings-screen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { PortfolioScreen } from '../screens/portfolio-screen/portfolio-screen';
import { storage } from '../storage';

const Tab = createMaterialBottomTabNavigator();
const initialRoute = storage.getString('settings.startTab');

export const BottomTabs = () => {
	return (
		<Tab.Navigator initialRouteName={initialRoute}>
			<Tab.Screen
				name="Portfolio"
				component={PortfolioScreen}
				options={{
					tabBarIcon: ({ color, focused }) => (
						<MaterialCommunityIcons
							name={focused ? 'wallet' : 'wallet-outline'}
							color={color}
							size={24}
						/>
					),
				}}
			/>
			<Tab.Screen
				name="Market"
				component={MarketScreen}
				options={{
					tabBarIcon: ({ color, focused }) => (
						<MaterialCommunityIcons
							name={
								focused
									? 'chart-timeline-variant-shimmer'
									: 'chart-timeline-variant'
							}
							color={color}
							size={24}
							style={!focused && { top: 2 }}
						/>
					),
				}}
			/>
			<Tab.Screen
				name="Settings"
				component={SettingsScreen}
				options={{
					tabBarIcon: ({ color, focused }) => (
						<MaterialCommunityIcons
							name={focused ? 'cog' : 'cog-outline'}
							color={color}
							size={24}
						/>
					),
				}}
			/>
		</Tab.Navigator>
	);
};
