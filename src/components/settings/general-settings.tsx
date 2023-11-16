import React, { useState } from 'react';
import { List, Text } from 'react-native-paper';
import { useSettingsContext } from '../../context/settings-context';
import { StyleConstants } from '../../constants/style-constants';
import { SettingOption } from '../setting-option/setting-option';
import { StartTabBottomSheet } from '../bottom-sheets/start-tab-bottom-sheet';

export const GeneralSettings: React.FC = () => {
	const { theme } = useSettingsContext();
	const [isStartTabBottomSheetOpen, setIsStartTabBottomSheetOpen] = useState<boolean>(false);
	const { Screen } = StyleConstants;

	return (
		<>
			<List.Section>
				<Text
					variant={'labelLarge'}
					style={{ paddingLeft: Screen.PADDING, color: theme.colors.primary }}
				>
					{'General'}
				</Text>
				<SettingOption
					title={'Default start tab'}
					label={'Choose the start tab when launching the app'}
					onPress={() => setIsStartTabBottomSheetOpen(true)}
				/>
			</List.Section>
			<StartTabBottomSheet
				setOpen={setIsStartTabBottomSheetOpen}
				isOpen={isStartTabBottomSheetOpen}
			/>
		</>
	);
};
