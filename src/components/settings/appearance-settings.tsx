import React from 'react';
import { List, Text } from 'react-native-paper';
import { useSettingsContext } from '../../context/settings-context';
import { RadioButtonRow } from '../radio-button-row/radio-button-row';
import { StyleConstants } from '../../constants/style-constants';

export const AppearanceSettings: React.FC = () => {
	const { isThemeDark, toggleTheme, theme } = useSettingsContext();
	const { Screen } = StyleConstants;

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
				iconName={'light-mode'}
				iconColor={theme.colors.onPrimary}
				onPress={() => isThemeDark && toggleTheme()}
				value={'light'}
				status={!isThemeDark ? 'checked' : 'unchecked'}
			/>
			<RadioButtonRow
				title={'Dark mode'}
				iconName={'dark-mode'}
				iconColor={theme.colors.onPrimary}
				onPress={() => !isThemeDark && toggleTheme()}
				value={'dark'}
				status={isThemeDark ? 'checked' : 'unchecked'}
			/>
			<RadioButtonRow
				title={'Follow system'}
				iconName={'brightness-medium'}
				iconColor={theme.colors.onPrimary}
				onPress={() => {}}
				value={'auto'}
				status={'unchecked'}
			/>
		</List.Section>
	);
};
