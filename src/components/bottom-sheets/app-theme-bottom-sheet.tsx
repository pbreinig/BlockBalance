import React, { useCallback, useEffect, useRef } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { useSettingsContext } from '../../context/settings-context';
import { styles } from './bottom-sheet-styles';
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RadioButtonRow } from '../radio-button-row/radio-button-row';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface AppThemeBottomSheetProps {
	setOpen: (open: boolean) => void;
	isOpen: boolean;
}

export const AppThemeBottomSheet: React.FC<AppThemeBottomSheetProps> = (props) => {
	const { setOpen, isOpen } = props;
	const { theme, themeType, setThemeType } = useSettingsContext();
	const insets = useSafeAreaInsets();
	const appThemeBottomSheetModalRef = useRef<BottomSheetModal>(null);

	useEffect(() => {
		isOpen && appThemeBottomSheetModalRef.current?.present();
	}, [isOpen]);

	const renderBackdrop = useCallback(
		(props) => (
			<BottomSheetBackdrop
				{...props}
				style={{ ...props.style, backgroundColor: theme.colors.backdrop }}
				disappearsOnIndex={-1}
				appearsOnIndex={0}
			/>
		),
		[theme.colors.backdrop],
	);

	const renderIcon = (name: string) => (
		<MaterialIcons name={name} size={22} color={theme.colors.onPrimary} />
	);

	return (
		<>
			<BottomSheetModal
				name={'AppThemeBottomSheet'}
				ref={appThemeBottomSheetModalRef}
				enableDynamicSizing={true}
				onDismiss={() => setOpen(false)}
				backdropComponent={renderBackdrop}
				backgroundStyle={{ backgroundColor: theme.colors.background }}
				handleIndicatorStyle={{ backgroundColor: theme.colors.onPrimary }}
			>
				<BottomSheetView style={{ paddingBottom: insets.bottom }}>
					<View style={styles.headerContainer}>
						<Text variant={'titleMedium'} style={{ color: theme.colors.onSurface }}>
							{'App theme'}
						</Text>
					</View>
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
				</BottomSheetView>
			</BottomSheetModal>
		</>
	);
};
