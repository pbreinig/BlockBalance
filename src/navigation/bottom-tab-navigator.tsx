import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import { PortfolioScreen } from '../screens/portfolio-screen';
import { MarketScreen } from '../screens/market-screen';
import { SettingsScreen } from '../screens/settings-screen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createMaterialBottomTabNavigator();

export const BottomTabNavigator = () => {
	return (
		<Tab.Navigator>
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
