import React, { useCallback, useEffect, useRef } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { useSettingsContext } from '../../context/settings-context';
import { styles } from './start-tab-bottom-sheet-styles';
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RadioButtonRow } from '../radio-button-row/radio-button-row';
import { useMMKVString } from 'react-native-mmkv';
import { storage } from '../../storage';

interface StartTabBottomSheetProps {
	setOpen: (open: boolean) => void;
	isOpen: boolean;
}

export const StartTabBottomSheet: React.FC<StartTabBottomSheetProps> = (props) => {
	const { setOpen, isOpen } = props;
	const { theme } = useSettingsContext();
	const insets = useSafeAreaInsets();
	const startTabBottomSheetModalRef = useRef<BottomSheetModal>(null);
	const [startTab = 'Portfolio', setStartTab] = useMMKVString('settings.startTab', storage);

	useEffect(() => {
		isOpen && startTabBottomSheetModalRef.current?.present();
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

	return (
		<>
			<BottomSheetModal
				name={'StartTabBottomSheet'}
				ref={startTabBottomSheetModalRef}
				enableDynamicSizing={true}
				onDismiss={() => setOpen(false)}
				backdropComponent={renderBackdrop}
				backgroundStyle={{ backgroundColor: theme.colors.background }}
				handleIndicatorStyle={{ backgroundColor: theme.colors.onPrimary }}
			>
				<BottomSheetView style={{ paddingBottom: insets.bottom }}>
					<View style={styles.headerContainer}>
						<Text variant={'titleMedium'} style={{ color: theme.colors.onSurface }}>
							{'Default start tab'}
						</Text>
					</View>
					<RadioButtonRow
						title={'Portfolio'}
						icon={'wallet'}
						onPress={() => setStartTab('Portfolio')}
						value={'Portfolio'}
						status={startTab === 'Portfolio' ? 'checked' : 'unchecked'}
					/>
					<RadioButtonRow
						title={'Market'}
						icon={'chart-timeline-variant-shimmer'}
						onPress={() => setStartTab('Market')}
						value={'Market'}
						status={startTab === 'Market' ? 'checked' : 'unchecked'}
					/>
				</BottomSheetView>
			</BottomSheetModal>
		</>
	);
};
