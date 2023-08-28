import { createContext, useContext, useState } from 'react';
import { MD3Theme } from 'react-native-paper';
import { AdditionalColors, DarkTheme, LightTheme } from '../constants/themes';

type SettingsContextType = {
	theme: MD3Theme & AdditionalColors;
	isThemeDark: boolean;
	toggleTheme: () => void;
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

const useSettings = () => {
	const [isThemeDark, setIsThemeDark] = useState<boolean>(true);
	const theme = isThemeDark ? DarkTheme : LightTheme;

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
