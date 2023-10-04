import React, { useCallback, useEffect, useRef } from 'react';
import { View } from 'react-native';
import { Text, TouchableRipple } from 'react-native-paper';
import { useSettingsContext } from '../../context/settings-context';
import { styles } from './transactions-bottom-sheet-styles';
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Transaction, usePortfolioContext } from '../../context/portfolio-context';

interface TransactionsBottomSheetProps {
	setOpen: (open: boolean) => void;
	isOpen: boolean;
	transaction: Transaction | null;
}

export const TransactionsBottomSheet: React.FC<TransactionsBottomSheetProps> = (props) => {
	const { setOpen, isOpen, transaction } = props;
	const { theme } = useSettingsContext();
	const { deleteTransaction } = usePortfolioContext();
	const insets = useSafeAreaInsets();
	const transactionBottomSheetModalRef = useRef<BottomSheetModal>(null);

	useEffect(() => {
		isOpen && transactionBottomSheetModalRef.current?.present();
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

	const handleDelete = useCallback(() => {
		transactionBottomSheetModalRef.current?.dismiss();
		transaction && deleteTransaction(transaction);
	}, [transaction]);

	return (
		<BottomSheetModal
			name={'TransactionBottomSheet'}
			ref={transactionBottomSheetModalRef}
			enableDynamicSizing={true}
			onDismiss={() => setOpen(false)}
			backdropComponent={renderBackdrop}
			backgroundStyle={{ backgroundColor: theme.colors.background }}
			handleIndicatorStyle={{ backgroundColor: theme.colors.onPrimary }}
		>
			<BottomSheetView style={{ paddingBottom: insets.bottom }}>
				<View style={styles.headerContainer}>
					<Text variant={'titleMedium'} style={{ color: theme.colors.onSurface }}>
						{'Transaction'}
					</Text>
				</View>
				<TouchableRipple
					onPress={() => {}}
					rippleColor={theme.additionalColors.ripple}
					style={styles.touchable}
				>
					<View style={styles.container}>
						<View style={styles.row}>
							<MaterialCommunityIcons
								name={'pencil'}
								color={theme.colors.onSurface}
								size={18}
								style={styles.icon}
							/>
							<Text variant={'bodyLarge'} style={{ color: theme.colors.onSurface }}>
								{'Edit Transaction'}
							</Text>
						</View>
					</View>
				</TouchableRipple>
				<TouchableRipple
					onPress={handleDelete}
					rippleColor={theme.additionalColors.ripple}
					style={styles.touchable}
				>
					<View style={styles.container}>
						<View style={styles.row}>
							<MaterialCommunityIcons
								name={'delete'}
								color={theme.colors.onSurface}
								size={18}
								style={styles.icon}
							/>
							<Text variant={'bodyLarge'} style={{ color: theme.colors.onSurface }}>
								{'Delete Transaction'}
							</Text>
						</View>
					</View>
				</TouchableRipple>
			</BottomSheetView>
		</BottomSheetModal>
	);
};
