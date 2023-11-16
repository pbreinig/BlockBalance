import React from 'react';
import { List, Text } from 'react-native-paper';
import { useSettingsContext } from '../../context/settings-context';
import { RadioButtonRow } from '../radio-button-row/radio-button-row';
import { StyleConstants } from '../../constants/style-constants';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export const AppearanceSettings: React.FC = () => {
	const { theme, themeType, setThemeType } = useSettingsContext();
	const { Screen } = StyleConstants;

	const renderIcon = (name: string) => (
		<MaterialIcons name={name} size={22} color={theme.colors.onPrimary} />
	);

	return (
		<List.Section>
			<Text
				variant={'labelLarge'}
				style={{ paddingLeft: Screen.PADDING, color: theme.colors.primary }}
			>
				{'Appearance'}
			</Text>
			<RadioButtonRow
				title={'Light mode'}
				icon={() => renderIcon('light-mode')}
				onPress={() => setThemeType('light')}
				value={'light'}
				status={themeType === 'light' ? 'checked' : 'unchecked'}
			/>
			<RadioButtonRow
				title={'Dark mode'}
				icon={() => renderIcon('dark-mode')}
				onPress={() => setThemeType('dark')}
				value={'dark'}
				status={themeType === 'dark' ? 'checked' : 'unchecked'}
			/>
			<RadioButtonRow
				title={'Follow system'}
				icon={() => renderIcon('brightness-medium')}
				onPress={() => setThemeType('system')}
				value={'system'}
				status={themeType === 'system' ? 'checked' : 'unchecked'}
			/>
		</List.Section>
	);
};
