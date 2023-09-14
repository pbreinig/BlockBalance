import { createContext, useContext } from 'react';
import { useColorScheme } from 'react-native';
import { MD3Theme } from 'react-native-paper';
import { useMMKVString } from 'react-native-mmkv';
import { AdditionalColors, DarkTheme, LightTheme } from '../constants/themes';
import { storage } from '../storage';

type ThemeType = 'light' | 'dark' | 'system';

type SettingsContextType = {
	theme: MD3Theme & AdditionalColors;
	themeType: string;
	setThemeType: (theme: ThemeType) => void;
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

const useSettings = () => {
	const colorScheme = useColorScheme();
	const [themeType = 'system', setThemeType] = useMMKVString('settings.themeType', storage);

	let theme = DarkTheme;
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
