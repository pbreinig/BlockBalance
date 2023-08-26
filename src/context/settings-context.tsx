import { createContext, useContext, useState } from 'react';
import { MD3DarkTheme, MD3LightTheme, MD3Theme } from 'react-native-paper';

type SettingsContextType = {
	theme: MD3Theme;
	isThemeDark: boolean;
	toggleTheme: () => void;
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

const useSettings = () => {
	const [isThemeDark, setIsThemeDark] = useState<boolean>(true);
	const theme = isThemeDark ? MD3DarkTheme : MD3LightTheme;

	const toggleTheme = () => {
		setIsThemeDark(!isThemeDark);
	};

	return {
		theme,
		isThemeDark,
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
