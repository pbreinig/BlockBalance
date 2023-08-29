import { createContext, useContext, useState } from 'react';
import { useColorScheme } from 'react-native';
import { MD3Theme } from 'react-native-paper';
import { AdditionalColors, DarkTheme, LightTheme } from '../constants/themes';

type ThemeType = 'light' | 'dark' | 'system';

type SettingsContextType = {
	theme: MD3Theme & AdditionalColors;
	themeType: ThemeType;
	setThemeType: (theme: ThemeType) => void;
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

const useSettings = () => {
	const colorScheme = useColorScheme();
	const [themeType, setThemeType] = useState<ThemeType>('dark');

	let theme;
	switch (themeType) {
		case 'light':
			theme = LightTheme;
			break;
		case 'dark':
			theme = DarkTheme;
			break;
		case 'system':
			theme = colorScheme === 'dark' ? DarkTheme : LightTheme;
			break;
	}

	return {
		theme,
		themeType,
		setThemeType,
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
