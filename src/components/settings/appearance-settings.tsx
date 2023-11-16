import React, { useState } from 'react';
import { List, Text } from 'react-native-paper';
import { useSettingsContext } from '../../context/settings-context';
import { StyleConstants } from '../../constants/style-constants';
import { AppThemeBottomSheet } from '../bottom-sheets/app-theme-bottom-sheet';
import { SettingOption } from '../setting-option/setting-option';

export const AppearanceSettings: React.FC = () => {
	const { theme } = useSettingsContext();
	const [isAppThemeBottomSheetOpen, setIsAppThemeBottomSheetOpen] = useState<boolean>(false);
	const { Screen } = StyleConstants;

	return (
		<>
			<List.Section>
				<Text
					variant={'labelLarge'}
					style={{ paddingLeft: Screen.PADDING, color: theme.colors.primary }}
				>
					{'Appearance'}
				</Text>
				<SettingOption
					title={'App theme'}
					label={'Choose the app theme'}
					onPress={() => setIsAppThemeBottomSheetOpen(true)}
				/>
			</List.Section>
			<AppThemeBottomSheet
				setOpen={setIsAppThemeBottomSheetOpen}
				isOpen={isAppThemeBottomSheetOpen}
			/>
		</>
	);
};
