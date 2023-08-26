import { createContext, useContext, useState } from 'react';
import { MD3DarkTheme, MD3LightTheme, MD3Theme } from 'react-native-paper';

type SettingsContextType = {
	theme: MD3Theme;
	toggleTheme: () => void;
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

const useSettings = () => {
	const [isDarkTheme, setIsDarkTheme] = useState<boolean>(true);
	const theme = isDarkTheme ? MD3DarkTheme : MD3LightTheme;

	const toggleTheme = () => {
		setIsDarkTheme(!isDarkTheme);
	};

	return {
		theme,
		toggleTheme,
	};
};

export const SettingsProvider = ({ children }) => {
	const settings = useSettings();
	return <SettingsContext.Provider value={settings}>{children}</SettingsContext.Provider>;
};

export const useSettingsContext = () => {
	const context = useContext(SettingsContext);
	if (context === undefined) {
		throw new Error('useSettingsContext must be used within SettingsProvider');
	}
	return context;
};
