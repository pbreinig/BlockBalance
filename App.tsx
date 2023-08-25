import { PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { BottomTabNavigator } from './src/navigation/bottom-tab-navigator';

const App = () => {
	return (
		<PaperProvider>
			<NavigationContainer>
				<BottomTabNavigator />
			</NavigationContainer>
		</PaperProvider>
	);
};

export default App;
